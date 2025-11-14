import React, { useState } from 'react';
import { 
  Menu, X, ChevronDown, ChevronRight, 
  Shield, Zap, Globe, TrendingUp, Users, Lock,
  CheckCircle, ArrowRight, Mail, Phone, MapPin,
  Code, Briefcase, FileText, MessageSquare,
  Star, Clock, Award, Database, Eye, Fingerprint, ShieldCheck,
  KeyRound, Server, BadgeCheck, FileCheck, AlertCircle, Loader
} from 'lucide-react';
import { Button } from '../Button';
import { AnimatedSection } from './AnimatedSection';
import { FloatingElements } from './FloatingElements';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ScrollToTop } from './ScrollToTop';
import { CookieConsent } from './CookieConsent';
import { Newsletter } from './Newsletter';
import { Testimonials } from './Testimonials';
import { APIPlayground } from './APIPlayground';
import { PricingTable } from './PricingTable';
import { SEOHead } from '../SEOHead';
import { translations, Language } from '../../utils/translations';
import { validateContactForm, ContactFormData } from '../../utils/validation';
import { DemoAccess } from './DemoAccess';
import { PortalPreview } from './PortalPreview';

interface LandingPageProps {
  onGetStarted: () => void;
  onBusinessSignup: () => void;
  onBusinessDemoLogin?: () => void;
  onIndividualDemoLogin?: () => void;
  onAdminDemoLogin?: () => void;
}

export function LandingPage({ onGetStarted, onBusinessSignup, onBusinessDemoLogin, onIndividualDemoLogin, onAdminDemoLogin }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2540] to-[#1E293B]">
      {/* SEO Head */}
      <SEOHead />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A2540]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white m-0 text-xl">ReshADX</h2>
                <p className="text-[#06B6D4] text-xs m-0">Africa Open Data Exchange</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {['home', 'about', 'services', 'products', 'faqs', 'blog', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-sm transition-colors ${
                    activeSection === section 
                      ? 'text-[#06B6D4]' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {section === 'faqs' ? 'FAQs' : section.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" onClick={onGetStarted} className="border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4]/10">
                Get Started
              </Button>
              <Button variant="primary" onClick={onBusinessSignup} className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]">
                For Business
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">
                {['home', 'about', 'services', 'products', 'faqs', 'blog', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-left text-white/70 hover:text-white capitalize py-2"
                  >
                    {section === 'faqs' ? 'FAQs' : section.replace('-', ' ')}
                  </button>
                ))}
                <div className="flex flex-col gap-2 mt-2">
                  <Button variant="outline" onClick={onGetStarted} fullWidth className="border-[#06B6D4] text-[#06B6D4]">
                    Get Started
                  </Button>
                  <Button variant="primary" onClick={onBusinessSignup} fullWidth className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]">
                    For Business
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#06B6D4]/20 to-[#7C3AED]/20 border border-[#06B6D4]/30 rounded-full mb-6">
                <Zap className="w-4 h-4 text-[#06B6D4]" />
                <span className="text-sm text-white">Trusted by 100+ African Businesses</span>
              </div>

              <h1 className="text-white text-5xl lg:text-6xl mb-6">
                Africa's Financial Data Infrastructure
              </h1>
              <p className="text-white/80 text-xl mb-8 leading-relaxed">
                Verify identities, access financial data, and build compliant products across 10+ African countries with one powerful API.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={onBusinessSignup}
                  className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] hover:shadow-lg hover:shadow-[#06B6D4]/50"
                  iconRight={<ArrowRight className="w-5 h-5" />}
                >
                  Start Building Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => scrollToSection('contact')}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Talk to Sales
                </Button>
              </div>

              <div className="flex items-center gap-8 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  Free sandbox
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  No credit card
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  5 min setup
                </div>
              </div>
            </div>

            {/* Right - Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10+', label: 'African Countries', icon: Globe, color: 'from-blue-500 to-cyan-500' },
                { value: '125+', label: 'API Endpoints', icon: Code, color: 'from-purple-500 to-pink-500' },
                { value: '97%', label: 'Success Rate', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                { value: '24/7', label: 'Support', icon: Users, color: 'from-orange-500 to-red-500' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl text-white mb-1">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-white/60 text-sm mb-6">TRUSTED BY LEADING AFRICAN COMPANIES</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['Bank', 'FinTech', 'Lender', 'InsurTech', 'PayTech'].map((company, index) => (
              <div key={index} className="text-white/40 text-xl px-6 py-3 bg-white/5 rounded-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-transparent to-[#1E293B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl mb-4">About ReshADX</h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              We're building Africa's most comprehensive financial data infrastructure to power the next generation of fintech innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: 'Security First',
                description: 'Bank-level encryption, SOC 2 compliant, and adhering to all African data protection regulations.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Globe,
                title: 'Pan-African Coverage',
                description: 'Operating across 10+ countries with plans to cover all 54 African nations by 2027.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Real-time verification in under 3 seconds with 99.9% uptime SLA for enterprise customers.',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-2xl mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-[#06B6D4]/10 to-[#7C3AED]/10 border border-[#06B6D4]/30 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-white text-3xl mb-4">Our Mission</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  To democratize access to financial services across Africa by providing the infrastructure that enables seamless, secure, and compliant data exchange.
                </p>
                <p className="text-white/80 leading-relaxed">
                  We believe every African deserves instant access to financial services, and every business should have the tools to serve them compliantly and efficiently.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2M+', label: 'Verifications' },
                  { value: '50+', label: 'Banks Connected' },
                  { value: '25+', label: 'Mobile Money' },
                  { value: '100+', label: 'Businesses' },
                ].map((stat, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-3xl text-[#06B6D4] mb-1">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <AnimatedSection animation="fade-up">
        <section className="py-20 px-4 relative overflow-hidden">
          <FloatingElements />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#06B6D4]/20 to-[#7C3AED]/20 border border-[#06B6D4]/30 rounded-full mb-6">
                <Eye className="w-4 h-4 text-[#06B6D4]" />
                <span className="text-sm text-white">Our Vision</span>
              </div>
              <h2 className="text-white text-5xl lg:text-6xl mb-6 animate-gradient bg-gradient-to-r from-white via-[#06B6D4] to-white bg-clip-text text-transparent">
                Building the Financial Rails of Africa
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-[#06B6D4]/10 to-[#7C3AED]/10 border border-[#06B6D4]/30 rounded-2xl p-8 backdrop-blur-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white text-2xl mb-4">Pan-African Integration</h3>
                <p className="text-white/80 leading-relaxed">
                  By 2027, we will connect all 54 African countries, creating a unified financial data infrastructure that enables seamless cross-border transactions, identity verification, and financial inclusion across the continent.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#7C3AED]/10 to-[#10B981]/10 border border-[#7C3AED]/30 rounded-2xl p-8 backdrop-blur-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#10B981] rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white text-2xl mb-4">Financial Inclusion</h3>
                <p className="text-white/80 leading-relaxed">
                  Empowering 1 billion Africans with instant access to financial services through technology, reducing barriers, and democratizing access to credit, savings, and insurance across the continent.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center">
              <blockquote className="text-white/90 text-2xl md:text-3xl italic mb-6 leading-relaxed">
                "Every African, regardless of location or background, deserves frictionless access to financial services. We're building the infrastructure to make that a reality."
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-full" />
                <div className="text-left">
                  <div className="text-white">ReshADX Team</div>
                  <div className="text-white/60 text-sm">Building for Africa</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Security Section */}
      <AnimatedSection animation="fade-up">
        <section id="security" className="py-20 px-4 bg-gradient-to-b from-[#0A2540] to-[#1E293B] relative overflow-hidden">
          <FloatingElements />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B981]/20 to-[#06B6D4]/20 border border-[#10B981]/30 rounded-full mb-6">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm text-white">Enterprise-Grade Security</span>
              </div>
              <h2 className="text-white text-4xl lg:text-5xl mb-4">
                Bank-Level Security & Compliance
              </h2>
              <p className="text-white/70 text-xl max-w-3xl mx-auto">
                Your data is protected by military-grade encryption and industry-leading security protocols
              </p>
            </div>

            {/* Security Certifications */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {[
                { name: 'SOC 2 Type II', icon: BadgeCheck, description: 'Certified' },
                { name: 'ISO 27001', icon: Shield, description: 'Compliant' },
                { name: 'GDPR', icon: FileCheck, description: 'Ready' },
                { name: 'PCI DSS', icon: Lock, description: 'Level 1' },
              ].map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <AnimatedSection key={index} animation="scale-up" delay={index * 100}>
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#06B6D4] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-white mb-1">{cert.name}</h4>
                      <p className="text-[#10B981] text-sm">{cert.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Security Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Lock,
                  title: 'End-to-End Encryption',
                  description: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your sensitive information never leaves our secure infrastructure unencrypted.',
                  features: ['AES-256 Encryption', 'TLS 1.3 Protocol', 'Zero-Knowledge Architecture', 'Encrypted Backups'],
                },
                {
                  icon: Eye,
                  title: 'Privacy by Design',
                  description: 'We follow privacy-by-design principles, ensuring data minimization, user consent, and granular access controls at every step.',
                  features: ['Data Minimization', 'Granular Consent', 'Right to Erasure', 'Privacy Controls'],
                },
                {
                  icon: Shield,
                  title: 'Continuous Monitoring',
                  description: '24/7 security monitoring, intrusion detection, and automated threat response systems protect your data around the clock.',
                  features: ['24/7 SOC Team', 'Real-time Alerts', 'Threat Intelligence', 'Incident Response'],
                },
                {
                  icon: Fingerprint,
                  title: 'Advanced Authentication',
                  description: 'Multi-factor authentication, biometric verification, and OAuth 2.0 ensure only authorized access to your resources.',
                  features: ['MFA Enforced', 'Biometric Auth', 'OAuth 2.0', 'SSO Support'],
                },
                {
                  icon: Server,
                  title: 'Infrastructure Security',
                  description: 'Hosted on AWS/GCP with redundant data centers, DDoS protection, and automatic failover for maximum availability.',
                  features: ['99.9% Uptime SLA', 'DDoS Protection', 'Auto-scaling', 'Geo-redundancy'],
                },
                {
                  icon: FileCheck,
                  title: 'Compliance & Audits',
                  description: 'Regular third-party security audits, penetration testing, and compliance with local African data protection laws.',
                  features: ['Annual Pen Tests', 'Security Audits', 'Compliance Reports', 'Audit Logs'],
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group h-full">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#06B6D4] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-white text-xl mb-3">{feature.title}</h3>
                      <p className="text-white/70 text-sm mb-4 leading-relaxed">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-white/60 text-sm">
                            <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Data Protection Promise */}
            <div className="bg-gradient-to-r from-[#10B981]/10 to-[#06B6D4]/10 border border-[#10B981]/30 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-white text-3xl mb-4">Our Security Promise</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    We treat your data with the highest level of care and security. Our infrastructure is built on the principle that security is not a feature—it's a foundation.
                  </p>
                  <div className="space-y-3">
                    {[
                      'We never sell or share your data with third parties',
                      'All data is encrypted both in transit and at rest',
                      'You maintain full control and ownership of your data',
                      'We comply with all local and international regulations',
                      'Regular security audits by independent firms',
                      'Transparent incident response and disclosure',
                    ].map((promise, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{promise}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: '99.9%', label: 'Uptime SLA' },
                    { stat: '256-bit', label: 'Encryption' },
                    { stat: '24/7', label: 'Monitoring' },
                    { stat: '0', label: 'Data Breaches' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-3xl text-[#10B981] mb-1">{item.stat}</div>
                      <div className="text-white/60 text-sm">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security Contact */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-start gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-xl">
                <AlertCircle className="w-5 h-5 text-[#06B6D4] mt-0.5" />
                <div className="text-left">
                  <p className="text-white/80 text-sm">
                    Found a security vulnerability? Please report it to{' '}
                    <a href="mailto:security@reshadx.com" className="text-[#06B6D4] hover:underline">
                      security@reshadx.com
                    </a>
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    We take security seriously and will respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl mb-4">Our Services</h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Comprehensive APIs to power your fintech products
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Identity Verification',
                description: 'Real-time verification with government databases. Ghana Card, NIN, BVN, National IDs, and more.',
                features: ['KYC Automation', 'Biometric Verification', 'Document Scanning', 'Liveness Detection'],
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Database,
                title: 'Financial Data Access',
                description: 'Connect to 50+ banks and 25+ mobile money providers across Africa.',
                features: ['Account Balances', 'Transaction History', 'Income Verification', 'Credit Scoring'],
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: Lock,
                title: 'Compliance & Security',
                description: 'Stay compliant with local regulations and international standards.',
                features: ['AML Screening', 'Fraud Detection', 'Data Protection', 'Audit Trails'],
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: TrendingUp,
                title: 'Credit Scoring',
                description: 'AI-powered creditworthiness assessment using alternative data.',
                features: ['ML Models', 'Alternative Data', 'Risk Assessment', 'Affordability Checks'],
                color: 'from-orange-500 to-red-500',
              },
              {
                icon: Briefcase,
                title: 'Employment Verification',
                description: 'Verify employment status, income, and employer details.',
                features: ['SSNIT Integration', 'Payroll Data', 'Employment History', 'Salary Verification'],
                color: 'from-indigo-500 to-blue-500',
              },
              {
                icon: Globe,
                title: 'Mobile Money Integration',
                description: 'Direct integration with M-Pesa, MTN Mobile Money, and 20+ providers.',
                features: ['Balance Checks', 'Transaction History', 'Payment Initiation', 'Wallet Verification'],
                color: 'from-cyan-500 to-teal-500',
              },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:border-white/20 group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white text-xl mb-2">{service.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#10B981]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-gradient-to-b from-[#1E293B] to-[#0A2540]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl mb-4">Our Products</h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Purpose-built solutions for every use case
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                name: 'ReshADX Identity',
                tagline: 'Know Your Customer, Instantly',
                description: 'Complete identity verification solution with government database integration, biometric capture, and document verification.',
                price: 'Starting at $0.50/verification',
                features: [
                  'Real-time government database checks',
                  'Biometric verification (fingerprint, facial)',
                  'Document OCR and validation',
                  'Phone and address verification',
                  'AML screening and fraud detection',
                  'Customizable verification flows',
                ],
                icon: Shield,
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                name: 'ReshADX Connect',
                tagline: 'Financial Data at Your Fingertips',
                description: 'Securely access bank accounts, mobile money wallets, and financial data with user consent.',
                price: 'Starting at $0.10/connection',
                features: [
                  '50+ banks across Africa',
                  '25+ mobile money providers',
                  'Real-time balance and transactions',
                  'Income and cash flow analysis',
                  'Investment and liability data',
                  'Granular user consent management',
                ],
                icon: Database,
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                name: 'ReshADX Score',
                tagline: 'AI-Powered Credit Intelligence',
                description: 'Advanced credit scoring using traditional and alternative data sources with machine learning.',
                price: 'Starting at $0.25/score',
                features: [
                  'ML-based credit scoring',
                  'Alternative data analysis',
                  'Affordability assessment',
                  'Risk categorization',
                  'Custom scoring models',
                  'Real-time decision engine',
                ],
                icon: TrendingUp,
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                name: 'ReshADX Verify',
                tagline: 'Employment & Income Verification',
                description: 'Verify employment status, income, and employer details for lending and background checks.',
                price: 'Starting at $0.75/verification',
                features: [
                  'SSNIT and payroll integration',
                  'Employment history verification',
                  'Salary and income verification',
                  'Employer validation',
                  'Tax records integration',
                  'Automated employment letters',
                ],
                icon: Briefcase,
                gradient: 'from-orange-500 to-red-500',
              },
            ].map((product, index) => {
              const Icon = product.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="px-3 py-1 bg-[#10B981]/20 border border-[#10B981]/30 rounded-full">
                      <span className="text-[#10B981] text-xs">Available Now</span>
                    </div>
                  </div>

                  <h3 className="text-white text-2xl mb-2">{product.name}</h3>
                  <p className="text-[#06B6D4] mb-3">{product.tagline}</p>
                  <p className="text-white/70 mb-4">{product.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-white/60 text-sm mb-1">Pricing</div>
                    <div className="text-white text-lg">{product.price}</div>
                  </div>

                  <div className="mb-6">
                    <div className="text-white/60 text-sm mb-3">Key Features</div>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                          <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="outline" 
                    fullWidth
                    className="border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4]/10"
                    iconRight={<ArrowRight className="w-4 h-4" />}
                  >
                    Learn More
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Demo Access Section - Try Both Portals */}
      <DemoAccess
        onBusinessDashboard={onBusinessSignup}
        onIndividualDashboard={onGetStarted}
        onBusinessDemoLogin={onBusinessDemoLogin}
        onIndividualDemoLogin={onIndividualDemoLogin}
        onAdminDemoLogin={onAdminDemoLogin}
      />

      {/* Portal Preview Section - See How Each Works */}
      <PortalPreview />

      {/* Testimonials Section */}
      <Testimonials />

      {/* API Playground Section */}
      <APIPlayground />

      {/* Pricing Table Section */}
      <PricingTable />

      {/* Newsletter Section */}
      <Newsletter />

      {/* FAQs Section */}
      <section id="faqs" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl mb-4">Frequently Asked Questions</h2>
            <p className="text-white/70 text-xl">
              Everything you need to know about ReshADX
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'What is ReshADX?',
                answer: 'ReshADX (Africa Open Data Exchange) is a pan-African financial data infrastructure platform that provides APIs for identity verification, financial data access, and compliance automation across 10+ African countries.',
              },
              {
                question: 'Which countries do you support?',
                answer: 'We currently support Ghana, Nigeria, Kenya, Côte d\'Ivoire, Uganda, Tanzania, and Senegal, with plans to expand to all 54 African countries by 2027. Each country has specific verification methods and integrations.',
              },
              {
                question: 'How long does verification take?',
                answer: 'Most verifications are completed in real-time (under 3 seconds). End-user identity verification typically takes 2-3 minutes to complete all required steps. Business verification for API access takes 24-48 hours.',
              },
              {
                question: 'Is ReshADX compliant with local regulations?',
                answer: 'Yes, we are fully compliant with data protection regulations in all countries we operate in. We work closely with regulatory bodies like Bank of Ghana, Central Bank of Nigeria, and Central Bank of Kenya to ensure compliance.',
              },
              {
                question: 'What is your pricing model?',
                answer: 'We offer tiered pricing starting with a free sandbox environment. Production pricing starts at $99/month for 10,000 verifications. We also offer pay-as-you-go pricing for lower volumes. Enterprise customers get custom pricing.',
              },
              {
                question: 'How secure is the data?',
                answer: 'We use bank-level encryption (AES-256), are SOC 2 compliant, and follow industry best practices for data security. All data is encrypted in transit and at rest. We never store sensitive financial credentials.',
              },
              {
                question: 'Can I test the API before going live?',
                answer: 'Absolutely! We provide a free sandbox environment with test data for all our APIs. You can test all endpoints and build your integration before going live. No credit card required.',
              },
              {
                question: 'What kind of support do you offer?',
                answer: 'We offer email support for all customers, priority support for Professional tier, and 24/7 phone support for Enterprise customers. We also have comprehensive documentation, SDKs, and a developer community.',
              },
              {
                question: 'How do I get started?',
                answer: 'Simply click "Get Started" to create a free account. You\'ll select your business type, complete registration, upload required documents, and receive your API keys within 24-48 hours. You can start testing immediately in the sandbox.',
              },
              {
                question: 'Do you offer white-label solutions?',
                answer: 'Yes, Enterprise customers can access white-label solutions with custom branding, dedicated infrastructure, and on-premise deployment options. Contact our sales team for more information.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="text-white pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#06B6D4] transition-transform flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-gradient-to-b from-[#0A2540] to-[#1E293B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl mb-4">Latest from Our Blog</h2>
            <p className="text-white/70 text-xl">
              Insights, updates, and stories from the African fintech ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Product Update',
                title: 'Introducing ReshADX Score: AI-Powered Credit Scoring',
                excerpt: 'We\'re excited to announce the launch of ReshADX Score, our new AI-powered credit scoring product that uses alternative data...',
                date: 'Nov 10, 2024',
                readTime: '5 min read',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
              },
              {
                category: 'Case Study',
                title: 'How QuickLoan Reduced KYC Time from 3 Days to 3 Minutes',
                excerpt: 'Learn how QuickLoan, a leading Nigerian lending platform, transformed their onboarding process using ReshADX Identity...',
                date: 'Nov 5, 2024',
                readTime: '7 min read',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
              },
              {
                category: 'Industry Insights',
                title: 'The State of Digital Identity in Africa 2024',
                excerpt: 'Our comprehensive report on digital identity adoption, challenges, and opportunities across African markets...',
                date: 'Oct 28, 2024',
                readTime: '10 min read',
                image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=500&fit=crop',
              },
            ].map((post, index) => (
              <article
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all hover:scale-[1.02] group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#06B6D4] text-white text-xs rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-white/60 text-sm mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-white text-xl mb-3 group-hover:text-[#06B6D4] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/70 mb-4">{post.excerpt}</p>
                  <button className="text-[#06B6D4] flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read More
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl mb-4">Get in Touch</h2>
            <p className="text-white/70 text-xl">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {[
                {
                  icon: Mail,
                  title: 'Email Us',
                  value: 'hello@reshadx.com',
                  subvalue: 'support@reshadx.com',
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  value: '+234 XXX XXX XXXX',
                  subvalue: '+233 XXX XXX XXXX',
                },
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  value: 'Lagos, Nigeria',
                  subvalue: 'Accra, Ghana',
                },
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-white mb-2">{contact.title}</h4>
                    <p className="text-white/70">{contact.value}</p>
                    <p className="text-white/60 text-sm">{contact.subvalue}</p>
                  </div>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white text-sm mb-2">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#06B6D4] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm mb-2">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#06B6D4] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#06B6D4] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">Company</label>
                    <input
                      type="text"
                      placeholder="Your Company"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#06B6D4] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#06B6D4] focus:outline-none resize-none"
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl mb-4">Ready to Build the Future of African Fintech?</h2>
          <p className="text-white/90 text-xl mb-8">
            Join 100+ companies using ReshADX to verify identities and access financial data across Africa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={onBusinessSignup}
              iconRight={<ArrowRight className="w-5 h-5" />}
            >
              Start Building Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2540] border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-white">ReshADX</span>
              </div>
              <p className="text-white/60 text-sm">
                Africa's financial data infrastructure platform
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-white mb-4">Products</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-[#06B6D4]">Identity Verification</a></li>
                <li><a href="#" className="hover:text-[#06B6D4]">Financial Data</a></li>
                <li><a href="#" className="hover:text-[#06B6D4]">Credit Scoring</a></li>
                <li><a href="#" className="hover:text-[#06B6D4]">Employment Verification</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#about" className="hover:text-[#06B6D4]">About Us</a></li>
                <li><a href="#" className="hover:text-[#06B6D4]">Careers</a></li>
                <li><a href="#blog" className="hover:text-[#06B6D4]">Blog</a></li>
                <li><a href="#contact" className="hover:text-[#06B6D4]">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-[#06B6D4]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#06B6D4]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#06B6D4]">Security</a></li>
                <li><a href="#" className="hover:text-[#06B6D4]">Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © 2024 ReshADX. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-white/60 hover:text-[#06B6D4] text-sm transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}