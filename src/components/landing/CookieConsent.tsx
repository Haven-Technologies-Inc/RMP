import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from '../Button';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after 2 seconds
      setTimeout(() => setShowBanner(true), 2000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-in">
      <div className="max-w-7xl mx-auto bg-[#0A2540] border border-white/20 rounded-2xl shadow-2xl backdrop-blur-xl">
        <div className="p-6 md:flex items-center justify-between gap-6">
          <div className="flex items-start gap-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-xl flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white mb-2">We Value Your Privacy</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept", you consent to our use of cookies. Read our{' '}
                <a href="/privacy-policy" className="text-[#06B6D4] hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/cookie-policy" className="text-[#06B6D4] hover:underline">
                  Cookie Policy
                </a>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Decline
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={acceptCookies}
              className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
