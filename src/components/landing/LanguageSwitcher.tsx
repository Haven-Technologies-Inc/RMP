import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { supportedLanguages, Language } from '../../utils/translations';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = supportedLanguages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLang?.flag} {currentLang?.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-[#0A2540] border border-white/10 rounded-xl shadow-lg overflow-hidden z-50 animate-scale-in">
          <div className="p-2 max-h-96 overflow-y-auto">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code as Language);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                  currentLanguage === lang.code
                    ? 'bg-[#06B6D4]/20 text-[#06B6D4]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <div>
                    <div className="text-sm">{lang.nativeName}</div>
                    <div className="text-xs opacity-60">{lang.name}</div>
                  </div>
                </div>
                {currentLanguage === lang.code && (
                  <Check className="w-4 h-4 text-[#06B6D4]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
