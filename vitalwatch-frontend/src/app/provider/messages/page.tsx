'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { messagingApi } from '@/services/api';
import type { MessageThread, Message as MessageType } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Send, Search, Paperclip, MoreVertical, Phone, Video, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { VideoCall } from '@/components/video';
import { webrtcClient, IncomingCallData, CallType } from '@/lib/webrtc';
import { IncomingCallModal } from '@/components/video';
import { socketClient } from '@/lib/socket';

interface LocalMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    role: string;
    riskLevel?: 'low' | 'moderate' | 'high';
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: LocalMessage[];
}

// Helper to check demo mode
function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  const authData = localStorage.getItem('vytalwatch-auth');
  if (!authData) return false;
  try {
    const parsed = JSON.parse(authData);
    const token = parsed?.state?.accessToken || '';
    return (
      parsed?.state?.useDemoMode === true ||
      token.startsWith('demo_') ||
      token.startsWith('google_') ||
      token.startsWith('microsoft_') ||
      token.startsWith('apple_')
    );
  } catch {
    return false;
  }
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: { id: 'p1', name: 'Maria Garcia', role: 'Patient', riskLevel: 'high' },
    lastMessage: 'Thank you, Dr. Smith. I will monitor my weight as you suggested.',
    lastMessageTime: new Date(Date.now() - 1800000),
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'provider', senderName: 'You', content: 'Maria, I noticed your weight increased by 3 lbs. Please weigh yourself daily and report any sudden changes.', timestamp: new Date(Date.now() - 3600000), read: true },
      { id: 'm2', senderId: 'p1', senderName: 'Maria Garcia', content: 'Thank you, Dr. Smith. I will monitor my weight as you suggested.', timestamp: new Date(Date.now() - 1800000), read: true },
    ],
  },
  {
    id: '2',
    participant: { id: 'p2', name: 'James Wilson', role: 'Patient', riskLevel: 'moderate' },
    lastMessage: 'My glucose was 185 this morning. Should I adjust my medication?',
    lastMessageTime: new Date(Date.now() - 7200000),
    unreadCount: 1,
    messages: [
      { id: 'm3', senderId: 'p2', senderName: 'James Wilson', content: 'My glucose was 185 this morning. Should I adjust my medication?', timestamp: new Date(Date.now() - 7200000), read: false },
    ],
  },
  {
    id: '3',
    participant: { id: 'p3', name: 'Susan Chen', role: 'Patient', riskLevel: 'high' },
    lastMessage: 'I have been feeling short of breath lately.',
    lastMessageTime: new Date(Date.now() - 86400000),
    unreadCount: 2,
    messages: [],
  },
  {
    id: '4',
    participant: { id: 'n1', name: 'Nurse Lisa', role: 'Care Coordinator' },
    lastMessage: 'I have updated the care plan for Mrs. Garcia.',
    lastMessageTime: new Date(Date.now() - 172800000),
    unreadCount: 0,
    messages: [],
  },
];

export default function ProviderMessagesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'patients' | 'staff'>('all');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);

  // Initialize socket connection for video calls
  useEffect(() => {
    const initSocket = async () => {
      try {
        const authData = localStorage.getItem('vytalwatch-auth');
        let token = 'dev_token';
        let userId = 'provider_1';
        let role = 'Provider';
        let organizationId = 'org_1';

        if (authData) {
          const parsed = JSON.parse(authData);
          token = parsed?.state?.accessToken || token;
          userId = parsed?.state?.user?.id || userId;
          role = parsed?.state?.user?.role || role;
          organizationId = parsed?.state?.user?.organizationId || organizationId;
        }

        console.log('Connecting socket with:', { userId, role });
        await socketClient.connect({
          token,
          userId,
          role,
          organizationId,
        });
        setSocketConnected(true);
        console.log('Socket connected successfully');
      } catch (err) {
        console.error('Socket connection failed:', err);
      }
    };

    initSocket();

    return () => {
      socketClient.disconnect();
    };
  }, []);

  const fetchConversations = useCallback(async () => {
    if (isDemoMode()) {
      setConversations(mockConversations);
      setSelectedConversation(mockConversations[0]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await messagingApi.getThreads({ limit: 50 });
      if (response.data?.results) {
        const threads = response.data.results.map((thread: MessageThread) => ({
          id: thread.id,
          participant: {
            id: thread.participants?.[0]?.id || '',
            name: thread.participants?.[0]?.name || 'Unknown',
            role: thread.participants?.[0]?.role || 'Patient',
          },
          lastMessage: thread.lastMessage?.content || '',
          lastMessageTime: new Date(thread.updatedAt || thread.createdAt),
          unreadCount: thread.unreadCount || 0,
          messages: [],
        }));
        setConversations(threads.length > 0 ? threads : mockConversations);
        setSelectedConversation(threads[0] || mockConversations[0]);
      }
    } catch {
      setConversations(mockConversations);
      setSelectedConversation(mockConversations[0]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async (threadId: string) => {
    if (isDemoMode()) return;

    try {
      const response = await messagingApi.getMessages(threadId, { limit: 100 });
      if (response.data?.results) {
        const messages = response.data.results.map((msg: MessageType) => ({
          id: msg.id,
          senderId: msg.senderId,
          senderName: msg.senderName || 'Unknown',
          content: msg.content,
          timestamp: new Date(msg.createdAt),
          read: msg.read,
        }));
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === threadId ? { ...conv, messages } : conv
          )
        );
        if (selectedConversation?.id === threadId) {
          setSelectedConversation((prev) => prev ? { ...prev, messages } : prev);
        }
      }
    } catch {
      // Keep existing messages on error
    }
  }, [selectedConversation?.id]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (selectedConversation?.id) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation?.id, fetchMessages]);

  const filteredConversations = conversations.filter((c) => {
    if (!c.participant.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterType === 'patients' && c.participant.role !== 'Patient') return false;
    if (filterType === 'staff' && c.participant.role === 'Patient') return false;
    return true;
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / 3600000;

    if (diffHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffHours < 168) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || sending) return;

    const messageContent = newMessage.trim();
    setNewMessage('');

    // Optimistic update
    const optimisticMessage: LocalMessage = {
      id: `temp-${Date.now()}`,
      senderId: 'provider',
      senderName: 'You',
      content: messageContent,
      timestamp: new Date(),
      read: true,
    };

    setSelectedConversation((prev) =>
      prev ? { ...prev, messages: [...prev.messages, optimisticMessage] } : prev
    );
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, optimisticMessage],
              lastMessage: messageContent,
              lastMessageTime: new Date(),
            }
          : conv
      )
    );

    if (isDemoMode()) return;

    try {
      setSending(true);
      await messagingApi.sendMessage(selectedConversation.id, messageContent);
      await messagingApi.markThreadAsRead(selectedConversation.id);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Revert optimistic update on error
      setSelectedConversation((prev) =>
        prev ? { ...prev, messages: prev.messages.filter((m) => m.id !== optimisticMessage.id) } : prev
      );
    } finally {
      setSending(false);
    }
  };

  const handleNewConversation = useCallback(() => {
    router.push('/provider/messages/new');
  }, [router]);

  // Video call state
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [callType, setCallType] = useState<CallType>('video');
  const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);

  // Initialize WebRTC
  useEffect(() => {
    webrtcClient.initialize({
      onIncomingCall: (data) => setIncomingCall(data),
      onCallAccepted: () => setShowVideoCall(true),
      onCallRejected: () => {
        setShowVideoCall(false);
        toast({ title: 'Call declined', type: 'info' });
      },
      onCallEnded: () => {
        setShowVideoCall(false);
        setIncomingCall(null);
        toast({ title: 'Call ended', type: 'info' });
      },
      onError: (err) => toast({ title: 'Call error', description: err.message, type: 'error' }),
    });
    return () => webrtcClient.destroy();
  }, [toast]);

  const handlePhoneCall = useCallback(async () => {
    if (selectedConversation) {
      try {
        setCallType('audio');
        setShowVideoCall(true);
        toast({ title: 'Initiating call', description: `Calling ${selectedConversation.participant.name}...`, type: 'info' });
        await webrtcClient.call(selectedConversation.participant.id, 'Provider', 'audio');
      } catch (err) {
        setShowVideoCall(false);
        toast({ 
          title: 'Call Failed', 
          description: err instanceof Error ? err.message : 'Unable to initiate call. Please check your connection.',
          type: 'error'
        });
      }
    }
  }, [selectedConversation, toast]);

  const handleVideoCall = useCallback(async () => {
    if (selectedConversation) {
      try {
        setCallType('video');
        setShowVideoCall(true);
        toast({ title: 'Starting video call', description: `Connecting to ${selectedConversation.participant.name}...`, type: 'info' });
        await webrtcClient.call(selectedConversation.participant.id, 'Provider', 'video');
      } catch (err) {
        setShowVideoCall(false);
        toast({ 
          title: 'Call Failed', 
          description: err instanceof Error ? err.message : 'Unable to start video call. Please check your connection.',
          type: 'error'
        });
      }
    }
  }, [selectedConversation, toast]);

  const handleAcceptIncomingCall = useCallback(async () => {
    if (incomingCall) {
      setCallType(incomingCall.callType);
      await webrtcClient.accept(incomingCall.callId, incomingCall.callerId, incomingCall.callType);
      setShowVideoCall(true);
      setIncomingCall(null);
    }
  }, [incomingCall]);

  const handleRejectIncomingCall = useCallback(() => {
    if (incomingCall) {
      webrtcClient.reject(incomingCall.callId, incomingCall.callerId);
      setIncomingCall(null);
    }
  }, [incomingCall]);

  const handleAttachFile = useCallback(() => {
    toast({ 
      title: 'Attach file', 
      description: 'File attachment feature coming soon',
      type: 'info'
    });
  }, [toast]);

  const handleViewPatient = useCallback(() => {
    if (selectedConversation?.participant.role === 'Patient') {
      router.push(`/provider/patients/${selectedConversation.participant.id}`);
    }
  }, [selectedConversation, router]);

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="w-80 shrink-0 border-r border-gray-200 dark:border-gray-800">
          <div className="border-b border-gray-200 p-4 dark:border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Messages
                {totalUnread > 0 && (
                  <Badge variant="danger" className="ml-2">{totalUnread}</Badge>
                )}
              </h2>
              <Button size="sm" variant="ghost" onClick={handleNewConversation}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="mt-3 flex gap-2">
              {(['all', 'patients', 'staff'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                    filterType === type
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                  )}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={cn(
                  'flex cursor-pointer items-center gap-3 border-b border-gray-100 p-4 transition-colors dark:border-gray-800',
                  selectedConversation?.id === conversation.id
                    ? 'bg-primary/5'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                )}
              >
                <div className="relative">
                  <div className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    conversation.participant.role === 'Patient'
                      ? conversation.participant.riskLevel === 'high'
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30'
                        : conversation.participant.riskLevel === 'moderate'
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30'
                        : 'bg-green-100 text-green-600 dark:bg-green-900/30'
                      : 'bg-primary/10 text-primary'
                  )}>
                    <User className="h-6 w-6" />
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      'font-medium truncate',
                      conversation.unreadCount > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    )}>
                      {conversation.participant.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{conversation.participant.role}</p>
                  <p className={cn(
                    'mt-1 truncate text-sm',
                    conversation.unreadCount > 0 ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                  )}>
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedConversation ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  selectedConversation.participant.role === 'Patient'
                    ? selectedConversation.participant.riskLevel === 'high'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-primary/10 text-primary'
                    : 'bg-primary/10 text-primary'
                )}>
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedConversation.participant.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{selectedConversation.participant.role}</p>
                    {selectedConversation.participant.riskLevel && (
                      <Badge variant={
                        selectedConversation.participant.riskLevel === 'high' ? 'danger' :
                        selectedConversation.participant.riskLevel === 'moderate' ? 'warning' : 'success'
                      }>
                        {selectedConversation.participant.riskLevel} risk
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" title="Start phone call" onClick={handlePhoneCall}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Start video call" onClick={handleVideoCall}>
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" title="More options" onClick={() => {}}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex',
                      message.senderId === 'provider' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[70%] rounded-2xl px-4 py-2',
                        message.senderId === 'provider'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      )}
                    >
                      <p>{message.content}</p>
                      <p
                        className={cn(
                          'mt-1 text-xs',
                          message.senderId === 'provider' ? 'text-white/70' : 'text-gray-500'
                        )}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" title="Attach file" onClick={handleAttachFile}>
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim() || sending}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {/* Video Call Modal */}
      {showVideoCall && selectedConversation && (
        <VideoCall
          userId={selectedConversation.participant.id}
          userName={selectedConversation.participant.name}
          onClose={() => {
            webrtcClient.end();
            setShowVideoCall(false);
          }}
        />
      )}

      {/* Incoming Call Modal */}
      {incomingCall && (
        <IncomingCallModal
          call={incomingCall}
          onAccept={handleAcceptIncomingCall}
          onReject={handleRejectIncomingCall}
        />
      )}
    </DashboardLayout>
  );
}
