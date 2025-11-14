import React, { useState } from 'react';
import { 
  Code, Key, BarChart3, Settings, Users, Bell, FileText, 
  Webhook, TrendingUp, CheckCircle, XCircle, Clock,
  ArrowRight, Copy, Check, ExternalLink, Download, Menu, X,
  Shield, Zap, Database, Globe, Server, Activity, AlertCircle,
  DollarSign, CreditCard, ChevronDown, Search, Filter, RefreshCw,
  Terminal, Book, Layers, Package, Eye, EyeOff, Plus, ChevronRight
} from 'lucide-react';
import { Button } from '../Button';
import { ProductsShowcase } from '../ProductsShowcase';
import { AfricanFeatures } from '../AfricanFeatures';
import { AdvancedEndpoints } from '../AdvancedEndpoints';
import { APIPlayground } from '../APIPlayground';

export function BusinessDashboard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState<'test' | 'live'>('test');
  const [showApiKeyValues, setShowApiKeyValues] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'products' | 'advanced-endpoints' | 'african-features' | 'api-playground' | 'api-logs' | 'webhooks' | 'team'>('overview');

  const copyApiKey = (key: string) => {
    const fallbackCopy = (text: string) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        textArea.remove();
        return true;
      } catch (err) {
        textArea.remove();
        return false;
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(key)
        .then(() => {
          setCopiedKey(key);
          setTimeout(() => setCopiedKey(null), 2000);
        })
        .catch(() => {
          if (fallbackCopy(key)) {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
          }
        });
    } else {
      if (fallbackCopy(key)) {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      }
    }
  };

  const apiStats = {
    today: {
      calls: '12,453',
      successRate: '99.2%',
      avgResponseTime: '245ms',
      activeUsers: '8,234',
    },
    thisMonth: {
      calls: '342,890',
      successRate: '99.1%',
      avgResponseTime: '251ms',
      revenue: '$4,580',
    }
  };

  const apiCalls = [
    { time: '2 mins ago', endpoint: '/v1/identity/verify', method: 'POST', status: 'success', duration: '234ms', statusCode: '200', country: 'GH' },
    { time: '5 mins ago', endpoint: '/v1/accounts/link', method: 'POST', status: 'success', duration: '189ms', statusCode: '200', country: 'NG' },
    { time: '8 mins ago', endpoint: '/v1/biometric/scan', method: 'POST', status: 'success', duration: '456ms', statusCode: '200', country: 'KE' },
    { time: '12 mins ago', endpoint: '/v1/identity/verify', method: 'POST', status: 'failed', duration: '1.2s', statusCode: '422', country: 'GH' },
    { time: '15 mins ago', endpoint: '/v1/consent/manage', method: 'PUT', status: 'success', duration: '167ms', statusCode: '200', country: 'ZA' },
    { time: '18 mins ago', endpoint: '/v1/accounts/transactions', method: 'GET', status: 'success', duration: '312ms', statusCode: '200', country: 'NG' },
    { time: '22 mins ago', endpoint: '/v1/identity/verify', method: 'POST', status: 'success', duration: '198ms', statusCode: '200', country: 'UG' },
    { time: '25 mins ago', endpoint: '/v1/biometric/verify', method: 'POST', status: 'failed', duration: '890ms', statusCode: '401', country: 'GH' },
  ];

  const webhooks = [
    { name: 'Identity Verification Webhook', url: 'https://api.yourapp.com/webhooks/identity', events: ['identity.verified', 'identity.failed'], status: 'active', lastTriggered: '5 mins ago' },
    { name: 'Account Linking Webhook', url: 'https://api.yourapp.com/webhooks/accounts', events: ['account.linked', 'account.unlinked'], status: 'active', lastTriggered: '2 hours ago' },
    { name: 'Consent Management Webhook', url: 'https://api.yourapp.com/webhooks/consent', events: ['consent.granted', 'consent.revoked'], status: 'inactive', lastTriggered: '2 days ago' },
  ];

  const teamMembers = [
    { name: 'John Doe', email: 'john@company.com', role: 'Owner', permissions: 'Full Access', lastActive: '5 mins ago', avatar: 'JD' },
    { name: 'Jane Smith', email: 'jane@company.com', role: 'Developer', permissions: 'Read & Write', lastActive: '2 hours ago', avatar: 'JS' },
    { name: 'Mike Johnson', email: 'mike@company.com', role: 'Developer', permissions: 'Read Only', lastActive: '1 day ago', avatar: 'MJ' },
  ];

  const apiKeys = [
    { 
      name: 'Test Secret Key', 
      key: 'test_sk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p', 
      env: 'Test', 
      created: '2 days ago',
      lastUsed: '5 mins ago',
      type: 'Secret'
    },
    { 
      name: 'Production Secret Key', 
      key: 'live_sk_9i8h7g6f5e4d3c2b1a0j9i8h7g6f5e4d', 
      env: 'Live', 
      created: '1 week ago',
      lastUsed: '10 mins ago',
      type: 'Secret'
    },
    { 
      name: 'Test Publishable Key', 
      key: 'test_pk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', 
      env: 'Test', 
      created: '2 days ago',
      lastUsed: '1 hour ago',
      type: 'Publishable'
    },
    { 
      name: 'Production Publishable Key', 
      key: 'live_pk_6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a', 
      env: 'Live', 
      created: '1 week ago',
      lastUsed: '30 mins ago',
      type: 'Publishable'
    },
  ];

  const quickActions = [
    { icon: Book, label: 'API Documentation', description: 'Complete API reference', color: 'text-[#06B6D4]', href: '#docs' },
    { icon: Terminal, label: 'API Playground', description: 'Test API endpoints', color: 'text-[#7C3AED]', href: '#playground' },
    { icon: Webhook, label: 'Configure Webhooks', description: 'Real-time event notifications', color: 'text-[#10B981]', href: '#webhooks' },
    { icon: BarChart3, label: 'View Analytics', description: 'Detailed usage insights', color: 'text-[#F59E0B]', href: '#analytics' },
    { icon: Shield, label: 'Security Settings', description: 'API security & IP whitelisting', color: 'text-[#EF4444]', href: '#security' },
    { icon: Download, label: 'Export Logs', description: 'Download API request logs', color: 'text-[#06B6D4]', href: '#export' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2540] via-[#1E293B] to-[#0F172A]">
      {/* Top Navigation */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-8">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {showMenu ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-lg" />
                <span className="text-white font-bold">ReshADX</span>
              </div>
              
              <nav className="hidden lg:flex items-center gap-3 xl:gap-4 text-sm">
                <button 
                  onClick={() => setSelectedTab('overview')}
                  className={`${selectedTab === 'overview' ? 'text-white' : 'text-white/60'} hover:text-white transition-colors`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setSelectedTab('products')}
                  className={`${selectedTab === 'products' ? 'text-white' : 'text-white/60'} hover:text-white transition-colors`}
                >
                  Products
                </button>
                <button 
                  onClick={() => setSelectedTab('advanced-endpoints')}
                  className={`${selectedTab === 'advanced-endpoints' ? 'text-white' : 'text-white/60'} hover:text-white transition-colors`}
                >
                  Advanced APIs
                </button>
                <button 
                  onClick={() => setSelectedTab('african-features')}
                  className={`${selectedTab === 'african-features' ? 'text-white' : 'text-white/60'} hover:text-white transition-colors`}
                >
                  Africa Features
                </button>
                <button 
                  onClick={() => setSelectedTab('api-playground')}
                  className={`${selectedTab === 'api-playground' ? 'text-white' : 'text-white/60'} hover:text-white transition-colors`}
                >
                  Playground
                </button>
              </nav>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4">
              {/* Environment Toggle */}
              <div className="hidden md:flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg p-1">
                <button
                  onClick={() => setSelectedEnv('test')}
                  className={`px-3 py-1.5 rounded text-sm transition-all ${
                    selectedEnv === 'test'
                      ? 'bg-[#F59E0B] text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Test Mode
                </button>
                <button
                  onClick={() => setSelectedEnv('live')}
                  className={`px-3 py-1.5 rounded text-sm transition-all ${
                    selectedEnv === 'live'
                      ? 'bg-[#10B981] text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Live Mode
                </button>
              </div>

              <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-white/70" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
              </button>
              
              <button className="hidden md:block p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-white/70" />
              </button>
              
              <div className="w-9 h-9 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">DC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="lg:hidden bg-white/5 backdrop-blur-lg border-b border-white/10">
          <nav className="px-4 py-4 space-y-2">
            <button 
              onClick={() => { setSelectedTab('overview'); setShowMenu(false); }}
              className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => { setSelectedTab('products'); setShowMenu(false); }}
              className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors"
            >
              Products
            </button>
            <button 
              onClick={() => { setSelectedTab('advanced-endpoints'); setShowMenu(false); }}
              className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors"
            >
              Advanced APIs
            </button>
            <button 
              onClick={() => { setSelectedTab('african-features'); setShowMenu(false); }}
              className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors"
            >
              Africa Features
            </button>
            <button 
              onClick={() => { setSelectedTab('api-playground'); setShowMenu(false); }}
              className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5 rounded-lg transition-colors"
            >
              API Playground
            </button>
          </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Welcome Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-white text-2xl md:text-3xl mb-2">Welcome back, Demo Company Ltd.</h1>
          <p className="text-white/60">
            {selectedEnv === 'test' 
              ? "You're in test mode. Use test API keys to experiment without affecting live data."
              : "You're in live mode. Real transactions will be processed."}
          </p>
        </div>

        {selectedTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {[
                { 
                  label: 'API Calls Today', 
                  value: apiStats.today.calls, 
                  icon: Code, 
                  trend: '+12.3%',
                  trendUp: true,
                  color: 'text-[#06B6D4]',
                  bgColor: 'bg-[#06B6D4]/20'
                },
                { 
                  label: 'Success Rate', 
                  value: apiStats.today.successRate, 
                  icon: CheckCircle, 
                  trend: '+0.3%',
                  trendUp: true,
                  color: 'text-[#10B981]',
                  bgColor: 'bg-[#10B981]/20'
                },
                { 
                  label: 'Avg Response', 
                  value: apiStats.today.avgResponseTime, 
                  icon: Clock, 
                  trend: '-15ms',
                  trendUp: true,
                  color: 'text-[#7C3AED]',
                  bgColor: 'bg-[#7C3AED]/20'
                },
                { 
                  label: 'Active Users', 
                  value: apiStats.today.activeUsers, 
                  icon: Users, 
                  trend: '+156',
                  trendUp: true,
                  color: 'text-[#F59E0B]',
                  bgColor: 'bg-[#F59E0B]/20'
                },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6 hover:border-[#06B6D4]/50 transition-all">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                      </div>
                      <span className={`text-xs ${stat.trendUp ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {stat.trend}
                      </span>
                    </div>
                    <div className="text-2xl md:text-3xl text-white mb-1">{stat.value}</div>
                    <div className="text-white/60 text-xs md:text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              {/* API Keys */}
              <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-[#06B6D4]" />
                    <h3 className="text-white m-0">API Keys</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowApiKeyValues(!showApiKeyValues)}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      title={showApiKeyValues ? 'Hide keys' : 'Show keys'}
                    >
                      {showApiKeyValues ? (
                        <EyeOff className="w-4 h-4 text-white/60" />
                      ) : (
                        <Eye className="w-4 h-4 text-white/60" />
                      )}
                    </button>
                    <Button variant="secondary" size="sm">
                      <Plus className="w-4 h-4" />
                      <span className="hidden md:inline ml-2">New Key</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {apiKeys.filter(k => k.env === (selectedEnv === 'test' ? 'Test' : 'Live')).map((apiKey, idx) => (
                    <div key={idx} className="bg-black/40 border border-white/10 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-white">{apiKey.name}</div>
                            <span className={`px-2 py-0.5 text-xs rounded ${
                              apiKey.type === 'Secret'
                                ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'
                                : 'bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30'
                            }`}>
                              {apiKey.type}
                            </span>
                          </div>
                          <div className="text-white/50 text-xs">Created {apiKey.created} • Last used {apiKey.lastUsed}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded flex-shrink-0 ${
                          apiKey.env === 'Live' 
                            ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                            : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}>
                          {apiKey.env}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs md:text-sm font-mono text-[#06B6D4] bg-black/60 px-3 py-2 rounded overflow-x-auto">
                          {showApiKeyValues ? apiKey.key : apiKey.key.substring(0, 20) + '••••••••••••'}
                        </code>
                        <button
                          onClick={() => copyApiKey(apiKey.key)}
                          className="p-2 hover:bg-white/5 rounded transition-colors flex-shrink-0"
                          title="Copy to clipboard"
                        >
                          {copiedKey === apiKey.key ? (
                            <Check className="w-4 h-4 text-[#10B981]" />
                          ) : (
                            <Copy className="w-4 h-4 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#06B6D4] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-white/80 m-0">
                      <strong>Secret keys</strong> should never be exposed in client-side code. Use <strong>Publishable keys</strong> for frontend applications.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
                <h3 className="text-white mb-6 m-0">Quick Actions</h3>
                <div className="space-y-3">
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={idx}
                        className="w-full flex items-start gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group text-left"
                      >
                        <Icon className={`w-5 h-5 ${action.color} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-white/80 group-hover:text-white text-sm mb-0.5">
                            {action.label}
                          </div>
                          <div className="text-white/50 text-xs">
                            {action.description}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/40 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent API Activity */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#06B6D4]" />
                  <h3 className="text-white m-0">Recent API Activity</h3>
                </div>
                <button className="flex items-center gap-2 text-[#06B6D4] text-sm hover:underline">
                  View All Logs
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-3 md:px-4 py-3 text-left text-white/60 text-xs md:text-sm">Time</th>
                      <th className="px-3 md:px-4 py-3 text-left text-white/60 text-xs md:text-sm">Endpoint</th>
                      <th className="px-3 md:px-4 py-3 text-left text-white/60 text-xs md:text-sm hidden md:table-cell">Method</th>
                      <th className="px-3 md:px-4 py-3 text-left text-white/60 text-xs md:text-sm">Status</th>
                      <th className="px-3 md:px-4 py-3 text-left text-white/60 text-xs md:text-sm hidden lg:table-cell">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiCalls.slice(0, 5).map((call, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-3 md:px-4 py-3 text-white/60 text-xs md:text-sm whitespace-nowrap">{call.time}</td>
                        <td className="px-3 md:px-4 py-3">
                          <code className="text-xs md:text-sm text-[#06B6D4]">{call.endpoint}</code>
                        </td>
                        <td className="px-3 md:px-4 py-3 hidden md:table-cell">
                          <span className="px-2 py-1 bg-[#7C3AED]/20 text-[#7C3AED] text-xs rounded">
                            {call.method}
                          </span>
                        </td>
                        <td className="px-3 md:px-4 py-3">
                          <div className="flex items-center gap-2">
                            {call.status === 'success' ? (
                              <>
                                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#10B981]" />
                                <span className="text-[#10B981] text-xs md:text-sm hidden sm:inline">{call.statusCode}</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 md:w-4 md:h-4 text-[#EF4444]" />
                                <span className="text-[#EF4444] text-xs md:text-sm hidden sm:inline">{call.statusCode}</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-3 md:px-4 py-3 text-white/60 text-xs md:text-sm hidden lg:table-cell">{call.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {selectedTab === 'api-logs' && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#06B6D4]" />
                <h3 className="text-white m-0">API Request Logs</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 md:flex-none">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="w-full md:w-64 bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder:text-white/40"
                  />
                </div>
                <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                  <Filter className="w-4 h-4 text-white/60" />
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-white/60 text-sm">Time</th>
                    <th className="px-4 py-3 text-left text-white/60 text-sm">Endpoint</th>
                    <th className="px-4 py-3 text-left text-white/60 text-sm">Method</th>
                    <th className="px-4 py-3 text-left text-white/60 text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-white/60 text-sm">Duration</th>
                    <th className="px-4 py-3 text-left text-white/60 text-sm">Country</th>
                  </tr>
                </thead>
                <tbody>
                  {apiCalls.map((call, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 cursor-pointer">
                      <td className="px-4 py-3 text-white/60 text-sm whitespace-nowrap">{call.time}</td>
                      <td className="px-4 py-3">
                        <code className="text-sm text-[#06B6D4]">{call.endpoint}</code>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-[#7C3AED]/20 text-[#7C3AED] text-xs rounded">
                          {call.method}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {call.status === 'success' ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-[#10B981]" />
                              <span className="text-[#10B981] text-sm">{call.statusCode}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-[#EF4444]" />
                              <span className="text-[#EF4444] text-sm">{call.statusCode}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-sm">{call.duration}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded">
                          {call.country}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'webhooks' && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Webhook className="w-5 h-5 text-[#06B6D4]" />
                <h3 className="text-white m-0">Webhook Endpoints</h3>
              </div>
              <Button variant="secondary" size="sm">
                <Plus className="w-4 h-4" />
                <span className="hidden md:inline ml-2">Add Webhook</span>
              </Button>
            </div>

            <div className="space-y-4">
              {webhooks.map((webhook, idx) => (
                <div key={idx} className="bg-black/40 border border-white/10 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white m-0">{webhook.name}</h4>
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          webhook.status === 'active'
                            ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                            : 'bg-[#6B7280]/20 text-[#6B7280] border border-[#6B7280]/30'
                        }`}>
                          {webhook.status}
                        </span>
                      </div>
                      <code className="text-sm text-[#06B6D4] block mb-2">{webhook.url}</code>
                      <div className="text-white/50 text-xs">Last triggered: {webhook.lastTriggered}</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-white/60 text-sm mb-2">Events:</div>
                    <div className="flex flex-wrap gap-2">
                      {webhook.events.map((event, eIdx) => (
                        <span key={eIdx} className="px-2 py-1 bg-[#7C3AED]/20 text-[#7C3AED] text-xs rounded border border-[#7C3AED]/30">
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="tertiary" size="sm">Edit</Button>
                    <Button variant="tertiary" size="sm">Test</Button>
                    <Button variant="tertiary" size="sm">Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'team' && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#06B6D4]" />
                <h3 className="text-white m-0">Team Members</h3>
              </div>
              <Button variant="secondary" size="sm">
                <Plus className="w-4 h-4" />
                <span className="hidden md:inline ml-2">Invite Member</span>
              </Button>
            </div>

            <div className="space-y-4">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-black/40 border border-white/10 rounded-lg hover:bg-white/5 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{member.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white m-0">{member.name}</h4>
                      <span className="px-2 py-0.5 bg-[#06B6D4]/20 text-[#06B6D4] text-xs rounded border border-[#06B6D4]/30">
                        {member.role}
                      </span>
                    </div>
                    <div className="text-white/60 text-sm">{member.email}</div>
                    <div className="text-white/50 text-xs mt-1">
                      {member.permissions} • Last active {member.lastActive}
                    </div>
                  </div>
                  <button className="text-white/60 hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {selectedTab === 'products' && (
          <ProductsShowcase />
        )}

        {/* Advanced Endpoints Tab */}
        {selectedTab === 'advanced-endpoints' && (
          <AdvancedEndpoints />
        )}

        {/* African Features Tab */}
        {selectedTab === 'african-features' && (
          <AfricanFeatures />
        )}

        {/* API Playground Tab */}
        {selectedTab === 'api-playground' && (
          <APIPlayground />
        )}
      </div>
    </div>
  );
}
