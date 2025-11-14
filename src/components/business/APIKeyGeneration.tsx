import React, { useState, useEffect } from 'react';
import { Key, Copy, Eye, EyeOff, CheckCircle, AlertTriangle, Code, Book, Rocket } from 'lucide-react';
import { Button } from '../Button';
import { APITier } from '../../config/business-verification';

interface APIKeyGenerationProps {
  tier: APITier;
  companyName: string;
  onComplete: () => void;
}

export function APIKeyGeneration({ tier, companyName, onComplete }: APIKeyGenerationProps) {
  const [generating, setGenerating] = useState(true);
  const [apiKeys, setApiKeys] = useState<{
    sandbox: { public: string; secret: string };
    production: { public: string; secret: string };
  } | null>(null);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [environment, setEnvironment] = useState<'sandbox' | 'production'>('sandbox');

  useEffect(() => {
    // Simulate API key generation
    setTimeout(() => {
      setApiKeys({
        sandbox: {
          public: 'pk_sandbox_' + generateRandomString(32),
          secret: 'sk_sandbox_' + generateRandomString(48),
        },
        production: {
          public: 'pk_live_' + generateRandomString(32),
          secret: 'sk_live_' + generateRandomString(48),
        },
      });
      setGenerating(false);
    }, 2000);
  }, []);

  const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentKeys = apiKeys?.[environment];

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white">
        <div className="px-4 py-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[var(--secondary)]" />
            </div>
            <div>
              <h1 className="text-white mb-1">Application Approved!</h1>
              <p className="text-white/90 m-0">Welcome to ReshADX, {companyName}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-4xl mx-auto">
        {generating ? (
          <div className="bg-white rounded-lg shadow-[var(--shadow-md)] p-12 text-center">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="mb-2">Generating Your API Keys...</h3>
            <p className="text-[var(--neutral-600)] m-0">
              Setting up your environment and creating secure credentials
            </p>
          </div>
        ) : (
          <>
            {/* Important Warning */}
            <div className="bg-[var(--warning)]/10 border border-[var(--warning)]/30 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="mb-2 text-[var(--warning)]">Save Your Secret Keys Now!</h4>
                  <p className="text-sm text-[var(--neutral-700)] m-0">
                    This is the only time your secret keys will be displayed in full. Store them securely - we cannot retrieve them later.
                    If you lose your secret key, you'll need to generate a new one.
                  </p>
                </div>
              </div>
            </div>

            {/* Environment Toggle */}
            <div className="bg-white rounded-lg shadow-[var(--shadow-md)] p-6 mb-6">
              <h3 className="mb-4">Your API Credentials</h3>
              
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setEnvironment('sandbox')}
                  className={`flex-1 px-4 py-3 rounded-lg transition-all ${
                    environment === 'sandbox'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]'
                  }`}
                >
                  <div>Sandbox Environment</div>
                  <div className="text-xs opacity-80">For testing</div>
                </button>
                <button
                  onClick={() => setEnvironment('production')}
                  className={`flex-1 px-4 py-3 rounded-lg transition-all ${
                    environment === 'production'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]'
                  }`}
                >
                  <div>Production Environment</div>
                  <div className="text-xs opacity-80">For live traffic</div>
                </button>
              </div>

              {/* Public Key */}
              <div className="mb-6">
                <label className="block text-sm mb-2">
                  Publishable Key
                  <span className="text-[var(--neutral-500)] ml-2">(Safe to use in client-side code)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentKeys?.public || ''}
                    readOnly
                    className="flex-1 px-4 py-3 bg-[var(--neutral-50)] border border-[var(--neutral-300)] rounded-lg font-mono text-sm"
                  />
                  <Button
                    variant={copiedKey === 'public' ? 'success' : 'secondary'}
                    onClick={() => handleCopy(currentKeys?.public || '', 'public')}
                  >
                    {copiedKey === 'public' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              {/* Secret Key */}
              <div className="mb-4">
                <label className="block text-sm mb-2">
                  Secret Key
                  <span className="text-[var(--error)] ml-2">(Never share or expose in client code)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type={showSecretKey ? 'text' : 'password'}
                    value={currentKeys?.secret || ''}
                    readOnly
                    className="flex-1 px-4 py-3 bg-[var(--neutral-50)] border border-[var(--neutral-300)] rounded-lg font-mono text-sm"
                  />
                  <Button
                    variant="secondary"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                  >
                    {showSecretKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant={copiedKey === 'secret' ? 'success' : 'secondary'}
                    onClick={() => handleCopy(currentKeys?.secret || '', 'secret')}
                  >
                    {copiedKey === 'secret' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <div className="bg-[var(--neutral-100)] rounded-lg p-4">
                <h5 className="text-sm mb-2">Quick Start Code</h5>
                <pre className="bg-[var(--neutral-900)] text-[var(--neutral-100)] p-4 rounded-lg overflow-x-auto text-sm">
{`import { ReshADX } from 'reshadx';

const reshadx = new ReshADX({
  apiKey: '${currentKeys?.secret}',
  environment: '${environment}',
});

// Verify identity
const result = await reshadx.identity.verify({
  type: 'ghana_card',
  number: 'GHA-123456789-1',
  dateOfBirth: '1990-05-20',
});`}
                </pre>
              </div>
            </div>

            {/* Next Steps */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <a
                href="#developer"
                className="block bg-white rounded-lg shadow-[var(--shadow-sm)] p-6 hover:shadow-[var(--shadow-md)] transition-all border border-transparent hover:border-[var(--primary)]"
              >
                <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center mb-4">
                  <Book className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h4 className="mb-2">Read Documentation</h4>
                <p className="text-sm text-[var(--neutral-600)] m-0">
                  Complete API reference and integration guides
                </p>
              </a>

              <a
                href="#api-playground"
                className="block bg-white rounded-lg shadow-[var(--shadow-sm)] p-6 hover:shadow-[var(--shadow-md)] transition-all border border-transparent hover:border-[var(--primary)]"
              >
                <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-[var(--secondary)]" />
                </div>
                <h4 className="mb-2">Try API Playground</h4>
                <p className="text-sm text-[var(--neutral-600)] m-0">
                  Test endpoints with your new API keys
                </p>
              </a>

              <a
                href="#dev-tools"
                className="block bg-white rounded-lg shadow-[var(--shadow-sm)] p-6 hover:shadow-[var(--shadow-md)] transition-all border border-transparent hover:border-[var(--primary)]"
              >
                <div className="w-12 h-12 bg-[var(--success)]/10 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-[var(--success)]" />
                </div>
                <h4 className="mb-2">Developer Tools</h4>
                <p className="text-sm text-[var(--neutral-600)] m-0">
                  Webhooks, logs, and monitoring dashboard
                </p>
              </a>
            </div>

            {/* Security Best Practices */}
            <div className="bg-white rounded-lg shadow-[var(--shadow-md)] p-6 mb-8">
              <h4 className="mb-4">Security Best Practices</h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="text-sm mb-2">✅ Do</h5>
                  <ul className="space-y-1 pl-4 m-0">
                    <li>Store secret keys in environment variables</li>
                    <li>Use different keys for sandbox and production</li>
                    <li>Rotate keys regularly (every 90 days)</li>
                    <li>Use the publishable key in client-side code</li>
                    <li>Monitor API usage in your dashboard</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm mb-2 text-[var(--error)]">❌ Don't</h5>
                  <ul className="space-y-1 pl-4 m-0">
                    <li>Commit secret keys to version control</li>
                    <li>Share keys via email or chat</li>
                    <li>Use production keys for testing</li>
                    <li>Expose secret keys in client-side JavaScript</li>
                    <li>Use the same key across multiple apps</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={onComplete}
              fullWidth
            >
              Go to Dashboard
            </Button>
          </>
        )}
      </main>
    </div>
  );
}
