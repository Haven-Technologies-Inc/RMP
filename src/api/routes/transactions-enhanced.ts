// Enhanced Transactions Product Routes - Advanced Transaction Analysis

import { generateId, validateCredentials, validateAccessToken, simulateDelay, createError } from '../index';

// Enhanced transaction data
function getEnhancedTransactions() {
  return [
    {
      transaction_id: 'txn_2024_001',
      account_id: 'acc_savings_001',
      amount: -125.50,
      iso_currency_code: 'GHS',
      date: '2024-11-12',
      datetime: '2024-11-12T14:30:00Z',
      authorized_date: '2024-11-12',
      authorized_datetime: '2024-11-12T14:30:00Z',
      name: 'KFC OXFORD STREET',
      merchant_name: 'KFC',
      merchant_entity_id: 'merchant_kfc_001',
      category: ['Food and Drink', 'Restaurants', 'Fast Food'],
      category_id: '13005012',
      pending: false,
      pending_transaction_id: null,
      account_owner: 'Kwame Mensah',
      location: {
        address: 'Oxford Street, Osu',
        city: 'Accra',
        region: 'Greater Accra',
        postal_code: 'GA-123-4567',
        country: 'GH',
        lat: 5.6037,
        lon: -0.1870,
        store_number: '001',
      },
      payment_meta: {
        reference_number: 'REF123456',
        ppd_id: null,
        payee: 'KFC Ghana Ltd',
        by_order_of: null,
        payer: 'Kwame Mensah',
        payment_method: 'debit_card',
        payment_processor: 'Visa',
        reason: null,
      },
      payment_channel: 'in_store',
      transaction_type: 'place',
      transaction_code: 'purchase',
      personal_finance_category: {
        primary: 'FOOD_AND_DRINK',
        detailed: 'FOOD_AND_DRINK_RESTAURANTS',
        confidence_level: 'VERY_HIGH',
      },
      check_number: null,
      unofficial_currency_code: null,
    },
    {
      transaction_id: 'txn_2024_002',
      account_id: 'acc_savings_001',
      amount: 500.00,
      iso_currency_code: 'GHS',
      date: '2024-11-11',
      datetime: '2024-11-11T09:15:00Z',
      name: 'Mobile Money Transfer',
      merchant_name: 'MTN Mobile Money',
      category: ['Transfer', 'Credit'],
      pending: false,
      location: null,
      payment_channel: 'mobile_money',
      transaction_type: 'special',
      personal_finance_category: {
        primary: 'TRANSFER_IN',
        detailed: 'TRANSFER_IN_ACCOUNT_TRANSFER',
        confidence_level: 'HIGH',
      },
    },
    {
      transaction_id: 'txn_2024_003',
      account_id: 'acc_savings_001',
      amount: -2500.00,
      iso_currency_code: 'GHS',
      date: '2024-11-01',
      datetime: '2024-11-01T08:00:00Z',
      name: 'Monthly Rent Payment',
      merchant_name: 'Landlord - Mensah Properties',
      category: ['Payment', 'Rent'],
      pending: false,
      payment_channel: 'other',
      transaction_type: 'special',
      personal_finance_category: {
        primary: 'RENT_AND_UTILITIES',
        detailed: 'RENT_AND_UTILITIES_RENT',
        confidence_level: 'VERY_HIGH',
      },
      recurring: true,
      recurring_pattern: 'monthly',
    },
  ];
}

export const transactionsEnhancedRoutes = {
  // Spending Analytics
  'POST /transactions/analytics/spending': async (body: any) => {
    await simulateDelay(500, 1000);
    
    const { client_id, secret, access_token, start_date, end_date, group_by } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    return {
      period: {
        start_date: start_date || '2024-10-01',
        end_date: end_date || '2024-11-13',
      },
      total_spending: 8250.75,
      total_income: 5500.00,
      net_cashflow: -2750.75,
      spending_by_category: [
        {
          category: 'Food and Drink',
          amount: 1250.50,
          percentage: 15.16,
          transaction_count: 28,
          average_transaction: 44.66,
          trend: 'increasing',
        },
        {
          category: 'Rent and Utilities',
          amount: 2500.00,
          percentage: 30.30,
          transaction_count: 1,
          average_transaction: 2500.00,
          trend: 'stable',
        },
        {
          category: 'Transportation',
          amount: 850.25,
          percentage: 10.31,
          transaction_count: 42,
          average_transaction: 20.24,
          trend: 'stable',
        },
        {
          category: 'Shopping',
          amount: 1500.00,
          percentage: 18.18,
          transaction_count: 15,
          average_transaction: 100.00,
          trend: 'decreasing',
        },
        {
          category: 'Entertainment',
          amount: 650.00,
          percentage: 7.88,
          transaction_count: 8,
          average_transaction: 81.25,
          trend: 'increasing',
        },
      ],
      insights: {
        top_merchant: {
          name: 'KFC',
          amount: 425.50,
          visits: 8,
        },
        largest_transaction: {
          merchant: 'Melcom',
          amount: 850.00,
          date: '2024-10-15',
        },
        unusual_spending: [
          {
            category: 'Entertainment',
            amount: 650.00,
            reason: '45% above monthly average',
          },
        ],
      },
      request_id: generateId('req'),
    };
  },

  // Transaction Categorization (Re-categorize)
  'POST /transactions/categorize': async (body: any) => {
    await simulateDelay(300, 600);
    
    const { client_id, secret, transaction_id, category } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!transaction_id || !category) {
      throw createError('INVALID_INPUT', 'MISSING_DATA', 'Transaction ID and category are required', 400);
    }
    
    return {
      transaction_id,
      previous_category: ['Food and Drink', 'Restaurants'],
      new_category: category,
      updated_at: new Date().toISOString(),
      learning_applied: true,
      request_id: generateId('req'),
    };
  },

  // Recurring Transactions Detection
  'POST /transactions/recurring': async (body: any) => {
    await simulateDelay(600, 1200);
    
    const { client_id, secret, access_token, account_id } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    return {
      recurring_transactions: [
        {
          stream_id: generateId('stream'),
          description: 'Monthly Rent Payment',
          merchant_name: 'Landlord - Mensah Properties',
          category: ['Rent and Utilities', 'Rent'],
          frequency: 'monthly',
          average_amount: {
            amount: 2500.00,
            iso_currency_code: 'GHS',
          },
          last_amount: {
            amount: 2500.00,
            iso_currency_code: 'GHS',
          },
          next_expected_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'ACTIVE',
          confidence: 0.98,
          first_date: '2023-01-01',
          last_date: '2024-11-01',
          transaction_count: 23,
        },
        {
          stream_id: generateId('stream'),
          description: 'DSTV Subscription',
          merchant_name: 'DSTV Ghana',
          category: ['Entertainment', 'TV'],
          frequency: 'monthly',
          average_amount: {
            amount: 150.00,
            iso_currency_code: 'GHS',
          },
          next_expected_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'ACTIVE',
          confidence: 0.95,
          transaction_count: 18,
        },
        {
          stream_id: generateId('stream'),
          description: 'Salary Deposit',
          merchant_name: 'TechCorp Ghana Ltd',
          category: ['Income', 'Salary'],
          frequency: 'monthly',
          average_amount: {
            amount: 5500.00,
            iso_currency_code: 'GHS',
          },
          next_expected_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'ACTIVE',
          confidence: 1.0,
          is_income: true,
          transaction_count: 24,
        },
      ],
      request_id: generateId('req'),
    };
  },

  // Transaction Search
  'POST /transactions/search': async (body: any) => {
    await simulateDelay(400, 800);
    
    const { client_id, secret, access_token, query, filters } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    const allTransactions = getEnhancedTransactions();
    
    // Simple search implementation
    let results = allTransactions;
    
    if (query) {
      results = results.filter(t => 
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.merchant_name?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters?.min_amount) {
      results = results.filter(t => Math.abs(t.amount) >= filters.min_amount);
    }
    
    if (filters?.max_amount) {
      results = results.filter(t => Math.abs(t.amount) <= filters.max_amount);
    }
    
    return {
      query,
      filters,
      results,
      total_results: results.length,
      request_id: generateId('req'),
    };
  },

  // Transaction Enrichment
  'POST /transactions/enrich': async (body: any) => {
    await simulateDelay(500, 1000);
    
    const { client_id, secret, transaction_id } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!transaction_id) {
      throw createError('INVALID_INPUT', 'MISSING_TRANSACTION_ID', 'Transaction ID is required', 400);
    }
    
    return {
      transaction_id,
      enrichment: {
        merchant_details: {
          name: 'KFC Ghana',
          official_name: 'KFC (Ghana) Limited',
          logo_url: 'https://logos.ghodex.com/kfc.png',
          website: 'https://www.kfc.com.gh',
          phone: '+233302123456',
          category: 'Fast Food Restaurant',
          chain: true,
          parent_company: 'Yum! Brands',
        },
        location_details: {
          branch_name: 'KFC Oxford Street',
          address: 'Oxford Street, Osu, Accra',
          coordinates: {
            latitude: 5.6037,
            longitude: -0.1870,
          },
          hours: {
            monday: '10:00 AM - 10:00 PM',
            tuesday: '10:00 AM - 10:00 PM',
            wednesday: '10:00 AM - 10:00 PM',
            thursday: '10:00 AM - 10:00 PM',
            friday: '10:00 AM - 11:00 PM',
            saturday: '10:00 AM - 11:00 PM',
            sunday: '11:00 AM - 9:00 PM',
          },
        },
        category_confidence: {
          primary_category: 'Food and Drink',
          confidence_score: 0.98,
          alternative_categories: [],
        },
      },
      request_id: generateId('req'),
    };
  },

  // Anomaly Detection
  'POST /transactions/anomalies': async (body: any) => {
    await simulateDelay(800, 1500);
    
    const { client_id, secret, access_token, sensitivity } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    return {
      anomalies: [
        {
          anomaly_id: generateId('anomaly'),
          transaction_id: 'txn_2024_025',
          type: 'unusual_amount',
          severity: 'medium',
          detected_at: new Date().toISOString(),
          details: {
            transaction_amount: 5000.00,
            average_amount: 125.50,
            deviation: '3,882% above average',
            merchant: 'Electronics Store',
          },
          suggested_action: 'verify_transaction',
          false_positive_probability: 0.15,
        },
        {
          anomaly_id: generateId('anomaly'),
          transaction_id: 'txn_2024_026',
          type: 'unusual_location',
          severity: 'low',
          detected_at: new Date().toISOString(),
          details: {
            transaction_location: 'Kumasi',
            usual_location: 'Accra',
            distance_km: 250,
          },
          suggested_action: 'monitor',
          false_positive_probability: 0.40,
        },
      ],
      summary: {
        total_anomalies: 2,
        high_severity: 0,
        medium_severity: 1,
        low_severity: 1,
      },
      model_info: {
        algorithm: 'isolation_forest',
        sensitivity: sensitivity || 'medium',
        last_trained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      request_id: generateId('req'),
    };
  },

  // Transaction Export
  'POST /transactions/export': async (body: any) => {
    await simulateDelay(600, 1200);
    
    const { client_id, secret, access_token, format, start_date, end_date } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    const supportedFormats = ['csv', 'json', 'xlsx', 'pdf', 'qbo', 'ofx'];
    
    if (format && !supportedFormats.includes(format)) {
      throw createError('INVALID_INPUT', 'UNSUPPORTED_FORMAT', `Format must be one of: ${supportedFormats.join(', ')}`, 400);
    }
    
    return {
      export_id: generateId('export'),
      format: format || 'csv',
      status: 'processing',
      download_url: `https://api.ghodex.com/v1/exports/${generateId('export')}.${format || 'csv'}`,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      period: {
        start_date: start_date || '2024-01-01',
        end_date: end_date || '2024-11-13',
      },
      estimated_completion: new Date(Date.now() + 30 * 1000).toISOString(),
      request_id: generateId('req'),
    };
  },

  // Budget Tracking
  'POST /transactions/budget': async (body: any) => {
    await simulateDelay(400, 800);
    
    const { client_id, secret, access_token, budgets } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    return {
      budget_period: 'monthly',
      current_month: new Date().toISOString().slice(0, 7),
      budgets: [
        {
          category: 'Food and Drink',
          budget_amount: 1000.00,
          spent_amount: 1250.50,
          remaining: -250.50,
          percentage_used: 125.05,
          status: 'over_budget',
          days_remaining: 17,
          projected_end_of_month: 1450.00,
        },
        {
          category: 'Transportation',
          budget_amount: 1000.00,
          spent_amount: 425.25,
          remaining: 574.75,
          percentage_used: 42.53,
          status: 'on_track',
          days_remaining: 17,
          projected_end_of_month: 820.00,
        },
        {
          category: 'Entertainment',
          budget_amount: 500.00,
          spent_amount: 650.00,
          remaining: -150.00,
          percentage_used: 130.00,
          status: 'over_budget',
          days_remaining: 17,
          projected_end_of_month: 750.00,
        },
      ],
      overall: {
        total_budget: 5000.00,
        total_spent: 3250.75,
        total_remaining: 1749.25,
        percentage_used: 65.02,
        status: 'on_track',
      },
      request_id: generateId('req'),
    };
  },

  // Merchant Insights
  'POST /transactions/merchant_insights': async (body: any) => {
    await simulateDelay(500, 1000);
    
    const { client_id, secret, access_token, merchant_name } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    return {
      merchant_name: merchant_name || 'KFC',
      insights: {
        total_spent: 425.50,
        transaction_count: 8,
        average_transaction: 53.19,
        first_transaction_date: '2024-01-15',
        last_transaction_date: '2024-11-12',
        frequency: 'weekly',
        favorite_location: 'KFC Oxford Street',
        spending_trend: 'stable',
        typical_day_of_week: 'Friday',
        typical_time_of_day: '14:00 - 16:00',
      },
      comparison: {
        vs_category_average: {
          difference: 12.50,
          percentage: 2.35,
          verdict: 'slightly_above_average',
        },
      },
      recommendations: [
        'You visit this merchant frequently. Consider meal planning to reduce spending.',
        'Peak spending time is Friday afternoons.',
      ],
      request_id: generateId('req'),
    };
  },
};
