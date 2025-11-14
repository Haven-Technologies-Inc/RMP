import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="w-full px-4 py-6 bg-white" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <React.Fragment key={stepNumber}>
                {/* Step Circle */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10
                      ${isCompleted ? 'bg-[var(--success)]' : ''}
                      ${isCurrent ? 'bg-[var(--primary)] ring-4 ring-[var(--primary)]/20' : ''}
                      ${!isCompleted && !isCurrent ? 'bg-[var(--neutral-200)]' : ''}
                    `}
                    aria-label={`Step ${stepNumber}: ${step}`}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className={`${isCurrent || isCompleted ? 'text-white' : 'text-[var(--neutral-500)]'}`}>
                        {stepNumber}
                      </span>
                    )}
                  </div>
                  <span className={`mt-2 text-xs text-center hidden sm:block ${isCurrent ? 'text-[var(--primary)]' : 'text-[var(--neutral-600)]'}`}>
                    {step}
                  </span>
                </div>
                
                {/* Connecting Line */}
                {index < totalSteps - 1 && (
                  <div className="flex-1 h-1 mx-2 -mt-8 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[var(--neutral-200)]"></div>
                    <div
                      className="absolute top-0 left-0 h-full bg-[var(--success)] transition-all duration-500"
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* Mobile: Current Step Label */}
      <div className="sm:hidden text-center mt-3">
        <p className="text-sm text-[var(--primary)]">{steps[currentStep - 1]}</p>
      </div>
    </div>
  );
}
