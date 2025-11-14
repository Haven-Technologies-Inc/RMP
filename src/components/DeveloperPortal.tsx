import React, { useState } from 'react';
import {
  Shield,
  Code,
  Book,
  Key,
  Terminal,
  Zap,
  Lock,
  Activity,
  Settings,
  FileText,
  Globe,
  Users,
  BarChart3,
  CheckCircle2,
  Copy,
  ExternalLink,
  AlertCircle,
  Play,
  Download,
  ChevronRight,
  Search,
} from 'lucide-react';
import { Button } from './Button';

interface DeveloperPortalProps {
  language?: string;
  onLanguageChange?: (lang: string) => void;
}

export function DeveloperPortal({ language = 'en', onLanguageChange }: DeveloperPortalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'quickstart' | 'api-reference' | 'webhooks' | 'sandbox'>('overview');
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const apiStats = {
    totalRequests: '1,234,567',
    successRate: '99.8%',
    avgResponseTime: '245ms',
    activeIntegrations: '12',
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  const products = [
    {
      name: 'Auth',
      description: 'Verify account and routing numbers for bank transfers',
      icon: Shield,
      color: 'var(--success)',
    },
    {
      name: 'Identity',
      description: 'Retrieve user identity data including Ghana Card verification',
      icon: Users,
      color: 'var(--primary)',
    },
    {
      name: 'Balance',
      description: 'Check real-time account balances',
      icon: BarChart3,
      color: 'var(--secondary)',
    },
    {
      name: 'Transactions',
      description: 'Access categorized transaction history',
      icon: Activity,
      color: '#10B981',
    },
    {
      name: 'Payment',
      description: 'Initiate payments to mobile money and bank accounts',
      icon: Zap,
      color: '#F59E0B',
    },
    {
      name: 'Income',
      description: 'Verify income and employment for lending decisions',
      icon: FileText,
      color: '#8B5CF6',
    },
  ];

  const endpoints = [
    {
      method: 'POST',
      path: '/link/token/create',
      description: 'Create a link token to initialize Ghana Open Data Exchange Link',
    },
    {
      method: 'POST',
      path: '/item/public_token/exchange',
      description: 'Exchange a public token for an access token',
    },
    {
      method: 'POST',
      path: '/accounts/get',
      description: 'Retrieve account data for a connected Item',
    },
    {
      method: 'POST',
      path: '/transactions/get',
      description: 'Fetch transaction data for specified date range',
    },
    {
      method: 'POST',
      path: '/balance/get',
      description: 'Get real-time balance information',
    },
    {
      method: 'POST',
      path: '/identity/get',
      description: 'Retrieve identity information including Ghana Card',
    },
    {
      method: 'POST',
      path: '/payment_initiation/payment/create',
      description: 'Create a payment to a mobile money or bank account',
    },
    {
      method: 'POST',
      path: '/income/get',
      description: 'Get income verification data',
    },
  ];

  const institutions = [
    { name: 'GCB Bank', type: 'Bank', status: 'HEALTHY' },
    { name: 'MTN Mobile Money', type: 'Mobile Money', status: 'HEALTHY' },
    { name: 'Ecobank Ghana', type: 'Bank', status: 'HEALTHY' },
    { name: 'Vodafone Cash', type: 'Mobile Money', status: 'HEALTHY' },
    { name: 'Stanbic Bank', type: 'Bank', status: 'HEALTHY' },
    { name: 'AirtelTigo Money', type: 'Mobile Money', status: 'HEALTHY' },
  ];

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white shadow-[var(--shadow-lg)]">
        <div className="px-4 py-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[var(--secondary)]" />
              <div>
                <h1 className="m-0 text-white">Ghana Open Data Exchange</h1>
                <p className="text-sm text-white/80 m-0">Developer Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm">
                <Book className="w-4 h-4 mr-2" />
                Documentation
              </Button>
              <Button variant="tertiary" size="sm" onClick={() => window.location.hash = 'dev-tools'}>
                <Terminal className="w-4 h-4 mr-2" />
                Dev Tools
              </Button>
              <Button variant="tertiary" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-xs text-white/70 mb-1 m-0">Total API Requests</p>
              <p className="text-2xl m-0 text-white">{apiStats.totalRequests}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-xs text-white/70 mb-1 m-0">Success Rate</p>
              <p className="text-2xl m-0 text-white">{apiStats.successRate}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-xs text-white/70 mb-1 m-0">Avg Response Time</p>
              <p className="text-2xl m-0 text-white">{apiStats.avgResponseTime}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-xs text-white/70 mb-1 m-0">Active Integrations</p>
              <p className="text-2xl m-0 text-white">{apiStats.activeIntegrations}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b border-[var(--neutral-200)] sticky top-0 z-40 shadow-sm">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Globe },
              { id: 'quickstart', label: 'Quick Start', icon: Zap },
              { id: 'api-reference', label: 'API Reference', icon: Code },
              { id: 'webhooks', label: 'Webhooks', icon: Activity },
              { id: 'sandbox', label: 'Sandbox', icon: Terminal },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-[var(--neutral-600)] hover:text-[var(--primary)]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-7xl mx-auto">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-xl p-8 border-2 border-[var(--primary)]/20">
              <h2 className="mb-4">Welcome to Ghana Open Data Exchange API</h2>
              <p className="text-lg text-[var(--neutral-700)] mb-6">
                The leading open banking platform for Ghana. Connect to banks, mobile money providers, and microfinance institutions with a single API.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
                <Button variant="secondary" size="lg">
                  <Book className="w-5 h-5 mr-2" />
                  View Documentation
                </Button>
                <Button variant="tertiary" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download SDKs
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <h2 className="mb-6">Available Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow cursor-pointer border border-[var(--neutral-200)]"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${product.color}15` }}
                    >
                      <product.icon className="w-6 h-6" style={{ color: product.color }} />
                    </div>
                    <h3 className="mb-2">{product.name}</h3>
                    <p className="text-sm text-[var(--neutral-600)] m-0">{product.description}</p>
                    <Button variant="tertiary" size="sm" className="mt-4">
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Institutions */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="m-0">Supported Institutions</h2>
                <Button variant="tertiary" size="sm">
                  View All 23 Institutions
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {institutions.map((inst, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-[var(--neutral-200)] rounded-lg"
                  >
                    <div>
                      <p className="m-0 mb-1">{inst.name}</p>
                      <p className="text-sm text-[var(--neutral-600)] m-0">{inst.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--success)] rounded-full"></span>
                      <span className="text-xs text-[var(--success)]">{inst.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUICK START TAB */}
        {activeTab === 'quickstart' && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-4">Quick Start Guide</h2>
              <p className="text-lg text-[var(--neutral-700)]">
                Get up and running with Ghana Open Data Exchange in minutes.
              </p>
            </div>

            {/* API Keys */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-[var(--primary)]" />
                Your API Keys
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[var(--neutral-600)] mb-2 block">
                    Client ID (Sandbox)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="65f8a1234b5c6d7e8f9g0h1i"
                      readOnly
                      className="flex-1 px-4 py-2 border border-[var(--neutral-300)] rounded-lg bg-[var(--neutral-50)] font-mono text-sm"
                    />
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => copyToClipboard('65f8a1234b5c6d7e8f9g0h1i')}
                    >
                      {apiKeyCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[var(--neutral-600)] mb-2 block">
                    Secret Key (Sandbox)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="sandbox_secret_1a2b3c4d5e6f7g8h9i0j"
                      readOnly
                      className="flex-1 px-4 py-2 border border-[var(--neutral-300)] rounded-lg bg-[var(--neutral-50)] font-mono text-sm"
                    />
                    <Button variant="secondary" size="md">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-[var(--warning)]/10 border border-[var(--warning)]/30 rounded-lg">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-[var(--warning)] flex-shrink-0" />
                  <p className="text-sm text-[var(--neutral-700)] m-0">
                    <strong>Important:</strong> Never expose your secret key in client-side code. Always make API calls from your server.
                  </p>
                </div>
              </div>
            </div>

            {/* Installation */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4">1. Install the SDK</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[var(--neutral-600)] mb-2">Node.js</p>
                  <div className="bg-[var(--neutral-900)] text-[var(--neutral-50)] p-4 rounded-lg font-mono text-sm">
                    <code>npm install ghana-open-data-exchange</code>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[var(--neutral-600)] mb-2">Python</p>
                  <div className="bg-[var(--neutral-900)] text-[var(--neutral-50)] p-4 rounded-lg font-mono text-sm">
                    <code>pip install ghodex</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Initialize */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4">2. Initialize the Client</h3>
              <div className="bg-[var(--neutral-900)] text-[var(--neutral-50)] p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`const { GhodexClient } = require('ghana-open-data-exchange');

const client = new GhodexClient({
  clientId: 'YOUR_CLIENT_ID',
  secret: 'YOUR_SECRET',
  environment: 'sandbox'
});`}</pre>
              </div>
            </div>

            {/* Create Link Token */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4">3. Create a Link Token</h3>
              <div className="bg-[var(--neutral-900)] text-[var(--neutral-50)] p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`const response = await client.createLinkToken({
  user: {
    client_user_id: 'user-123',
    legal_name: 'Kwame Mensah',
    phone_number: '+233501234567'
  },
  products: ['auth', 'transactions', 'balance'],
  country_codes: ['GH'],
  language: 'en'
});

const linkToken = response.link_token;`}</pre>
              </div>
            </div>

            {/* Initialize Link */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4">4. Initialize Link in Your Frontend</h3>
              <div className="bg-[var(--neutral-900)] text-[var(--neutral-50)] p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { GhodexLink } from 'ghana-open-data-exchange-link';

const link = GhodexLink.create({
  token: linkToken,
  onSuccess: (publicToken, metadata) => {
    // Exchange public token for access token
    exchangeToken(publicToken);
  },
  onExit: (err, metadata) => {
    // Handle exit
  }
});

link.open();`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* API REFERENCE TAB */}
        {activeTab === 'api-reference' && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-4">API Reference</h2>
              <p className="text-lg text-[var(--neutral-700)]">
                Complete reference for all Ghana Open Data Exchange API endpoints.
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--neutral-400)]" />
              <input
                type="text"
                placeholder="Search endpoints..."
                className="w-full pl-12 pr-4 py-3 border border-[var(--neutral-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>

            {/* Endpoints */}
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-[var(--shadow-sm)] border border-[var(--neutral-200)] overflow-hidden hover:border-[var(--primary)] transition-colors cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <span
                        className={`px-3 py-1 rounded text-xs text-white ${
                          endpoint.method === 'POST' ? 'bg-[var(--success)]' : 'bg-[var(--primary)]'
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <div className="flex-1">
                        <code className="text-[var(--primary)] mb-2 block">{endpoint.path}</code>
                        <p className="text-sm text-[var(--neutral-600)] m-0">
                          {endpoint.description}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-[var(--neutral-400)]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEBHOOKS TAB */}
        {activeTab === 'webhooks' && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-4">Webhooks</h2>
              <p className="text-lg text-[var(--neutral-700)]">
                Receive real-time notifications about events in your integration.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4">Webhook Events</h3>
              <div className="space-y-3">
                {[
                  { name: 'INITIAL_UPDATE', description: 'Initial data is available' },
                  { name: 'HISTORICAL_UPDATE', description: 'Historical transaction data is ready' },
                  { name: 'DEFAULT_UPDATE', description: 'New transaction data is available' },
                  { name: 'TRANSACTIONS_REMOVED', description: 'Transactions have been removed' },
                  { name: 'ITEM_ERROR', description: 'An error occurred with an Item' },
                  { name: 'USER_PERMISSION_REVOKED', description: 'User revoked access' },
                ].map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 border border-[var(--neutral-200)] rounded-lg"
                  >
                    <Activity className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <code className="text-sm text-[var(--primary)] block mb-1">{event.name}</code>
                      <p className="text-sm text-[var(--neutral-600)] m-0">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4">Example Webhook Payload</h3>
              <div className="bg-[var(--neutral-900)] text-[var(--neutral-50)] p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`{
  "webhook_type": "TRANSACTIONS",
  "webhook_code": "DEFAULT_UPDATE",
  "item_id": "item_abc123",
  "error": null,
  "new_transactions": 5,
  "removed_transactions": []
}`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* SANDBOX TAB */}
        {activeTab === 'sandbox' && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-4">Sandbox Environment</h2>
              <p className="text-lg text-[var(--neutral-700)]">
                Test your integration without connecting to real financial institutions.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[var(--success)]/10 to-[var(--primary)]/10 rounded-xl p-6 border-2 border-[var(--success)]/20">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-[var(--success)] flex-shrink-0" />
                <div>
                  <h3 className="mb-2">Sandbox Mode Active</h3>
                  <p className="text-[var(--neutral-700)] m-0">
                    You're currently using sandbox credentials. All API calls will return mock data and no real financial transactions will occur.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4">Test Credentials</h3>
              <div className="space-y-4">
                <div className="p-4 border border-[var(--neutral-200)] rounded-lg">
                  <p className="m-0 mb-3">Use these credentials to test successful flows:</p>
                  <div className="font-mono text-sm space-y-2 bg-[var(--neutral-50)] p-3 rounded">
                    <p className="m-0">Username: <strong>user_good</strong></p>
                    <p className="m-0">Password: <strong>pass_good</strong></p>
                  </div>
                </div>
                <div className="p-4 border border-[var(--neutral-200)] rounded-lg">
                  <p className="m-0 mb-3">Use these credentials to test error scenarios:</p>
                  <div className="font-mono text-sm space-y-2 bg-[var(--neutral-50)] p-3 rounded">
                    <p className="m-0">Username: <strong>user_bad</strong></p>
                    <p className="m-0">Password: <strong>pass_bad</strong></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <h3 className="mb-4">Sandbox Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="m-0"><strong>Mock Financial Institutions</strong></p>
                    <p className="text-sm text-[var(--neutral-600)] m-0">Test with all supported banks and mobile money providers</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="m-0"><strong>Realistic Data</strong></p>
                    <p className="text-sm text-[var(--neutral-600)] m-0">Get realistic account balances, transactions, and identity data</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="m-0"><strong>Error Simulation</strong></p>
                    <p className="text-sm text-[var(--neutral-600)] m-0">Test error handling with specific test credentials</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="m-0"><strong>Webhook Testing</strong></p>
                    <p className="text-sm text-[var(--neutral-600)] m-0">Trigger webhooks on demand to test your integration</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[var(--neutral-200)] mt-12 py-8">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--neutral-600)] m-0">
              © 2024 Ghana Open Data Exchange. Empowering financial innovation in Ghana.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-[var(--neutral-600)] hover:text-[var(--primary)]">
                API Status
              </a>
              <a href="#" className="text-sm text-[var(--neutral-600)] hover:text-[var(--primary)]">
                Support
              </a>
              <a href="#" className="text-sm text-[var(--neutral-600)] hover:text-[var(--primary)]">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}