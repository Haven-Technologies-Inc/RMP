import React, { useState, useEffect } from 'react';
import { Scan, User, Eye, RotateCcw, CheckCircle2, X } from 'lucide-react';
import { Button } from '../Button';

interface BiometricVerificationProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function BiometricVerification({ onNext, onBack, onSkip }: BiometricVerificationProps) {
  const [currentStep, setCurrentStep] = useState<'ready' | 'scanning' | 'complete'>('ready');
  const [progress, setProgress] = useState(0);
  const [instruction, setInstruction] = useState('Position your face in the circle');

  const instructions = [
    'Position your face in the circle',
    'Please blink naturally',
    'Turn your head slowly to the left',
    'Turn your head slowly to the right',
    'Hold still...',
  ];

  useEffect(() => {
    if (currentStep === 'scanning') {
      let currentInstruction = 0;
      let progressValue = 0;

      const interval = setInterval(() => {
        progressValue += 20;
        setProgress(progressValue);

        if (currentInstruction < instructions.length - 1) {
          currentInstruction++;
          setInstruction(instructions[currentInstruction]);
        }

        if (progressValue >= 100) {
          clearInterval(interval);
          setCurrentStep('complete');
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const handleStart = () => {
    setCurrentStep('scanning');
    setProgress(0);
    setInstruction(instructions[0]);
  };

  const handleRetry = () => {
    setCurrentStep('ready');
    setProgress(0);
    setInstruction(instructions[0]);
  };

  return (
    <div className="min-h-screen bg-[var(--neutral-50)] flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="text-[var(--primary)] flex items-center gap-2 mb-2"
            aria-label="Go back to previous step"
          >
            <X className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h2 className="m-0">Biometric Verification</h2>
          <p className="text-sm text-[var(--neutral-600)] mt-1">
            We'll verify it's really you with a quick face scan
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full flex flex-col">
        {currentStep === 'ready' && (
          <div className="flex-1 flex flex-col">
            {/* Instructions */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-[var(--primary)]" />
                Before We Begin
              </h3>
              <ul className="space-y-3 pl-5">
                <li>Remove glasses and face coverings</li>
                <li>Ensure you're in a well-lit area</li>
                <li>Hold your device at eye level</li>
                <li>Follow the on-screen instructions</li>
              </ul>
            </div>

            {/* Preview Area */}
            <div className="relative bg-[var(--neutral-900)] rounded-xl aspect-[3/4] max-w-md mx-auto w-full mb-6 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 rounded-full border-4 border-dashed border-white/40 flex items-center justify-center">
                  <User className="w-32 h-32 text-white/60" />
                  <div className="absolute -bottom-12 bg-white/90 px-4 py-2 rounded text-sm">
                    Position your face here
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleStart}
              className="flex items-center justify-center gap-2"
            >
              <Scan className="w-5 h-5" />
              Start Face Scan
            </Button>
          </div>
        )}

        {currentStep === 'scanning' && (
          <div className="flex-1 flex flex-col">
            {/* Scanning Area */}
            <div className="relative bg-[var(--neutral-900)] rounded-xl aspect-[3/4] max-w-md mx-auto w-full mb-6 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 rounded-full border-4 border-[var(--primary)] flex items-center justify-center">
                  {/* Animated Scanner */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-b from-[var(--primary)]/30 to-transparent transition-all duration-1000"
                      style={{ transform: `translateY(${progress}%)` }}
                    ></div>
                  </div>
                  
                  <User className="w-32 h-32 text-white/80" />
                  
                  {/* Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="48%"
                      fill="none"
                      stroke="var(--secondary)"
                      strokeWidth="4"
                      strokeDasharray={`${progress * 8.04} 804`}
                      className="transition-all duration-500"
                    />
                  </svg>
                </div>
              </div>

              {/* Instruction Overlay */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <div className="inline-block bg-white/95 px-6 py-3 rounded-full">
                  <p className="m-0 text-[var(--primary)]">{instruction}</p>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="bg-white rounded-xl p-4 shadow-[var(--shadow-sm)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--neutral-600)]">Scanning Progress</span>
                <span className="text-sm text-[var(--primary)]">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-[var(--neutral-200)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--primary)] transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'complete' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Success Animation */}
            <div className="w-24 h-24 bg-[var(--success)] rounded-full flex items-center justify-center mb-6 animate-scale-in">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>

            <h2 className="mb-2">Verification Successful!</h2>
            <p className="text-[var(--neutral-600)] mb-8 max-w-md">
              Your face has been successfully verified and matches your Ghana Card
            </p>

            <div className="w-full space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={onNext}
              >
                Continue
              </Button>
              <Button
                variant="tertiary"
                size="md"
                fullWidth
                onClick={handleRetry}
                className="flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Scan Again
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Skip Verification Button */}
      {onSkip && currentStep === 'ready' && (
        <div className="px-4 py-4 bg-white border-t border-[var(--neutral-200)]">
          <div className="max-w-2xl mx-auto">
            <Button
              variant="tertiary"
              size="md"
              fullWidth
              onClick={onSkip}
            >
              Skip Verification (Demo Mode)
            </Button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}