import React, { useState } from 'react';
import { X, Building2, User, Mail, Lock, Phone, Shield, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../Button';

interface DemoLoginModalProps {
  type: 'business' | 'individual';
  onClose: () => void;
  onLogin: () => void;
  onSkipToDashboard: () => void;
  onDemoLogin?: () => void;
}

export function DemoLoginModal({ type, onClose, onLogin, onSkipToDashboard, onDemoLogin }: DemoLoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const isBusiness = type === 'business';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBusiness) {
      // Validate business credentials
      if (email === 'demo@business.reshadx.com' && password === 'BusinessDemo2024!') {
        onLogin();
      } else {
        alert('Invalid credentials. Use the demo credentials provided.');
      }
    } else {
      // Validate individual credentials
      if (phone === '+233501234567' && otp === '123456') {
        onLogin();
      } else {
        alert('Invalid credentials. Use the demo credentials provided.');
      }
    }
  };

  const fillDemoCredentials = () => {
    if (isBusiness) {
      setEmail('demo@business.reshadx.com');
      setPassword('BusinessDemo2024!');
    } else {
      setPhone('+233501234567');
      setOtp('123456');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A2540] border border-white/10 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`p-6 border-b border-white/10 bg-gradient-to-r ${
          isBusiness ? 'from-[#06B6D4]/20 to-[#0891B2]/20' : 'from-[#7C3AED]/20 to-[#6D28D9]/20'
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${
              isBusiness ? 'from-[#06B6D4] to-[#0891B2]' : 'from-[#7C3AED] to-[#6D28D9]'
            } rounded-xl flex items-center justify-center`}>
              {isBusiness ? (
                <Building2 className="w-7 h-7 text-white" />
              ) : (
                <User className="w-7 h-7 text-white" />
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <h3 className="text-white text-2xl mb-2">
            {isBusiness ? 'Business Portal Login' : 'Individual Portal Login'}
          </h3>
          <p className="text-white/70 text-sm">
            {isBusiness 
              ? 'Access the developer dashboard with demo credentials'
              : 'Access your verification profile with demo credentials'
            }
          </p>
        </div>

        {/* Login Form */}
        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {isBusiness ? (
              <>
                {/* Email Input */}
                <div>
                  <label className="block text-white text-sm mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="demo@business.reshadx.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-white text-sm mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="BusinessDemo2024!"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Phone Input */}
                <div>
                  <label className="block text-white text-sm mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+233 50 123 4567"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50"
                      required
                    />
                  </div>
                </div>

                {/* OTP Input */}
                <div>
                  <label className="block text-white text-sm mb-2">OTP Code</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      maxLength={6}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 tracking-widest"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Auto-fill Demo Credentials */}
            <button
              type="button"
              onClick={fillDemoCredentials}
              className={`w-full text-sm ${
                isBusiness ? 'text-[#06B6D4] hover:text-[#06B6D4]/80' : 'text-[#7C3AED] hover:text-[#7C3AED]/80'
              } text-center py-2 transition-colors`}
            >
              ✨ Auto-fill demo credentials
            </button>

            {/* Demo Credentials Display */}
            <div className={`bg-black/40 border ${
              isBusiness ? 'border-[#06B6D4]/30' : 'border-[#7C3AED]/30'
            } rounded-lg p-4`}>
              <div className="text-white/60 text-xs mb-2">Demo Credentials:</div>
              <div className="font-mono text-sm space-y-1">
                {isBusiness ? (
                  <>
                    <div className="text-white/80">
                      <span className="text-white/50">Email:</span>{' '}
                      <span className="text-[#06B6D4]">demo@business.reshadx.com</span>
                    </div>
                    <div className="text-white/80">
                      <span className="text-white/50">Password:</span>{' '}
                      <span className="text-[#06B6D4]">BusinessDemo2024!</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-white/80">
                      <span className="text-white/50">Phone:</span>{' '}
                      <span className="text-[#7C3AED]">+233 50 123 4567</span>
                    </div>
                    <div className="text-white/80">
                      <span className="text-white/50">OTP:</span>{' '}
                      <span className="text-[#7C3AED]">123456</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              className={`bg-gradient-to-r ${
                isBusiness ? 'from-[#06B6D4] to-[#0891B2]' : 'from-[#7C3AED] to-[#6D28D9]'
              } mt-6`}
              iconRight={<ArrowRight className="w-5 h-5" />}
            >
              Login to Dashboard
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Skip to Dashboard */}
          <button
            onClick={onSkipToDashboard}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all group"
          >
            <Zap className="w-5 h-5 text-yellow-400" />
            <span>Skip & Access Dashboard Directly</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-white/50 text-xs text-center mt-4">
            {isBusiness 
              ? 'Full sandbox environment with test API keys'
              : 'Pre-verified demo profile with linked accounts'
            }
          </p>
        </div>
      </div>
    </div>
  );
}