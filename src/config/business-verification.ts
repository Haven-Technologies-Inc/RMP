// Business/Bank Verification Configuration
// ReshADX - B2B Onboarding System

export type BusinessType = 'bank' | 'fintech' | 'microfinance' | 'lender' | 'insurance' | 'telco' | 'developer' | 'other';
export type ComplianceStatus = 'pending' | 'verified' | 'rejected' | 'requires_documents';
export type APITier = 'sandbox' | 'starter' | 'professional' | 'enterprise' | 'custom';

export interface BusinessRegistrationData {
  // Company Information
  companyName: string;
  tradingName?: string;
  businessType: BusinessType;
  registrationNumber: string; // CAC in Nigeria, company reg in other countries
  taxId?: string;
  yearEstablished: number;
  
  // Contact Information
  primaryEmail: string;
  primaryPhone: string;
  websiteUrl?: string;
  
  // Address
  country: string;
  state?: string;
  city: string;
  streetAddress: string;
  postalCode?: string;
  
  // Regulatory Information
  regulatoryLicense?: string; // CBN license, banking license, etc.
  regulatoryBody?: string;
  licenseNumber?: string;
  
  // Business Representatives
  ceoName: string;
  ceoEmail: string;
  ceoPhone: string;
  technicalContactName: string;
  technicalContactEmail: string;
  technicalContactPhone: string;
  
  // Use Case
  intendedUseCase: string;
  estimatedMonthlyVolume: string;
  apiProducts: string[]; // Identity, Income, Transactions, etc.
  
  // Legal
  acceptedTerms: boolean;
  acceptedPrivacyPolicy: boolean;
  acceptedSLA: boolean;
}

export interface BusinessVerificationRequirements {
  country: string;
  requiredDocuments: DocumentRequirement[];
  regulatoryBodies: RegulatoryBody[];
  verificationSteps: string[];
  estimatedTime: string;
}

export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  acceptedFormats: string[];
  maxSizeMB: number;
  example?: string;
}

export interface RegulatoryBody {
  name: string;
  country: string;
  licenseRequired: boolean;
  licenseTypes: string[];
  verificationUrl?: string;
}

// Ghana Business Requirements
export const GHANA_BUSINESS_REQUIREMENTS: BusinessVerificationRequirements = {
  country: 'Ghana',
  estimatedTime: '24-48 hours',
  verificationSteps: [
    'Company registration verification',
    'Regulatory license check (Bank of Ghana)',
    'Director identity verification',
    'Physical address verification',
    'Compliance screening',
  ],
  requiredDocuments: [
    {
      id: 'certificate_of_incorporation',
      name: 'Certificate of Incorporation',
      description: 'Company registration certificate from Registrar General\'s Department',
      required: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeMB: 10,
      example: 'Certificate showing company registration number',
    },
    {
      id: 'tin_certificate',
      name: 'TIN Certificate',
      description: 'Tax Identification Number from Ghana Revenue Authority',
      required: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeMB: 10,
    },
    {
      id: 'banking_license',
      name: 'Banking/Payment License',
      description: 'License from Bank of Ghana (if applicable)',
      required: false,
      acceptedFormats: ['pdf'],
      maxSizeMB: 10,
      example: 'Required for banks, payment service providers',
    },
    {
      id: 'director_id',
      name: 'Director Ghana Card',
      description: 'Ghana Card for all directors',
      required: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeMB: 5,
    },
    {
      id: 'proof_of_address',
      name: 'Proof of Business Address',
      description: 'Utility bill or lease agreement',
      required: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeMB: 5,
    },
  ],
  regulatoryBodies: [
    {
      name: 'Bank of Ghana',
      country: 'Ghana',
      licenseRequired: true,
      licenseTypes: ['Banking License', 'Payment Service Provider', 'Electronic Money Issuer'],
      verificationUrl: 'https://www.bog.gov.gh',
    },
    {
      name: 'National Communications Authority',
      country: 'Ghana',
      licenseRequired: false,
      licenseTypes: ['Telco License'],
    },
  ],
};

// Nigeria Business Requirements
export const NIGERIA_BUSINESS_REQUIREMENTS: BusinessVerificationRequirements = {
  country: 'Nigeria',
  estimatedTime: '24-48 hours',
  verificationSteps: [
    'CAC registration verification',
    'CBN license verification (if applicable)',
    'Director BVN/NIN verification',
    'Physical address verification',
    'Compliance screening',
  ],
  requiredDocuments: [
    {
      id: 'cac_certificate',
      name: 'CAC Certificate',
      description: 'Corporate Affairs Commission incorporation certificate',
      required: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeMB: 10,
      example: 'CAC certificate with RC number',
    },
    {
      id: 'cac_form_2_7',
      name: 'CAC Form 2 & 7',
      description: 'Particulars of Directors and Company Address',
      required: true,
      acceptedFormats: ['pdf'],
      maxSizeMB: 10,
    },
    {
      id: 'tin_certificate',
      name: 'TIN Certificate',
      description: 'Tax Identification Number from FIRS',
      required: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeMB: 10,
    },
    {
      id: 'cbn_license',
      name: 'CBN License',
      description: 'Central Bank of Nigeria license (if applicable)',
      required: false,
      acceptedFormats: ['pdf'],
      maxSizeMB: 10,
      example: 'Required for banks, fintechs, payment service providers',
    },
    {
      id: 'director_bvn',
      name: 'Director BVN/NIN',
      description: 'BVN or NIN for all directors',
      required: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeMB: 5,
    },
    {
      id: 'memart',
      name: 'MEMART',
      description: 'Memorandum and Articles of Association',
      required: true,
      acceptedFormats: ['pdf'],
      maxSizeMB: 15,
    },
  ],
  regulatoryBodies: [
    {
      name: 'Central Bank of Nigeria (CBN)',
      country: 'Nigeria',
      licenseRequired: true,
      licenseTypes: [
        'Commercial Banking License',
        'Payment Service Bank',
        'Mobile Money Operator',
        'Payment Solution Service Provider',
        'Super Agent',
      ],
      verificationUrl: 'https://www.cbn.gov.ng',
    },
    {
      name: 'Nigeria Deposit Insurance Corporation (NDIC)',
      country: 'Nigeria',
      licenseRequired: false,
      licenseTypes: ['Deposit Insurance'],
    },
  ],
};

// Kenya Business Requirements
export const KENYA_BUSINESS_REQUIREMENTS: BusinessVerificationRequirements = {
  country: 'Kenya',
  estimatedTime: '24-48 hours',
  verificationSteps: [
    'Business registration verification',
    'CBK license verification (if applicable)',
    'Director KRA PIN verification',
    'Physical address verification',
    'Compliance screening',
  ],
  requiredDocuments: [
    {
      id: 'certificate_of_incorporation',
      name: 'Certificate of Incorporation',
      description: 'Business registration certificate',
      required: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeMB: 10,
    },
    {
      id: 'kra_pin',
      name: 'KRA PIN Certificate',
      description: 'Kenya Revenue Authority PIN',
      required: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeMB: 10,
    },
    {
      id: 'cbk_license',
      name: 'CBK License',
      description: 'Central Bank of Kenya license (if applicable)',
      required: false,
      acceptedFormats: ['pdf'],
      maxSizeMB: 10,
    },
    {
      id: 'director_id',
      name: 'Director National ID',
      description: 'National ID or Huduma Namba for all directors',
      required: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeMB: 5,
    },
    {
      id: 'cr12',
      name: 'CR12 Form',
      description: 'Register of directors',
      required: true,
      acceptedFormats: ['pdf'],
      maxSizeMB: 10,
    },
  ],
  regulatoryBodies: [
    {
      name: 'Central Bank of Kenya (CBK)',
      country: 'Kenya',
      licenseRequired: true,
      licenseTypes: [
        'Banking License',
        'Microfinance License',
        'Payment Service Provider',
        'Digital Credit Provider',
      ],
      verificationUrl: 'https://www.centralbank.go.ke',
    },
  ],
};

export const BUSINESS_REQUIREMENTS_BY_COUNTRY: Record<string, BusinessVerificationRequirements> = {
  GH: GHANA_BUSINESS_REQUIREMENTS,
  NG: NIGERIA_BUSINESS_REQUIREMENTS,
  KE: KENYA_BUSINESS_REQUIREMENTS,
};

// API Tier Configurations
export interface APITierConfig {
  id: APITier;
  name: string;
  description: string;
  monthlyPrice: number;
  currency: string;
  requestsPerMonth: number;
  requestsPerSecond: number;
  features: string[];
  support: string;
  sla: string;
  recommended?: boolean;
}

export const API_TIERS: APITierConfig[] = [
  {
    id: 'sandbox',
    name: 'Sandbox',
    description: 'Test and develop with sample data',
    monthlyPrice: 0,
    currency: 'USD',
    requestsPerMonth: 1000,
    requestsPerSecond: 1,
    features: [
      'Test API access',
      'Sample data only',
      'All API endpoints',
      'Documentation access',
      'Community support',
    ],
    support: 'Community',
    sla: 'None',
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small apps and MVPs',
    monthlyPrice: 99,
    currency: 'USD',
    requestsPerMonth: 10000,
    requestsPerSecond: 5,
    features: [
      '10,000 verifications/month',
      'All API products',
      'Email support',
      '99% uptime SLA',
      'Dashboard analytics',
    ],
    support: 'Email (48h response)',
    sla: '99% uptime',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing fintechs',
    monthlyPrice: 499,
    currency: 'USD',
    requestsPerMonth: 100000,
    requestsPerSecond: 20,
    features: [
      '100,000 verifications/month',
      'All API products',
      'Priority email support',
      '99.5% uptime SLA',
      'Advanced analytics',
      'Custom webhooks',
      'Dedicated account manager',
    ],
    support: 'Email + Chat (24h response)',
    sla: '99.5% uptime',
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For banks and large institutions',
    monthlyPrice: 2499,
    currency: 'USD',
    requestsPerMonth: 1000000,
    requestsPerSecond: 100,
    features: [
      '1M+ verifications/month',
      'All API products',
      '24/7 phone support',
      '99.9% uptime SLA',
      'Custom integrations',
      'Dedicated infrastructure',
      'On-premise deployment option',
      'White-label solution',
      'Dedicated account team',
    ],
    support: '24/7 Phone + Dedicated Team',
    sla: '99.9% uptime',
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Tailored for your needs',
    monthlyPrice: 0,
    currency: 'USD',
    requestsPerMonth: -1, // Unlimited
    requestsPerSecond: -1,
    features: [
      'Custom volume',
      'Custom features',
      'Negotiated SLA',
      'Custom support',
      'Custom integrations',
    ],
    support: 'Custom',
    sla: 'Custom',
  },
];

// Business verification helper functions
export const getBusinessRequirements = (countryCode: string): BusinessVerificationRequirements | null => {
  return BUSINESS_REQUIREMENTS_BY_COUNTRY[countryCode] || null;
};

export const getTierByVolume = (monthlyVolume: number): APITier => {
  if (monthlyVolume <= 1000) return 'sandbox';
  if (monthlyVolume <= 10000) return 'starter';
  if (monthlyVolume <= 100000) return 'professional';
  if (monthlyVolume <= 1000000) return 'enterprise';
  return 'custom';
};

export const getRecommendedTier = (businessType: BusinessType, monthlyVolume: number): APITier => {
  if (businessType === 'bank' || businessType === 'telco') return 'enterprise';
  if (businessType === 'fintech' && monthlyVolume > 50000) return 'professional';
  return getTierByVolume(monthlyVolume);
};
