import React, { useState } from 'react';
import { 
  Building2, User, Code, Key, BarChart3, Settings, 
  Smartphone, Shield, CreditCard, FileText, Bell, Users
} from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

export function PortalPreview() {
  const [activePortal, setActivePortal] = useState<'business' | 'individual'>('business');

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#1E293B] to-[#0A2540]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-white text-4xl lg:text-5xl mb-4">
              See How Each Portal Works
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Preview the interfaces that businesses and individuals interact with
            </p>
          </div>
        </AnimatedSection>

        {/* Portal Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-xl">
            <button
              onClick={() => setActivePortal('business')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activePortal === 'business'
                  ? 'bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Building2 className="w-5 h-5" />
              Business Portal
            </button>
            <button
              onClick={() => setActivePortal('individual')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activePortal === 'individual'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <User className="w-5 h-5" />
              Individual Portal
            </button>
          </div>
        </div>

        {/* Business Portal Preview */}
        {activePortal === 'business' && (
          <AnimatedSection animation="fade-up" key="business">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
              {/* Mock Browser Header */}
              <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 bg-white/5 rounded px-3 py-1 text-white/60 text-sm font-mono">
                  https://dashboard.reshadx.com
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-white text-2xl mb-1">Business Dashboard</h3>
                    <p className="text-white/60 text-sm">Welcome back, Demo Company Ltd.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 bg-[#10B981]/20 border border-[#10B981]/30 rounded-lg">
                      <span className="text-[#10B981] text-sm">Live Mode</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-full" />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'API Calls Today', value: '12,453', icon: Code, trend: '+12%' },
                    { label: 'Success Rate', value: '99.2%', icon: BarChart3, trend: '+0.3%' },
                    { label: 'Active Keys', value: '3', icon: Key, trend: '' },
                    { label: 'Team Members', value: '8', icon: Users, trend: '' },
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Icon className="w-5 h-5 text-[#06B6D4]" />
                          {stat.trend && (
                            <span className="text-[#10B981] text-xs">{stat.trend}</span>
                          )}
                        </div>
                        <div className="text-2xl text-white mb-1">{stat.value}</div>
                        <div className="text-white/60 text-xs">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* API Keys */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Key className="w-5 h-5 text-[#06B6D4]" />
                      <h4 className="text-white">API Keys</h4>
                    </div>
                    <div className="space-y-3">
                      {['Test Key', 'Production Key'].map((key, idx) => (
                        <div key={idx} className="bg-black/40 rounded-lg p-3">
                          <div className="text-white/70 text-xs mb-1">{key}</div>
                          <div className="font-mono text-sm text-[#06B6D4]">
                            {idx === 0 ? 'test_sk_...' : 'live_sk_...'}••••••••••
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Bell className="w-5 h-5 text-[#06B6D4]" />
                      <h4 className="text-white">Recent Activity</h4>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Identity verification completed',
                        'New webhook configured',
                        'API key regenerated',
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                          <span className="text-white/70">{activity}</span>
                          <span className="text-white/40 text-xs ml-auto">
                            {idx + 2}h ago
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: Code, label: 'API Docs' },
                    { icon: Settings, label: 'Settings' },
                    { icon: BarChart3, label: 'Analytics' },
                    { icon: FileText, label: 'Logs' },
                  ].map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={idx}
                        className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                      >
                        <Icon className="w-5 h-5 text-[#06B6D4]" />
                        <span className="text-white/70 text-sm">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: Code,
                  title: 'Developer Tools',
                  desc: 'API keys, webhooks, SDKs, and comprehensive documentation',
                },
                {
                  icon: BarChart3,
                  title: 'Analytics Dashboard',
                  desc: 'Real-time metrics, success rates, and usage insights',
                },
                {
                  icon: Users,
                  title: 'Team Management',
                  desc: 'Invite team members, manage roles and permissions',
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <Icon className="w-6 h-6 text-[#06B6D4] mb-3" />
                    <h5 className="text-white mb-1">{feature.title}</h5>
                    <p className="text-white/60 text-sm">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        )}

        {/* Individual Portal Preview */}
        {activePortal === 'individual' && (
          <AnimatedSection animation="fade-up" key="individual">
            <div className="max-w-2xl mx-auto">
              {/* Mobile Frame */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-4">
                <div className="bg-gradient-to-b from-[#0A2540] to-[#1E293B] rounded-2xl overflow-hidden">
                  {/* Mobile Header */}
                  <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-6 py-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-white text-sm">9:41 AM</div>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-white" />
                        <div className="w-1 h-1 rounded-full bg-white" />
                        <div className="w-1 h-1 rounded-full bg-white" />
                      </div>
                    </div>
                    <h3 className="text-white text-2xl mb-2">Hi, Kwame! 👋</h3>
                    <p className="text-white/80 text-sm">Your verification is complete</p>
                  </div>

                  {/* Profile Status */}
                  <div className="px-6 py-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white mb-1">Kwame Mensah</div>
                          <div className="text-white/60 text-sm">+233 50 123 4567</div>
                        </div>
                        <div className="w-8 h-8 bg-[#10B981]/20 rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-[#10B981]" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#10B981]/20 border border-[#10B981]/30 rounded-lg">
                        <Shield className="w-4 h-4 text-[#10B981]" />
                        <span className="text-[#10B981] text-sm">Verified</span>
                      </div>
                    </div>

                    {/* Verification Items */}
                    <div className="space-y-3 mb-6">
                      {[
                        { icon: User, label: 'Identity Verified', status: 'Complete', color: 'green' },
                        { icon: Smartphone, label: 'Phone Verified', status: 'Complete', color: 'green' },
                        { icon: CreditCard, label: '2 Bank Accounts', status: 'Linked', color: 'blue' },
                        { icon: FileText, label: 'Documents', status: '3 Uploaded', color: 'blue' },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        const colorClass = item.color === 'green' ? 'text-[#10B981]' : 'text-[#06B6D4]';
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl"
                          >
                            <div className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${colorClass}`} />
                            </div>
                            <div className="flex-1">
                              <div className="text-white text-sm">{item.label}</div>
                              <div className={`${colorClass} text-xs`}>{item.status}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Shield, label: 'Privacy' },
                        { icon: Settings, label: 'Settings' },
                      ].map((action, idx) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={idx}
                            className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                          >
                            <Icon className="w-5 h-5 text-[#7C3AED]" />
                            <span className="text-white/70 text-sm">{action.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                {[
                  {
                    icon: Smartphone,
                    title: 'Mobile-First',
                    desc: 'Optimized for smartphones with intuitive interface',
                  },
                  {
                    icon: Shield,
                    title: 'Secure Verification',
                    desc: 'Complete KYC with ID upload and biometric capture',
                  },
                  {
                    icon: CreditCard,
                    title: 'Account Linking',
                    desc: 'Connect bank accounts and mobile money wallets',
                  },
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <Icon className="w-6 h-6 text-[#7C3AED] mb-3" />
                      <h5 className="text-white mb-1">{feature.title}</h5>
                      <p className="text-white/60 text-sm">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
