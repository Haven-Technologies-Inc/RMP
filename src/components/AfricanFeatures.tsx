import React, { useState } from 'react';
import {
  Smartphone,
  Globe,
  Zap,
  Shield,
  Users,
  TrendingUp,
  MessageSquare,
  Wifi,
  WifiOff,
  CreditCard,
  Building2,
  Phone,
  Banknote,
  QrCode,
  MapPin,
  Languages,
  FileCheck,
  Scale,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from './Button';

interface AfricanFeaturesProps {
  language?: string;
  onLanguageChange?: (lang: string) => void;
}

interface Feature {
  id: string;
  category: string;
  icon: any;
  color: string;
  title: string;
  description: string;
  status: 'available' | 'coming_soon' | 'planned';
  priority: 'critical' | 'high' | 'medium';
  features: string[];
  implementation?: string;
}

export function AfricanFeatures({ language, onLanguageChange }: AfricanFeaturesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const africanFeatures: Feature[] = [
    {
      id: 'mobile-money-expansion',
      category: 'Payment Networks',
      icon: Smartphone,
      color: '#10B981',
      title: 'Comprehensive Mobile Money Integration',
      description: 'Support for all major African mobile money providers',
      status: 'available',
      priority: 'critical',
      features: [
        'MTN Mobile Money (Ghana, Nigeria, Uganda, Rwanda, Cameroon)',
        'Vodafone Cash (Ghana)',
        'AirtelTigo Money (Ghana)',
        'M-Pesa (Kenya, Tanzania)',
        'Orange Money (Côte d\'Ivoire, Senegal)',
        'Tigo Pesa (Tanzania)',
        'MTN MoMo API integration',
        'USSD fallback for feature phones',
        'Agent banking support',
        'Cash-in/Cash-out locations',
      ],
      implementation: 'Full API integration with real-time balance checks and instant transfers',
    },
    {
      id: 'ussd-support',
      category: 'Accessibility',
      icon: Phone,
      color: '#F59E0B',
      title: 'USSD Banking Support',
      description: 'Zero-data banking for feature phones and low-end smartphones',
      status: 'available',
      priority: 'critical',
      features: [
        'Dial *920# for account access',
        'Check balances without internet',
        'Transfer money via USSD',
        'Pay bills using short codes',
        'Link accounts offline',
        'Multi-language USSD menus (English, Twi, Ga, Hausa)',
        'Session management',
        'PIN-based authentication',
      ],
      implementation: 'USSD gateway integration with telecom providers',
    },
    {
      id: 'offline-first',
      category: 'Infrastructure',
      icon: WifiOff,
      color: '#8B5CF6',
      title: 'Offline-First Architecture',
      description: 'Work seamlessly in areas with poor or no internet connectivity',
      status: 'available',
      priority: 'critical',
      features: [
        'Local data caching',
        'Queue transactions for later sync',
        'SMS confirmation fallback',
        'Progressive Web App (PWA)',
        'Low-bandwidth optimization',
        'Sync when connection available',
        'Conflict resolution',
        'Offline transaction history',
      ],
      implementation: 'Service workers + IndexedDB + SMS gateway',
    },
    {
      id: 'ghipss-integration',
      category: 'Payment Networks',
      icon: Building2,
      color: '#1A3B5D',
      title: 'GhIPSS & Payment Systems',
      description: 'Integration with Ghana Interbank Payment and Settlement Systems',
      status: 'available',
      priority: 'critical',
      features: [
        'GhIPSS Instant Pay',
        'ACH Direct Credit/Debit',
        'e-zwich card support',
        'Cheque Codeline Clearing',
        'GACH (Ghana Automated Clearing House)',
        'Real-time gross settlement',
        'Interbank transfers',
        'Bill payment aggregation',
      ],
      implementation: 'Direct API integration with GhIPSS infrastructure',
    },
    {
      id: 'multi-id-verification',
      category: 'Identity & KYC',
      icon: FileCheck,
      color: '#EF4444',
      title: 'Multiple ID Verification Methods',
      description: 'Verify users with various government-issued IDs',
      status: 'available',
      priority: 'high',
      features: [
        'Ghana Card (National ID)',
        'Voter ID Card',
        'NHIS Card (Health Insurance)',
        'Driver\'s License',
        'SSNIT Card (Social Security)',
        'Passport verification',
        'Birth Certificate',
        'School/University ID',
        'Utility bill verification',
        'Landlord attestation',
      ],
      implementation: 'Multi-source identity verification with NIA, EC, DVLA, Passport Office APIs',
    },
    {
      id: 'nia-full-integration',
      category: 'Identity & KYC',
      icon: Shield,
      color: '#06B6D4',
      title: 'Full NIA Integration',
      description: 'Real-time verification with National Identification Authority',
      status: 'available',
      priority: 'critical',
      features: [
        'Real-time Ghana Card verification',
        'Biometric fingerprint matching',
        'Facial recognition',
        'Live photo capture',
        'Card expiry checking',
        'Address verification',
        'Date of birth validation',
        'Duplicate detection',
        'Deceased person checking',
      ],
      implementation: 'Direct NIA API with biometric matching',
    },
    {
      id: 'local-languages',
      category: 'Accessibility',
      icon: Languages,
      color: '#D4AF37',
      title: 'Multi-Language Support',
      description: 'Full support for Ghanaian and African languages',
      status: 'available',
      priority: 'high',
      features: [
        'English (Default)',
        'Twi/Akan',
        'Ga',
        'Ewe',
        'Dagbani',
        'Hausa',
        'French (West Africa)',
        'Swahili (East Africa)',
        'Pidgin English',
        'Right-to-left support (Arabic)',
        'Voice assistance in local languages',
      ],
      implementation: 'i18n framework with professional translations',
    },
    {
      id: 'microfinance',
      category: 'Financial Inclusion',
      icon: Users,
      color: '#10B981',
      title: 'Microfinance & Susu Integration',
      description: 'Support for informal savings and community banking',
      status: 'coming_soon',
      priority: 'high',
      features: [
        'Susu collectors integration',
        'Rotating savings groups (ROSCA)',
        'Microfinance institutions (MFIs)',
        'Credit unions',
        'Village savings groups',
        'Agricultural cooperatives',
        'Informal trader associations',
        'Group lending',
      ],
      implementation: 'Custom APIs for informal financial sector',
    },
    {
      id: 'alternative-credit',
      category: 'Credit Scoring',
      icon: TrendingUp,
      color: '#8B5CF6',
      title: 'Alternative Credit Scoring',
      description: 'AI-powered credit scoring for the unbanked',
      status: 'available',
      priority: 'high',
      features: [
        'Mobile money transaction history',
        'Utility bill payment patterns',
        'Airtime purchase behavior',
        'Social network analysis',
        'Mobile phone usage patterns',
        'Geolocation data',
        'Merchant payment history',
        'Rental payment records',
        'Educational background',
        'Employment verification via SSNIT',
      ],
      implementation: 'ML models trained on African financial behavior',
    },
    {
      id: 'ecowas-payments',
      category: 'Cross-Border',
      icon: Globe,
      color: '#F59E0B',
      title: 'ECOWAS Cross-Border Payments',
      description: 'Seamless payments across West African countries',
      status: 'coming_soon',
      priority: 'high',
      features: [
        'Ghana ↔ Nigeria transfers',
        'ECOWAS member countries',
        'Multi-currency wallets (GHS, NGN, XOF, USD)',
        'Real-time exchange rates',
        'Low-cost remittances',
        'Mobile money to mobile money',
        'Compliance with ECOWAS regulations',
        'WAMZ integration',
      ],
      implementation: 'Partnership with regional payment processors',
    },
    {
      id: 'agent-banking',
      category: 'Financial Inclusion',
      icon: MapPin,
      color: '#EF4444',
      title: 'Agent Banking Network',
      description: 'Physical touchpoints for cash services',
      status: 'available',
      priority: 'high',
      features: [
        '10,000+ agent locations',
        'Cash deposit/withdrawal',
        'Account opening assistance',
        'KYC verification support',
        'Bill payment services',
        'Mobile money top-up',
        'Agent commission tracking',
        'GPS-based agent finder',
        'Rural area coverage',
      ],
      implementation: 'Agent management platform with real-time tracking',
    },
    {
      id: 'qr-payments',
      category: 'Payment Methods',
      icon: QrCode,
      color: '#06B6D4',
      title: 'QR Code Payments',
      description: 'Universal QR payments for merchants and individuals',
      status: 'available',
      priority: 'medium',
      features: [
        'GhQR standard support',
        'Dynamic QR codes',
        'Static QR for small merchants',
        'Person-to-person QR',
        'Offline QR validation',
        'Receipt generation',
        'Merchant analytics',
        'Tipping support',
      ],
      implementation: 'GhIPSS GhQR integration',
    },
    {
      id: 'sms-banking',
      category: 'Accessibility',
      icon: MessageSquare,
      color: '#10B981',
      title: 'SMS Banking Services',
      description: 'Complete banking via text messages',
      status: 'available',
      priority: 'high',
      features: [
        'Balance inquiry via SMS',
        'Mini-statement requests',
        'Airtime purchase',
        'Bill payment alerts',
        'Transaction notifications',
        'Transfer via SMS',
        'PIN reset',
        'Two-way SMS support',
      ],
      implementation: 'SMS gateway with all mobile networks',
    },
    {
      id: 'regulatory-compliance',
      category: 'Compliance',
      icon: Scale,
      color: '#1A3B5D',
      title: 'Regulatory Compliance',
      description: 'Full compliance with African financial regulations',
      status: 'available',
      priority: 'critical',
      features: [
        'Bank of Ghana regulations',
        'Data Protection Act (2012)',
        'AML/CFT compliance',
        'GDPR for international transfers',
        'Electronic Transactions Act',
        'Payment Systems Act',
        'ECOWAS directives',
        'ISO 27001 certification',
        'PCI DSS compliance',
      ],
      implementation: 'Automated compliance monitoring and reporting',
    },
    {
      id: 'whatsapp-banking',
      category: 'Customer Support',
      icon: MessageSquare,
      color: '#25D366',
      title: 'WhatsApp Banking',
      description: 'Full banking services via WhatsApp',
      status: 'coming_soon',
      priority: 'high',
      features: [
        'Account balance checks',
        'Transaction history',
        'Money transfers',
        'Bill payments',
        'Customer support chat',
        'Document upload (KYC)',
        'Chatbot assistance',
        'Voice note support',
        'Multi-language support',
      ],
      implementation: 'WhatsApp Business API integration',
    },
    {
      id: 'agriculture-finance',
      category: 'Specialized Services',
      icon: Sparkles,
      color: '#10B981',
      title: 'Agriculture & SME Finance',
      description: 'Specialized financial products for farmers and businesses',
      status: 'coming_soon',
      priority: 'medium',
      features: [
        'Crop cycle financing',
        'Equipment leasing',
        'Input financing',
        'Warehouse receipt financing',
        'Contract farming loans',
        'Weather-indexed insurance',
        'Supply chain financing',
        'Invoice factoring',
        'Trade finance',
      ],
      implementation: 'Partnerships with agric banks and development finance institutions',
    },
    {
      id: 'utility-integration',
      category: 'Bill Payments',
      icon: Zap,
      color: '#F59E0B',
      title: 'Utility & Bill Payments',
      description: 'One-stop shop for all bill payments',
      status: 'available',
      priority: 'high',
      features: [
        'ECG (Electricity Company of Ghana)',
        'Ghana Water Company',
        'DSTV, GOtv, StarTimes',
        'Internet providers (Vodafone, MTN, etc.)',
        'School fees payment',
        'NHIS premium',
        'Property rates',
        'Traffic fines',
        'Court fines',
        'Passport fees',
      ],
      implementation: 'Direct integration with all utility providers',
    },
    {
      id: 'biometric-atm',
      category: 'Authentication',
      icon: Shield,
      color: '#8B5CF6',
      title: 'Biometric ATM & POS',
      description: 'Cardless banking with fingerprint/face recognition',
      status: 'coming_soon',
      priority: 'medium',
      features: [
        'Fingerprint authentication',
        'Facial recognition',
        'Cardless cash withdrawal',
        'Biometric POS payments',
        'No PIN required',
        'Fraud prevention',
        'Multiple biometric templates',
        'Liveness detection',
      ],
      implementation: 'Hardware integration with ATM/POS manufacturers',
    },
    {
      id: 'diaspora-remittance',
      category: 'Cross-Border',
      icon: Globe,
      color: '#D4AF37',
      title: 'Diaspora Remittance Services',
      description: 'Low-cost money transfers from abroad',
      status: 'available',
      priority: 'high',
      features: [
        'USA → Ghana transfers',
        'UK → Ghana transfers',
        'Europe → Ghana transfers',
        'Mobile money delivery',
        'Bank account deposits',
        'Cash pickup options',
        'Real-time tracking',
        'Competitive exchange rates',
        'Same-day delivery',
        'Recipient notifications',
      ],
      implementation: 'Partnership with MoneyGram, Western Union, WorldRemit',
    },
    {
      id: 'social-commerce',
      category: 'Specialized Services',
      icon: Users,
      color: '#EF4444',
      title: 'Social Commerce Integration',
      description: 'Buy and sell on social media with integrated payments',
      status: 'coming_soon',
      priority: 'medium',
      features: [
        'Instagram Shop payments',
        'Facebook Marketplace integration',
        'WhatsApp Business payments',
        'TikTok Shop integration',
        'Escrow services',
        'Buyer protection',
        'Seller verification',
        'Dispute resolution',
      ],
      implementation: 'Social media platform APIs + escrow system',
    },
  ];

  const categories = [
    'all',
    'Payment Networks',
    'Accessibility',
    'Infrastructure',
    'Identity & KYC',
    'Financial Inclusion',
    'Credit Scoring',
    'Cross-Border',
    'Compliance',
    'Customer Support',
    'Specialized Services',
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? africanFeatures 
    : africanFeatures.filter(f => f.category === selectedCategory);

  const criticalCount = africanFeatures.filter(f => f.priority === 'critical').length;
  const availableCount = africanFeatures.filter(f => f.status === 'available').length;

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 text-white">
        <div className="px-4 py-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-10 h-10 text-[var(--secondary)]" />
            <h1 className="text-white m-0">Africa-Ready Features</h1>
          </div>
          <p className="text-xl text-white/90 mb-6 max-w-3xl m-0">
            Comprehensive features designed specifically for Ghana and African markets to ensure seamless operation across diverse infrastructure and financial ecosystems
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1 m-0">Total Features</p>
              <p className="text-3xl m-0">{africanFeatures.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1 m-0">Available Now</p>
              <p className="text-3xl m-0">{availableCount}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1 m-0">Critical Priority</p>
              <p className="text-3xl m-0">{criticalCount}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1 m-0">Categories</p>
              <p className="text-3xl m-0">{categories.length - 1}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white border-b border-[var(--neutral-200)] sticky top-0 z-40">
        <div className="px-4 py-4 max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]'
                }`}
              >
                {category === 'all' ? 'All Features' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <main className="px-4 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden hover:shadow-[var(--shadow-lg)] transition-shadow"
              >
                {/* Header */}
                <div className="p-6 border-b border-[var(--neutral-200)]">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: feature.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="m-0">{feature.title}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            feature.status === 'available'
                              ? 'bg-[var(--success)]/10 text-[var(--success)]'
                              : feature.status === 'coming_soon'
                              ? 'bg-[var(--warning)]/10 text-[var(--warning)]'
                              : 'bg-[var(--neutral-200)] text-[var(--neutral-600)]'
                          }`}
                        >
                          {feature.status === 'available' ? 'Available' : 'Coming Soon'}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--neutral-600)] mb-2 m-0">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[var(--neutral-500)]">
                          {feature.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            feature.priority === 'critical'
                              ? 'bg-[var(--error)]/10 text-[var(--error)]'
                              : feature.priority === 'high'
                              ? 'bg-[var(--warning)]/10 text-[var(--warning)]'
                              : 'bg-[var(--neutral-200)] text-[var(--neutral-600)]'
                          }`}
                        >
                          {feature.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="p-6">
                  <h4 className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                    Key Capabilities
                  </h4>
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    {feature.features.slice(0, 6).map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--neutral-700)]">{item}</span>
                      </div>
                    ))}
                    {feature.features.length > 6 && (
                      <p className="text-sm text-[var(--neutral-500)] mt-1 m-0">
                        +{feature.features.length - 6} more features
                      </p>
                    )}
                  </div>

                  {feature.implementation && (
                    <div className="pt-4 border-t border-[var(--neutral-200)]">
                      <p className="text-xs text-[var(--neutral-500)] mb-1 m-0">
                        Implementation:
                      </p>
                      <p className="text-sm text-[var(--neutral-700)] m-0">
                        {feature.implementation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 rounded-2xl p-8 text-white text-center">
          <h2 className="text-white mb-4">Ready to Build for Africa?</h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto m-0">
            Our platform is designed from the ground up to work seamlessly across African markets, with features that address real infrastructure challenges and opportunities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="secondary" size="lg">
              View Documentation
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.hash = 'api-playground'}
              className="bg-white text-[var(--primary)] hover:bg-white/90"
            >
              Try API Playground
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}