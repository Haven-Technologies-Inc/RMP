// Advanced API Types for Ghana Open Data Exchange Platform

// ============================================================================
// OAUTH 2.0 FLOW
// ============================================================================

export interface OAuthInitiateRequest {
  client_id: string;
  redirect_uri: string;
  state: string;
  institution_id: string;
  products: string[];
  language?: string;
}

export interface OAuthCallbackData {
  code: string;
  state: string;
  institution_id: string;
}

export interface OAuthTokenRequest {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
  grant_type: 'authorization_code' | 'refresh_token';
  refresh_token?: string;
}

export interface OAuthTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
  item_id: string;
}

// ============================================================================
// API KEY MANAGEMENT
// ============================================================================

export interface ApiKey {
  key_id: string;
  key_name: string;
  key_prefix: string; // First 8 chars shown
  environment: 'sandbox' | 'development' | 'production';
  created_at: string;
  last_used_at: string | null;
  expires_at: string | null;
  scopes: ApiScope[];
  rate_limit: {
    requests_per_minute: number;
    requests_per_day: number;
  };
  ip_whitelist: string[];
  status: 'active' | 'revoked' | 'expired';
}

export type ApiScope = 
  | 'accounts:read'
  | 'transactions:read'
  | 'balance:read'
  | 'identity:read'
  | 'payment:write'
  | 'transfer:write'
  | 'webhooks:write'
  | 'items:write'
  | 'items:delete'
  | 'income:read'
  | 'assets:read'
  | 'liabilities:read';

export interface CreateApiKeyRequest {
  client_id: string;
  secret: string;
  key_name: string;
  environment: 'sandbox' | 'development' | 'production';
  scopes: ApiScope[];
  expires_in_days?: number;
  ip_whitelist?: string[];
}

export interface CreateApiKeyResponse {
  key_id: string;
  api_key: string; // Full key shown only once
  key_name: string;
  created_at: string;
  expires_at: string | null;
}

// ============================================================================
// WEBHOOK MANAGEMENT
// ============================================================================

export interface WebhookSubscription {
  webhook_id: string;
  url: string;
  events: WebhookEventType[];
  secret: string; // For signature verification
  status: 'active' | 'paused' | 'failed';
  created_at: string;
  last_triggered_at: string | null;
  failure_count: number;
  max_retries: number;
  retry_strategy: 'exponential' | 'linear';
  headers?: Record<string, string>;
}

export type WebhookEventType =
  | 'transaction.created'
  | 'transaction.updated'
  | 'transaction.removed'
  | 'account.created'
  | 'account.updated'
  | 'balance.updated'
  | 'item.created'
  | 'item.updated'
  | 'item.error'
  | 'item.removed'
  | 'consent.granted'
  | 'consent.revoked'
  | 'consent.expired'
  | 'payment.initiated'
  | 'payment.completed'
  | 'payment.failed'
  | 'verification.completed'
  | 'verification.failed';

export interface WebhookDelivery {
  delivery_id: string;
  webhook_id: string;
  event_type: WebhookEventType;
  payload: any;
  status: 'pending' | 'delivered' | 'failed';
  http_status: number | null;
  attempts: number;
  created_at: string;
  delivered_at: string | null;
  response_body: string | null;
  error_message: string | null;
}

export interface WebhookSignature {
  timestamp: number;
  signature: string; // HMAC SHA256
}

// ============================================================================
// BATCH OPERATIONS
// ============================================================================

export interface BatchRequest {
  batch_id: string;
  operations: BatchOperation[];
}

export interface BatchOperation {
  operation_id: string;
  method: 'POST' | 'GET';
  endpoint: string;
  body?: any;
  headers?: Record<string, string>;
}

export interface BatchResponse {
  batch_id: string;
  status: 'completed' | 'partial' | 'failed';
  total_operations: number;
  successful_operations: number;
  failed_operations: number;
  results: BatchOperationResult[];
}

export interface BatchOperationResult {
  operation_id: string;
  status: 'success' | 'error';
  http_status: number;
  response?: any;
  error?: any;
  execution_time_ms: number;
}

// ============================================================================
// ANALYTICS & MONITORING
// ============================================================================

export interface ApiUsageMetrics {
  time_period: {
    start: string;
    end: string;
  };
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  average_response_time_ms: number;
  p95_response_time_ms: number;
  p99_response_time_ms: number;
  requests_by_endpoint: Record<string, number>;
  requests_by_status: Record<number, number>;
  requests_by_product: Record<string, number>;
  error_breakdown: {
    error_type: string;
    count: number;
    percentage: number;
  }[];
}

export interface InstitutionHealth {
  institution_id: string;
  institution_name: string;
  overall_health: 'healthy' | 'degraded' | 'down';
  products: {
    product: string;
    status: 'healthy' | 'degraded' | 'down';
    success_rate: number;
    average_response_time_ms: number;
    last_incident: string | null;
  }[];
  uptime_percentage: number;
  incidents_last_30_days: number;
  last_status_change: string;
}

export interface DeveloperMetrics {
  user: {
    client_id: string;
    client_name: string;
    created_at: string;
  };
  usage: {
    total_api_calls: number;
    total_items: number;
    total_users_connected: number;
    active_items: number;
  };
  products_used: string[];
  institutions_connected: string[];
  webhook_deliveries: {
    total: number;
    successful: number;
    failed: number;
  };
  rate_limit: {
    current_usage: number;
    limit: number;
    reset_at: string;
  };
}

// ============================================================================
// CONSENT MANAGEMENT
// ============================================================================

export interface ConsentRequest {
  consent_id: string;
  user_id: string;
  client_id: string;
  client_name: string;
  institution_id: string;
  products: string[];
  scopes: string[];
  purpose: string;
  data_usage: string[];
  retention_period_days: number;
  status: 'pending' | 'granted' | 'denied' | 'revoked' | 'expired';
  requested_at: string;
  granted_at: string | null;
  revoked_at: string | null;
  expires_at: string;
  metadata: {
    ip_address: string;
    user_agent: string;
    consent_method: 'explicit' | 'implicit';
  };
}

export interface ConsentAuditLog {
  log_id: string;
  consent_id: string;
  action: 'requested' | 'granted' | 'denied' | 'revoked' | 'expired' | 'data_accessed' | 'data_shared';
  actor: {
    type: 'user' | 'system' | 'admin';
    id: string;
  };
  timestamp: string;
  ip_address: string;
  details: string;
  data_accessed?: string[];
}

// ============================================================================
// ADVANCED QUERYING
// ============================================================================

export interface TransactionQueryFilter {
  account_ids?: string[];
  start_date: string;
  end_date: string;
  min_amount?: number;
  max_amount?: number;
  categories?: string[];
  payment_channels?: string[];
  merchants?: string[];
  pending?: boolean;
  search_text?: string;
  sort_by?: 'date' | 'amount' | 'merchant';
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface AccountQueryFilter {
  types?: string[];
  subtypes?: string[];
  min_balance?: number;
  max_balance?: number;
  verification_status?: string;
  institution_ids?: string[];
}

export interface AggregatedTransactionData {
  time_period: {
    start: string;
    end: string;
  };
  summary: {
    total_transactions: number;
    total_inflow: number;
    total_outflow: number;
    net_flow: number;
    average_transaction_amount: number;
  };
  by_category: {
    category: string;
    count: number;
    total_amount: number;
    percentage: number;
  }[];
  by_merchant: {
    merchant: string;
    count: number;
    total_amount: number;
  }[];
  by_payment_channel: {
    channel: string;
    count: number;
    total_amount: number;
  }[];
  trends: {
    daily_average: number;
    weekly_average: number;
    monthly_average: number;
  };
}

// ============================================================================
// FINANCIAL INSIGHTS
// ============================================================================

export interface CashFlowAnalysis {
  account_id: string;
  time_period: {
    start: string;
    end: string;
  };
  opening_balance: number;
  closing_balance: number;
  total_inflow: number;
  total_outflow: number;
  net_cash_flow: number;
  daily_cash_flows: {
    date: string;
    inflow: number;
    outflow: number;
    net: number;
    balance: number;
  }[];
  inflow_sources: {
    source: string;
    amount: number;
    percentage: number;
  }[];
  outflow_categories: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface SpendingAnalysis {
  user_id: string;
  time_period: {
    start: string;
    end: string;
  };
  total_spending: number;
  average_daily_spending: number;
  spending_by_category: {
    category: string;
    amount: number;
    percentage: number;
    transaction_count: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }[];
  top_merchants: {
    merchant: string;
    amount: number;
    visit_count: number;
  }[];
  recurring_expenses: {
    merchant: string;
    average_amount: number;
    frequency: 'daily' | 'weekly' | 'monthly';
    next_expected_date: string;
  }[];
  insights: {
    type: 'overspending' | 'unusual_transaction' | 'recurring_found' | 'savings_opportunity';
    message: string;
    severity: 'info' | 'warning' | 'critical';
  }[];
}

export interface CreditWorthinessScore {
  user_id: string;
  score: number; // 0-1000
  confidence: 'low' | 'medium' | 'high';
  factors: {
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    weight: number;
    description: string;
  }[];
  income_stability: {
    score: number;
    monthly_income: number;
    income_variance: number;
    income_sources: number;
  };
  spending_patterns: {
    score: number;
    average_monthly_spending: number;
    discretionary_spending_percentage: number;
  };
  account_health: {
    score: number;
    average_balance: number;
    overdraft_incidents: number;
    bounce_rate: number;
  };
  payment_behavior: {
    score: number;
    on_time_payment_rate: number;
    late_payments_count: number;
  };
  recommendations: string[];
}

// ============================================================================
// VERIFICATION SERVICES
// ============================================================================

export interface AccountVerificationRequest {
  account_number: string;
  routing_number: string;
  account_holder_name: string;
  verification_method: 'instant' | 'micro_deposits' | 'database_match';
}

export interface AccountVerificationResponse {
  verification_id: string;
  status: 'verified' | 'pending' | 'failed';
  account_exists: boolean;
  account_open: boolean;
  name_match: 'exact' | 'partial' | 'no_match' | null;
  account_type: string | null;
  verification_method: string;
  confidence_score: number; // 0-100
  verified_at: string | null;
}

export interface IdentityVerificationRequest {
  ghana_card_number: string;
  full_name: string;
  date_of_birth: string;
  phone_number: string;
  verification_level: 'basic' | 'enhanced' | 'biometric';
}

export interface IdentityVerificationResponse {
  verification_id: string;
  status: 'verified' | 'pending' | 'failed';
  ghana_card_valid: boolean;
  name_match: boolean;
  dob_match: boolean;
  phone_match: boolean;
  biometric_match: boolean | null;
  risk_score: number; // 0-100, lower is better
  confidence_level: 'low' | 'medium' | 'high';
  verified_at: string | null;
  nia_verified: boolean; // National Identification Authority
}

// ============================================================================
// RATE LIMITING
// ============================================================================

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
  reset_in_seconds: number;
  retry_after?: number;
}

export interface RateLimitOverride {
  client_id: string;
  endpoint?: string;
  requests_per_minute?: number;
  requests_per_hour?: number;
  requests_per_day?: number;
  burst_limit?: number;
  reason: string;
  expires_at?: string;
}

// ============================================================================
// AUDIT LOGS
// ============================================================================

export interface AuditLog {
  log_id: string;
  timestamp: string;
  client_id: string;
  user_id?: string;
  action: string;
  resource_type: 'account' | 'transaction' | 'item' | 'payment' | 'consent' | 'api_key';
  resource_id: string;
  method: string;
  endpoint: string;
  status_code: number;
  ip_address: string;
  user_agent: string;
  request_id: string;
  response_time_ms: number;
  metadata?: Record<string, any>;
}

// ============================================================================
// SANDBOX CONTROLS
// ============================================================================

export interface SandboxScenario {
  scenario_id: string;
  name: string;
  description: string;
  institution_id: string;
  scenario_type: 'success' | 'error' | 'pending' | 'timeout';
  custom_data?: {
    balance_override?: number;
    transaction_count?: number;
    error_code?: string;
    delay_ms?: number;
  };
}

export interface SandboxItemReset {
  access_token: string;
  reset_type: 'full' | 'transactions' | 'balance' | 'credentials';
  new_state?: any;
}

// ============================================================================
// DATA EXPORT
// ============================================================================

export interface DataExportRequest {
  export_id: string;
  user_id: string;
  data_types: ('accounts' | 'transactions' | 'identity' | 'consents')[];
  format: 'json' | 'csv' | 'pdf';
  start_date?: string;
  end_date?: string;
  include_metadata: boolean;
}

export interface DataExportResponse {
  export_id: string;
  status: 'processing' | 'completed' | 'failed';
  download_url?: string;
  expires_at?: string;
  file_size_bytes?: number;
  created_at: string;
  completed_at?: string;
}
