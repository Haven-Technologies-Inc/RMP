'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { webrtcClient, CallType, IncomingCallData } from '@/lib/webrtc';
import { cn } from '@/lib/utils';

interface VideoCallProps {
  userId: string;
  userName: string;
  onClose?: () => void;
}

export function VideoCall({ userId, userName, onClose }: VideoCallProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');
  const [callType, setCallType] = useState<CallType>('video');
  const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    webrtcClient.initialize({
      onIncomingCall: (data) => {
        setIncomingCall(data);
        setCallType(data.callType);
        setStatus('incoming');
      },
      onCallAccepted: () => setStatus('connected'),
      onCallRejected: () => {
        setStatus('idle');
        setIncomingCall(null);
      },
      onCallEnded: () => {
        setStatus('idle');
        setIncomingCall(null);
        if (timerRef.current) clearInterval(timerRef.current);
        setCallDuration(0);
      },
      onRemoteStream: (stream) => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
      },
      onError: (err) => console.error('WebRTC Error:', err),
    });

    return () => webrtcClient.destroy();
  }, []);

  useEffect(() => {
    if (status === 'connected') {
      timerRef.current = setInterval(() => setCallDuration((d) => d + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status]);

  const setLocalStream = useCallback((stream: MediaStream) => {
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
  }, []);

  const startCall = async (type: CallType, targetId: string, targetName: string) => {
    setCallType(type);
    setStatus('calling');
    const stream = await webrtcClient.getMedia(type);
    setLocalStream(stream);
    await webrtcClient.call(targetId, userName, type);
  };

  const acceptCall = async () => {
    if (!incomingCall) return;
    const stream = await webrtcClient.getMedia(incomingCall.callType);
    setLocalStream(stream);
    await webrtcClient.accept(incomingCall.callId, incomingCall.callerId, incomingCall.callType);
    setStatus('connected');
  };

  const rejectCall = () => {
    if (incomingCall) webrtcClient.reject(incomingCall.callId, incomingCall.callerId);
    setStatus('idle');
    setIncomingCall(null);
  };

  const endCall = () => {
    webrtcClient.end();
    setStatus('idle');
    if (timerRef.current) clearInterval(timerRef.current);
    setCallDuration(0);
  };

  const toggleAudio = () => {
    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);
    webrtcClient.toggleAudio(newState);
  };

  const toggleVideo = () => {
    const newState = !isVideoEnabled;
    setIsVideoEnabled(newState);
    webrtcClient.toggleVideo(newState);
  };

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (status === 'idle') {
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <Button size="sm" variant="outline" onClick={() => startCall('audio', userId, userName)} className="w-full sm:w-auto">
          <Phone className="h-4 w-4 mr-1" /> Audio Call
        </Button>
        <Button size="sm" variant="outline" onClick={() => startCall('video', userId, userName)} className="w-full sm:w-auto">
          <Video className="h-4 w-4 mr-1" /> Video Call
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col safe-area-inset">
      {/* Header - responsive padding and text */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center text-white bg-gradient-to-b from-black/50 to-transparent">
        <div className="min-w-0 flex-1">
          <p className="text-base sm:text-lg md:text-xl font-semibold truncate">
            {incomingCall?.callerName || userName}
          </p>
          <p className="text-xs sm:text-sm text-slate-400">
            {status === 'calling' && 'Calling...'}
            {status === 'incoming' && 'Incoming call...'}
            {status === 'connected' && formatDuration(callDuration)}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose || endCall}
          className="ml-2 h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full hover:bg-white/10"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </Button>
      </div>

      {/* Video Area - responsive layout */}
      <div className="flex-1 relative overflow-hidden">
        {/* Remote Video - full screen */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient overlay for better control visibility */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        
        {/* Local Video (PiP) - responsive sizing */}
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className={cn(
            "absolute object-cover rounded-lg border-2 border-white/80 shadow-2xl transition-all duration-300",
            // Mobile: smaller, bottom-right with safe area consideration
            "bottom-24 right-3 w-24 h-32 sm:bottom-28 sm:right-4 sm:w-32 sm:h-24",
            // Tablet and desktop: larger
            "md:bottom-32 md:right-6 md:w-40 md:h-30 lg:w-48 lg:h-36",
            callType === 'audio' && "hidden"
          )}
        />
        
        {/* Audio call placeholder - responsive */}
        {callType === 'audio' && status === 'connected' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl animate-pulse">
                <Phone className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white" />
              </div>
              <p className="text-white/80 text-sm sm:text-base font-medium">Audio Call</p>
            </div>
          </div>
        )}
        
        {/* Calling/Incoming state overlay */}
        {(status === 'calling' || status === 'incoming') && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className={cn(
                "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-2xl",
                status === 'calling' ? "bg-gradient-to-br from-blue-500 to-blue-600 animate-pulse" : "bg-gradient-to-br from-green-500 to-green-600 animate-bounce"
              )}>
                {callType === 'video' ? (
                  <Video className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white" />
                ) : (
                  <Phone className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white" />
                )}
              </div>
              <div className="text-center">
                <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
                  {incomingCall?.callerName || userName}
                </p>
                <p className="text-white/60 text-sm sm:text-base mt-1">
                  {status === 'calling' ? 'Calling...' : 'Incoming call...'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls - responsive sizing and spacing */}
      <div className="px-4 py-4 sm:px-6 sm:py-6 md:py-8 flex justify-center items-center gap-3 sm:gap-4 md:gap-6 bg-gradient-to-t from-black/50 to-transparent">
        {status === 'incoming' ? (
          <>
            <Button 
              onClick={rejectCall} 
              className="rounded-full h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 transition-transform hover:scale-105 active:scale-95"
            >
              <PhoneOff className="h-6 w-6 sm:h-7 sm:w-7" />
            </Button>
            <Button 
              onClick={acceptCall} 
              className="rounded-full h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/30 transition-transform hover:scale-105 active:scale-95"
            >
              <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={toggleAudio}
              className={cn(
                "rounded-full h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 transition-all duration-200 hover:scale-105 active:scale-95",
                !isAudioEnabled ? "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30" : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
              )}
              variant="ghost"
            >
              {isAudioEnabled ? <Mic className="h-5 w-5 sm:h-6 sm:w-6 text-white" /> : <MicOff className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
            </Button>
            {callType === 'video' && (
              <Button
                onClick={toggleVideo}
                className={cn(
                  "rounded-full h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 transition-all duration-200 hover:scale-105 active:scale-95",
                  !isVideoEnabled ? "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30" : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                )}
                variant="ghost"
              >
                {isVideoEnabled ? <Video className="h-5 w-5 sm:h-6 sm:w-6 text-white" /> : <VideoOff className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
              </Button>
            )}
            <Button 
              onClick={endCall} 
              className="rounded-full h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 transition-transform hover:scale-105 active:scale-95"
            >
              <PhoneOff className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoCall;
