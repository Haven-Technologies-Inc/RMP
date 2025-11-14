import React, { useState } from 'react';
import { Play, Copy, CheckCircle2, AlertCircle, Code, Book, Zap } from 'lucide-react';
import { Button } from './Button';
import { handleApiRequest } from '../api';

interface APIPlaygroundProps {
  language?: string;
  onLanguageChange?: (lang: string) => void;
}

export function APIPlayground({ language = 'en', onLanguageChange }: APIPlaygroundProps) {
  const [selectedExample, setSelectedExample] = useState('create-link-token');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const examples = {
    'create-link-token': {
      title: 'Create Link Token',
      description: 'Initialize the Link flow for user authentication',
      endpoint: '/link/token/create',
      method: 'POST',
      body: {
        client_id: 'test_client_id',
        secret: 'test_secret',
        client_name: 'QuickLoan Pro',
        user: {
          client_user_id: 'user_123',
          legal_name: 'Kwame Mensah',
          phone_number: '+233501234567',
          email_address: 'kwame@email.com',
        },
        products: ['auth', 'transactions', 'balance', 'identity'],
        country_codes: ['GH'],
        language: 'en',
        webhook: 'https://myapp.com/webhook',
      },
    },
    'get-accounts': {
      title: 'Get Accounts',
      description: 'Retrieve all accounts for a connected user',
      endpoint: '/accounts/get',
      method: 'POST',
      body: {
        client_id: 'test_client_id',
        secret: 'test_secret',
        access_token: 'access-sandbox-demo',
      },
    },
    'get-transactions': {
      title: 'Get Transactions',
      description: 'Fetch transaction history for a date range',
      endpoint: '/transactions/get',
      method: 'POST',
      body: {
        client_id: 'test_client_id',
        secret: 'test_secret',
        access_token: 'access-sandbox-demo',
        start_date: '2024-10-01',
        end_date: '2024-11-13',
        options: {
          count: 10,
          offset: 0,
        },
      },
    },
    'get-balance': {
      title: 'Get Balance',
      description: 'Check real-time account balances',
      endpoint: '/balance/get',
      method: 'POST',
      body: {
        client_id: 'test_client_id',
        secret: 'test_secret',
        access_token: 'access-sandbox-demo',
      },
    },
    'get-identity': {
      title: 'Get Identity',
      description: 'Retrieve identity information including Ghana Card',
      endpoint: '/identity/get',
      method: 'POST',
      body: {
        client_id: 'test_client_id',
        secret: 'test_secret',
        access_token: 'access-sandbox-demo',
      },
    },
    'get-institutions': {
      title: 'Get Institutions',
      description: 'List all supported financial institutions',
      endpoint: '/institutions/get',
      method: 'POST',
      body: {
        client_id: 'test_client_id',
        secret: 'test_secret',
        country_codes: ['GH'],
      },
    },
    'create-payment': {
      title: 'Create Payment',
      description: 'Initiate a payment to mobile money or bank account',
      endpoint: '/payment_initiation/payment/create',
      method: 'POST',
      body: {
        client_id: 'test_client_id',
        secret: 'test_secret',
        recipient_id: 'recipient_123',
        reference: 'Invoice #2024-001',
        amount: {
          currency: 'GHS',
          value: 500.00,
        },
      },
    },
    'get-income': {
      title: 'Get Income',
      description: 'Retrieve income verification data',
      endpoint: '/income/get',
      method: 'POST',
      body: {
        client_id: 'test_client_id',
        secret: 'test_secret',
        access_token: 'access-sandbox-demo',
      },
    },
    'verify-identity': {
      title: 'Verify Identity',
      description: 'Verify user identity with Ghana Card',
      endpoint: '/verification/identity',
      method: 'POST',
      body: {
        client_id: 'test_client_id',
        secret: 'test_secret',
        ghana_card_number: 'GHA-123456789-1',
        full_name: 'Kwame Mensah',
        date_of_birth: '1990-01-15',
        phone_number: '+233501234567',
        verification_level: 'enhanced',
      },
    },
    'cash-flow-analysis': {
      title: 'Cash Flow Analysis',
      description: 'Get detailed cash flow insights',
      endpoint: '/analytics/cash_flow',
      method: 'POST',
      body: {
        client_id: 'test_client_id',
        secret: 'test_secret',
        access_token: 'access-sandbox-demo',
        account_id: 'acc_savings_001',
        start_date: '2024-10-01',
        end_date: '2024-11-13',
      },
    },
  };

  const currentExample = examples[selectedExample as keyof typeof examples];

  const handleRunExample = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await handleApiRequest(
        currentExample.endpoint,
        currentExample.method,
        currentExample.body
      );
      setResponse(result);
    } catch (err: any) {
      setError(err.error_message || 'An error occurred');
      setResponse(err);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen bg-[var(--neutral-50)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 flex items-center gap-3">
            <Zap className="w-8 h-8 text-[var(--secondary)]" />
            Ghana Open Data Exchange API Playground
          </h1>
          <p className="text-lg text-[var(--neutral-700)]">
            Test API endpoints in real-time with working examples. All requests use sandbox mode.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-[var(--shadow-sm)]">
            <p className="text-sm text-[var(--neutral-600)] mb-1 m-0">Total Endpoints</p>
            <p className="text-2xl m-0">40+</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-[var(--shadow-sm)]">
            <p className="text-sm text-[var(--neutral-600)] mb-1 m-0">Institutions</p>
            <p className="text-2xl m-0">23+</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-[var(--shadow-sm)]">
            <p className="text-sm text-[var(--neutral-600)] mb-1 m-0">Products</p>
            <p className="text-2xl m-0">10</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-[var(--shadow-sm)]">
            <p className="text-sm text-[var(--neutral-600)] mb-1 m-0">Avg Response</p>
            <p className="text-2xl m-0">245ms</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Example Selector */}
          <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-[var(--primary)]" />
              API Examples
            </h3>
            <div className="space-y-2">
              {Object.entries(examples).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => setSelectedExample(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedExample === key
                      ? 'bg-[var(--primary)] text-white'
                      : 'hover:bg-[var(--neutral-50)] text-[var(--neutral-700)]'
                  }`}
                >
                  <p className="m-0 mb-1">{example.title}</p>
                  <p className={`text-sm m-0 ${
                    selectedExample === key ? 'text-white/80' : 'text-[var(--neutral-600)]'
                  }`}>
                    {example.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Request & Response */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request */}
            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="m-0">{currentExample.title}</h3>
                <span className="px-3 py-1 bg-[var(--success)]/10 text-[var(--success)] rounded text-sm">
                  {currentExample.method}
                </span>
              </div>
              
              <p className="text-[var(--neutral-600)] mb-4">{currentExample.description}</p>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm m-0">Endpoint</p>
                  <button
                    onClick={() => copyCode(currentExample.endpoint)}
                    className="text-[var(--primary)] hover:underline text-sm flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
                <code className="block bg-[var(--neutral-900)] text-[var(--neutral-50)] p-3 rounded-lg text-sm">
                  {currentExample.method} {currentExample.endpoint}
                </code>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm m-0">Request Body</p>
                  <button
                    onClick={() => copyCode(JSON.stringify(currentExample.body, null, 2))}
                    className="text-[var(--primary)] hover:underline text-sm flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
                <div className="bg-[var(--neutral-900)] text-[var(--neutral-50)] p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-96 overflow-y-auto">
                  <pre>{JSON.stringify(currentExample.body, null, 2)}</pre>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleRunExample}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Run Example
                  </>
                )}
              </Button>
            </div>

            {/* Response */}
            {(response || error) && (
              <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="m-0">Response</h3>
                  {error ? (
                    <div className="flex items-center gap-2 text-[var(--error)]">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">Error</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[var(--success)]">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm">Success</span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm m-0">Response Body</p>
                    <button
                      onClick={() => copyCode(JSON.stringify(response, null, 2))}
                      className="text-[var(--primary)] hover:underline text-sm flex items-center gap-1"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                  <div className="bg-[var(--neutral-900)] text-[var(--neutral-50)] p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-96 overflow-y-auto">
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* Documentation Link */}
            <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-xl p-6 border-2 border-[var(--primary)]/20">
              <div className="flex items-start gap-4">
                <Book className="w-6 h-6 text-[var(--primary)] flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="mb-2">Need Help?</h4>
                  <p className="text-[var(--neutral-700)] mb-4 m-0">
                    Check out our comprehensive API documentation for detailed guides, authentication flows, and best practices.
                  </p>
                  <Button variant="primary" size="md">
                    View Full Documentation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}