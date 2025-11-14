import React, { useState } from 'react';
import {
  Shield,
  User,
  DollarSign,
  CreditCard,
  Send,
  TrendingUp,
  Code,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Clock,
  Brain,
  FileText,
  Search,
  RefreshCw,
} from 'lucide-react';
import { Button } from './Button';

interface AdvancedEndpointsProps {
  language?: string;
  onLanguageChange?: (lang: string) => void;
}

interface AdvancedEndpoint {
  method: string;
  path: string;
  description: string;
  features: string[];
  example: string;
  response_highlights: string[];
}

interface ProductEndpoints {
  product: string;
  icon: any;
  color: string;
  tagline: string;
  total_endpoints: number;
  advanced_endpoints: AdvancedEndpoint[];
}

export function AdvancedEndpoints({ language, onLanguageChange }: AdvancedEndpointsProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>('auth');

  const productsData: ProductEndpoints[] = [
    {
      product: 'auth',
      icon: Shield,
      color: 'var(--primary)',
      tagline: 'Enterprise-Grade Account Verification',
      total_endpoints: 10,
      advanced_endpoints: [
        {
          method: 'POST',
          path: '/auth/get',
          description: 'Complete account verification with ACH numbers and bank details',
          features: [
            'Real-time verification status',
            'ACH routing numbers',
            'Wire routing numbers',
            'Bank branch details',
            'Account ownership confirmation',
            'Verification confidence scoring',
          ],
          example: `{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "access_token": "access-sandbox-xxx"
}`,
          response_highlights: [
            'accounts[] with verification status',
            'numbers.ach[] for ACH transfers',
            'numbers.bank_details[] with branch info',
            'verification.confidence_score',
          ],
        },
        {
          method: 'POST',
          path: '/auth/verify_ownership',
          description: 'Verify account ownership with name matching algorithms',
          features: [
            'Exact name matching',
            'Partial name matching',
            'Confidence scoring (0-100)',
            'Multiple verification methods',
          ],
          example: `{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "access_token": "access-sandbox-xxx",
  "account_id": "acc_savings_001",
  "owner_name": "Kwame Mensah"
}`,
          response_highlights: [
            'name_match: exact | partial | no_match',
            'confidence_score: 0-100',
            'verification_status',
          ],
        },
        {
          method: 'POST',
          path: '/auth/verify_status',
          description: 'Check if account exists and is open for transactions',
          features: [
            'Account existence verification',
            'Account status check',
            'Database matching',
            'Real-time validation',
          ],
          example: `{
  "account_number": "GH1234567890123",
  "routing_number": "040101"
}`,
          response_highlights: [
            'account_exists: boolean',
            'account_open: boolean',
            'account_status',
            'verification_method',
          ],
        },
        {
          method: 'POST',
          path: '/auth/micro_deposit/initiate',
          description: 'Initiate micro-deposit verification for edge cases',
          features: [
            'Two small deposits sent',
            '1-2 business day processing',
            'Fallback verification method',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "account_id": "acc_savings_001"
}`,
          response_highlights: [
            'verification_id',
            'expected_completion date',
            'deposits_sent: 2',
          ],
        },
      ],
    },
    {
      product: 'identity',
      icon: User,
      color: '#8B5CF6',
      tagline: 'AI-Powered Identity Verification',
      total_endpoints: 12,
      advanced_endpoints: [
        {
          method: 'POST',
          path: '/identity/get',
          description: 'Comprehensive identity data including Ghana Card verification',
          features: [
            'Full name variations',
            'Email addresses with verification status',
            'Phone numbers with carrier info',
            'Physical addresses',
            'Ghana Card details from NIA',
            'Tax identification numbers',
          ],
          example: `{
  "access_token": "access-sandbox-xxx"
}`,
          response_highlights: [
            'ghana_card.verified_by_nia',
            'ghana_card.biometric_verified',
            'verification_summary.overall_confidence',
          ],
        },
        {
          method: 'POST',
          path: '/identity/ghana_card/verify',
          description: 'Real-time Ghana Card verification with NIA database',
          features: [
            'NIA database integration',
            'Biometric verification support',
            'Card expiry checking',
            'Date of birth validation',
            'Full name matching',
            'Risk scoring',
          ],
          example: `{
  "ghana_card_number": "GHA-123456789-1",
  "date_of_birth": "1990-05-20",
  "full_name": "Kwame Mensah",
  "verification_level": "biometric"
}`,
          response_highlights: [
            'nia_verified: boolean',
            'biometric_verified: boolean',
            'risk_score: 0-100',
            'verified_data object',
          ],
        },
        {
          method: 'POST',
          path: '/identity/match',
          description: 'Advanced identity matching with fuzzy logic algorithms',
          features: [
            'Multi-field matching',
            'Fuzzy name matching',
            'Confidence scoring per field',
            'Overall recommendation',
            'Ghana Card cross-verification',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "user": {
    "legal_name": "Kwame Mensah",
    "phone_number": "+233501234567",
    "ghana_card_number": "GHA-123456789-1"
  }
}`,
          response_highlights: [
            'name.confidence_score',
            'ghana_card.nia_verified',
            'overall_match.recommendation',
          ],
        },
        {
          method: 'POST',
          path: '/verification/multi_id',
          description: 'Verify multiple government IDs simultaneously',
          features: [
            'Ghana Card verification',
            'Voter ID verification',
            'NHIS Card verification',
            "Driver's License verification",
            'Cross-source validation',
          ],
          example: `{
  "ghana_card": "GHA-123456789-1",
  "voter_id": "1234567890",
  "nhis_card": "NHIS-12345"
}`,
          response_highlights: [
            'results for each ID type',
            'summary.ids_verified count',
            'recommendation: approved | needs_review',
          ],
        },
      ],
    },
    {
      product: 'balance',
      icon: DollarSign,
      color: '#10B981',
      tagline: 'Real-Time Balance Intelligence',
      total_endpoints: 15,
      advanced_endpoints: [
        {
          method: 'POST',
          path: '/balance/realtime/subscribe',
          description: 'Subscribe to real-time balance updates via WebSocket',
          features: [
            'WebSocket streaming',
            'Instant balance updates',
            '24-hour subscription',
            'Multi-account support',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "account_ids": ["acc_savings_001"]
}`,
          response_highlights: [
            'websocket_url',
            'connection_token',
            'update_frequency: real-time',
          ],
        },
        {
          method: 'POST',
          path: '/balance/history',
          description: 'Historical balance data with trend analysis',
          features: [
            'Custom date ranges',
            'Daily/weekly/monthly granularity',
            'Trend calculations',
            'Volatility analysis',
            'Min/max/average stats',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "account_id": "acc_savings_001",
  "start_date": "2024-10-01",
  "end_date": "2024-11-13"
}`,
          response_highlights: [
            'history[] array with daily data',
            'analytics.average_balance',
            'analytics.volatility',
            'analytics.trend',
          ],
        },
        {
          method: 'POST',
          path: '/balance/forecast',
          description: 'AI-powered balance forecasting',
          features: [
            'Machine learning predictions',
            'Confidence intervals',
            'Overdraft risk detection',
            'Trend analysis',
            '7-90 day forecasts',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "account_id": "acc_savings_001",
  "forecast_days": 30
}`,
          response_highlights: [
            'forecast[] with predicted_balance',
            'confidence_score per day',
            'insights.risk_of_overdraft',
            'model.name: time_series_prophet',
          ],
        },
        {
          method: 'POST',
          path: '/balance/health_score',
          description: 'Comprehensive balance health assessment',
          features: [
            'Overall health score (0-100)',
            'Multi-factor analysis',
            'Actionable recommendations',
            'Trend tracking',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "account_id": "acc_savings_001"
}`,
          response_highlights: [
            'health_score: 0-100',
            'rating: excellent | good | fair | poor',
            'factors breakdown',
            'recommendations[]',
          ],
        },
      ],
    },
    {
      product: 'transactions',
      icon: CreditCard,
      color: '#F59E0B',
      tagline: 'AI-Enriched Transaction Intelligence',
      total_endpoints: 18,
      advanced_endpoints: [
        {
          method: 'POST',
          path: '/transactions/analytics/spending',
          description: 'Advanced spending analytics and insights',
          features: [
            'Category breakdowns',
            'Spending trends',
            'Top merchants',
            'Unusual spending detection',
            'Average transaction analysis',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "start_date": "2024-10-01",
  "end_date": "2024-11-13"
}`,
          response_highlights: [
            'spending_by_category[]',
            'insights.top_merchant',
            'insights.unusual_spending[]',
            'net_cashflow',
          ],
        },
        {
          method: 'POST',
          path: '/transactions/recurring',
          description: 'AI-powered recurring transaction detection',
          features: [
            'Automatic pattern detection',
            'Frequency analysis',
            'Next payment prediction',
            'Confidence scoring',
            'Income vs expense classification',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "account_id": "acc_savings_001"
}`,
          response_highlights: [
            'recurring_transactions[]',
            'frequency: monthly | weekly | yearly',
            'next_expected_date',
            'confidence: 0.0-1.0',
          ],
        },
        {
          method: 'POST',
          path: '/transactions/anomalies',
          description: 'Machine learning-based fraud detection',
          features: [
            'Isolation forest algorithm',
            'Unusual amount detection',
            'Location anomalies',
            'Severity levels',
            'False positive estimation',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "sensitivity": "medium"
}`,
          response_highlights: [
            'anomalies[]',
            'severity: high | medium | low',
            'suggested_action',
            'false_positive_probability',
          ],
        },
        {
          method: 'POST',
          path: '/transactions/enrich',
          description: 'Deep merchant and location enrichment',
          features: [
            'Merchant details',
            'Logo URLs',
            'Location coordinates',
            'Operating hours',
            'Category confidence',
          ],
          example: `{
  "transaction_id": "txn_2024_001"
}`,
          response_highlights: [
            'merchant_details.official_name',
            'location_details.coordinates',
            'location_details.hours',
          ],
        },
        {
          method: 'POST',
          path: '/transactions/budget',
          description: 'Real-time budget tracking and alerts',
          features: [
            'Category-based budgets',
            'Spending vs budget comparison',
            'End-of-month projections',
            'Over-budget alerts',
          ],
          example: `{
  "access_token": "access-sandbox-xxx"
}`,
          response_highlights: [
            'budgets[] with status',
            'projected_end_of_month',
            'percentage_used',
            'days_remaining',
          ],
        },
      ],
    },
    {
      product: 'payment',
      icon: Send,
      color: '#EF4444',
      tagline: 'Enterprise Payment Infrastructure',
      total_endpoints: 20,
      advanced_endpoints: [
        {
          method: 'POST',
          path: '/payment_initiation/bulk/create',
          description: 'Process bulk payments in single request',
          features: [
            'Batch processing',
            'Multiple recipients',
            'Status tracking',
            'Estimated completion time',
          ],
          example: `{
  "payments": [
    {"recipient_id": "rec_1", "amount": {"value": 500, "currency": "GHS"}},
    {"recipient_id": "rec_2", "amount": {"value": 750, "currency": "GHS"}}
  ]
}`,
          response_highlights: [
            'batch_id',
            'total_payments',
            'payments[] with individual IDs',
            'estimated_completion',
          ],
        },
        {
          method: 'POST',
          path: '/payment_initiation/schedule/create',
          description: 'Create recurring/scheduled payments',
          features: [
            'Daily/weekly/monthly/yearly frequency',
            'Start and end dates',
            'Automatic execution',
            'Next payment tracking',
          ],
          example: `{
  "recipient_id": "rec_001",
  "amount": {"value": 2500, "currency": "GHS"},
  "schedule": {
    "frequency": "monthly",
    "day_of_month": 1
  }
}`,
          response_highlights: [
            'schedule_id',
            'next_payment_date',
            'status: ACTIVE',
          ],
        },
        {
          method: 'POST',
          path: '/payment_initiation/fees/estimate',
          description: 'Accurate fee estimation before payment',
          features: [
            'Method-based fee calculation',
            'Fixed + percentage fees',
            'Total amount preview',
            'Delivery time estimates',
          ],
          example: `{
  "amount": {"value": 500, "currency": "GHS"},
  "payment_method": "mobile_money"
}`,
          response_highlights: [
            'fees.total_fee',
            'total_amount.value',
            'estimated_delivery_time',
          ],
        },
        {
          method: 'POST',
          path: '/payment_initiation/refund',
          description: 'Process payment refunds',
          features: [
            'Full or partial refunds',
            'Reason tracking',
            'Processing timeline',
            'Status updates',
          ],
          example: `{
  "payment_id": "pay_001",
  "amount": {"value": 500, "currency": "GHS"},
  "reason": "customer_request"
}`,
          response_highlights: [
            'refund_id',
            'status: PROCESSING',
            'estimated_completion',
          ],
        },
        {
          method: 'POST',
          path: '/payment_initiation/analytics',
          description: 'Comprehensive payment analytics',
          features: [
            'Success rates',
            'Payment method breakdown',
            'Volume trends',
            'Peak times analysis',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "start_date": "2024-10-01"
}`,
          response_highlights: [
            'summary.success_rate',
            'by_method[] breakdown',
            'trends.peak_day',
          ],
        },
      ],
    },
    {
      product: 'income',
      icon: TrendingUp,
      color: '#06B6D4',
      tagline: 'AI-Powered Income Intelligence',
      total_endpoints: 16,
      advanced_endpoints: [
        {
          method: 'POST',
          path: '/income/analysis/comprehensive',
          description: 'Deep income analysis with AI insights',
          features: [
            'Multiple income stream detection',
            'SSNIT employment verification',
            'Income stability scoring',
            'Growth trend analysis',
            'Debt-to-income ratio',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "analysis_depth": "detailed"
}`,
          response_highlights: [
            'income_streams[] with types',
            'employment_details.verified_by: SSNIT',
            'income_stability_factors',
            'debt_to_income_ratio',
          ],
        },
        {
          method: 'POST',
          path: '/income/employment/verify',
          description: 'SSNIT-verified employment confirmation',
          features: [
            'Real SSNIT integration',
            'Employment history',
            'Contribution tracking',
            'Salary estimation',
            'Employer verification',
          ],
          example: `{
  "ssnit_number": "SSN-GH-9876543210",
  "employer_name": "TechCorp Ghana Ltd"
}`,
          response_highlights: [
            'employment_details.employment_status',
            'contribution_history',
            'salary_estimate.estimated_monthly_salary',
            'verified_by: SSNIT',
          ],
        },
        {
          method: 'POST',
          path: '/income/volatility',
          description: 'Income stability and risk assessment',
          features: [
            'Statistical analysis',
            'Coefficient of variation',
            'Risk scoring',
            'Loan eligibility calculation',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "period_months": 12
}`,
          response_highlights: [
            'volatility_rating',
            'stability_score: 0-100',
            'risk_assessment.for_lending',
            'recommended_loan_amount',
          ],
        },
        {
          method: 'POST',
          path: '/income/verification/report',
          description: 'Complete income verification report',
          features: [
            'Comprehensive PDF report',
            'Creditworthiness assessment',
            'Risk analysis',
            'Loan recommendations',
            '30-day validity',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "report_type": "comprehensive"
}`,
          response_highlights: [
            'income_verification.verified',
            'creditworthiness.max_loan_amount',
            'risk_assessment.overall_risk',
            'download_url',
          ],
        },
        {
          method: 'POST',
          path: '/income/forecast',
          description: 'AI-based income forecasting',
          features: [
            'Machine learning predictions',
            'Confidence intervals',
            'Growth rate analysis',
            '1-12 month forecasts',
          ],
          example: `{
  "access_token": "access-sandbox-xxx",
  "forecast_months": 6
}`,
          response_highlights: [
            'forecast[] with projections',
            'confidence_score per month',
            'assumptions.growth_rate',
            'total_projected_income',
          ],
        },
      ],
    },
  ];

  const currentProduct = productsData.find(p => p.product === selectedProduct) || productsData[0];
  const Icon = currentProduct.icon;

  // Count total advanced endpoints
  const totalAdvancedEndpoints = productsData.reduce(
    (sum, p) => sum + p.advanced_endpoints.length,
    0
  );

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary)]/90 to-[var(--secondary)]/80 text-white">
        <div className="px-4 py-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-[var(--secondary)]" />
            <h1 className="text-white m-0">Advanced Endpoints</h1>
          </div>
          <p className="text-xl text-white/90 mb-6 max-w-3xl m-0">
            Production-grade API endpoints with AI-powered intelligence, real-time streaming, and enterprise features
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1 m-0">Total Endpoints</p>
              <p className="text-3xl m-0">{totalAdvancedEndpoints}+</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1 m-0">Products</p>
              <p className="text-3xl m-0">6</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1 m-0">AI-Powered</p>
              <p className="text-3xl m-0">12+</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1 m-0">Real-Time</p>
              <p className="text-3xl m-0">8+</p>
            </div>
          </div>
        </div>
      </header>

      {/* Product Tabs */}
      <div className="bg-white border-b border-[var(--neutral-200)] sticky top-0 z-40">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto py-4">
            {productsData.map((product) => {
              const ProductIcon = product.icon;
              return (
                <button
                  key={product.product}
                  onClick={() => setSelectedProduct(product.product)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                    selectedProduct === product.product
                      ? 'bg-[var(--primary)] text-white shadow-lg'
                      : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]'
                  }`}
                >
                  <ProductIcon className="w-5 h-5" />
                  <span className="capitalize">{product.product}</span>
                  <span className="px-2 py-0.5 bg-white/20 rounded text-xs">
                    {product.advanced_endpoints.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-7xl mx-auto">
        {/* Product Header */}
        <div className="bg-gradient-to-br from-white to-[var(--neutral-50)] rounded-2xl p-8 mb-8 shadow-[var(--shadow-lg)] border border-[var(--neutral-200)]">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${currentProduct.color}15` }}
            >
              <Icon className="w-8 h-8" style={{ color: currentProduct.color }} />
            </div>
            <div className="flex-1">
              <h2 className="mb-2 capitalize">{currentProduct.product} Product</h2>
              <p className="text-lg text-[var(--neutral-700)] mb-4 m-0">
                {currentProduct.tagline}
              </p>
              <div className="flex items-center gap-4 text-sm text-[var(--neutral-600)]">
                <span className="flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  {currentProduct.advanced_endpoints.length} Advanced Endpoints
                </span>
                <span className="flex items-center gap-1">
                  <Brain className="w-4 h-4" />
                  AI-Powered Analysis
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Real-Time Updates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Endpoints List */}
        <div className="space-y-6">
          {currentProduct.advanced_endpoints.map((endpoint, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-[var(--shadow-md)] overflow-hidden hover:shadow-[var(--shadow-lg)] transition-shadow"
            >
              {/* Endpoint Header */}
              <div className="p-6 border-b border-[var(--neutral-200)]">
                <div className="flex items-start gap-4 mb-3">
                  <span className="px-3 py-1 bg-[var(--success)]/10 text-[var(--success)] rounded text-sm">
                    {endpoint.method}
                  </span>
                  <code className="flex-1 text-[var(--neutral-700)] bg-[var(--neutral-100)] px-3 py-1 rounded">
                    {endpoint.path}
                  </code>
                </div>
                <p className="text-[var(--neutral-700)] m-0">{endpoint.description}</p>
              </div>

              {/* Endpoint Details */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Features */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                    Key Features
                  </h4>
                  <div className="space-y-2">
                    {endpoint.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--neutral-700)]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[var(--secondary)]" />
                      Response Highlights
                    </h4>
                    <div className="space-y-2">
                      {endpoint.response_highlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex items-start gap-2">
                          <code className="text-xs text-[var(--primary)] bg-[var(--primary)]/5 px-2 py-1 rounded">
                            {highlight}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Example Request */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4 text-[var(--secondary)]" />
                    Example Request
                  </h4>
                  <div className="bg-[var(--neutral-900)] rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-[var(--neutral-50)] font-mono m-0">
                      {endpoint.example}
                    </pre>
                  </div>
                  
                  <div className="mt-4 flex gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => window.location.hash = 'api-playground'}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Try in Playground
                    </Button>
                    <Button variant="secondary" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      View Docs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 rounded-2xl p-8 text-white text-center">
          <h2 className="text-white mb-4">Ready to Build?</h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto m-0">
            Start integrating these advanced endpoints into your application today. Get production-ready features with minimal code.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.hash = 'developer'}
            >
              View Documentation
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.hash = 'api-playground'}
              className="bg-white text-[var(--primary)] hover:bg-white/90"
            >
              <Zap className="w-5 h-5 mr-2" />
              Try API Playground
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}