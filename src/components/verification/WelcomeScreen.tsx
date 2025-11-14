import React from 'react';
import { Shield, CreditCard, Smartphone, Clock, CheckCircle2, ChevronRight, Code } from 'lucide-react';
import { Button } from '../Button';
import { LanguageSelector } from '../LanguageSelector';

interface WelcomeScreenProps {
  onStart: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

export function WelcomeScreen({ onStart, language, onLanguageChange }: WelcomeScreenProps) {
  const requirements = [
    { icon: CreditCard, text: 'Valid Ghana Card (National ID)', color: 'var(--primary)' },
    { icon: Smartphone, text: 'Active phone number registered to you', color: 'var(--primary)' },
    { icon: Clock, text: 'Approximately 3-5 minutes', color: 'var(--secondary)' },
  ];

  const securityFeatures = [
    'Bank-level encryption protects your data',
    'Your information is never shared without consent',
    'Verified by Bank of Ghana standards',
  ];

  const content = {
    startButton: 'Start Verification',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--neutral-50)] to-white">
      {/* Header */}
      <header className="px-4 py-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-[var(--secondary)]" />
          </div>
          <div>
            <h4 className="text-[var(--primary)] m-0">ReshADX</h4>
            <p className="text-xs text-[var(--neutral-600)] m-0">Africa Open Data Exchange</p>
          </div>
        </div>
        <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--primary)] rounded-full mb-4">
            <Shield className="w-10 h-10 text-[var(--secondary)]" />
          </div>
          <h1 className="mb-3">Verify Your Identity</h1>
          <p className="text-lg text-[var(--neutral-600)]">
            Complete your identity verification to access secure financial services across Ghana
          </p>
        </div>

        {/* Requirements Card */}
        <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-md)] mb-6">
          <h3 className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
            What You'll Need
          </h3>
          <div className="space-y-4">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--neutral-100)] flex items-center justify-center flex-shrink-0">
                  <req.icon className="w-5 h-5" style={{ color: req.color }} />
                </div>
                <p className="m-0 pt-2">{req.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Assurance */}
        <div className="bg-[var(--primary)] rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-[var(--secondary)]" />
            <h3 className="m-0 text-white">Your Security is Our Priority</h3>
          </div>
          <ul className="space-y-2 m-0 pl-5">
            {securityFeatures.map((feature, index) => (
              <li key={index} className="text-white/90">{feature}</li>
            ))}
          </ul>
        </div>

        {/* Start Button */}
        <div className="space-y-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onStart}
            fullWidth
          >
            {content.startButton}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.hash = 'api-playground'}
            fullWidth
          >
            <Code className="w-5 h-5 mr-2" />
            Try API Playground
          </Button>

          <Button
            variant="tertiary"
            size="lg"
            onClick={() => window.location.hash = 'products'}
            fullWidth
          >
            View Available Products
          </Button>

          <Button
            variant="tertiary"
            size="lg"
            onClick={() => window.location.hash = 'african-features'}
            fullWidth
          >
            🌍 Africa-Ready Features
          </Button>

          <Button
            variant="tertiary"
            size="lg"
            onClick={() => window.location.hash = 'advanced-endpoints'}
            fullWidth
          >
            ✨ Advanced API Endpoints
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-center mt-4 text-sm text-[var(--neutral-600)]">
          Need help? Contact our support team at{' '}
          <a href="tel:+233501234567" className="text-[var(--primary)] hover:underline">
            0501 234 567
          </a>
        </p>
      </main>
    </div>
  );
}