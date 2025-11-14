import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'tw', label: 'Twi' },
    { code: 'ga', label: 'Ga' },
  ];

  return (
    <div className="relative inline-block">
      <label htmlFor="language-select" className="sr-only">Select Language</label>
      <div className="flex items-center gap-2 px-3 py-2 bg-white border border-[var(--neutral-300)] rounded-lg">
        <Globe className="w-4 h-4 text-[var(--neutral-600)]" aria-hidden="true" />
        <select
          id="language-select"
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-transparent border-none outline-none cursor-pointer text-sm text-[var(--neutral-700)]"
          aria-label="Select your preferred language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
