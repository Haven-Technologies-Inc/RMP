import React, { useState } from 'react';
import { Play, Copy, Check, Code, Zap, AlertCircle } from 'lucide-react';
import { Button } from '../Button';

const endpoints = [
  {
    name: 'Verify Identity',
    method: 'POST',
    endpoint: '/v1/identity/verify',
    description: 'Verify a user\'s identity using government ID',
    request: `{
  "country": "GH",
  "id_type": "ghana_card",
  "id_number": "GHA-123456789-0",
  "first_name": "Kwame",
  "last_name": "Mensah",
  "date_of_birth": "1990-05-15"
}`,
    response: `{
  "status": "success",
  "verified": true,
  "match_score": 98,
  "data": {
    "full_name": "Kwame Mensah",
    "id_number": "GHA-123456789-0",
    "date_of_birth": "1990-05-15",
    "nationality": "Ghanaian",
    "photo_url": "https://..."
  },
  "verification_id": "ver_7d8a9b0c1e2f"
}`,
  },
  {
    name: 'Get Bank Accounts',
    method: 'GET',
    endpoint: '/v1/accounts/list',
    description: 'Retrieve user\'s connected bank accounts',
    request: `GET /v1/accounts/list
Authorization: Bearer YOUR_API_KEY
User-Token: user_token_xyz`,
    response: `{
  "status": "success",
  "accounts": [
    {
      "account_id": "acc_123abc",
      "bank_name": "Access Bank Ghana",
      "account_number": "****5678",
      "account_type": "savings",
      "balance": 12500.50,
      "currency": "GHS"
    },
    {
      "account_id": "acc_456def",
      "bank_name": "MTN Mobile Money",
      "account_number": "****9012",
      "account_type": "mobile_money",
      "balance": 3240.00,
      "currency": "GHS"
    }
  ]
}`,
  },
  {
    name: 'Credit Score',
    method: 'POST',
    endpoint: '/v1/credit/score',
    description: 'Calculate credit score using AI/ML models',
    request: `{
  "user_id": "usr_abc123",
  "include_alternative_data": true,
  "model": "standard"
}`,
    response: `{
  "status": "success",
  "credit_score": 720,
  "score_range": "650-850",
  "grade": "B+",
  "risk_category": "low",
  "factors": {
    "positive": [
      "Consistent income",
      "Low debt-to-income ratio",
      "Regular mobile money usage"
    ],
    "negative": [
      "Limited credit history"
    ]
  },
  "recommendation": "approve"
}`,
  },
];

export function APIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [copiedRequest, setCopiedRequest] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const currentEndpoint = endpoints[selectedEndpoint];

  const handleRunAPI = async () => {
    setIsRunning(true);
    setShowResponse(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setShowResponse(true);
    setIsRunning(false);
  };

  const copyToClipboard = (text: string, type: 'request' | 'response') => {
    navigator.clipboard.writeText(text);
    if (type === 'request') {
      setCopiedRequest(true);
      setTimeout(() => setCopiedRequest(false), 2000);
    } else {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0A2540] to-[#1E293B]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#06B6D4]/20 to-[#7C3AED]/20 border border-[#06B6D4]/30 rounded-full mb-6">
            <Code className="w-4 h-4 text-[#06B6D4]" />
            <span className="text-sm text-white">Interactive Demo</span>
          </div>
          <h2 className="text-white text-4xl lg:text-5xl mb-4">
            Try Our API Live
          </h2>
          <p className="text-white/70 text-xl max-w-3xl mx-auto">
            Test our endpoints in real-time. No signup required for sandbox mode.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Endpoint Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4">
              <h3 className="text-white mb-4 px-2">Select Endpoint</h3>
              <div className="space-y-2">
                {endpoints.map((endpoint, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedEndpoint(index);
                      setShowResponse(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedEndpoint === index
                        ? 'bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="text-sm">{endpoint.name}</span>
                    </div>
                    <div className="text-xs opacity-60">{endpoint.endpoint}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* API Tester */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="border-b border-white/10 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white text-xl mb-1">{currentEndpoint.name}</h3>
                    <p className="text-white/60 text-sm">{currentEndpoint.description}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-lg ${
                    currentEndpoint.method === 'POST' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {currentEndpoint.method}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm font-mono bg-black/20 px-4 py-2 rounded-lg">
                  <Code className="w-4 h-4" />
                  {currentEndpoint.endpoint}
                </div>
              </div>

              {/* Request */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white">Request</h4>
                  <button
                    onClick={() => copyToClipboard(currentEndpoint.request, 'request')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white text-sm transition-all"
                  >
                    {copiedRequest ? (
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
                <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                  <code className="text-[#06B6D4] text-sm font-mono">{currentEndpoint.request}</code>
                </pre>
              </div>

              {/* Run Button */}
              <div className="p-6 border-b border-white/10">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleRunAPI}
                  disabled={isRunning}
                  fullWidth
                  className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]"
                  icon={isRunning ? <Zap className="w-5 h-5 animate-pulse" /> : <Play className="w-5 h-5" />}
                >
                  {isRunning ? 'Running...' : 'Run API Call'}
                </Button>
                
                {!showResponse && !isRunning && (
                  <div className="mt-4 flex items-center gap-2 text-white/60 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>This is sandbox mode with mock data. No real API calls are made.</span>
                  </div>
                )}
              </div>

              {/* Response */}
              {showResponse && (
                <div className="p-6 animate-slide-in">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white">Response</h4>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                        200 OK
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(currentEndpoint.response, 'response')}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white text-sm transition-all"
                    >
                      {copiedResponse ? (
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
                  <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                    <code className="text-green-400 text-sm font-mono">{currentEndpoint.response}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="mt-6 bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#06B6D4] mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-white mb-2">
                    <strong>Ready to integrate?</strong>
                  </p>
                  <p className="text-white/70">
                    Get your free API keys and access full documentation, SDKs, and postman collections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
