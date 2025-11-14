// Core API Types for Ghana Open Data Exchange Platform

// ============================================================================
// AUTHENTICATION & TOKENS
// ============================================================================

export interface LinkToken {
  link_token: string;
  expiration: string;
  request_id: string;
}

export interface AccessToken {
  access_token: string;
  item_id: string;
  request_id: string;
}

export interface PublicToken {
  public_token: string;
  expiration: string;
}

// ============================================================================
// INSTITUTIONS
// ============================================================================

export type InstitutionType = 'bank' | 'mobile_money' | 'microfinance' | 'credit_union';

export interface Institution {
  institution_id: string;
  name: string;
  type: InstitutionType;
  logo_url: string;
  primary_color: string;
  url: string;
  products: Product[];
  country_codes: string[];
  routing_numbers: string[];
  oauth: boolean;
  status: {
    item_logins: {
      status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
      last_status_change: string;
    };
    transactions_updates: {
      status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
      last_status_change: string;
    };
    auth: {
      status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
      last_status_change: string;
    };
  };
}

export type Product = 
  | 'auth'           // Account & routing numbers
  | 'identity'       // Identity verification
  | 'balance'        // Real-time balance
  | 'transactions'   // Transaction history
  | 'liabilities'    // Loan & credit data
  | 'investments'    // Investment holdings
  | 'payment'        // Payment initiation
  | 'income'         // Income verification
  | 'assets'         // Asset report
  | 'transfer'       // Transfer money
  | 'kyc';           // KYC verification

// ============================================================================
// ACCOUNTS
// ============================================================================

export type AccountType = 
  | 'depository'     // Checking, savings, mobile money
  | 'credit'         // Credit cards, lines of credit
  | 'loan'          // Mortgages, student loans, personal loans
  | 'investment'     // Brokerage, retirement
  | 'other';        // Other account types

export type AccountSubtype = 
  | 'checking'
  | 'savings'
  | 'mobile_money'
  | 'credit_card'
  | 'mortgage'
  | 'student_loan'
  | 'personal_loan'
  | 'auto_loan'
  | 'brokerage'
  | 'retirement';

export interface Account {
  account_id: string;
  balances: {
    available: number | null;
    current: number;
    limit: number | null;
    iso_currency_code: string;
    unofficial_currency_code: string | null;
  };
  mask: string;
  name: string;
  official_name: string;
  type: AccountType;
  subtype: AccountSubtype | null;
  verification_status: 'automatically_verified' | 'pending_automatic_verification' | 'pending_manual_verification' | 'manually_verified' | null;
}

// ============================================================================
// TRANSACTIONS
// ============================================================================

export interface Transaction {
  transaction_id: string;
  account_id: string;
  amount: number;
  iso_currency_code: string;
  unofficial_currency_code: string | null;
  category: string[] | null;
  category_id: string | null;
  date: string;
  authorized_date: string | null;
  name: string;
  merchant_name: string | null;
  payment_channel: 'online' | 'in_store' | 'other';
  pending: boolean;
  pending_transaction_id: string | null;
  account_owner: string | null;
  location: {
    address: string | null;
    city: string | null;
    region: string | null;
    postal_code: string | null;
    country: string | null;
    lat: number | null;
    lon: number | null;
  };
  payment_meta: {
    reference_number: string | null;
    ppd_id: string | null;
    payee: string | null;
    by_order_of: string | null;
    payer: string | null;
    payment_method: string | null;
    payment_processor: string | null;
    reason: string | null;
  };
  transaction_type: 'digital' | 'place' | 'special' | 'unresolved';
}

// ============================================================================
// IDENTITY
// ============================================================================

export interface Identity {
  addresses: Address[];
  emails: Email[];
  names: string[];
  phone_numbers: PhoneNumber[];
  ghana_card: GhanaCard | null;
}

export interface Address {
  data: {
    city: string;
    region: string;
    street: string;
    postal_code: string | null;
    country: string;
  };
  primary: boolean;
}

export interface Email {
  data: string;
  primary: boolean;
  type: 'primary' | 'secondary' | 'other';
}

export interface PhoneNumber {
  data: string;
  primary: boolean;
  type: 'home' | 'work' | 'mobile';
}

export interface GhanaCard {
  number: string;
  verified: boolean;
  issued_date: string | null;
  expiry_date: string | null;
}

// ============================================================================
// PAYMENT INITIATION
// ============================================================================

export interface PaymentInitiation {
  payment_id: string;
  payment_token: string;
  reference: string;
  amount: {
    currency: string;
    value: number;
  };
  status: 'PAYMENT_STATUS_INPUT_NEEDED' | 'PAYMENT_STATUS_INITIATED' | 'PAYMENT_STATUS_INSUFFICIENT_FUNDS' | 'PAYMENT_STATUS_FAILED' | 'PAYMENT_STATUS_BLOCKED' | 'PAYMENT_STATUS_AUTHORISING' | 'PAYMENT_STATUS_CANCELLED' | 'PAYMENT_STATUS_EXECUTED' | 'PAYMENT_STATUS_SETTLED' | 'PAYMENT_STATUS_ESTABLISHED';
  recipient_id: string;
  created_at: string;
  last_status_update: string;
}

export interface Recipient {
  recipient_id: string;
  name: string;
  address: Address | null;
  mobile_money: {
    provider: 'MTN' | 'VODAFONE' | 'AIRTELTIGO';
    number: string;
  } | null;
  bank_account: {
    account_number: string;
    bank_code: string;
  } | null;
}

// ============================================================================
// INCOME VERIFICATION
// ============================================================================

export interface Income {
  income_streams: IncomeStream[];
  last_year_income: number;
  projected_yearly_income: number;
  number_of_income_streams: number;
}

export interface IncomeStream {
  account_id: string;
  stream_id: string;
  name: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  days: number;
  monthly_flow: number;
  transaction_ids: string[];
  start_date: string;
  end_date: string;
  category: string[];
}

// ============================================================================
// WEBHOOKS
// ============================================================================

export type WebhookType = 
  | 'INITIAL_UPDATE'
  | 'HISTORICAL_UPDATE'
  | 'DEFAULT_UPDATE'
  | 'TRANSACTIONS_REMOVED'
  | 'ITEM_ERROR'
  | 'PENDING_EXPIRATION'
  | 'USER_PERMISSION_REVOKED'
  | 'WEBHOOK_UPDATE_ACKNOWLEDGED';

export interface Webhook {
  webhook_type: WebhookType;
  webhook_code: string;
  item_id: string;
  error: ApiError | null;
  new_transactions: number;
  removed_transactions: string[];
}

// ============================================================================
// ITEMS (Connected Accounts)
// ============================================================================

export interface Item {
  item_id: string;
  institution_id: string;
  webhook: string;
  error: ApiError | null;
  available_products: Product[];
  billed_products: Product[];
  consent_expiration_time: string | null;
  update_type: 'background' | 'user_present_required';
}

// ============================================================================
// ERRORS
// ============================================================================

export interface ApiError {
  error_type: 'INVALID_REQUEST' | 'INVALID_INPUT' | 'RATE_LIMIT_EXCEEDED' | 'API_ERROR' | 'ITEM_ERROR' | 'ASSET_REPORT_ERROR' | 'RECAPTCHA_ERROR' | 'OAUTH_ERROR' | 'PAYMENT_ERROR' | 'BANK_TRANSFER_ERROR';
  error_code: string;
  error_message: string;
  display_message: string | null;
  request_id: string;
  causes: string[];
  status: number;
  documentation_url: string;
  suggested_action: string | null;
}

// ============================================================================
// API REQUESTS
// ============================================================================

export interface LinkTokenCreateRequest {
  client_id: string;
  secret: string;
  client_name: string;
  user: {
    client_user_id: string;
    legal_name?: string;
    phone_number?: string;
    email_address?: string;
  };
  products: Product[];
  country_codes: string[];
  language: string;
  webhook?: string;
  access_token?: string;
  redirect_uri?: string;
  android_package_name?: string;
}

export interface AccessTokenRequest {
  client_id: string;
  secret: string;
  public_token: string;
}

export interface AccountsGetRequest {
  client_id: string;
  secret: string;
  access_token: string;
  options?: {
    account_ids?: string[];
  };
}

export interface TransactionsGetRequest {
  client_id: string;
  secret: string;
  access_token: string;
  start_date: string;
  end_date: string;
  options?: {
    account_ids?: string[];
    count?: number;
    offset?: number;
  };
}

export interface BalanceGetRequest {
  client_id: string;
  secret: string;
  access_token: string;
  options?: {
    account_ids?: string[];
  };
}

export interface IdentityGetRequest {
  client_id: string;
  secret: string;
  access_token: string;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface AccountsGetResponse {
  accounts: Account[];
  item: Item;
  request_id: string;
}

export interface TransactionsGetResponse {
  accounts: Account[];
  transactions: Transaction[];
  item: Item;
  total_transactions: number;
  request_id: string;
}

export interface BalanceGetResponse {
  accounts: Account[];
  item: Item;
  request_id: string;
}

export interface IdentityGetResponse {
  accounts: Account[];
  identity: Identity;
  item: Item;
  request_id: string;
}

// ============================================================================
// SANDBOX
// ============================================================================

export interface SandboxPublicTokenCreateRequest {
  institution_id: string;
  initial_products: Product[];
  options?: {
    webhook?: string;
    override_username?: string;
    override_password?: string;
  };
}

export interface SandboxItemFireWebhookRequest {
  access_token: string;
  webhook_code: string;
}
