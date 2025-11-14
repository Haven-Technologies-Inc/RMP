import React, { useState } from 'react';
import {
  Shield,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Settings,
  Eye,
  Plus,
  ChevronRight,
  Bell,
  Lock,
  TrendingUp,
  Users,
  FileText,
  AlertCircle,
  Menu,
  X,
} from 'lucide-react';
import { Button } from './Button';
import { LanguageSelector } from './LanguageSelector';

interface DashboardProps {
  language?: string;
  onLanguageChange?: (lang: string) => void;
}

export function Dashboard({ language = 'en', onLanguageChange }: DashboardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const verificationStatus = {
    name: 'Kwame Mensah',
    ghanaCard: 'GHA-XXXXXXXXX-X',
    phone: '+233 50 123 4567',
    verifiedDate: new Date().toLocaleDateString('en-GB'),
  };

  const quickStats = [
    {
      icon: Shield,
      label: 'Identity Status',
      value: 'Verified',
      status: 'success',
      bgColor: 'var(--success)',
    },
    {
      icon: CreditCard,
      label: 'Linked Accounts',
      value: '3',
      status: 'info',
      bgColor: 'var(--primary)',
    },
    {
      icon: Users,
      label: 'Active Consents',
      value: '5',
      status: 'warning',
      bgColor: 'var(--secondary)',
    },
    {
      icon: TrendingUp,
      label: 'Trust Score',
      value: '95%',
      status: 'success',
      bgColor: '#10B981',
    },
  ];

  const linkedAccounts = [
    {
      name: 'MTN Mobile Money',
      type: 'Mobile Money',
      icon: Smartphone,
      status: 'active',
      lastSync: '2 hours ago',
    },
    {
      name: 'GCB Bank',
      type: 'Bank Account',
      icon: CreditCard,
      status: 'active',
      lastSync: '1 day ago',
    },
    {
      name: 'Vodafone Cash',
      type: 'Mobile Money',
      icon: Smartphone,
      status: 'active',
      lastSync: '3 days ago',
    },
  ];

  const activeConsents = [
    {
      service: 'QuickLoan Pro',
      permissions: ['View balance', 'Transaction history'],
      grantedDate: '2024-11-10',
      expiryDate: '2024-12-10',
      status: 'active',
    },
    {
      service: 'PayFast Ghana',
      permissions: ['View balance', 'Payment initiation'],
      grantedDate: '2024-11-05',
      expiryDate: '2024-12-05',
      status: 'active',
    },
  ];

  const recentActivity = [
    {
      action: 'Consent granted to QuickLoan Pro',
      time: '2 hours ago',
      icon: Shield,
      type: 'consent',
    },
    {
      action: 'GCB Bank account synced',
      time: '1 day ago',
      icon: CreditCard,
      type: 'sync',
    },
    {
      action: 'Phone number verified',
      time: '3 days ago',
      icon: Smartphone,
      type: 'verification',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white sticky top-0 z-50 shadow-[var(--shadow-lg)]">
        <div className="px-4 py-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[var(--secondary)]" />
                  <span className="text-xl">VerifyGH</span>
                </div>
                <p className="text-xs text-white/70 mt-0">Digital Identity Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={onLanguageChange || (() => {})}
                variant="dark"
              />
              <button
                className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--error)] rounded-full"></span>
              </button>
              <button
                onClick={() => window.location.hash = 'developer'}
                className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
              >
                <Settings className="w-4 h-4" />
                <span>Developers</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="lg:hidden bg-white border-b border-[var(--neutral-200)] shadow-[var(--shadow-md)]">
          <nav className="px-4 py-4 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
              <Shield className="w-5 h-5 text-[var(--primary)]" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
              <CreditCard className="w-5 h-5 text-[var(--neutral-600)]" />
              <span>Accounts</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
              <Lock className="w-5 h-5 text-[var(--neutral-600)]" />
              <span>Consents</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
              <Settings className="w-5 h-5 text-[var(--neutral-600)]" />
              <span>Settings</span>
            </a>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="px-4 py-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2">Welcome back, {verificationStatus.name.split(' ')[0]}! 👋</h1>
          <p className="text-[var(--neutral-600)]">
            Your identity is verified and secure. Manage your digital identity and connected accounts below.
          </p>
        </div>

        {/* Verification Badge */}
        <div className="bg-gradient-to-r from-[var(--success)]/10 to-[var(--primary)]/10 rounded-xl p-4 mb-6 border-2 border-[var(--success)]/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--success)] rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="m-0 mb-1 flex items-center gap-2">
                Identity Verified
                <span className="text-xs bg-[var(--success)] text-white px-2 py-1 rounded-full">Active</span>
              </h3>
              <p className="text-sm text-[var(--neutral-600)] m-0">
                Verified on {verificationStatus.verifiedDate} • Ghana Card {verificationStatus.ghanaCard}
              </p>
            </div>
            <Button variant="secondary" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.bgColor}15` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.bgColor }} />
                </div>
              </div>
              <p className="text-sm text-[var(--neutral-600)] mb-1 m-0">{stat.label}</p>
              <p className="text-2xl m-0" style={{ color: stat.bgColor }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Linked Accounts & Consents */}
          <div className="lg:col-span-2 space-y-6">
            {/* Linked Accounts */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)]">
              <div className="p-6 border-b border-[var(--neutral-200)]">
                <div className="flex items-center justify-between">
                  <h2 className="m-0">Linked Accounts</h2>
                  <Button variant="primary" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Link Account
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {linkedAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border border-[var(--neutral-200)] rounded-lg hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <account.icon className="w-6 h-6 text-[var(--primary)]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="m-0 mb-1">{account.name}</h4>
                      <p className="text-sm text-[var(--neutral-600)] m-0">{account.type}</p>
                      <p className="text-xs text-[var(--neutral-500)] m-0 mt-1">
                        Last synced {account.lastSync}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--success)] rounded-full"></span>
                      <ChevronRight className="w-5 h-5 text-[var(--neutral-400)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Consents */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)]">
              <div className="p-6 border-b border-[var(--neutral-200)]">
                <div className="flex items-center justify-between">
                  <h2 className="m-0">Active Consents</h2>
                  <Button variant="tertiary" size="sm">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {activeConsents.map((consent, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[var(--neutral-200)] rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="m-0 mb-1">{consent.service}</h4>
                        <p className="text-sm text-[var(--neutral-600)] m-0">
                          Granted on {consent.grantedDate}
                        </p>
                      </div>
                      <span className="text-xs bg-[var(--success)]/10 text-[var(--success)] px-3 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm m-0 mb-2 text-[var(--neutral-700)]">Permissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {consent.permissions.map((permission, pIndex) => (
                          <span
                            key={pIndex}
                            className="text-xs bg-[var(--neutral-100)] text-[var(--neutral-700)] px-2 py-1 rounded"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--neutral-200)]">
                      <p className="text-xs text-[var(--neutral-600)] m-0">
                        Expires on {consent.expiryDate}
                      </p>
                      <Button variant="tertiary" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--neutral-50)] transition-colors text-left border border-[var(--neutral-200)]">
                  <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <p className="m-0 text-sm">Link New Account</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--neutral-400)]" />
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--neutral-50)] transition-colors text-left border border-[var(--neutral-200)]">
                  <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[var(--secondary)]" />
                  </div>
                  <div className="flex-1">
                    <p className="m-0 text-sm">Manage Consents</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--neutral-400)]" />
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--neutral-50)] transition-colors text-left border border-[var(--neutral-200)]">
                  <div className="w-10 h-10 bg-[var(--success)]/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[var(--success)]" />
                  </div>
                  <div className="flex-1">
                    <p className="m-0 text-sm">Download Report</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--neutral-400)]" />
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--neutral-50)] transition-colors text-left border border-[var(--neutral-200)]">
                  <div className="w-10 h-10 bg-[var(--neutral-200)] rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-[var(--neutral-600)]" />
                  </div>
                  <div className="flex-1">
                    <p className="m-0 text-sm">Account Settings</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--neutral-400)]" />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm m-0 mb-1">{activity.action}</p>
                      <p className="text-xs text-[var(--neutral-500)] m-0">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="tertiary" size="sm" fullWidth className="mt-4">
                View All Activity
              </Button>
            </div>

            {/* Security Alert */}
            <div className="bg-[var(--warning)]/10 border-2 border-[var(--warning)]/30 rounded-xl p-6">
              <div className="flex gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="m-0 mb-2">Security Reminder</h4>
                  <p className="text-sm text-[var(--neutral-700)] m-0 mb-3">
                    Review your active consents regularly and revoke access for services you no longer use.
                  </p>
                  <Button variant="secondary" size="sm">
                    Review Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[var(--neutral-200)] mt-12 py-8">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--neutral-600)] m-0">
              © 2024 VerifyGH. Secure Digital Identity for Ghana.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-[var(--neutral-600)] hover:text-[var(--primary)]">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-[var(--neutral-600)] hover:text-[var(--primary)]">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-[var(--neutral-600)] hover:text-[var(--primary)]">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}