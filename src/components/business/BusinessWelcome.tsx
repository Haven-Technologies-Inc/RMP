import React from 'react';
import { Building2, Zap, Shield, Globe, Code, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Button } from '../Button';

interface BusinessWelcomeProps {
  onStartBusiness: () => void;
  onViewIndividual: () => void;
}

export function BusinessWelcome({ onStartBusiness, onViewIndividual }: BusinessWelcomeProps) {
  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-[var(--primary)] via-[var(--primary-light)] to-[var(--secondary)] text-white">
        <div className="px-4 py-16 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">For Banks, Fintechs & Developers</span>
            </div>
            
            <h1 className="text-white text-5xl mb-4">
              Build with ReshADX
            </h1>
            <p className="text-white/90 text-xl mb-8 m-0">
              Africa's most comprehensive financial data infrastructure platform.
              Verify identities, access financial data, and build compliant products across 10+ African countries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={onStartBusiness}
              >
                Get API Access
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onViewIndividual}
                className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20"
              >
                Individual Verification →
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Free sandbox access
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Setup in 5 minutes
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '10+', label: 'African Countries', icon: Globe },
            { value: '125+', label: 'API Endpoints', icon: Code },
            { value: '97%', label: 'Success Rate', icon: TrendingUp },
            { value: '24/7', label: 'Support', icon: Users },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-[var(--shadow-sm)] p-6 text-center">
                <Icon className="w-8 h-8 text-[var(--primary)] mx-auto mb-3" />
                <div className="text-3xl mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--neutral-600)]">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-3">Everything you need to build in Africa</h2>
          <p className="text-lg text-[var(--neutral-600)] m-0">
            One API. Multiple countries. Endless possibilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-[var(--shadow-md)] p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mb-3">Identity Verification</h3>
            <p className="text-[var(--neutral-600)] mb-4 m-0">
              Real-time verification with government databases across Africa
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                Ghana Card, NIN, BVN, National IDs
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                Biometric verification
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                Phone & address validation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                KYC compliance automation
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-[var(--shadow-md)] p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="mb-3">Financial Data Access</h3>
            <p className="text-[var(--neutral-600)] mb-4 m-0">
              Connect to 50+ banks and 25+ mobile money providers
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                Real-time account balances
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                Transaction history & categorization
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                Income & employment verification
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                Credit scoring & affordability
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-[var(--shadow-md)] p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="mb-3">Developer Experience</h3>
            <p className="text-[var(--neutral-600)] mb-4 m-0">
              Built for developers, loved by businesses
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                RESTful APIs with SDKs
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                Webhooks for real-time events
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                Comprehensive documentation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                Sandbox environment for testing
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-3">Trusted by leading African companies</h2>
            <p className="text-lg text-[var(--neutral-600)] m-0">
              Power your use case with ReshADX
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Digital Lending',
                description: 'Instant credit decisioning with verified income and identity',
                icon: '💰',
              },
              {
                title: 'Neobanks',
                description: 'Compliant KYC and account aggregation for digital banks',
                icon: '🏦',
              },
              {
                title: 'HR & Payroll',
                description: 'Employment and income verification for background checks',
                icon: '👥',
              },
              {
                title: 'Insurance',
                description: 'Underwriting and claims with verified financial data',
                icon: '🛡️',
              },
            ].map((useCase, index) => (
              <div key={index} className="bg-[var(--neutral-50)] rounded-lg p-6">
                <div className="text-4xl mb-3">{useCase.icon}</div>
                <h4 className="mb-2">{useCase.title}</h4>
                <p className="text-sm text-[var(--neutral-600)] m-0">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-4">Ready to get started?</h2>
          <p className="text-white/90 text-lg mb-8 m-0">
            Join 100+ companies building the future of African fintech
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={onStartBusiness}
          >
            Start Building Now
          </Button>
          <p className="text-white/70 text-sm mt-4 m-0">
            Free sandbox • No credit card required • 5 minute setup
          </p>
        </div>
      </section>
    </div>
  );
}
