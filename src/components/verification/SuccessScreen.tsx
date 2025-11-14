import React from 'react';
import { CheckCircle2, Shield, CreditCard, Smartphone, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../Button';

interface SuccessScreenProps {
  onComplete: () => void;
}

export function SuccessScreen({ onComplete }: SuccessScreenProps) {
  const verifiedElements = [
    { icon: CreditCard, label: 'Ghana Card Verified', color: 'var(--success)' },
    { icon: Shield, label: 'Biometric Confirmed', color: 'var(--success)' },
    { icon: Smartphone, label: 'Phone Number Verified', color: 'var(--success)' },
  ];

  const securityTips = [
    {
      icon: Lock,
      title: 'Keep Your Data Secure',
      description: 'Never share your verification codes or biometric data with anyone',
    },
    {
      icon: Shield,
      title: 'Monitor Your Activity',
      description: 'Regularly check which services have access to your data',
    },
    {
      icon: CreditCard,
      title: 'Update Your Information',
      description: 'Keep your phone number and Ghana Card details current',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--success)]/5 to-white">
      {/* Header */}
      <div className="px-4 py-6 text-center">
        <div className="w-24 h-24 bg-[var(--success)] rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in shadow-[var(--shadow-lg)]">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h1 className="mb-2 text-[var(--success)]">Verification Complete!</h1>
        <p className="text-lg text-[var(--neutral-700)]">
          Your identity has been successfully verified
        </p>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-2xl mx-auto">
        {/* Verified Elements */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-[var(--shadow-md)]">
          <h3 className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
            Identity Elements Verified
          </h3>
          <div className="space-y-3">
            {verifiedElements.map((element, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-[var(--success)]/5 rounded-lg animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-[var(--shadow-sm)]">
                  <element.icon className="w-5 h-5" style={{ color: element.color }} />
                </div>
                <div className="flex-1">
                  <p className="m-0 text-[var(--neutral-800)]">{element.label}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Verification Summary */}
        <div className="bg-[var(--primary)] text-white rounded-xl p-6 mb-6">
          <h3 className="mb-3 text-white">Your Verification Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-white/20">
              <span className="text-white/80">Name</span>
              <span>Kwame Mensah</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/20">
              <span className="text-white/80">Ghana Card No.</span>
              <span>GHA-XXXXXXXXX-X</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/20">
              <span className="text-white/80">Phone Number</span>
              <span>+233 50 123 4567</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-white/80">Verified On</span>
              <span>{new Date().toLocaleDateString('en-GB')}</span>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-[var(--shadow-sm)]">
          <h3 className="mb-4">Security Tips for Your Account</h3>
          <div className="space-y-4">
            {securityTips.map((tip, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <tip.icon className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="m-0 mb-1">{tip.title}</h4>
                  <p className="text-sm text-[var(--neutral-600)] m-0">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-[var(--secondary)]/10 to-[var(--primary)]/10 rounded-xl p-6 mb-6 border-2 border-[var(--secondary)]/20">
          <h3 className="mb-3">What's Next?</h3>
          <ul className="space-y-2 pl-5">
            <li>Link your bank accounts and mobile money wallets</li>
            <li>Manage consent for financial services</li>
            <li>Access verified financial data securely</li>
            <li>Monitor who has access to your information</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onComplete}
            className="flex items-center justify-center gap-2"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="md"
            fullWidth
          >
            Download Verification Certificate
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-center mt-6 text-sm text-[var(--neutral-600)]">
          Questions about your verification?{' '}
          <a href="#" className="text-[var(--primary)] hover:underline">
            Contact Support
          </a>
        </p>
      </main>

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
        @keyframes slide-in {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}