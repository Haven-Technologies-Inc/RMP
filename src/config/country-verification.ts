// Country-Specific Verification Configuration
// ReshADX - Africa Open Data Exchange

import { AfricanCountry } from './african-countries';

export interface VerificationMethod {
  id: string;
  name: string;
  type: 'national_id' | 'biometric' | 'phone' | 'document' | 'address';
  required: boolean;
  priority: number;
  icon: string;
  description: string;
  verification_time: string;
  fields: VerificationField[];
}

export interface VerificationField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'file' | 'phone' | 'email';
  required: boolean;
  placeholder?: string;
  validation?: string;
  options?: string[];
  help_text?: string;
}

export interface CountryVerificationConfig {
  country_code: string;
  country_name: string;
  flag: string;
  verification_methods: VerificationMethod[];
  recommended_flow: string[];
  estimated_time: string;
  success_rate: number;
  special_requirements?: string[];
}

// Ghana Verification Configuration
export const GHANA_VERIFICATION: CountryVerificationConfig = {
  country_code: 'GH',
  country_name: 'Ghana',
  flag: '🇬🇭',
  estimated_time: '2-3 minutes',
  success_rate: 98.5,
  recommended_flow: ['ghana_card', 'phone_verification', 'biometric', 'address'],
  special_requirements: [
    'Ghana Card is mandatory for all verifications',
    'SSNIT number optional but recommended for income verification',
  ],
  verification_methods: [
    {
      id: 'ghana_card',
      name: 'Ghana Card',
      type: 'national_id',
      required: true,
      priority: 1,
      icon: '🆔',
      description: 'National Identification Authority (NIA) verified ID',
      verification_time: 'Instant',
      fields: [
        {
          id: 'ghana_card_number',
          label: 'Ghana Card Number',
          type: 'text',
          required: true,
          placeholder: 'GHA-123456789-1',
          validation: '^GHA-\\d{9}-\\d$',
          help_text: 'Format: GHA-XXXXXXXXX-X',
        },
        {
          id: 'date_of_birth',
          label: 'Date of Birth',
          type: 'date',
          required: true,
          placeholder: 'YYYY-MM-DD',
        },
        {
          id: 'full_name',
          label: 'Full Name (as on Ghana Card)',
          type: 'text',
          required: true,
          placeholder: 'Kwame Mensah',
        },
      ],
    },
    {
      id: 'voter_id',
      name: 'Voter ID Card',
      type: 'national_id',
      required: false,
      priority: 2,
      icon: '🗳️',
      description: 'Electoral Commission voter ID (secondary verification)',
      verification_time: '1-2 minutes',
      fields: [
        {
          id: 'voter_id_number',
          label: 'Voter ID Number',
          type: 'text',
          required: true,
          placeholder: '1234567890',
          validation: '^\\d{10}$',
        },
      ],
    },
    {
      id: 'ssnit',
      name: 'SSNIT Number',
      type: 'document',
      required: false,
      priority: 3,
      icon: '💼',
      description: 'Social Security & National Insurance Trust number',
      verification_time: '30 seconds',
      fields: [
        {
          id: 'ssnit_number',
          label: 'SSNIT Number',
          type: 'text',
          required: true,
          placeholder: 'C123456789012',
          validation: '^[A-Z]\\d{12}$',
        },
      ],
    },
    {
      id: 'phone_verification',
      name: 'Phone Number',
      type: 'phone',
      required: true,
      priority: 4,
      icon: '📱',
      description: 'Mobile number verification via SMS/OTP',
      verification_time: '1 minute',
      fields: [
        {
          id: 'phone_number',
          label: 'Mobile Number',
          type: 'phone',
          required: true,
          placeholder: '+233501234567',
          validation: '^\\+233[0-9]{9}$',
          help_text: 'Format: +233XXXXXXXXX',
        },
        {
          id: 'mobile_money_provider',
          label: 'Mobile Money Provider',
          type: 'select',
          required: false,
          options: ['MTN Mobile Money', 'Vodafone Cash', 'AirtelTigo Money'],
        },
      ],
    },
    {
      id: 'biometric',
      name: 'Biometric Verification',
      type: 'biometric',
      required: false,
      priority: 5,
      icon: '👆',
      description: 'Fingerprint or facial recognition',
      verification_time: '30 seconds',
      fields: [
        {
          id: 'biometric_type',
          label: 'Biometric Type',
          type: 'select',
          required: true,
          options: ['Fingerprint', 'Facial Recognition'],
        },
      ],
    },
    {
      id: 'address',
      name: 'Address Verification',
      type: 'address',
      required: true,
      priority: 6,
      icon: '🏠',
      description: 'Residential address with Ghana Post GPS',
      verification_time: '1 minute',
      fields: [
        {
          id: 'ghana_post_gps',
          label: 'Ghana Post GPS Address',
          type: 'text',
          required: false,
          placeholder: 'GA-123-4567',
          help_text: 'Digital address from Ghana Post GPS',
        },
        {
          id: 'region',
          label: 'Region',
          type: 'select',
          required: true,
          options: [
            'Greater Accra',
            'Ashanti',
            'Western',
            'Eastern',
            'Central',
            'Northern',
            'Upper East',
            'Upper West',
            'Volta',
            'Bono',
            'Bono East',
            'Ahafo',
            'Oti',
            'Savannah',
            'North East',
            'Western North',
          ],
        },
        {
          id: 'city',
          label: 'City/Town',
          type: 'text',
          required: true,
          placeholder: 'Accra',
        },
        {
          id: 'street_address',
          label: 'Street Address',
          type: 'text',
          required: true,
          placeholder: 'House 123, Oxford Street',
        },
      ],
    },
  ],
};

// Nigeria Verification Configuration
export const NIGERIA_VERIFICATION: CountryVerificationConfig = {
  country_code: 'NG',
  country_name: 'Nigeria',
  flag: '🇳🇬',
  estimated_time: '2-3 minutes',
  success_rate: 97.8,
  recommended_flow: ['nin_or_bvn', 'phone_verification', 'address'],
  special_requirements: [
    'NIN (National Identity Number) or BVN (Bank Verification Number) required',
    'Phone number must match NIN/BVN records',
  ],
  verification_methods: [
    {
      id: 'nin',
      name: 'NIN (National Identity Number)',
      type: 'national_id',
      required: true,
      priority: 1,
      icon: '🆔',
      description: 'NIMC verified National Identity Number',
      verification_time: 'Instant',
      fields: [
        {
          id: 'nin_number',
          label: 'NIN Number',
          type: 'text',
          required: true,
          placeholder: '12345678901',
          validation: '^\\d{11}$',
          help_text: '11-digit NIN',
        },
        {
          id: 'date_of_birth',
          label: 'Date of Birth',
          type: 'date',
          required: true,
        },
        {
          id: 'full_name',
          label: 'Full Name (as on NIN)',
          type: 'text',
          required: true,
          placeholder: 'Chukwuemeka Okonkwo',
        },
      ],
    },
    {
      id: 'bvn',
      name: 'BVN (Bank Verification Number)',
      type: 'national_id',
      required: false,
      priority: 2,
      icon: '🏦',
      description: 'Central Bank of Nigeria verified BVN',
      verification_time: 'Instant',
      fields: [
        {
          id: 'bvn_number',
          label: 'BVN Number',
          type: 'text',
          required: true,
          placeholder: '12345678901',
          validation: '^\\d{11}$',
          help_text: '11-digit BVN',
        },
      ],
    },
    {
      id: 'phone_verification',
      name: 'Phone Number',
      type: 'phone',
      required: true,
      priority: 3,
      icon: '📱',
      description: 'Mobile number verification',
      verification_time: '1 minute',
      fields: [
        {
          id: 'phone_number',
          label: 'Mobile Number',
          type: 'phone',
          required: true,
          placeholder: '+2348012345678',
          validation: '^\\+234[0-9]{10}$',
        },
        {
          id: 'mobile_money_provider',
          label: 'Mobile Money Provider',
          type: 'select',
          required: false,
          options: ['OPay', 'PalmPay', 'Kuda', 'MTN MoMo', 'Paga'],
        },
      ],
    },
    {
      id: 'address',
      name: 'Address Verification',
      type: 'address',
      required: true,
      priority: 4,
      icon: '🏠',
      description: 'Residential address',
      verification_time: '1 minute',
      fields: [
        {
          id: 'state',
          label: 'State',
          type: 'select',
          required: true,
          options: [
            'Lagos',
            'Abuja FCT',
            'Kano',
            'Rivers',
            'Oyo',
            'Kaduna',
            'Anambra',
            'Enugu',
            'Delta',
            'Edo',
            'Other',
          ],
        },
        {
          id: 'lga',
          label: 'Local Government Area',
          type: 'text',
          required: true,
          placeholder: 'Ikeja',
        },
        {
          id: 'street_address',
          label: 'Street Address',
          type: 'text',
          required: true,
          placeholder: 'Plot 123, Allen Avenue',
        },
      ],
    },
  ],
};

// Kenya Verification Configuration
export const KENYA_VERIFICATION: CountryVerificationConfig = {
  country_code: 'KE',
  country_name: 'Kenya',
  flag: '🇰🇪',
  estimated_time: '2 minutes',
  success_rate: 99.2,
  recommended_flow: ['national_id_or_huduma', 'phone_verification', 'mpesa', 'address'],
  special_requirements: [
    'National ID or Huduma Namba required',
    'M-Pesa integration available for instant verification',
  ],
  verification_methods: [
    {
      id: 'national_id',
      name: 'National ID',
      type: 'national_id',
      required: true,
      priority: 1,
      icon: '🆔',
      description: 'Kenyan National ID',
      verification_time: 'Instant',
      fields: [
        {
          id: 'national_id_number',
          label: 'National ID Number',
          type: 'text',
          required: true,
          placeholder: '12345678',
          validation: '^\\d{7,8}$',
          help_text: '7 or 8 digit ID number',
        },
        {
          id: 'full_name',
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'John Kamau',
        },
        {
          id: 'date_of_birth',
          label: 'Date of Birth',
          type: 'date',
          required: true,
        },
      ],
    },
    {
      id: 'huduma_namba',
      name: 'Huduma Namba',
      type: 'national_id',
      required: false,
      priority: 2,
      icon: '🎫',
      description: 'Unified identification number',
      verification_time: 'Instant',
      fields: [
        {
          id: 'huduma_number',
          label: 'Huduma Namba',
          type: 'text',
          required: true,
          placeholder: 'HN-123456789',
        },
      ],
    },
    {
      id: 'phone_verification',
      name: 'Phone Number',
      type: 'phone',
      required: true,
      priority: 3,
      icon: '📱',
      description: 'Mobile number with M-Pesa verification',
      verification_time: '30 seconds',
      fields: [
        {
          id: 'phone_number',
          label: 'Mobile Number',
          type: 'phone',
          required: true,
          placeholder: '+254712345678',
          validation: '^\\+254[0-9]{9}$',
        },
        {
          id: 'mpesa_account',
          label: 'M-Pesa Account',
          type: 'select',
          required: false,
          options: ['Yes, same number', 'No M-Pesa account'],
        },
      ],
    },
    {
      id: 'address',
      name: 'Address Verification',
      type: 'address',
      required: true,
      priority: 4,
      icon: '🏠',
      description: 'Residential address',
      verification_time: '1 minute',
      fields: [
        {
          id: 'county',
          label: 'County',
          type: 'select',
          required: true,
          options: [
            'Nairobi',
            'Mombasa',
            'Kisumu',
            'Nakuru',
            'Kiambu',
            'Machakos',
            'Kajiado',
            'Other',
          ],
        },
        {
          id: 'sub_county',
          label: 'Sub-County',
          type: 'text',
          required: true,
        },
        {
          id: 'street_address',
          label: 'Street Address',
          type: 'text',
          required: true,
          placeholder: 'Kimathi Street, Nairobi',
        },
      ],
    },
  ],
};

// Côte d'Ivoire (French language)
export const COTE_IVOIRE_VERIFICATION: CountryVerificationConfig = {
  country_code: 'CI',
  country_name: 'Côte d\'Ivoire',
  flag: '🇨🇮',
  estimated_time: '3 minutes',
  success_rate: 96.5,
  recommended_flow: ['national_id', 'phone_verification', 'address'],
  verification_methods: [
    {
      id: 'national_id',
      name: 'Carte Nationale d\'Identité',
      type: 'national_id',
      required: true,
      priority: 1,
      icon: '🆔',
      description: 'Carte d\'identité nationale',
      verification_time: 'Instantané',
      fields: [
        {
          id: 'cni_number',
          label: 'Numéro CNI',
          type: 'text',
          required: true,
          placeholder: 'CI123456789',
        },
        {
          id: 'full_name',
          label: 'Nom complet',
          type: 'text',
          required: true,
          placeholder: 'Kouassi Yao',
        },
        {
          id: 'date_of_birth',
          label: 'Date de naissance',
          type: 'date',
          required: true,
        },
      ],
    },
    {
      id: 'phone_verification',
      name: 'Numéro de téléphone',
      type: 'phone',
      required: true,
      priority: 2,
      icon: '📱',
      description: 'Vérification par mobile money',
      verification_time: '1 minute',
      fields: [
        {
          id: 'phone_number',
          label: 'Numéro mobile',
          type: 'phone',
          required: true,
          placeholder: '+2250712345678',
          validation: '^\\+225[0-9]{10}$',
        },
        {
          id: 'mobile_money_provider',
          label: 'Opérateur Mobile Money',
          type: 'select',
          required: false,
          options: ['Orange Money', 'MTN Mobile Money', 'Moov Money'],
        },
      ],
    },
  ],
};

// Export all configurations
export const COUNTRY_VERIFICATION_CONFIGS: Record<string, CountryVerificationConfig> = {
  GH: GHANA_VERIFICATION,
  NG: NIGERIA_VERIFICATION,
  KE: KENYA_VERIFICATION,
  CI: COTE_IVOIRE_VERIFICATION,
};

// Helper function to get verification config by country code
export const getVerificationConfig = (countryCode: string): CountryVerificationConfig | null => {
  return COUNTRY_VERIFICATION_CONFIGS[countryCode] || null;
};

// Helper function to get required methods
export const getRequiredMethods = (countryCode: string): VerificationMethod[] => {
  const config = getVerificationConfig(countryCode);
  if (!config) return [];
  return config.verification_methods.filter(m => m.required);
};

// Helper function to get optional methods
export const getOptionalMethods = (countryCode: string): VerificationMethod[] => {
  const config = getVerificationConfig(countryCode);
  if (!config) return [];
  return config.verification_methods.filter(m => !m.required);
};
