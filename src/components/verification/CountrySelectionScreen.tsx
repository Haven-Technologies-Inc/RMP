import React, { useState } from 'react';
import { Globe, Search, ChevronRight, Shield, Zap, CheckCircle } from 'lucide-react';
import { Button } from '../Button';
import { AFRICAN_COUNTRIES, AfricanCountry } from '../../config/african-countries';
import { getVerificationConfig } from '../../config/country-verification';

interface CountrySelectionScreenProps {
  onCountrySelect: (country: AfricanCountry) => void;
  language: string;
}

export function CountrySelectionScreen({ onCountrySelect, language }: CountrySelectionScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Filter active countries
  const activeCountries = AFRICAN_COUNTRIES.filter(c => c.active);

  // Filter by search and region
  const filteredCountries = activeCountries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         country.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  // Group by region
  const regions = Array.from(new Set(activeCountries.map(c => c.region)));

  // Get launch phase badge
  const getPhaseBadge = (phase: string) => {
    switch (phase) {
      case 'live':
        return <span className="px-2 py-1 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded">LIVE</span>;
      case 'beta':
        return <span className="px-2 py-1 bg-[var(--warning)]/10 text-[var(--warning)] text-xs rounded">BETA</span>;
      case 'coming_soon':
        return <span className="px-2 py-1 bg-[var(--neutral-300)] text-[var(--neutral-600)] text-xs rounded">SOON</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white">
        <div className="px-4 py-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
              <Globe className="w-7 h-7 text-[var(--secondary)]" />
            </div>
            <div>
              <h2 className="text-white m-0">Welcome to ReshADX</h2>
              <p className="text-white/80 text-sm m-0">Africa Open Data Exchange</p>
            </div>
          </div>
          <h1 className="text-white mb-3">Select Your Country</h1>
          <p className="text-white/90 text-lg m-0">
            Choose your country to begin secure verification with country-specific requirements
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-4xl mx-auto">
        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-[var(--primary)]" />
              <h4 className="m-0">Secure & Compliant</h4>
            </div>
            <p className="text-sm text-[var(--neutral-600)] m-0">
              Country-specific verification following local regulations
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-[var(--secondary)]" />
              <h4 className="m-0">Fast Verification</h4>
            </div>
            <p className="text-sm text-[var(--neutral-600)] m-0">
              2-3 minutes average with instant ID verification
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-[var(--success)]" />
              <h4 className="m-0">High Success Rate</h4>
            </div>
            <p className="text-sm text-[var(--neutral-600)] m-0">
              97%+ verification success across all countries
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-6 shadow-[var(--shadow-md)] mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--neutral-400)]" />
              <input
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[var(--neutral-300)] rounded-lg"
              />
            </div>

            {/* Region Filter */}
            <div className="md:w-48">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg"
              >
                <option value="all">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Countries List */}
        <div className="space-y-3">
          {filteredCountries.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-[var(--shadow-sm)]">
              <p className="text-[var(--neutral-600)] m-0">No countries found matching your search</p>
            </div>
          ) : (
            filteredCountries.map((country) => {
              const verificationConfig = getVerificationConfig(country.code);
              const requiredMethods = verificationConfig?.verification_methods.filter(m => m.required).length || 0;
              
              return (
                <button
                  key={country.code}
                  onClick={() => country.launch_phase !== 'coming_soon' && onCountrySelect(country)}
                  disabled={country.launch_phase === 'coming_soon'}
                  className={`w-full bg-white rounded-lg p-5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all text-left ${
                    country.launch_phase === 'coming_soon' 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'cursor-pointer hover:border-[var(--primary)]'
                  } border border-transparent`}
                >
                  <div className="flex items-center gap-4">
                    {/* Flag */}
                    <div className="text-4xl flex-shrink-0">
                      {country.flag}
                    </div>

                    {/* Country Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="m-0">{country.name}</h3>
                        {getPhaseBadge(country.launch_phase)}
                      </div>
                      <p className="text-sm text-[var(--neutral-600)] mb-2 m-0">
                        {country.region} • {country.currency}
                      </p>
                      
                      {verificationConfig && (
                        <div className="flex items-center gap-4 text-xs text-[var(--neutral-600)]">
                          <span className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            {requiredMethods} required steps
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            {verificationConfig.estimated_time}
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {verificationConfig.success_rate}% success
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    {country.launch_phase !== 'coming_soon' && (
                      <ChevronRight className="w-6 h-6 text-[var(--neutral-400)] flex-shrink-0" />
                    )}
                  </div>

                  {/* Mobile Money Providers */}
                  <div className="mt-3 pt-3 border-t border-[var(--neutral-200)]">
                    <p className="text-xs text-[var(--neutral-500)] mb-2 m-0">Mobile Money:</p>
                    <div className="flex flex-wrap gap-2">
                      {country.mobile_money_providers.slice(0, 3).map((provider, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[var(--neutral-100)] text-[var(--neutral-700)] text-xs rounded"
                        >
                          {provider}
                        </span>
                      ))}
                      {country.mobile_money_providers.length > 3 && (
                        <span className="px-2 py-1 bg-[var(--neutral-100)] text-[var(--neutral-700)] text-xs rounded">
                          +{country.mobile_money_providers.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-[var(--primary)]/5 rounded-lg p-6 border border-[var(--primary)]/20">
          <h4 className="mb-2">Don't see your country?</h4>
          <p className="text-sm text-[var(--neutral-700)] mb-4 m-0">
            We're expanding across Africa. Countries marked "SOON" are launching within the next 6 months.
            Sign up to get notified when we launch in your country.
          </p>
          <Button variant="secondary" size="sm">
            Get Notified
          </Button>
        </div>
      </main>
    </div>
  );
}
