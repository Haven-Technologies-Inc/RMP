// Ghana Open Data Exchange API Client
// This simulates API calls to the platform (similar to Plaid API)

import {
  LinkToken,
  AccessToken,
  AccountsGetResponse,
  TransactionsGetResponse,
  BalanceGetResponse,
  IdentityGetResponse,
  Institution,
  Account,
  Transaction,
  Item,
  PaymentInitiation,
  Income,
  Webhook,
  ApiError,
} from '../types/api';
import { GHANA_INSTITUTIONS } from '../data/institutions';

// Base configuration
const API_BASE_URL = '/api/v1';
const SANDBOX_MODE = true;

// Error handler
function createError(
  type: string,
  code: string,
  message: string,
  status: number = 400
): ApiError {
  return {
    error_type: type as any,
    error_code: code,
    error_message: message,
    display_message: message,
    request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    causes: [],
    status,
    documentation_url: 'https://docs.ghodex.com/errors',
    suggested_action: null,
  };
}

// Generate unique IDs
function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export class GhanaOpenDataExchangeAPI {
  private clientId: string;
  private secret: string;
  private environment: 'sandbox' | 'development' | 'production';

  constructor(clientId: string, secret: string, environment: 'sandbox' | 'development' | 'production' = 'sandbox') {
    this.clientId = clientId;
    this.secret = secret;
    this.environment = environment;
  }

  // ============================================================================
  // LINK TOKEN - Create a link token to initialize Link
  // ============================================================================
  async createLinkToken(
    user: { client_user_id: string; legal_name?: string; phone_number?: string; email_address?: string },
    products: string[],
    options?: {
      webhook?: string;
      redirect_uri?: string;
      country_codes?: string[];
      language?: string;
    }
  ): Promise<LinkToken> {
    // Simulate API call
    await this.simulateNetworkDelay();

    const linkToken: LinkToken = {
      link_token: generateId('link'),
      expiration: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      request_id: generateId('req'),
    };

    return linkToken;
  }

  // ============================================================================
  // ACCESS TOKEN - Exchange public token for access token
  // ============================================================================
  async exchangePublicToken(publicToken: string): Promise<AccessToken> {
    await this.simulateNetworkDelay();

    const accessToken: AccessToken = {
      access_token: generateId('access'),
      item_id: generateId('item'),
      request_id: generateId('req'),
    };

    return accessToken;
  }

  // ============================================================================
  // INSTITUTIONS - Get information about financial institutions
  // ============================================================================
  async getInstitutions(
    countryCode: string = 'GH',
    options?: { products?: string[] }
  ): Promise<Institution[]> {
    await this.simulateNetworkDelay();

    let institutions = GHANA_INSTITUTIONS.filter(
      inst => inst.country_codes.includes(countryCode)
    );

    if (options?.products && options.products.length > 0) {
      institutions = institutions.filter(inst =>
        options.products!.some(product => inst.products.includes(product as any))
      );
    }

    return institutions;
  }

  async getInstitutionById(institutionId: string): Promise<Institution | null> {
    await this.simulateNetworkDelay();

    const institution = GHANA_INSTITUTIONS.find(
      inst => inst.institution_id === institutionId
    );

    return institution || null;
  }

  async searchInstitutions(query: string, countryCode: string = 'GH'): Promise<Institution[]> {
    await this.simulateNetworkDelay();

    const lowerQuery = query.toLowerCase();
    return GHANA_INSTITUTIONS.filter(
      inst =>
        inst.country_codes.includes(countryCode) &&
        (inst.name.toLowerCase().includes(lowerQuery) ||
          inst.type.toLowerCase().includes(lowerQuery))
    );
  }

  // ============================================================================
  // ACCOUNTS - Get account information
  // ============================================================================
  async getAccounts(accessToken: string, accountIds?: string[]): Promise<AccountsGetResponse> {
    await this.simulateNetworkDelay();

    // Mock accounts data
    const accounts: Account[] = [
      {
        account_id: 'acc_savings_001',
        balances: {
          available: 15420.50,
          current: 15420.50,
          limit: null,
          iso_currency_code: 'GHS',
          unofficial_currency_code: null,
        },
        mask: '4567',
        name: 'Savings Account',
        official_name: 'GCB Savings Account',
        type: 'depository',
        subtype: 'savings',
        verification_status: 'automatically_verified',
      },
      {
        account_id: 'acc_mobile_money_001',
        balances: {
          available: 2345.75,
          current: 2345.75,
          limit: null,
          iso_currency_code: 'GHS',
          unofficial_currency_code: null,
        },
        mask: '4321',
        name: 'MTN Mobile Money',
        official_name: 'MTN MoMo Account',
        type: 'depository',
        subtype: 'mobile_money',
        verification_status: 'automatically_verified',
      },
      {
        account_id: 'acc_checking_001',
        balances: {
          available: 8750.25,
          current: 8750.25,
          limit: null,
          iso_currency_code: 'GHS',
          unofficial_currency_code: null,
        },
        mask: '8901',
        name: 'Current Account',
        official_name: 'GCB Current Account',
        type: 'depository',
        subtype: 'checking',
        verification_status: 'automatically_verified',
      },
    ];

    const item: Item = {
      item_id: generateId('item'),
      institution_id: 'ins_gcb_bank',
      webhook: '',
      error: null,
      available_products: ['auth', 'balance', 'transactions', 'identity'],
      billed_products: ['auth', 'balance', 'transactions'],
      consent_expiration_time: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      update_type: 'background',
    };

    return {
      accounts: accountIds
        ? accounts.filter(acc => accountIds.includes(acc.account_id))
        : accounts,
      item,
      request_id: generateId('req'),
    };
  }

  // ============================================================================
  // BALANCE - Get real-time balance
  // ============================================================================
  async getBalance(accessToken: string, accountIds?: string[]): Promise<BalanceGetResponse> {
    const accountsResponse = await this.getAccounts(accessToken, accountIds);
    
    return {
      accounts: accountsResponse.accounts,
      item: accountsResponse.item,
      request_id: generateId('req'),
    };
  }

  // ============================================================================
  // TRANSACTIONS - Get transaction history
  // ============================================================================
  async getTransactions(
    accessToken: string,
    startDate: string,
    endDate: string,
    options?: { account_ids?: string[]; count?: number; offset?: number }
  ): Promise<TransactionsGetResponse> {
    await this.simulateNetworkDelay();

    const accountsResponse = await this.getAccounts(accessToken, options?.account_ids);

    // Mock transactions
    const transactions: Transaction[] = [
      {
        transaction_id: 'txn_001',
        account_id: 'acc_savings_001',
        amount: -125.50,
        iso_currency_code: 'GHS',
        unofficial_currency_code: null,
        category: ['Food and Drink', 'Restaurants'],
        category_id: '13005000',
        date: '2024-11-12',
        authorized_date: '2024-11-12',
        name: 'KFC Airport City',
        merchant_name: 'KFC',
        payment_channel: 'in_store',
        pending: false,
        pending_transaction_id: null,
        account_owner: null,
        location: {
          address: 'Airport City',
          city: 'Accra',
          region: 'Greater Accra',
          postal_code: null,
          country: 'GH',
          lat: 5.6037,
          lon: -0.1870,
        },
        payment_meta: {
          reference_number: 'REF123456',
          ppd_id: null,
          payee: null,
          by_order_of: null,
          payer: null,
          payment_method: 'debit_card',
          payment_processor: 'Visa',
          reason: null,
        },
        transaction_type: 'place',
      },
      {
        transaction_id: 'txn_002',
        account_id: 'acc_mobile_money_001',
        amount: 500.00,
        iso_currency_code: 'GHS',
        unofficial_currency_code: null,
        category: ['Transfer', 'Credit'],
        category_id: '21006000',
        date: '2024-11-11',
        authorized_date: '2024-11-11',
        name: 'MoMo Transfer from Kofi Mensah',
        merchant_name: null,
        payment_channel: 'other',
        pending: false,
        pending_transaction_id: null,
        account_owner: null,
        location: {
          address: null,
          city: null,
          region: null,
          postal_code: null,
          country: 'GH',
          lat: null,
          lon: null,
        },
        payment_meta: {
          reference_number: 'MOMO2024111100123',
          ppd_id: null,
          payee: 'Kwame Mensah',
          by_order_of: null,
          payer: 'Kofi Mensah',
          payment_method: 'mobile_money',
          payment_processor: 'MTN',
          reason: 'Business payment',
        },
        transaction_type: 'digital',
      },
      {
        transaction_id: 'txn_003',
        account_id: 'acc_checking_001',
        amount: -2500.00,
        iso_currency_code: 'GHS',
        unofficial_currency_code: null,
        category: ['Payment', 'Rent'],
        category_id: '18001000',
        date: '2024-11-10',
        authorized_date: '2024-11-10',
        name: 'Monthly Rent Payment',
        merchant_name: null,
        payment_channel: 'other',
        pending: false,
        pending_transaction_id: null,
        account_owner: null,
        location: {
          address: null,
          city: 'Accra',
          region: 'Greater Accra',
          postal_code: null,
          country: 'GH',
          lat: null,
          lon: null,
        },
        payment_meta: {
          reference_number: 'RENT202411',
          ppd_id: null,
          payee: 'Landlord',
          by_order_of: null,
          payer: 'Kwame Mensah',
          payment_method: 'bank_transfer',
          payment_processor: 'GCB',
          reason: 'November 2024 Rent',
        },
        transaction_type: 'special',
      },
      {
        transaction_id: 'txn_004',
        account_id: 'acc_savings_001',
        amount: -45.00,
        iso_currency_code: 'GHS',
        unofficial_currency_code: null,
        category: ['Shops', 'Pharmacies'],
        category_id: '19047000',
        date: '2024-11-09',
        authorized_date: '2024-11-09',
        name: 'Pharmacy Purchase',
        merchant_name: 'Ernest Chemist',
        payment_channel: 'in_store',
        pending: false,
        pending_transaction_id: null,
        account_owner: null,
        location: {
          address: 'Oxford Street',
          city: 'Accra',
          region: 'Greater Accra',
          postal_code: null,
          country: 'GH',
          lat: 5.6037,
          lon: -0.1870,
        },
        payment_meta: {
          reference_number: 'PHRM2024110901',
          ppd_id: null,
          payee: null,
          by_order_of: null,
          payer: null,
          payment_method: 'debit_card',
          payment_processor: 'Mastercard',
          reason: null,
        },
        transaction_type: 'place',
      },
      {
        transaction_id: 'txn_005',
        account_id: 'acc_mobile_money_001',
        amount: -50.00,
        iso_currency_code: 'GHS',
        unofficial_currency_code: null,
        category: ['Service', 'Utilities', 'Internet'],
        category_id: '19013000',
        date: '2024-11-08',
        authorized_date: '2024-11-08',
        name: 'Internet Bill Payment',
        merchant_name: 'Vodafone Ghana',
        payment_channel: 'online',
        pending: false,
        pending_transaction_id: null,
        account_owner: null,
        location: {
          address: null,
          city: null,
          region: null,
          postal_code: null,
          country: 'GH',
          lat: null,
          lon: null,
        },
        payment_meta: {
          reference_number: 'VODA2024110800456',
          ppd_id: null,
          payee: 'Vodafone Ghana',
          by_order_of: null,
          payer: 'Kwame Mensah',
          payment_method: 'mobile_money',
          payment_processor: 'Vodafone',
          reason: 'Internet bill November 2024',
        },
        transaction_type: 'digital',
      },
    ];

    const count = options?.count || 100;
    const offset = options?.offset || 0;

    return {
      accounts: accountsResponse.accounts,
      transactions: transactions.slice(offset, offset + count),
      item: accountsResponse.item,
      total_transactions: transactions.length,
      request_id: generateId('req'),
    };
  }

  // ============================================================================
  // IDENTITY - Get identity information
  // ============================================================================
  async getIdentity(accessToken: string): Promise<IdentityGetResponse> {
    await this.simulateNetworkDelay();

    const accountsResponse = await this.getAccounts(accessToken);

    return {
      accounts: accountsResponse.accounts,
      identity: {
        addresses: [
          {
            data: {
              city: 'Accra',
              region: 'Greater Accra',
              street: '123 Independence Avenue',
              postal_code: 'GA-123-4567',
              country: 'Ghana',
            },
            primary: true,
          },
        ],
        emails: [
          {
            data: 'kwame.mensah@email.com',
            primary: true,
            type: 'primary',
          },
        ],
        names: ['Kwame Mensah'],
        phone_numbers: [
          {
            data: '+233501234567',
            primary: true,
            type: 'mobile',
          },
        ],
        ghana_card: {
          number: 'GHA-XXXXXXXXX-X',
          verified: true,
          issued_date: '2020-01-15',
          expiry_date: '2030-01-15',
        },
      },
      item: accountsResponse.item,
      request_id: generateId('req'),
    };
  }

  // ============================================================================
  // INCOME - Get income verification data
  // ============================================================================
  async getIncome(accessToken: string): Promise<Income> {
    await this.simulateNetworkDelay();

    return {
      income_streams: [
        {
          account_id: 'acc_checking_001',
          stream_id: 'stream_salary_001',
          name: 'Monthly Salary',
          confidence: 'HIGH',
          days: 365,
          monthly_flow: 5500.00,
          transaction_ids: ['txn_salary_001', 'txn_salary_002'],
          start_date: '2023-01-01',
          end_date: '2024-11-13',
          category: ['Income', 'Salary'],
        },
        {
          account_id: 'acc_mobile_money_001',
          stream_id: 'stream_business_001',
          name: 'Business Income',
          confidence: 'MEDIUM',
          days: 180,
          monthly_flow: 1200.00,
          transaction_ids: ['txn_biz_001', 'txn_biz_002'],
          start_date: '2024-05-01',
          end_date: '2024-11-13',
          category: ['Income', 'Business'],
        },
      ],
      last_year_income: 66000.00,
      projected_yearly_income: 80400.00,
      number_of_income_streams: 2,
    };
  }

  // ============================================================================
  // PAYMENT INITIATION - Create and manage payments
  // ============================================================================
  async createPayment(
    recipientId: string,
    amount: number,
    currency: string = 'GHS',
    reference: string
  ): Promise<PaymentInitiation> {
    await this.simulateNetworkDelay();

    return {
      payment_id: generateId('payment'),
      payment_token: generateId('payment_token'),
      reference,
      amount: {
        currency,
        value: amount,
      },
      status: 'PAYMENT_STATUS_INPUT_NEEDED',
      recipient_id: recipientId,
      created_at: new Date().toISOString(),
      last_status_update: new Date().toISOString(),
    };
  }

  // ============================================================================
  // ITEM MANAGEMENT
  // ============================================================================
  async removeItem(accessToken: string): Promise<{ removed: boolean; request_id: string }> {
    await this.simulateNetworkDelay();

    return {
      removed: true,
      request_id: generateId('req'),
    };
  }

  async getItem(accessToken: string): Promise<Item> {
    await this.simulateNetworkDelay();

    return {
      item_id: generateId('item'),
      institution_id: 'ins_gcb_bank',
      webhook: '',
      error: null,
      available_products: ['auth', 'balance', 'transactions', 'identity', 'income'],
      billed_products: ['auth', 'balance', 'transactions'],
      consent_expiration_time: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      update_type: 'background',
    };
  }

  // ============================================================================
  // WEBHOOKS
  // ============================================================================
  async updateWebhook(accessToken: string, webhook: string): Promise<{ item: Item; request_id: string }> {
    await this.simulateNetworkDelay();

    const item = await this.getItem(accessToken);
    item.webhook = webhook;

    return {
      item,
      request_id: generateId('req'),
    };
  }

  // ============================================================================
  // SANDBOX METHODS
  // ============================================================================
  async sandboxCreatePublicToken(institutionId: string, initialProducts: string[]): Promise<{ public_token: string; request_id: string }> {
    await this.simulateNetworkDelay();

    return {
      public_token: generateId('public_sandbox'),
      request_id: generateId('req'),
    };
  }

  async sandboxResetLogin(accessToken: string): Promise<{ reset_login: boolean; request_id: string }> {
    await this.simulateNetworkDelay();

    return {
      reset_login: true,
      request_id: generateId('req'),
    };
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================
  private async simulateNetworkDelay(minMs: number = 300, maxMs: number = 800): Promise<void> {
    if (this.environment !== 'sandbox') return;
    
    const delay = Math.random() * (maxMs - minMs) + minMs;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

// Export singleton instance for convenience
export const apiClient = new GhanaOpenDataExchangeAPI(
  'test_client_id',
  'test_secret',
  'sandbox'
);
