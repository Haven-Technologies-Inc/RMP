import React from 'react';
import { Shield, Globe, Zap, Users } from 'lucide-react';
import { AFRICAN_COUNTRIES, getLiveCountries } from '../config/african-countries';

export function ReshADXHero() {
  const liveCountries = getLiveCountries();
  const totalCountries = AFRICAN_COUNTRIES.filter(c => c.active).length;

  return (
    <div className="bg-gradient-to-br from-[var(--primary)] via-[var(--primary-light)] to-[var(--secondary)]/20 text-white">
      <div className="px-4 py-16 max-w-7xl mx-auto">
        {/* Logo & Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center">
              <Globe className="w-10 h-10 text-[var(--secondary)]" />
            </div>
            <div className="text-left">
              <h1 className="text-white text-5xl m-0">ReshADX</h1>
              <p className="text-white/80 text-xl m-0">Africa Open Data Exchange</p>
            </div>
          </div>
          
          <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-8 m-0">
            Africa's First Pan-Continental Financial Data Infrastructure
          </p>
          
          <p className="text-lg text-white/70 max-w-2xl mx-auto m-0">
            Empowering financial innovation across {totalCountries}+ African nations with secure, 
            real-time access to identity verification, payments, and financial data
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <Globe className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
            <p className="text-4xl m-0 mb-1">{totalCountries}+</p>
            <p className="text-white/70 text-sm m-0">Countries</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <Shield className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
            <p className="text-4xl m-0 mb-1">125+</p>
            <p className="text-white/70 text-sm m-0">API Endpoints</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <Zap className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
            <p className="text-4xl m-0 mb-1"><250ms</p>
            <p className="text-white/70 text-sm m-0">Avg Response</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <Users className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
            <p className="text-4xl m-0 mb-1">1.4B+</p>
            <p className="text-white/70 text-sm m-0">People Reached</p>
          </div>
        </div>

        {/* Live Countries */}
        <div className="bg-white/5 backdrop-blur rounded-xl p-6">
          <h3 className="text-white mb-4 text-center">🌍 Now Live In</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {liveCountries.map((country) => (
              <div
                key={country.code}
                className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="text-white">{country.name}</span>
                <span className="text-[var(--secondary)] text-sm">LIVE</span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-white/60 text-sm mt-4 m-0">
            Coming soon: Rwanda, South Africa, Egypt, and more across Africa
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mt-12 text-center">
          <p className="text-lg text-white/80 max-w-3xl mx-auto m-0">
            Built by Africans, for Africa. ReshADX is democratizing access to financial infrastructure, 
            enabling the next generation of fintech innovation across the continent.
          </p>
        </div>
      </div>
    </div>
  );
}
