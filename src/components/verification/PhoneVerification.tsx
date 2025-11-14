import React, { useState, useEffect } from 'react';
import { Smartphone, MessageSquare, Phone, RefreshCw, AlertCircle, X } from 'lucide-react';
import { Button } from '../Button';

interface PhoneVerificationProps {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function PhoneVerification({ onNext, onBack, onSkip }: PhoneVerificationProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'ussd' | 'call' | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (otpSent && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpSent, timeLeft]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError('');
    }
  };

  const handleSendOTP = (method: 'sms' | 'ussd' | 'call') => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setVerificationMethod(method);
    setOtpSent(true);
    setTimeLeft(120);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-verify when all digits entered
    if (index === 5 && value) {
      const otpValue = [...newOtp.slice(0, 5), value].join('');
      if (otpValue.length === 6) {
        handleVerifyOTP(otpValue);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = (otpValue: string) => {
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      onNext();
    }, 1500);
  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(120);
    setError('');
    // Simulate resending
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          <h2 className="m-0">Verify Phone Number</h2>
          <p className="text-sm text-[var(--neutral-600)] mt-1">
            Confirm your registered phone number
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        {!otpSent ? (
          <>
            {/* Phone Number Input */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-[var(--shadow-sm)]">
              <label htmlFor="phone-number" className="block mb-2 text-sm text-[var(--neutral-700)]">
                Phone Number
              </label>
              <div className="flex items-center gap-2 p-3 border-2 border-[var(--neutral-300)] rounded-lg focus-within:border-[var(--primary)] transition-colors">
                <span className="text-[var(--neutral-600)]">+233</span>
                <input
                  id="phone-number"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="501234567"
                  className="flex-1 outline-none bg-transparent"
                  aria-label="Enter your phone number"
                  aria-invalid={!!error}
                  aria-describedby={error ? "phone-error" : undefined}
                />
              </div>
              {error && (
                <div id="phone-error" className="flex items-center gap-2 mt-2 text-sm text-[var(--error)]" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Verification Methods */}
            <div className="space-y-3">
              <h3 className="mb-4">Choose Verification Method</h3>
              
              <button
                onClick={() => handleSendOTP('sms')}
                className="w-full bg-white rounded-xl p-4 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow flex items-center gap-4 text-left"
                disabled={phoneNumber.length !== 10}
                aria-label="Verify via SMS"
              >
                <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div className="flex-1">
                  <h4 className="m-0 mb-1">SMS Verification</h4>
                  <p className="text-sm text-[var(--neutral-600)] m-0">
                    Receive a 6-digit code via text message
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleSendOTP('ussd')}
                className="w-full bg-white rounded-xl p-4 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow flex items-center gap-4 text-left"
                disabled={phoneNumber.length !== 10}
                aria-label="Verify via USSD"
              >
                <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-[var(--secondary)]" />
                </div>
                <div className="flex-1">
                  <h4 className="m-0 mb-1">USSD Code</h4>
                  <p className="text-sm text-[var(--neutral-600)] m-0">
                    Dial a USSD code to verify instantly
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleSendOTP('call')}
                className="w-full bg-white rounded-xl p-4 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow flex items-center gap-4 text-left"
                disabled={phoneNumber.length !== 10}
                aria-label="Verify via Phone Call"
              >
                <div className="w-12 h-12 bg-[var(--success)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[var(--success)]" />
                </div>
                <div className="flex-1">
                  <h4 className="m-0 mb-1">Phone Call</h4>
                  <p className="text-sm text-[var(--neutral-600)] m-0">
                    Receive an automated call with your code
                  </p>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* OTP Sent Confirmation */}
            <div className="bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-xl p-4 mb-6 flex items-start gap-3">
              <div className="w-10 h-10 bg-[var(--success)] rounded-full flex items-center justify-center flex-shrink-0">
                {verificationMethod === 'sms' && <MessageSquare className="w-5 h-5 text-white" />}
                {verificationMethod === 'ussd' && <Smartphone className="w-5 h-5 text-white" />}
                {verificationMethod === 'call' && <Phone className="w-5 h-5 text-white" />}
              </div>
              <div className="flex-1">
                <h4 className="m-0 mb-1">Code Sent!</h4>
                <p className="text-sm text-[var(--neutral-700)] m-0">
                  We've sent a 6-digit code to +233 {phoneNumber}
                </p>
              </div>
            </div>

            {/* OTP Input */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-4 text-center">Enter Verification Code</h3>
              <div className="flex gap-2 justify-center mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 text-center border-2 border-[var(--neutral-300)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors"
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="text-center">
                <p className="text-sm text-[var(--neutral-600)]">
                  Code expires in{' '}
                  <span className="text-[var(--primary)]">{formatTime(timeLeft)}</span>
                </p>
              </div>
            </div>

            {/* Resend Options */}
            <div className="text-center">
              <p className="text-sm text-[var(--neutral-600)] mb-3">Didn't receive the code?</p>
              <Button
                variant="tertiary"
                size="md"
                onClick={handleResendOTP}
                disabled={timeLeft > 60}
                className="flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                Resend Code
              </Button>
            </div>

            {/* Loading Overlay */}
            {isVerifying && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="m-0">Verifying code...</p>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Skip Verification Button */}
      {onSkip && !otpSent && (
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