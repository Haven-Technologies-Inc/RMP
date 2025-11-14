import React, { useState } from 'react';
import { Check, X, Zap, Star, Crown } from 'lucide-react';
import { Button } from '../Button';
import { AnimatedSection } from './AnimatedSection';

const pricingPlans = [
  {
    name: 'Starter',
    icon: Zap,
    price: 'Free',
    period: 'Forever',
    description: 'Perfect for testing and small projects',
    features: [
      { name: '1,000 verifications/month', included: true },
      { name: 'Sandbox environment', included: true },
      { name: 'Basic identity verification', included: true },
      { name: '2 African countries', included: true },
      { name: 'Email support', included: true },
      { name: 'API documentation', included: true },
      { name: 'Biometric verification', included: false },
      { name: 'Financial data access', included: false },
      { name: 'Priority support', included: false },
      { name: 'Custom branding', included: false },
    ],
    cta: 'Start Free',
    popular: false,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Professional',
    icon: Star,
    price: '$99',
    period: '/month',
    description: 'For growing businesses and startups',
    features: [
      { name: '10,000 verifications/month', included: true },
      { name: 'Production environment', included: true },
      { name: 'All identity verification types', included: true },
      { name: '10+ African countries', included: true },
      { name: 'Priority email support', included: true },
      { name: 'SDKs & libraries', included: true },
      { name: 'Biometric verification', included: true },
      { name: 'Financial data access', included: true },
      { name: 'Webhooks', included: true },
      { name: 'Custom branding', included: false },
    ],
    cta: 'Get Started',
    popular: true,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 'Custom',
    period: 'Contact Sales',
    description: 'For large organizations with custom needs',
    features: [
      { name: 'Unlimited verifications', included: true },
      { name: 'Dedicated infrastructure', included: true },
      { name: 'All products & features', included: true },
      { name: 'All 54 African countries', included: true },
      { name: '24/7 phone & chat support', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Advanced biometrics', included: true },
      { name: 'Real-time data feeds', included: true },
      { name: 'SLA guarantees', included: true },
      { name: 'White-label solution', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-orange-500 to-red-500',
  },
];

const addOns = [
  { name: 'Additional 1,000 verifications', price: '$10' },
  { name: 'Premium support package', price: '$199/mo' },
  { name: 'Custom country integration', price: '$499 setup' },
  { name: 'Dedicated account manager', price: '$999/mo' },
];

export function PricingTable() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#1E293B] to-[#0A2540]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl lg:text-5xl mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto mb-8">
              Start for free, scale as you grow. No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1 bg-white/5 border border-white/10 rounded-xl">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Annual
                <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div
                  className={`bg-white/5 backdrop-blur-lg border rounded-2xl p-8 h-full flex flex-col relative ${
                    plan.popular
                      ? 'border-[#06B6D4] shadow-lg shadow-[#06B6D4]/20 scale-105'
                      : 'border-white/10'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] rounded-full text-white text-sm">
                      Most Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-white text-2xl mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-white text-5xl">{plan.price}</span>
                      <span className="text-white/60">{plan.period}</span>
                    </div>
                    {billingCycle === 'annual' && plan.price !== 'Free' && plan.price !== 'Custom' && (
                      <div className="text-green-400 text-sm mt-2">
                        Save ${(parseInt(plan.price.slice(1)) * 12 * 0.2).toFixed(0)}/year
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    fullWidth
                    className={
                      plan.popular
                        ? 'bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] mb-6'
                        : 'border-white/30 text-white hover:bg-white/10 mb-6'
                    }
                  >
                    {plan.cta}
                  </Button>

                  {/* Features */}
                  <div className="flex-1">
                    <div className="text-white/60 text-sm mb-3">Everything in {plan.name}:</div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-white/30 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? 'text-white/80' : 'text-white/40'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Add-ons */}
        <AnimatedSection animation="fade-up" delay={300}>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <h3 className="text-white text-2xl mb-6">Add-ons & Extras</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {addOns.map((addon, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
                >
                  <span className="text-white/80">{addon.name}</span>
                  <span className="text-[#06B6D4]">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <p className="text-white/70 mb-4">
            Have questions about pricing? Check our{' '}
            <a href="#faqs" className="text-[#06B6D4] hover:underline">
              FAQ
            </a>{' '}
            or{' '}
            <a href="#contact" className="text-[#06B6D4] hover:underline">
              contact sales
            </a>
            .
          </p>
          <div className="flex items-center justify-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#10B981]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#10B981]" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#10B981]" />
              <span>14-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
