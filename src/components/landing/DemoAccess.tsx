import React, { useState } from 'react';
import { Building2, User, Copy, Check, ArrowRight, Lock, Code, Smartphone, Shield, Zap, Crown, Database, BarChart, Users } from 'lucide-react';
import { Button } from '../Button';
import { AnimatedSection } from './AnimatedSection';
import { DemoLoginModal } from './DemoLoginModal';

interface DemoAccessProps {
  onBusinessDashboard: () => void;
  onIndividualDashboard: () => void;
  onBusinessDemoLogin?: () => void;
  onIndividualDemoLogin?: () => void;
  onAdminDemoLogin?: () => void;
}

export function DemoAccess({ onBusinessDashboard, onIndividualDashboard, onBusinessDemoLogin, onIndividualDemoLogin, onAdminDemoLogin }: DemoAccessProps) {
  const [copiedBusiness, setCopiedBusiness] = useState(false);
  const [copiedIndividual, setCopiedIndividual] = useState(false);
  const [copiedAdmin, setCopiedAdmin] = useState(false);
  const [showBusinessLogin, setShowBusinessLogin] = useState(false);
  const [showIndividualLogin, setShowIndividualLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const copyCredentials = (type: 'business' | 'individual' | 'admin') => {
    const credentials = 
      type === 'business' ? 'Email: demo@business.reshadx.com\nPassword: BusinessDemo2024!' :
      type === 'admin' ? 'Email: admin@reshadx.com\nPassword: AdminDemo2024!' :
      'Phone: +233 50 123 4567\nOTP: 123456';
    
    // Fallback copy method for when Clipboard API is blocked
    const fallbackCopy = (text: string) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        textArea.remove();
        return true;
      } catch (err) {
        console.error('Fallback copy failed:', err);
        textArea.remove();
        return false;
      }
    };
    
    // Try modern Clipboard API first, then fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(credentials)
        .then(() => {
          if (type === 'business') {
            setCopiedBusiness(true);
            setTimeout(() => setCopiedBusiness(false), 2000);
          } else if (type === 'admin') {
            setCopiedAdmin(true);
            setTimeout(() => setCopiedAdmin(false), 2000);
          } else {
            setCopiedIndividual(true);
            setTimeout(() => setCopiedIndividual(false), 2000);
          }
        })
        .catch(() => {
          // Clipboard API failed, use fallback
          const success = fallbackCopy(credentials);
          if (success) {
            if (type === 'business') {
              setCopiedBusiness(true);
              setTimeout(() => setCopiedBusiness(false), 2000);
            } else if (type === 'admin') {
              setCopiedAdmin(true);
              setTimeout(() => setCopiedAdmin(false), 2000);
            } else {
              setCopiedIndividual(true);
              setTimeout(() => setCopiedIndividual(false), 2000);
            }
          }
        });
    } else {
      // Clipboard API not available, use fallback directly
      const success = fallbackCopy(credentials);
      if (success) {
        if (type === 'business') {
          setCopiedBusiness(true);
          setTimeout(() => setCopiedBusiness(false), 2000);
        } else if (type === 'admin') {
          setCopiedAdmin(true);
          setTimeout(() => setCopiedAdmin(false), 2000);
        } else {
          setCopiedIndividual(true);
          setTimeout(() => setCopiedIndividual(false), 2000);
        }
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0A2540] to-[#1E293B]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B981]/20 to-[#06B6D4]/20 border border-[#10B981]/30 rounded-full mb-6">
              <Shield className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm text-white">Try Before You Buy</span>
            </div>
            <h2 className="text-white text-4xl lg:text-5xl mb-4">
              Two Portals, Two Experiences
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto mb-8">
              ReshADX has separate portals for businesses (B2B) and individuals (B2C). 
              Try both demo accounts to see how each works.
            </p>
            
            {/* Portal Distinction */}
            <div className="max-w-4xl mx-auto bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-2xl p-6 mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-[#06B6D4]" />
                    <h4 className="text-white">Business Portal (B2B)</h4>
                  </div>
                  <p className="text-white/70 text-sm">
                    For companies integrating ReshADX APIs into their products. 
                    Access API keys, manage integrations, view analytics, and configure webhooks.
                  </p>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-[#7C3AED]" />
                    <h4 className="text-white">Individual Portal (B2C)</h4>
                  </div>
                  <p className="text-white/70 text-sm">
                    For end-users verifying their identity when using apps that integrate ReshADX. 
                    Complete KYC, link bank accounts, and manage data consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Business Demo */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 h-full hover:border-[#06B6D4]/50 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-[#06B6D4]/20 border border-[#06B6D4]/30 rounded-full text-[#06B6D4] text-xs">
                  B2B Portal
                </span>
              </div>

              <h3 className="text-white text-2xl mb-2">Business Demo Access</h3>
              <p className="text-white/70 mb-6">
                For developers and businesses integrating ReshADX APIs
              </p>

              {/* Demo Credentials */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/60 text-sm">Demo Credentials</span>
                  <button
                    onClick={() => copyCredentials('business')}
                    className="flex items-center gap-2 text-[#06B6D4] text-sm hover:underline"
                  >
                    {copiedBusiness ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-white/60">Email:</span>{' '}
                    <span className="text-[#06B6D4]">demo@business.reshadx.com</span>
                  </div>
                  <div>
                    <span className="text-white/60">Password:</span>{' '}
                    <span className="text-[#06B6D4]">BusinessDemo2024!</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-white mb-3 text-sm">What You'll See:</h4>
                <ul className="space-y-2">
                  {[
                    { icon: Code, text: 'API Dashboard with test & live keys' },
                    { icon: Shield, text: 'Integration settings & webhooks' },
                    { icon: ArrowRight, text: 'Real-time analytics & logs' },
                    { icon: Lock, text: 'Team management & permissions' },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <li key={idx} className="flex items-center gap-3 text-white/70 text-sm">
                        <Icon className="w-4 h-4 text-[#06B6D4] flex-shrink-0" />
                        {item.text}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* CTA */}
              <Button
                variant="primary"
                fullWidth
                className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2]"
                iconRight={<ArrowRight className="w-5 h-5" />}
                onClick={() => setShowBusinessLogin(true)}
              >
                Access Business Demo
              </Button>

              <p className="text-white/50 text-xs text-center mt-4">
                Full access to sandbox environment with mock data
              </p>
            </div>
          </AnimatedSection>

          {/* Individual Demo */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 h-full hover:border-[#7C3AED]/50 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-full text-[#7C3AED] text-xs">
                  B2C Portal
                </span>
              </div>

              <h3 className="text-white text-2xl mb-2">Individual Demo Access</h3>
              <p className="text-white/70 mb-6">
                For end-users completing identity verification
              </p>

              {/* Demo Credentials */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/60 text-sm">Demo Credentials</span>
                  <button
                    onClick={() => copyCredentials('individual')}
                    className="flex items-center gap-2 text-[#7C3AED] text-sm hover:underline"
                  >
                    {copiedIndividual ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-white/60">Phone:</span>{' '}
                    <span className="text-[#7C3AED]">+233 50 123 4567</span>
                  </div>
                  <div>
                    <span className="text-white/60">OTP Code:</span>{' '}
                    <span className="text-[#7C3AED]">123456</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-white mb-3 text-sm">What You'll Experience:</h4>
                <ul className="space-y-2">
                  {[
                    { icon: Smartphone, text: 'Mobile-first verification flow' },
                    { icon: User, text: 'ID & biometric verification' },
                    { icon: Shield, text: 'Bank account linking' },
                    { icon: Lock, text: 'Data consent management' },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <li key={idx} className="flex items-center gap-3 text-white/70 text-sm">
                        <Icon className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                        {item.text}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* CTA */}
              <Button
                variant="primary"
                fullWidth
                className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9]"
                iconRight={<ArrowRight className="w-5 h-5" />}
                onClick={() => setShowIndividualLogin(true)}
              >
                Access Individual Demo
              </Button>

              <p className="text-white/50 text-xs text-center mt-4">
                Experience the end-user verification journey
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Portal Comparison */}
        <AnimatedSection animation="fade-up" delay={300}>
          <div className="mt-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-white">Feature</th>
                    <th className="px-6 py-4 text-center text-white">
                      <div className="flex items-center justify-center gap-2">
                        <Building2 className="w-4 h-4 text-[#06B6D4]" />
                        Business Portal
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-white">
                      <div className="flex items-center justify-center gap-2">
                        <User className="w-4 h-4 text-[#7C3AED]" />
                        Individual Portal
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: 'Primary Use Case',
                      business: 'API Integration & Development',
                      individual: 'Identity Verification & KYC',
                    },
                    {
                      feature: 'Access Method',
                      business: 'Email + Password',
                      individual: 'Phone Number + OTP',
                    },
                    {
                      feature: 'Dashboard Type',
                      business: 'Developer Dashboard',
                      individual: 'User Profile Dashboard',
                    },
                    {
                      feature: 'Key Features',
                      business: 'API Keys, Webhooks, Analytics',
                      individual: 'ID Upload, Biometrics, Consent',
                    },
                    {
                      feature: 'Data Managed',
                      business: 'API Configs, Team, Billing',
                      individual: 'Personal Info, Linked Accounts',
                    },
                    {
                      feature: 'Verification Flow',
                      business: 'Business KYB Process',
                      individual: 'Individual KYC Process',
                    },
                    {
                      feature: 'Mobile Experience',
                      business: 'Desktop-Optimized',
                      individual: 'Mobile-First Design',
                    },
                    {
                      feature: 'End Goal',
                      business: 'Get API Keys & Build',
                      individual: 'Complete Verification',
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-6 py-4 text-white/80">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-white/60 text-sm">
                        {row.business}
                      </td>
                      <td className="px-6 py-4 text-center text-white/60 text-sm">
                        {row.individual}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        {/* Important Note */}
        <AnimatedSection animation="fade-up" delay={400}>
          <div className="mt-8 bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#06B6D4] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-white mb-2">Important: Choose the Right Portal</h4>
                <div className="text-white/80 text-sm space-y-2">
                  <p>
                    <strong className="text-[#06B6D4]">Businesses:</strong> If you're a company wanting to integrate ReshADX APIs into your product, 
                    use the <strong>Business Portal</strong>. You'll get API keys and access to our developer tools.
                  </p>
                  <p>
                    <strong className="text-[#7C3AED]">Individuals:</strong> If an app you're using (like a lending app or bank) 
                    has asked you to verify your identity via ReshADX, use the <strong>Individual Portal</strong>. 
                    You'll complete KYC and link your accounts.
                  </p>
                  <p className="text-white/60 text-xs mt-3">
                    💡 Most businesses will only interact with the Business Portal. 
                    The Individual Portal is what your end-users will see when they verify through your app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Admin Dashboard Access - Standalone */}
        <AnimatedSection animation="fade-up" delay={500}>
          <div className="mt-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F59E0B]/20 to-[#EF4444]/20 border border-[#F59E0B]/30 rounded-full mb-4">
                <Crown className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-sm text-white">Platform Management</span>
              </div>
              <h3 className="text-white text-3xl mb-2">SaaS Admin Dashboard</h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                For ReshADX platform owners to monitor and manage the entire infrastructure
              </p>
            </div>

            <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-[#F59E0B]/50 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-2xl flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-[#F59E0B]/20 border border-[#F59E0B]/30 rounded-full text-[#F59E0B] text-xs">
                  Admin Access
                </span>
              </div>

              <h3 className="text-white text-2xl mb-2">Platform Admin Access</h3>
              <p className="text-white/70 mb-6">
                Comprehensive control center for ReshADX platform owners and administrators
              </p>

              {/* Demo Credentials */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/60 text-sm">Admin Credentials</span>
                  <button
                    onClick={() => copyCredentials('admin')}
                    className="flex items-center gap-2 text-[#F59E0B] text-sm hover:underline"
                  >
                    {copiedAdmin ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-white/60">Email:</span>{' '}
                    <span className="text-[#F59E0B]">admin@reshadx.com</span>
                  </div>
                  <div>
                    <span className="text-white/60">Password:</span>{' '}
                    <span className="text-[#F59E0B]">AdminDemo2024!</span>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="mb-6">
                <h4 className="text-white mb-4 text-sm">Admin Dashboard Features:</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { icon: BarChart, text: 'Platform-wide analytics & metrics' },
                    { icon: Users, text: 'User & business management' },
                    { icon: Database, text: 'API health monitoring' },
                    { icon: Shield, text: 'Security & compliance tracking' },
                    { icon: Lock, text: 'Revenue & billing overview' },
                    { icon: Zap, text: 'Support ticket management' },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3 text-white/70 text-sm bg-white/5 rounded-lg p-3 border border-white/10">
                        <Icon className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                        {item.text}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats Preview */}
              <div className="bg-gradient-to-r from-[#F59E0B]/10 to-[#EF4444]/10 border border-[#F59E0B]/30 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-white text-xl mb-1">127K+</div>
                    <div className="text-white/60 text-xs">Total Users</div>
                  </div>
                  <div>
                    <div className="text-white text-xl mb-1">2,847</div>
                    <div className="text-white/60 text-xs">Businesses</div>
                  </div>
                  <div>
                    <div className="text-white text-xl mb-1">$285K</div>
                    <div className="text-white/60 text-xs">MRR</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button
                variant="primary"
                fullWidth
                className="bg-gradient-to-r from-[#F59E0B] to-[#EF4444]"
                iconRight={<ArrowRight className="w-5 h-5" />}
                onClick={() => setShowAdminLogin(true)}
              >
                Access Admin Dashboard
              </Button>

              <p className="text-white/50 text-xs text-center mt-4">
                Full platform oversight with real-time monitoring
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Business Login Modal */}
      {showBusinessLogin && (
        <DemoLoginModal
          type="business"
          onClose={() => setShowBusinessLogin(false)}
          onLogin={onBusinessDemoLogin || onBusinessDashboard}
          onSkipToDashboard={onBusinessDemoLogin || onBusinessDashboard}
        />
      )}

      {/* Individual Login Modal */}
      {showIndividualLogin && (
        <DemoLoginModal
          type="individual"
          onClose={() => setShowIndividualLogin(false)}
          onLogin={onIndividualDemoLogin || onIndividualDashboard}
          onSkipToDashboard={onIndividualDemoLogin || onIndividualDashboard}
        />
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <DemoLoginModal
          type="admin"
          onClose={() => setShowAdminLogin(false)}
          onLogin={onAdminDemoLogin || (() => {})}
          onSkipToDashboard={onAdminDemoLogin || (() => {})}
        />
      )}
    </section>
  );
}