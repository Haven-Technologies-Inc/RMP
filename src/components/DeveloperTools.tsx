import React, { useState } from 'react';
import {
  Terminal,
  Activity,
  Key,
  Webhook,
  BarChart3,
  Clock,
  AlertCircle,
  CheckCircle2,
  Copy,
  Play,
  Settings,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  Globe,
  Code,
} from 'lucide-react';
import { Button } from './Button';

interface DeveloperToolsProps {
  language?: string;
  onLanguageChange?: (lang: string) => void;
}

export function DeveloperTools({ language = 'en', onLanguageChange }: DeveloperToolsProps) {
  const [activeTab, setActiveTab] = useState<'api-tester' | 'logs' | 'analytics' | 'webhooks' | 'keys'>('api-tester');
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState('/accounts/get');
  const [requestBody, setRequestBody] = useState(JSON.stringify({
    client_id: "your_client_id",
    secret: "your_secret",
    access_token: "access-sandbox-abc123"
  }, null, 2));
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    { path: '/link/token/create', method: 'POST', category: 'Link' },
    { path: '/item/public_token/exchange', method: 'POST', category: 'Link' },
    { path: '/accounts/get', method: 'POST', category: 'Accounts' },
    { path: '/balance/get', method: 'POST', category: 'Accounts' },
    { path: '/transactions/get', method: 'POST', category: 'Transactions' },
    { path: '/transactions/sync', method: 'POST', category: 'Transactions' },
    { path: '/identity/get', method: 'POST', category: 'Identity' },
    { path: '/identity/match', method: 'POST', category: 'Identity' },
    { path: '/income/get', method: 'POST', category: 'Income' },
    { path: '/payment_initiation/payment/create', method: 'POST', category: 'Payment' },
    { path: '/payment_initiation/payment/get', method: 'POST', category: 'Payment' },
    { path: '/institutions/get', method: 'POST', category: 'Institutions' },
    { path: '/institutions/get_by_id', method: 'POST', category: 'Institutions' },
    { path: '/item/get', method: 'POST', category: 'Item' },
    { path: '/item/remove', method: 'POST', category: 'Item' },
    { path: '/item/webhook/update', method: 'POST', category: 'Webhooks' },
  ];

  const apiLogs = [
    {
      id: 'log_001',
      timestamp: '2024-11-13 09:45:23',
      method: 'POST',
      endpoint: '/transactions/get',
      status: 200,
      responseTime: 245,
      requestId: 'req_abc123',
    },
    {
      id: 'log_002',
      timestamp: '2024-11-13 09:44:15',
      method: 'POST',
      endpoint: '/balance/get',
      status: 200,
      responseTime: 156,
      requestId: 'req_def456',
    },
    {
      id: 'log_003',
      timestamp: '2024-11-13 09:43:02',
      method: 'POST',
      endpoint: '/accounts/get',
      status: 400,
      responseTime: 89,
      requestId: 'req_ghi789',
    },
  ];

  const webhookEvents = [
    {
      id: 'event_001',
      type: 'transaction.created',
      status: 'delivered',
      timestamp: '2024-11-13 09:45:00',
      httpStatus: 200,
      attempts: 1,
    },
    {
      id: 'event_002',
      type: 'balance.updated',
      status: 'failed',
      timestamp: '2024-11-13 09:30:00',
      httpStatus: 500,
      attempts: 3,
    },
    {
      id: 'event_003',
      type: 'payment.completed',
      status: 'delivered',
      timestamp: '2024-11-13 09:15:00',
      httpStatus: 200,
      attempts: 1,
    },
  ];

  const apiKeys = [
    {
      id: 'key_001',
      name: 'Production API Key',
      prefix: 'ghodex_prod_',
      created: '2024-01-15',
      lastUsed: '2024-11-13 09:45:00',
      status: 'active',
    },
    {
      id: 'key_002',
      name: 'Sandbox Testing',
      prefix: 'ghodex_sandbox_',
      created: '2024-11-01',
      lastUsed: '2024-11-13 08:30:00',
      status: 'active',
    },
  ];

  const handleTestRequest = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResponse({
        status: 200,
        headers: {
          'content-type': 'application/json',
          'x-request-id': 'req_' + Math.random().toString(36).substr(2, 9),
          'x-ratelimit-limit': '1000',
          'x-ratelimit-remaining': '856',
        },
        body: {
          accounts: [
            {
              account_id: 'acc_savings_001',
              balances: {
                available: 15420.50,
                current: 15420.50,
                iso_currency_code: 'GHS',
              },
              name: 'Savings Account',
              type: 'depository',
              subtype: 'savings',
            },
          ],
          request_id: 'req_' + Math.random().toString(36).substr(2, 9),
        },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white shadow-[var(--shadow-lg)]">
        <div className="px-4 py-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="m-0 text-white flex items-center gap-2">
                <Terminal className="w-8 h-8" />
                Developer Tools
              </h1>
              <p className="text-sm text-white/80 m-0 mt-1">Test, monitor, and debug your integration</p>
            </div>
            <Button variant="secondary" size="md">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b border-[var(--neutral-200)] sticky top-0 z-40 shadow-sm">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'api-tester', label: 'API Tester', icon: Play },
              { id: 'logs', label: 'Request Logs', icon: Activity },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'webhooks', label: 'Webhooks', icon: Webhook },
              { id: 'keys', label: 'API Keys', icon: Key },
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
        {/* API TESTER */}
        {activeTab === 'api-tester' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-xl p-6 border-2 border-[var(--primary)]/20">
              <h2 className="mb-2 flex items-center gap-2">
                <Play className="w-6 h-6 text-[var(--primary)]" />
                API Request Tester
              </h2>
              <p className="text-[var(--neutral-700)] m-0">
                Test API endpoints directly from your browser with sample requests
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Request Builder */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
                  <h3 className="mb-4">Request</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm mb-2">Endpoint</label>
                    <select
                      value={selectedEndpoint}
                      onChange={(e) => setSelectedEndpoint(e.target.value)}
                      className="w-full px-4 py-2 border border-[var(--neutral-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      {endpoints.map((endpoint) => (
                        <option key={endpoint.path} value={endpoint.path}>
                          {endpoint.method} {endpoint.path}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm mb-2">Request Body (JSON)</label>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      rows={12}
                      className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleTestRequest}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Send Request
                      </>
                    )}
                  </Button>
                </div>

                {/* Request Examples */}
                <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
                  <h4 className="mb-3">Quick Examples</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[var(--neutral-50)] transition-colors text-sm">
                      Get Accounts
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[var(--neutral-50)] transition-colors text-sm">
                      Get Transactions (Last 30 days)
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[var(--neutral-50)] transition-colors text-sm">
                      Create Link Token
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[var(--neutral-50)] transition-colors text-sm">
                      Verify Identity
                    </button>
                  </div>
                </div>
              </div>

              {/* Response Viewer */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
                  <h3 className="mb-4">Response</h3>
                  
                  {response ? (
                    <>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded text-sm ${
                            response.status === 200
                              ? 'bg-[var(--success)]/10 text-[var(--success)]'
                              : 'bg-[var(--error)]/10 text-[var(--error)]'
                          }`}>
                            {response.status} {response.status === 200 ? 'OK' : 'Error'}
                          </span>
                          <span className="text-sm text-[var(--neutral-600)]">
                            Request ID: {response.headers['x-request-id']}
                          </span>
                        </div>
                        <Button variant="tertiary" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm mb-2">Headers</p>
                        <div className="bg-[var(--neutral-900)] text-[var(--neutral-50)] p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{JSON.stringify(response.headers, null, 2)}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm mb-2">Body</p>
                        <div className="bg-[var(--neutral-900)] text-[var(--neutral-50)] p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-96 overflow-y-auto">
                          <pre>{JSON.stringify(response.body, null, 2)}</pre>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12 text-[var(--neutral-500)]">
                      <Terminal className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="m-0">Send a request to see the response</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REQUEST LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="m-0">Request Logs</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--neutral-400)]" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="pl-10 pr-4 py-2 border border-[var(--neutral-300)] rounded-lg text-sm"
                  />
                </div>
                <Button variant="secondary" size="md">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--neutral-50)] border-b border-[var(--neutral-200)]">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm">Timestamp</th>
                      <th className="text-left px-6 py-3 text-sm">Method</th>
                      <th className="text-left px-6 py-3 text-sm">Endpoint</th>
                      <th className="text-left px-6 py-3 text-sm">Status</th>
                      <th className="text-left px-6 py-3 text-sm">Response Time</th>
                      <th className="text-left px-6 py-3 text-sm">Request ID</th>
                      <th className="text-left px-6 py-3 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiLogs.map((log) => (
                      <tr key={log.id} className="border-b border-[var(--neutral-200)] hover:bg-[var(--neutral-50)]">
                        <td className="px-6 py-4 text-sm">{log.timestamp}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs">
                            {log.method}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-mono">{log.endpoint}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            log.status === 200
                              ? 'bg-[var(--success)]/10 text-[var(--success)]'
                              : 'bg-[var(--error)]/10 text-[var(--error)]'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{log.responseTime}ms</td>
                        <td className="px-6 py-4 text-sm font-mono text-[var(--neutral-600)]">
                          {log.requestId}
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="tertiary" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2>API Analytics</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-[var(--neutral-600)] m-0">Total Requests</p>
                  <Activity className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <p className="text-3xl m-0 mb-1">45,678</p>
                <div className="flex items-center gap-1 text-sm text-[var(--success)]">
                  <TrendingUp className="w-4 h-4" />
                  <span>12.5% from last week</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-[var(--neutral-600)] m-0">Success Rate</p>
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                </div>
                <p className="text-3xl m-0 mb-1">99.1%</p>
                <div className="flex items-center gap-1 text-sm text-[var(--success)]">
                  <TrendingUp className="w-4 h-4" />
                  <span>0.3% improvement</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-[var(--neutral-600)] m-0">Avg Response Time</p>
                  <Clock className="w-5 h-5 text-[var(--secondary)]" />
                </div>
                <p className="text-3xl m-0 mb-1">245ms</p>
                <div className="flex items-center gap-1 text-sm text-[var(--success)]">
                  <TrendingDown className="w-4 h-4" />
                  <span>15ms faster</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-[var(--neutral-600)] m-0">Error Rate</p>
                  <AlertCircle className="w-5 h-5 text-[var(--error)]" />
                </div>
                <p className="text-3xl m-0 mb-1">0.9%</p>
                <div className="flex items-center gap-1 text-sm text-[var(--success)]">
                  <TrendingDown className="w-4 h-4" />
                  <span>0.3% decrease</span>
                </div>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
                <h3 className="mb-4">Requests by Endpoint</h3>
                <div className="space-y-3">
                  {[
                    { endpoint: '/transactions/get', count: 18456, color: 'var(--primary)' },
                    { endpoint: '/accounts/get', count: 15234, color: 'var(--secondary)' },
                    { endpoint: '/balance/get', count: 8234, color: 'var(--success)' },
                    { endpoint: '/identity/get', count: 2345, color: '#F59E0B' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-mono">{item.endpoint}</span>
                        <span className="text-sm">{item.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-[var(--neutral-100)] rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(item.count / 18456) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
                <h3 className="mb-4">Response Time Distribution</h3>
                <div className="space-y-3">
                  {[
                    { range: '0-100ms', percentage: 45 },
                    { range: '100-250ms', percentage: 35 },
                    { range: '250-500ms', percentage: 15 },
                    { range: '500ms+', percentage: 5 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{item.range}</span>
                        <span className="text-sm">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-[var(--neutral-100)] rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[var(--primary)]"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WEBHOOKS */}
        {activeTab === 'webhooks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="m-0">Webhook Deliveries</h2>
              <Button variant="primary" size="md">
                <Settings className="w-4 h-4 mr-2" />
                Configure Webhooks
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6">
              <div className="space-y-4">
                {webhookEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-[var(--neutral-200)] rounded-lg"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div>
                        {event.status === 'delivered' ? (
                          <CheckCircle2 className="w-6 h-6 text-[var(--success)]" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-[var(--error)]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="m-0 mb-1">{event.type}</p>
                        <p className="text-sm text-[var(--neutral-600)] m-0">
                          {event.timestamp} • HTTP {event.httpStatus} • {event.attempts} attempt(s)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="tertiary" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {event.status === 'failed' && (
                        <Button variant="secondary" size="sm">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* API KEYS */}
        {activeTab === 'keys' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="m-0">API Keys</h2>
              <Button variant="primary" size="md">
                <Key className="w-4 h-4 mr-2" />
                Create New Key
              </Button>
            </div>

            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="bg-white rounded-xl shadow-[var(--shadow-md)] p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-2">{key.name}</h3>
                      <div className="flex items-center gap-3">
                        <code className="text-sm bg-[var(--neutral-100)] px-3 py-1 rounded">
                          {key.prefix}••••••••••••••••
                        </code>
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="text-[var(--primary)] hover:underline text-sm flex items-center gap-1"
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          {showApiKey ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[var(--success)]/10 text-[var(--success)] rounded text-sm">
                      {key.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[var(--neutral-600)]">
                    <span>Created: {key.created}</span>
                    <span>Last used: {key.lastUsed}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Button variant="secondary" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Key
                    </Button>
                    <Button variant="tertiary" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="tertiary" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}