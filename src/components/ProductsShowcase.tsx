import React, { useState } from 'react';
import {
  Shield,
  User,
  DollarSign,
  CreditCard,
  Send,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Code,
  Zap,
  Globe,
  Lock,
  Clock,
  BarChart3,
} from 'lucide-react';
import { Button } from './Button';

interface Product {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  tagline: string;
  features: string[];
  useCases: string[];
  endpoints: {
    name: string;
    method: string;
    path: string;
    description: string;
  }[];
  codeExample: string;
}

interface ProductsShowcaseProps {
  language?: string;
  onLanguageChange?: (lang: string) => void;
}

export function ProductsShowcase({ language = 'en', onLanguageChange }: ProductsShowcaseProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>('auth');

  const products: Product[] = [
    {
      id: 'auth',
      name: 'Auth',
      icon: Shield,
      color: 'var(--primary)',
      description: 'Verify account and routing numbers for bank transfers',
      tagline: 'Instant Account Verification',
      features: [
        'Real-time account verification',
        'ACH routing number validation',
        'Account ownership confirmation',
        'Support for all Ghanaian banks',
        'Mobile money account verification',
        'Instant verification - no micro-deposits',
      ],
      useCases: [
        'Bank transfers and ACH payments',
        'Account ownership verification',
        'Payroll direct deposit setup',
        'Loan disbursement validation',
      ],
      endpoints: [
        {
          name: 'Get Auth',
          method: 'POST',
          path: '/auth/get',
          description: 'Retrieve account and routing numbers for verified accounts',
        },
        {
          name: 'Verify Account',
          method: 'POST',
          path: '/verification/account',
          description: 'Verify account ownership and validity',
        },
      ],
      codeExample: `// Get account and routing numbers
const response = await ghodex.authGet({
  access_token: accessToken,
});

// Response includes:
{
  accounts: [
    {
      account_id: "acc_001",
      account_number: "GH1234567890123",
      routing_number: "040101",
      wire_routing_number: "040101001",
      account_type: "checking",
      verification_status: "automatically_verified"
    }
  ],
  numbers: {
    ach: [...],  // ACH transfer details
  }
}`,
    },
    {
      id: 'identity',
      name: 'Identity',
      icon: User,
      color: '#8B5CF6',
      description: 'Retrieve user identity data including Ghana Card verification',
      tagline: 'Ghana Card Integration',
      features: [
        'Ghana Card (National ID) verification',
        'NIA (National Identification Authority) integration',
        'Full name, address, and contact verification',
        'Date of birth validation',
        'Biometric verification support',
        'Real-time identity matching',
      ],
      useCases: [
        'KYC (Know Your Customer) compliance',
        'Account opening and onboarding',
        'Identity fraud prevention',
        'Credit application verification',
      ],
      endpoints: [
        {
          name: 'Get Identity',
          method: 'POST',
          path: '/identity/get',
          description: 'Retrieve comprehensive identity information',
        },
        {
          name: 'Identity Match',
          method: 'POST',
          path: '/identity/match',
          description: 'Match provided identity data with account holder',
        },
        {
          name: 'Verify Identity',
          method: 'POST',
          path: '/verification/identity',
          description: 'Verify identity with Ghana Card and NIA',
        },
      ],
      codeExample: `// Get user identity including Ghana Card
const response = await ghodex.identityGet({
  access_token: accessToken,
});

// Response includes:
{
  identity: {
    names: ["Kwame Mensah"],
    emails: [{ data: "kwame@email.com", primary: true }],
    phone_numbers: [{ data: "+233501234567", primary: true }],
    addresses: [{
      city: "Accra",
      region: "Greater Accra",
      street: "123 Independence Ave",
      country: "Ghana"
    }],
    ghana_card: {
      number: "GHA-123456789-1",
      verified: true,
      issued_date: "2020-01-15",
      expiry_date: "2030-01-15"
    }
  }
}`,
    },
    {
      id: 'balance',
      name: 'Balance',
      icon: DollarSign,
      color: '#10B981',
      description: 'Check real-time account balances',
      tagline: 'Real-Time Balance Data',
      features: [
        'Real-time balance updates',
        'Available vs current balance',
        'Multi-currency support (GHS, USD, EUR)',
        'Credit limit tracking',
        'Overdraft status monitoring',
        'Historical balance trends',
      ],
      useCases: [
        'Financial dashboards and apps',
        'Spending limit enforcement',
        'Loan affordability checks',
        'Account aggregation services',
      ],
      endpoints: [
        {
          name: 'Get Balance',
          method: 'POST',
          path: '/balance/get',
          description: 'Retrieve current account balances',
        },
        {
          name: 'Get Accounts',
          method: 'POST',
          path: '/accounts/get',
          description: 'Get all accounts with balance information',
        },
      ],
      codeExample: `// Get real-time account balances
const response = await ghodex.balanceGet({
  access_token: accessToken,
});

// Response includes:
{
  accounts: [
    {
      account_id: "acc_savings_001",
      balances: {
        available: 15420.50,
        current: 15420.50,
        limit: null,
        iso_currency_code: "GHS"
      },
      name: "Savings Account",
      type: "depository",
      subtype: "savings"
    }
  ]
}`,
    },
    {
      id: 'transactions',
      name: 'Transactions',
      icon: CreditCard,
      color: '#F59E0B',
      description: 'Access categorized transaction history',
      tagline: 'Enriched Transaction Data',
      features: [
        'Up to 24 months of transaction history',
        'Automatic transaction categorization',
        'Merchant name enrichment',
        'Payment channel identification',
        'Location data for in-person transactions',
        'Real-time transaction updates',
        'Mobile money transaction support',
      ],
      useCases: [
        'Personal finance management',
        'Spending analytics and insights',
        'Tax preparation and reporting',
        'Expense tracking and budgeting',
      ],
      endpoints: [
        {
          name: 'Get Transactions',
          method: 'POST',
          path: '/transactions/get',
          description: 'Retrieve transaction history with filters',
        },
        {
          name: 'Sync Transactions',
          method: 'POST',
          path: '/transactions/sync',
          description: 'Get incremental transaction updates',
        },
        {
          name: 'Refresh Transactions',
          method: 'POST',
          path: '/transactions/refresh',
          description: 'Force refresh of transaction data',
        },
      ],
      codeExample: `// Get categorized transaction history
const response = await ghodex.transactionsGet({
  access_token: accessToken,
  start_date: "2024-10-01",
  end_date: "2024-11-13",
  options: {
    count: 100,
    offset: 0
  }
});

// Response includes enriched data:
{
  transactions: [
    {
      transaction_id: "txn_001",
      amount: -125.50,
      category: ["Food and Drink", "Restaurants"],
      merchant_name: "KFC",
      payment_channel: "in_store",
      location: {
        city: "Accra",
        country: "GH"
      },
      date: "2024-11-12"
    }
  ]
}`,
    },
    {
      id: 'payment',
      name: 'Payment Initiation',
      icon: Send,
      color: '#EF4444',
      description: 'Initiate payments to mobile money and bank accounts',
      tagline: 'Seamless Payments',
      features: [
        'Bank-to-bank transfers',
        'Mobile money payments (MTN, Vodafone, AirtelTigo)',
        'Real-time payment status tracking',
        'Payment scheduling',
        'Bulk payment support',
        'Automatic payment reconciliation',
      ],
      useCases: [
        'Bill payments and invoicing',
        'Loan disbursements',
        'Payroll and vendor payments',
        'P2P money transfers',
      ],
      endpoints: [
        {
          name: 'Create Payment',
          method: 'POST',
          path: '/payment_initiation/payment/create',
          description: 'Initiate a new payment',
        },
        {
          name: 'Get Payment',
          method: 'POST',
          path: '/payment_initiation/payment/get',
          description: 'Check payment status',
        },
        {
          name: 'Create Recipient',
          method: 'POST',
          path: '/payment_initiation/recipient/create',
          description: 'Add payment recipient',
        },
      ],
      codeExample: `// Initiate payment to mobile money
const payment = await ghodex.paymentCreate({
  recipient_id: "recipient_123",
  amount: {
    currency: "GHS",
    value: 500.00
  },
  reference: "Invoice #2024-001"
});

// Track payment status:
const status = await ghodex.paymentGet({
  payment_id: payment.payment_id
});

// Status: INITIATED → PROCESSING → EXECUTED
console.log(status.status);`,
    },
    {
      id: 'income',
      name: 'Income Verification',
      icon: TrendingUp,
      color: '#06B6D4',
      description: 'Verify income and employment for lending decisions',
      tagline: 'AI-Powered Income Analysis',
      features: [
        'Automatic income detection',
        'Income stream classification',
        'Monthly income calculation',
        'Income stability analysis',
        'Employment verification',
        'Projected annual income',
      ],
      useCases: [
        'Loan underwriting and approval',
        'Credit limit determination',
        'Rent and lease applications',
        'Background checks',
      ],
      endpoints: [
        {
          name: 'Get Income',
          method: 'POST',
          path: '/income/get',
          description: 'Retrieve income verification data',
        },
        {
          name: 'Create Income Verification',
          method: 'POST',
          path: '/income/verification/create',
          description: 'Generate income verification report',
        },
        {
          name: 'Precheck Income',
          method: 'POST',
          path: '/income/verification/precheck',
          description: 'Quick income assessment',
        },
      ],
      codeExample: `// Get income verification
const response = await ghodex.incomeGet({
  access_token: accessToken,
});

// Response includes AI analysis:
{
  income_streams: [
    {
      name: "Monthly Salary",
      confidence: "HIGH",
      monthly_flow: 5500.00,
      category: ["Income", "Salary"],
      start_date: "2023-01-01"
    }
  ],
  projected_yearly_income: 80400.00,
  last_year_income: 66000.00,
  number_of_income_streams: 2
}`,
    },
  ];

  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--neutral-200)] shadow-sm">
        <div className="px-4 py-6 max-w-7xl mx-auto">
          <h1 className="mb-2">Available Products</h1>
          <p className="text-lg text-[var(--neutral-700)] m-0">
            Comprehensive financial data products for Ghana's digital economy
          </p>
        </div>
      </header>

      {/* Product Navigation */}
      <div className="bg-white border-b border-[var(--neutral-200)] sticky top-0 z-40">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto py-4">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                    selectedProduct === product.id
                      ? 'bg-[var(--primary)] text-white shadow-lg'
                      : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{product.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <main className="px-4 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero */}
            <div className="bg-gradient-to-br from-white to-[var(--neutral-50)] rounded-2xl p-8 shadow-[var(--shadow-lg)] border border-[var(--neutral-200)]">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${currentProduct.color}15` }}
                >
                  <currentProduct.icon
                    className="w-8 h-8"
                    style={{ color: currentProduct.color }}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2">{currentProduct.name}</h2>
                  <p className="text-lg text-[var(--neutral-700)] m-0">
                    {currentProduct.tagline}
                  </p>
                </div>
              </div>
              <p className="text-[var(--neutral-700)] m-0">
                {currentProduct.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-md)]">
              <h3 className="mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[var(--secondary)]" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--neutral-700)]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-md)]">
              <h3 className="mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[var(--primary)]" />
                Common Use Cases
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProduct.useCases.map((useCase, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--neutral-700)]">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example */}
            <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-md)]">
              <h3 className="mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-[var(--secondary)]" />
                Code Example
              </h3>
              <div className="bg-[var(--neutral-900)] rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-[var(--neutral-50)] font-mono m-0">
                  {currentProduct.codeExample}
                </pre>
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="primary" size="md" onClick={() => window.location.hash = 'api-playground'}>
                  <Zap className="w-4 h-4 mr-2" />
                  Try in Playground
                </Button>
                <Button variant="secondary" size="md">
                  <Code className="w-4 h-4 mr-2" />
                  View Docs
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Endpoints & Info */}
          <div className="space-y-6">
            {/* Endpoints */}
            <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-md)] sticky top-24">
              <h3 className="mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
                API Endpoints
              </h3>
              <div className="space-y-3">
                {currentProduct.endpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[var(--neutral-200)] rounded-lg hover:border-[var(--primary)] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-[var(--success)]/10 text-[var(--success)] rounded text-xs">
                        {endpoint.method}
                      </span>
                      <code className="text-sm text-[var(--neutral-700)]">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="text-sm text-[var(--neutral-600)] m-0">
                      {endpoint.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--neutral-200)]">
                <div className="flex items-start gap-3 mb-4">
                  <Lock className="w-5 h-5 text-[var(--success)] flex-shrink-0" />
                  <div>
                    <p className="m-0 mb-1">Secure & Compliant</p>
                    <p className="text-sm text-[var(--neutral-600)] m-0">
                      Bank-level encryption and Bank of Ghana compliance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />
                  <div>
                    <p className="m-0 mb-1">Fast Response</p>
                    <p className="text-sm text-[var(--neutral-600)] m-0">
                      Average API response time of 245ms
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}