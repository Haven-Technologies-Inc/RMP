import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle2, HelpCircle, X } from 'lucide-react';
import { Button } from '../Button';

interface DocumentCaptureProps {
  onNext: (image: string) => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function DocumentCapture({ onNext, onBack, onSkip }: DocumentCaptureProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [imageQuality, setImageQuality] = useState<'good' | 'poor' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCapturedImage(result);
        // Simulate quality check
        setTimeout(() => {
          setImageQuality('good');
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    fileInputRef.current?.click();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setImageQuality(null);
  };

  const handleContinue = () => {
    if (capturedImage) {
      onNext(capturedImage);
    }
  };

  const tips = [
    'Ensure all corners of your Ghana Card are visible',
    'Place card on a dark, plain background',
    'Avoid glare and shadows',
    'Make sure text is clear and readable',
    'Keep the card flat and straight',
  ];

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
          <h2 className="m-0">Capture Your Ghana Card</h2>
          <p className="text-sm text-[var(--neutral-600)] mt-1">
            We'll verify your identity using your national ID
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        {!capturedImage ? (
          <>
            {/* Camera Preview Area */}
            <div className="relative bg-[var(--neutral-900)] rounded-xl overflow-hidden aspect-[3/2] mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Card Outline Guide */}
                <div className="relative w-11/12 max-w-md aspect-[1.586/1] border-2 border-dashed border-white/60 rounded-lg">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded text-sm whitespace-nowrap">
                    Align your Ghana Card here
                  </div>
                  {/* Corner Guides */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[var(--secondary)]"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[var(--secondary)]"></div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[var(--secondary)]"></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[var(--secondary)]"></div>
                </div>
              </div>
            </div>

            {/* Capture Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleCapture}
                className="flex items-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Capture Photo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleCapture}
                className="flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload Ghana Card photo"
            />
          </>
        ) : (
          <>
            {/* Captured Image Preview */}
            <div className="relative bg-white rounded-xl overflow-hidden mb-4 shadow-[var(--shadow-md)]">
              <img src={capturedImage} alt="Captured Ghana Card" className="w-full h-auto" />
              
              {/* Quality Indicator */}
              {imageQuality && (
                <div className={`absolute top-4 right-4 px-3 py-2 rounded-lg flex items-center gap-2 ${
                  imageQuality === 'good' 
                    ? 'bg-[var(--success)] text-white' 
                    : 'bg-[var(--warning)] text-white'
                }`}>
                  {imageQuality === 'good' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm">Good Quality</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">Low Quality</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleRetake}
                className="flex-1"
              >
                Retake
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleContinue}
                disabled={imageQuality !== 'good'}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {/* Help Section */}
        <div className="mt-6">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 text-[var(--primary)] w-full justify-center py-2"
            aria-expanded={showHelp}
          >
            <HelpCircle className="w-5 h-5" />
            <span>How to take a good photo</span>
          </button>

          {showHelp && (
            <div className="mt-4 bg-white rounded-xl p-4 shadow-[var(--shadow-sm)]">
              <h4 className="mb-3 flex items-center gap-2">
                <Camera className="w-5 h-5 text-[var(--primary)]" />
                Photo Tips
              </h4>
              <ul className="space-y-2 pl-5">
                {tips.map((tip, index) => (
                  <li key={index} className="text-sm text-[var(--neutral-700)]">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Skip Verification Button */}
      {onSkip && (
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
    </div>
  );
}