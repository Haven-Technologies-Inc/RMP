'use client';

import { Phone, PhoneOff, Video } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IncomingCallData } from '@/lib/webrtc';

interface IncomingCallModalProps {
  call: IncomingCallData;
  onAccept: () => void;
  onReject: () => void;
}

export function IncomingCallModal({ call, onAccept, onReject }: IncomingCallModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-in fade-in zoom-in-95 duration-300">
        {/* Animated call icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center shadow-lg">
          <div className="animate-pulse">
            {call.callType === 'video' ? (
              <Video className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-blue-600 dark:text-blue-400" />
            ) : (
              <Phone className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-blue-600 dark:text-blue-400" />
            )}
          </div>
        </div>
        
        {/* Caller info */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-1 truncate px-2">
          {call.callerName}
        </h3>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-6 sm:mb-8">
          Incoming {call.callType} call...
        </p>
        
        {/* Call action buttons */}
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={onReject}
              className="rounded-full h-14 w-14 sm:h-16 sm:w-16 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 transition-transform hover:scale-105 active:scale-95"
              aria-label="Reject call"
            >
              <PhoneOff className="h-6 w-6 sm:h-7 sm:w-7" />
            </Button>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Decline</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={onAccept}
              className="rounded-full h-14 w-14 sm:h-16 sm:w-16 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/30 transition-transform hover:scale-105 active:scale-95"
              aria-label="Accept call"
            >
              <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
            </Button>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Accept</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomingCallModal;
