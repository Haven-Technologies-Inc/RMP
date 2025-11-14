import React from 'react';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';
import { Button } from './Button';

interface NotFoundProps {
  onGoHome: () => void;
}

export function NotFound({ onGoHome }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2540] to-[#1E293B] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[200px] md:text-[280px] font-bold text-white/5 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-full flex items-center justify-center animate-pulse-glow">
              <FileQuestion className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-white text-4xl md:text-5xl mb-4">
          Page Not Found
        </h1>
        <p className="text-white/70 text-xl mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            variant="primary"
            size="lg"
            onClick={onGoHome}
            className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]"
            icon={<Home className="w-5 h-5" />}
          >
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="border-white/30 text-white hover:bg-white/10"
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-2 text-white mb-4">
            <Search className="w-5 h-5" />
            <h3 className="text-xl">Looking for something?</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {[
              { label: 'API Documentation', href: '#' },
              { label: 'Product Guides', href: '#' },
              { label: 'Support Center', href: '#contact' },
              { label: 'Developer Portal', href: '#' },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/80 hover:text-white transition-all"
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <p className="text-white/60 text-sm mt-8">
          Still can't find what you're looking for?{' '}
          <a href="#contact" className="text-[#06B6D4] hover:underline">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}
