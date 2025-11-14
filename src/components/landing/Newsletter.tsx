import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Button } from '../Button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful subscription
      setStatus('success');
      setMessage('Successfully subscribed! Check your inbox.');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-white text-4xl mb-4">Stay in the Loop</h2>
        <p className="text-white/90 text-xl mb-8">
          Get the latest updates on African fintech, identity verification, API releases, and exclusive insights delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:border-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Email address"
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={status === 'loading' || status === 'success'}
              className="bg-white text-[#06B6D4] hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
              icon={status === 'loading' ? <Loader className="w-5 h-5 animate-spin" /> : undefined}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-white">
              <CheckCircle className="w-5 h-5" />
              <span>{message}</span>
            </div>
          )}
          
          {status === 'error' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-white">
              <AlertCircle className="w-5 h-5" />
              <span>{message}</span>
            </div>
          )}
        </form>

        <p className="text-white/70 text-sm mt-6">
          We respect your privacy. Unsubscribe at any time. 
          <br />
          By subscribing, you agree to our{' '}
          <a href="/privacy-policy" className="underline hover:text-white">Privacy Policy</a>.
        </p>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-8 text-white/60 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Weekly insights</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
