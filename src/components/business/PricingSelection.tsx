import React, { useState } from 'react';
import { Check, Zap, TrendingUp, Building2, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../Button';
import { API_TIERS, APITier, APITierConfig } from '../../config/business-verification';

interface PricingSelectionProps {
  recommendedTier?: APITier;
  onSelectTier: (tier: APITier) => void;
  onBack: () => void;
}

export function PricingSelection({ recommendedTier, onSelectTier, onBack }: PricingSelectionProps) {
  const [selectedTier, setSelectedTier] = useState<APITier>(recommendedTier || 'professional');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const getTierIcon = (tierId: APITier) => {
    switch (tierId) {
      case 'sandbox': return Zap;
      case 'starter': return TrendingUp;
      case 'professional': return Sparkles;
      case 'enterprise': return Building2;
      case 'custom': return Sparkles;
      default: return Zap;
    }
  };

  const formatPrice = (tier: APITierConfig) => {
    if (tier.id === 'sandbox') return 'Free';
    if (tier.id === 'custom') return 'Custom';
    
    const price = billingCycle === 'annual' ? tier.monthlyPrice * 12 * 0.8 : tier.monthlyPrice;
    return `$${price.toLocaleString()}`;
  };

  const formatRequests = (count: number) => {
    if (count === -1) return 'Unlimited';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white">
        <div className="px-4 py-8 max-w-7xl mx-auto">
          <h1 className="text-white mb-3">Choose Your Plan</h1>
          <p className="text-white/90 text-lg m-0">
            Select the tier that matches your verification volume
          </p>

          {/* Billing Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-white text-[var(--primary)]' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md transition-all ${
                billingCycle === 'annual' 
                  ? 'bg-white text-[var(--primary)]' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Annual
              <span className="ml-2 px-2 py-0.5 bg-[var(--secondary)] text-white text-xs rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {API_TIERS.filter(t => t.id !== 'custom').map((tier) => {
            const Icon = getTierIcon(tier.id);
            const isSelected = selectedTier === tier.id;
            const isRecommended = tier.recommended || tier.id === recommendedTier;

            return (
              <div
                key={tier.id}
                className={`relative bg-white rounded-xl shadow-[var(--shadow-md)] p-6 transition-all cursor-pointer ${
                  isSelected 
                    ? 'ring-2 ring-[var(--primary)] shadow-[var(--shadow-lg)]' 
                    : 'hover:shadow-[var(--shadow-lg)]'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--secondary)] text-white text-xs rounded-full">
                    Recommended
                  </div>
                )}

                <div className={`w-12 h-12 ${
                  tier.id === 'sandbox' ? 'bg-gray-100 text-gray-600' :
                  tier.id === 'starter' ? 'bg-green-100 text-green-600' :
                  tier.id === 'professional' ? 'bg-purple-100 text-purple-600' :
                  'bg-blue-100 text-blue-600'
                } rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="mb-2">{tier.name}</h3>
                <p className="text-sm text-[var(--neutral-600)] mb-4 m-0">
                  {tier.description}
                </p>

                <div className="mb-4">
                  <div className="text-3xl mb-1">
                    {formatPrice(tier)}
                  </div>
                  {tier.monthlyPrice > 0 && (
                    <div className="text-sm text-[var(--neutral-600)]">
                      per {billingCycle === 'annual' ? 'year' : 'month'}
                    </div>
                  )}
                </div>

                <div className="mb-4 pb-4 border-b border-[var(--neutral-200)]">
                  <div className="text-sm mb-1">
                    <strong>{formatRequests(tier.requestsPerMonth)}</strong> verifications/month
                  </div>
                  <div className="text-xs text-[var(--neutral-600)]">
                    {tier.requestsPerSecond === -1 ? 'Unlimited' : tier.requestsPerSecond} requests/second
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 text-xs text-[var(--neutral-600)]">
                  <div>
                    <strong>Support:</strong> {tier.support}
                  </div>
                  <div>
                    <strong>SLA:</strong> {tier.sla}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Enterprise Section */}
        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-white mb-2">Need a Custom Solution?</h2>
              <p className="text-white/90 mb-4 m-0">
                For large enterprises, banks, and special requirements, we offer fully customized plans with:
              </p>
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Custom pricing and volume
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Dedicated infrastructure
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  On-premise deployment
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  White-label solutions
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Custom SLA & support
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Dedicated account team
                </li>
              </ul>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setSelectedTier('custom')}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6 mb-8">
          <h3 className="mb-4">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--neutral-200)]">
                  <th className="text-left py-3 px-2">Feature</th>
                  <th className="text-center py-3 px-2">Sandbox</th>
                  <th className="text-center py-3 px-2">Starter</th>
                  <th className="text-center py-3 px-2">Professional</th>
                  <th className="text-center py-3 px-2">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['All API Products', true, true, true, true],
                  ['Webhooks', false, true, true, true],
                  ['Dashboard Analytics', false, true, true, true],
                  ['Custom Webhooks', false, false, true, true],
                  ['Dedicated Account Manager', false, false, true, true],
                  ['24/7 Phone Support', false, false, false, true],
                  ['On-premise Deployment', false, false, false, true],
                  ['White-label Solution', false, false, false, true],
                ].map(([feature, ...values], index) => (
                  <tr key={index} className="border-b border-[var(--neutral-100)]">
                    <td className="py-3 px-2">{feature}</td>
                    {values.map((value, i) => (
                      <td key={i} className="text-center py-3 px-2">
                        {value ? (
                          <Check className="w-5 h-5 text-[var(--success)] mx-auto" />
                        ) : (
                          <span className="text-[var(--neutral-300)]">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button
            variant="primary"
            onClick={() => onSelectTier(selectedTier)}
            fullWidth
            iconRight={<ArrowRight className="w-5 h-5" />}
          >
            Continue with {API_TIERS.find(t => t.id === selectedTier)?.name}
          </Button>
        </div>

        {/* FAQ */}
        <div className="mt-8 bg-white rounded-xl shadow-[var(--shadow-sm)] p-6">
          <h4 className="mb-4">Frequently Asked Questions</h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="m-0"><strong>Can I change plans later?</strong></p>
              <p className="text-[var(--neutral-600)] mt-1 m-0">
                Yes, you can upgrade or downgrade at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <p className="m-0"><strong>What happens if I exceed my monthly limit?</strong></p>
              <p className="text-[var(--neutral-600)] mt-1 m-0">
                You'll be charged $0.01 per additional verification, or you can upgrade to a higher tier.
              </p>
            </div>
            <div>
              <p className="m-0"><strong>Is there a setup fee?</strong></p>
              <p className="text-[var(--neutral-600)] mt-1 m-0">
                No setup fees for any tier. Start using the API immediately after approval.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
