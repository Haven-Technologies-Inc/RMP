import React from 'react';
import { Building2, Smartphone, CreditCard, TrendingUp, Shield, Code, Briefcase } from 'lucide-react';
import { BusinessType } from '../../config/business-verification';
import { Button } from '../Button';

interface BusinessTypeSelectionProps {
  onSelectType: (type: BusinessType) => void;
  onBack: () => void;
}

const businessTypes = [
  {
    id: 'bank' as BusinessType,
    name: 'Bank',
    description: 'Commercial, retail, or digital banks',
    icon: Building2,
    color: 'bg-blue-500',
    examples: 'Access Bank, GTBank, Equity Bank',
  },
  {
    id: 'fintech' as BusinessType,
    name: 'Fintech',
    description: 'Digital financial services and neobanks',
    icon: Smartphone,
    color: 'bg-purple-500',
    examples: 'PalmPay, Kuda, Chipper Cash',
  },
  {
    id: 'microfinance' as BusinessType,
    name: 'Microfinance',
    description: 'Microfinance banks and institutions',
    icon: TrendingUp,
    color: 'bg-green-500',
    examples: 'LAPO, Accion MFB',
  },
  {
    id: 'lender' as BusinessType,
    name: 'Lender',
    description: 'Lending platforms and credit providers',
    icon: CreditCard,
    color: 'bg-orange-500',
    examples: 'Carbon, FairMoney, Branch',
  },
  {
    id: 'insurance' as BusinessType,
    name: 'Insurance',
    description: 'Insurance companies and insurtech',
    icon: Shield,
    color: 'bg-indigo-500',
    examples: 'Old Mutual, AXA Mansard',
  },
  {
    id: 'telco' as BusinessType,
    name: 'Telco',
    description: 'Mobile network operators',
    icon: Smartphone,
    color: 'bg-pink-500',
    examples: 'MTN, Safaricom, Vodafone',
  },
  {
    id: 'developer' as BusinessType,
    name: 'Developer/Startup',
    description: 'Individual developers and early-stage startups',
    icon: Code,
    color: 'bg-cyan-500',
    examples: 'Building financial apps',
  },
  {
    id: 'other' as BusinessType,
    name: 'Other',
    description: 'Other business types',
    icon: Briefcase,
    color: 'bg-gray-500',
    examples: 'E-commerce, HR tech, etc.',
  },
];

export function BusinessTypeSelection({ onSelectType, onBack }: BusinessTypeSelectionProps) {
  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white">
        <div className="px-4 py-8 max-w-6xl mx-auto">
          <h1 className="text-white mb-3">What type of business are you?</h1>
          <p className="text-white/90 text-lg m-0">
            Help us understand your needs so we can tailor the onboarding experience
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {businessTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => onSelectType(type.id)}
                className="bg-white rounded-lg p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all text-left border-2 border-transparent hover:border-[var(--primary)] cursor-pointer"
              >
                <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2">{type.name}</h3>
                <p className="text-sm text-[var(--neutral-600)] mb-3 m-0">
                  {type.description}
                </p>
                <p className="text-xs text-[var(--neutral-500)] m-0">
                  e.g., {type.examples}
                </p>
              </button>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-[var(--shadow-md)] p-6">
          <h3 className="mb-4">Why we ask</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-[var(--primary)]" />
                <h4 className="m-0">Compliance</h4>
              </div>
              <p className="text-sm text-[var(--neutral-600)] m-0">
                Different business types have different regulatory requirements
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
                <h4 className="m-0">Pricing</h4>
              </div>
              <p className="text-sm text-[var(--neutral-600)] m-0">
                We recommend the right API tier based on your expected volume
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-[var(--primary)]" />
                <h4 className="m-0">Support</h4>
              </div>
              <p className="text-sm text-[var(--neutral-600)] m-0">
                Banks and enterprises get dedicated support teams
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
        </div>
      </main>
    </div>
  );
}
