import { Institution } from '../types/api';

// Ghana Financial Institutions Database
export const GHANA_INSTITUTIONS: Institution[] = [
  // MOBILE MONEY PROVIDERS
  {
    institution_id: 'ins_mtn_mobile_money',
    name: 'MTN Mobile Money',
    type: 'mobile_money',
    logo_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop',
    primary_color: '#FFCC00',
    url: 'https://www.mtn.com.gh',
    products: ['auth', 'balance', 'transactions', 'identity', 'payment', 'transfer'],
    country_codes: ['GH'],
    routing_numbers: ['MTN-GH'],
    oauth: false,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
  {
    institution_id: 'ins_vodafone_cash',
    name: 'Vodafone Cash',
    type: 'mobile_money',
    logo_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop',
    primary_color: '#E60000',
    url: 'https://www.vodafone.com.gh',
    products: ['auth', 'balance', 'transactions', 'identity', 'payment', 'transfer'],
    country_codes: ['GH'],
    routing_numbers: ['VODA-GH'],
    oauth: false,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
  {
    institution_id: 'ins_airteltigo_money',
    name: 'AirtelTigo Money',
    type: 'mobile_money',
    logo_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop',
    primary_color: '#ED1C24',
    url: 'https://www.airteltigo.com.gh',
    products: ['auth', 'balance', 'transactions', 'identity', 'payment'],
    country_codes: ['GH'],
    routing_numbers: ['ATIGO-GH'],
    oauth: false,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },

  // MAJOR BANKS
  {
    institution_id: 'ins_gcb_bank',
    name: 'GCB Bank Limited',
    type: 'bank',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#00529B',
    url: 'https://www.gcbbank.com.gh',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities', 'payment', 'income', 'assets'],
    country_codes: ['GH'],
    routing_numbers: ['040101'],
    oauth: true,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
  {
    institution_id: 'ins_ecobank_ghana',
    name: 'Ecobank Ghana',
    type: 'bank',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#003DA5',
    url: 'https://www.ecobank.com',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities', 'payment', 'income', 'assets'],
    country_codes: ['GH'],
    routing_numbers: ['130101'],
    oauth: true,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
  {
    institution_id: 'ins_stanbic_bank',
    name: 'Stanbic Bank Ghana',
    type: 'bank',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#0033A1',
    url: 'https://www.stanbicbank.com.gh',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities', 'payment', 'income', 'assets'],
    country_codes: ['GH'],
    routing_numbers: ['190101'],
    oauth: true,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
  {
    institution_id: 'ins_absa_bank',
    name: 'Absa Bank Ghana',
    type: 'bank',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#D7001E',
    url: 'https://www.absa.com.gh',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities', 'payment', 'income', 'assets'],
    country_codes: ['GH'],
    routing_numbers: ['030101'],
    oauth: true,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
  {
    institution_id: 'ins_standard_chartered',
    name: 'Standard Chartered Bank',
    type: 'bank',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#006848',
    url: 'https://www.sc.com/gh',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities', 'payment', 'income', 'assets', 'investments'],
    country_codes: ['GH'],
    routing_numbers: ['180101'],
    oauth: true,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
  {
    institution_id: 'ins_calbank',
    name: 'CAL Bank',
    type: 'bank',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#E31E24',
    url: 'https://www.calbank.net',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities', 'payment', 'income'],
    country_codes: ['GH'],
    routing_numbers: ['080101'],
    oauth: true,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
  {
    institution_id: 'ins_fidelity_bank',
    name: 'Fidelity Bank Ghana',
    type: 'bank',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#8B0304',
    url: 'https://www.fidelitybank.com.gh',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities', 'payment', 'income'],
    country_codes: ['GH'],
    routing_numbers: ['240101'],
    oauth: true,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
  {
    institution_id: 'ins_zenith_bank',
    name: 'Zenith Bank Ghana',
    type: 'bank',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#ED1C24',
    url: 'https://www.zenithbank.com.gh',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities', 'payment'],
    country_codes: ['GH'],
    routing_numbers: ['120101'],
    oauth: true,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },

  // MICROFINANCE
  {
    institution_id: 'ins_sinapi_aba',
    name: 'Sinapi Aba Savings and Loans',
    type: 'microfinance',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#006838',
    url: 'https://www.sinapiaba.com.gh',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities', 'income'],
    country_codes: ['GH'],
    routing_numbers: ['SINAPI-01'],
    oauth: false,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
  {
    institution_id: 'ins_opportunity_intl',
    name: 'Opportunity International Savings and Loans',
    type: 'microfinance',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#009639',
    url: 'https://www.opportunityghana.com',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities', 'income'],
    country_codes: ['GH'],
    routing_numbers: ['OPP-INT-01'],
    oauth: false,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },

  // CREDIT UNIONS
  {
    institution_id: 'ins_gcu',
    name: 'Ghana Credit Union',
    type: 'credit_union',
    logo_url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    primary_color: '#1A3B5D',
    url: 'https://www.ghanacreditunion.com',
    products: ['auth', 'balance', 'transactions', 'identity', 'liabilities'],
    country_codes: ['GH'],
    routing_numbers: ['GCU-001'],
    oauth: false,
    status: {
      item_logins: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      transactions_updates: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
      auth: { status: 'HEALTHY', last_status_change: '2024-11-13T10:00:00Z' },
    },
  },
];

// Helper functions
export function getInstitutionById(id: string): Institution | undefined {
  return GHANA_INSTITUTIONS.find(inst => inst.institution_id === id);
}

export function searchInstitutions(query: string): Institution[] {
  const lowerQuery = query.toLowerCase();
  return GHANA_INSTITUTIONS.filter(inst => 
    inst.name.toLowerCase().includes(lowerQuery) ||
    inst.type.toLowerCase().includes(lowerQuery)
  );
}

export function getInstitutionsByType(type: string): Institution[] {
  return GHANA_INSTITUTIONS.filter(inst => inst.type === type);
}
