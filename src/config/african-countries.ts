// ReshADX - Africa Open Data Exchange
// Pan-African Country Configuration

export interface AfricanCountry {
  code: string;
  name: string;
  region: string;
  currency: string;
  currency_symbol: string;
  languages: string[];
  mobile_money_providers: string[];
  national_id_types: string[];
  payment_systems: string[];
  regulatory_bodies: string[];
  flag: string;
  phone_code: string;
  active: boolean;
  launch_phase: 'live' | 'beta' | 'coming_soon';
}

export const AFRICAN_COUNTRIES: AfricanCountry[] = [
  // West Africa
  {
    code: 'GH',
    name: 'Ghana',
    region: 'West Africa',
    currency: 'GHS',
    currency_symbol: '₵',
    languages: ['English', 'Twi', 'Ga', 'Ewe', 'Dagbani', 'Hausa'],
    mobile_money_providers: ['MTN Mobile Money', 'Vodafone Cash', 'AirtelTigo Money'],
    national_id_types: ['Ghana Card', 'Voter ID', 'NHIS Card', 'Driver\'s License', 'SSNIT Card', 'Passport'],
    payment_systems: ['GhIPSS Instant Pay', 'e-zwich', 'GACH', 'GhQR'],
    regulatory_bodies: ['Bank of Ghana', 'NIA', 'Data Protection Commission'],
    flag: '🇬🇭',
    phone_code: '+233',
    active: true,
    launch_phase: 'live',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    region: 'West Africa',
    currency: 'NGN',
    currency_symbol: '₦',
    languages: ['English', 'Hausa', 'Yoruba', 'Igbo', 'Pidgin'],
    mobile_money_providers: ['OPay', 'PalmPay', 'Kuda', 'MTN MoMo', 'Paga'],
    national_id_types: ['NIN Card', 'Voter Card', 'Driver\'s License', 'International Passport', 'BVN'],
    payment_systems: ['NIBSS Instant Payment', 'NIP', 'NUBAN', 'BVN'],
    regulatory_bodies: ['Central Bank of Nigeria', 'NIMC', 'NDPR'],
    flag: '🇳🇬',
    phone_code: '+234',
    active: true,
    launch_phase: 'live',
  },
  {
    code: 'CI',
    name: 'Côte d\'Ivoire',
    region: 'West Africa',
    currency: 'XOF',
    currency_symbol: 'CFA',
    languages: ['French', 'Baoulé', 'Dioula'],
    mobile_money_providers: ['Orange Money', 'MTN Mobile Money', 'Moov Money'],
    national_id_types: ['National ID Card', 'Driver\'s License', 'Passport'],
    payment_systems: ['BCEAO', 'GIMAC'],
    regulatory_bodies: ['BCEAO', 'ARTCI'],
    flag: '🇨🇮',
    phone_code: '+225',
    active: true,
    launch_phase: 'beta',
  },
  {
    code: 'SN',
    name: 'Senegal',
    region: 'West Africa',
    currency: 'XOF',
    currency_symbol: 'CFA',
    languages: ['French', 'Wolof', 'Pulaar'],
    mobile_money_providers: ['Orange Money', 'Free Money', 'Wave'],
    national_id_types: ['CEDEAO Card', 'Driver\'s License', 'Passport'],
    payment_systems: ['BCEAO', 'UEMOA'],
    regulatory_bodies: ['BCEAO', 'ARTP'],
    flag: '🇸🇳',
    phone_code: '+221',
    active: true,
    launch_phase: 'beta',
  },

  // East Africa
  {
    code: 'KE',
    name: 'Kenya',
    region: 'East Africa',
    currency: 'KES',
    currency_symbol: 'KSh',
    languages: ['English', 'Swahili', 'Kikuyu'],
    mobile_money_providers: ['M-Pesa', 'Airtel Money', 'T-Kash'],
    national_id_types: ['National ID', 'Huduma Namba', 'Driver\'s License', 'Passport', 'Alien ID'],
    payment_systems: ['KEPSS', 'PesaLink', 'RTGS'],
    regulatory_bodies: ['Central Bank of Kenya', 'ODPC'],
    flag: '🇰🇪',
    phone_code: '+254',
    active: true,
    launch_phase: 'live',
  },
  {
    code: 'UG',
    name: 'Uganda',
    region: 'East Africa',
    currency: 'UGX',
    currency_symbol: 'USh',
    languages: ['English', 'Swahili', 'Luganda'],
    mobile_money_providers: ['MTN Mobile Money', 'Airtel Money'],
    national_id_types: ['National ID', 'Driver\'s License', 'Passport'],
    payment_systems: ['UGX RTGS', 'UNISS'],
    regulatory_bodies: ['Bank of Uganda', 'NIRA'],
    flag: '🇺🇬',
    phone_code: '+256',
    active: true,
    launch_phase: 'beta',
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    region: 'East Africa',
    currency: 'TZS',
    currency_symbol: 'TSh',
    languages: ['Swahili', 'English'],
    mobile_money_providers: ['M-Pesa', 'Tigo Pesa', 'Airtel Money', 'Halo Pesa'],
    national_id_types: ['NIDA Card', 'Voter ID', 'Driver\'s License', 'Passport'],
    payment_systems: ['TISS', 'TCIB'],
    regulatory_bodies: ['Bank of Tanzania', 'NIDA'],
    flag: '🇹🇿',
    phone_code: '+255',
    active: true,
    launch_phase: 'beta',
  },
  {
    code: 'RW',
    name: 'Rwanda',
    region: 'East Africa',
    currency: 'RWF',
    currency_symbol: 'FRw',
    languages: ['Kinyarwanda', 'French', 'English', 'Swahili'],
    mobile_money_providers: ['MTN Mobile Money', 'Airtel Money'],
    national_id_types: ['National ID', 'Driver\'s License', 'Passport'],
    payment_systems: ['RIPPS', 'RSwitch'],
    regulatory_bodies: ['National Bank of Rwanda', 'NIDA'],
    flag: '🇷🇼',
    phone_code: '+250',
    active: true,
    launch_phase: 'coming_soon',
  },

  // Southern Africa
  {
    code: 'ZA',
    name: 'South Africa',
    region: 'Southern Africa',
    currency: 'ZAR',
    currency_symbol: 'R',
    languages: ['English', 'Afrikaans', 'Zulu', 'Xhosa', 'Sotho'],
    mobile_money_providers: ['Vodacom', 'MTN', 'Cell C'],
    national_id_types: ['Smart ID Card', 'Driver\'s License', 'Passport'],
    payment_systems: ['SAMOS', 'RTC', 'SASWITCH'],
    regulatory_bodies: ['South African Reserve Bank', 'POPIA'],
    flag: '🇿🇦',
    phone_code: '+27',
    active: true,
    launch_phase: 'coming_soon',
  },

  // North Africa
  {
    code: 'EG',
    name: 'Egypt',
    region: 'North Africa',
    currency: 'EGP',
    currency_symbol: 'E£',
    languages: ['Arabic', 'English'],
    mobile_money_providers: ['Vodafone Cash', 'Orange Cash', 'Etisalat Cash'],
    national_id_types: ['National ID', 'Driver\'s License', 'Passport'],
    payment_systems: ['EGX', 'CIB'],
    regulatory_bodies: ['Central Bank of Egypt'],
    flag: '🇪🇬',
    phone_code: '+20',
    active: false,
    launch_phase: 'coming_soon',
  },
];

// Regional groupings
export const AFRICAN_REGIONS = {
  'West Africa': ['GH', 'NG', 'CI', 'SN'],
  'East Africa': ['KE', 'UG', 'TZ', 'RW'],
  'Southern Africa': ['ZA'],
  'North Africa': ['EG'],
};

// Currency exchange rates (relative to USD)
export const CURRENCY_RATES: Record<string, number> = {
  GHS: 12.50,
  NGN: 790.00,
  XOF: 620.00,
  KES: 150.00,
  UGX: 3750.00,
  TZS: 2500.00,
  RWF: 1250.00,
  ZAR: 18.50,
  EGP: 31.00,
  USD: 1.00,
};

// Get active countries
export const getActiveCountries = () => AFRICAN_COUNTRIES.filter(c => c.active);

// Get countries by region
export const getCountriesByRegion = (region: string) => 
  AFRICAN_COUNTRIES.filter(c => c.region === region);

// Get country by code
export const getCountryByCode = (code: string) => 
  AFRICAN_COUNTRIES.find(c => c.code === code);

// Get live countries
export const getLiveCountries = () => 
  AFRICAN_COUNTRIES.filter(c => c.launch_phase === 'live');

// Currency conversion
export const convertCurrency = (amount: number, from: string, to: string): number => {
  const usdAmount = amount / CURRENCY_RATES[from];
  return usdAmount * CURRENCY_RATES[to];
};
