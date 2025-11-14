// African-Specific Features API Routes

import { generateId, validateCredentials, validateAccessToken, simulateDelay, createError } from '../index';

// Mobile Money Providers Data
const mobileMoneyProviders = [
  {
    provider_id: 'mtn_gh',
    name: 'MTN Mobile Money',
    country: 'Ghana',
    country_code: 'GH',
    currency: 'GHS',
    ussd_code: '*170#',
    supports_api: true,
    supports_ussd: true,
    max_balance: 10000.00,
    daily_limit: 5000.00,
  },
  {
    provider_id: 'vodafone_gh',
    name: 'Vodafone Cash',
    country: 'Ghana',
    country_code: 'GH',
    currency: 'GHS',
    ussd_code: '*110#',
    supports_api: true,
    supports_ussd: true,
    max_balance: 10000.00,
    daily_limit: 5000.00,
  },
  {
    provider_id: 'airteltigo_gh',
    name: 'AirtelTigo Money',
    country: 'Ghana',
    country_code: 'GH',
    currency: 'GHS',
    ussd_code: '*110#',
    supports_api: true,
    supports_ussd: true,
    max_balance: 10000.00,
    daily_limit: 5000.00,
  },
  {
    provider_id: 'mpesa_ke',
    name: 'M-Pesa',
    country: 'Kenya',
    country_code: 'KE',
    currency: 'KES',
    ussd_code: '*334#',
    supports_api: true,
    supports_ussd: true,
    max_balance: 300000.00,
    daily_limit: 150000.00,
  },
];

export const africanFeaturesRoutes = {
  // Get Mobile Money Providers
  'POST /mobile_money/providers': async (body: any) => {
    await simulateDelay(100, 300);
    
    const { client_id, secret, country_code } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    let providers = mobileMoneyProviders;
    
    if (country_code) {
      providers = providers.filter(p => p.country_code === country_code);
    }
    
    return {
      providers,
      request_id: generateId('req'),
    };
  },

  // USSD Session - Initiate
  'POST /ussd/session/initiate': async (body: any) => {
    await simulateDelay(200, 400);
    
    const { client_id, secret, phone_number, initial_menu } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!phone_number) {
      throw createError('INVALID_INPUT', 'MISSING_PHONE', 'Phone number is required', 400);
    }
    
    return {
      session_id: generateId('ussd_session'),
      phone_number,
      ussd_code: '*920#',
      menu: {
        text: 'Welcome to ReshADX\n1. Check Balance\n2. Transfer Money\n3. Pay Bills\n4. Account Info',
        is_final: false,
      },
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 3 * 60 * 1000).toISOString(), // 3 minutes
      request_id: generateId('req'),
    };
  },

  // USSD Session - Continue
  'POST /ussd/session/continue': async (body: any) => {
    await simulateDelay(100, 300);
    
    const { client_id, secret, session_id, user_input } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!session_id || !user_input) {
      throw createError('INVALID_INPUT', 'MISSING_DATA', 'Session ID and user input are required', 400);
    }
    
    // Mock menu navigation
    let menuText = '';
    let isFinal = false;
    
    if (user_input === '1') {
      menuText = 'Your balance is GHS 15,420.50\\n\\nThank you for using ReshADX';
      isFinal = true;
    } else if (user_input === '2') {
      menuText = 'Enter mobile number:';
      isFinal = false;
    } else {
      menuText = 'Invalid option. Please try again.';
      isFinal = true;
    }
    
    return {
      session_id,
      menu: {
        text: menuText,
        is_final: isFinal,
      },
      request_id: generateId('req'),
    };
  },

  // SMS Banking - Send Command
  'POST /sms/command': async (body: any) => {
    await simulateDelay(200, 500);
    
    const { client_id, secret, phone_number, command } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!phone_number || !command) {
      throw createError('INVALID_INPUT', 'MISSING_DATA', 'Phone number and command are required', 400);
    }
    
    // Parse SMS command
    const commandUpper = command.toUpperCase().trim();
    let response = '';
    
    if (commandUpper === 'BAL') {
      response = 'Your account balance is GHS 15,420.50. Available: GHS 15,420.50';
    } else if (commandUpper.startsWith('MINI')) {
      response = 'Last 3 transactions:\n1. KFC -125.50\n2. MoMo +500.00\n3. Rent -2500.00';
    } else {
      response = 'Invalid command. Reply BAL for balance, MINI for statement';
    }
    
    return {
      sms_id: generateId('sms'),
      phone_number,
      command,
      response,
      sent_at: new Date().toISOString(),
      delivery_status: 'sent',
      request_id: generateId('req'),
    };
  },

  // Alternative Credit Score
  'POST /credit/alternative_score': async (body: any) => {
    await simulateDelay(1000, 2000);
    
    const { client_id, secret, access_token, scoring_model } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    return {
      credit_score: 725,
      score_range: '300-850',
      confidence: 'high',
      model_version: 'african_v2.1',
      factors_analyzed: {
        mobile_money_usage: {
          weight: 0.35,
          score: 85,
          details: {
            transaction_frequency: 'high',
            average_balance: 2500.00,
            months_active: 36,
          },
        },
        utility_payments: {
          weight: 0.25,
          score: 92,
          details: {
            on_time_rate: 0.96,
            consecutive_payments: 18,
            providers: ['ECG', 'Ghana Water', 'Vodafone'],
          },
        },
        airtime_behavior: {
          weight: 0.15,
          score: 78,
          details: {
            monthly_spend: 150.00,
            consistency: 'regular',
            recharge_pattern: 'predictable',
          },
        },
        social_signals: {
          weight: 0.10,
          score: 70,
          details: {
            network_quality: 'medium',
            employment_verification: true,
            education_level: 'tertiary',
          },
        },
        merchant_payments: {
          weight: 0.15,
          score: 88,
          details: {
            merchants_count: 25,
            monthly_spend: 1200.00,
            fraud_incidents: 0,
          },
        },
      },
      recommendations: [
        'Continue regular utility payments',
        'Maintain mobile money activity',
        'Consider increasing transaction diversity',
      ],
      loan_eligibility: {
        max_amount: 15000.00,
        recommended_term_months: 12,
        estimated_rate: 18.5,
      },
      request_id: generateId('req'),
    };
  },

  // GhIPSS Instant Pay
  'POST /ghipss/instant_pay': async (body: any) => {
    await simulateDelay(500, 1000);
    
    const { client_id, secret, sender_account, recipient_account, amount, reference } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!sender_account || !recipient_account || !amount) {
      throw createError('INVALID_INPUT', 'MISSING_DATA', 'Sender account, recipient account, and amount are required', 400);
    }
    
    return {
      transaction_id: generateId('ghipss'),
      status: 'completed',
      sender_account,
      recipient_account,
      amount: {
        value: amount.value,
        currency: amount.currency || 'GHS',
      },
      reference: reference || '',
      ghipss_reference: `GHIPSS${Date.now()}`,
      completed_at: new Date().toISOString(),
      settlement_date: new Date().toISOString(),
      request_id: generateId('req'),
    };
  },

  // Agent Locator
  'POST /agents/find_nearby': async (body: any) => {
    await simulateDelay(300, 600);
    
    const { client_id, secret, latitude, longitude, radius_km, service_type } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!latitude || !longitude) {
      throw createError('INVALID_INPUT', 'MISSING_LOCATION', 'Latitude and longitude are required', 400);
    }
    
    // Mock nearby agents
    const agents = [
      {
        agent_id: 'agent_001',
        name: 'Kwame\'s Mobile Money Shop',
        type: 'mobile_money',
        services: ['cash_in', 'cash_out', 'bill_payment', 'account_opening'],
        location: {
          latitude: 5.6037,
          longitude: -0.1870,
          address: '123 Oxford Street, Osu, Accra',
          landmark: 'Near KFC Oxford Street',
        },
        distance_km: 0.5,
        rating: 4.8,
        hours: '7:00 AM - 9:00 PM',
        available_now: true,
        cash_available: true,
        max_transaction: 5000.00,
      },
      {
        agent_id: 'agent_002',
        name: 'Ama\'s Financial Services',
        type: 'banking_agent',
        services: ['cash_in', 'cash_out', 'kyc_verification', 'account_opening'],
        location: {
          latitude: 5.6100,
          longitude: -0.1900,
          address: '45 Cantonments Road, Accra',
          landmark: 'Opposite Shell Station',
        },
        distance_km: 1.2,
        rating: 4.9,
        hours: '8:00 AM - 6:00 PM',
        available_now: true,
        cash_available: true,
        max_transaction: 10000.00,
      },
    ];
    
    return {
      agents,
      total_found: agents.length,
      search_location: { latitude, longitude },
      radius_km: radius_km || 5,
      request_id: generateId('req'),
    };
  },

  // Bill Payment - Get Providers
  'POST /bills/providers': async (body: any) => {
    await simulateDelay(200, 400);
    
    const { client_id, secret, category } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    const allProviders = [
      {
        provider_id: 'ecg',
        name: 'Electricity Company of Ghana (ECG)',
        category: 'electricity',
        logo_url: '/logos/ecg.png',
        supports_prepaid: true,
        supports_postpaid: true,
      },
      {
        provider_id: 'gwcl',
        name: 'Ghana Water Company Limited',
        category: 'water',
        logo_url: '/logos/gwcl.png',
        supports_prepaid: false,
        supports_postpaid: true,
      },
      {
        provider_id: 'dstv',
        name: 'DSTV Ghana',
        category: 'tv',
        logo_url: '/logos/dstv.png',
        supports_prepaid: true,
        supports_postpaid: false,
      },
      {
        provider_id: 'mtn_fiber',
        name: 'MTN Fiber',
        category: 'internet',
        logo_url: '/logos/mtn.png',
        supports_prepaid: false,
        supports_postpaid: true,
      },
    ];
    
    const providers = category 
      ? allProviders.filter(p => p.category === category)
      : allProviders;
    
    return {
      providers,
      categories: ['electricity', 'water', 'tv', 'internet', 'insurance'],
      request_id: generateId('req'),
    };
  },

  // ECOWAS Cross-Border Transfer
  'POST /ecowas/transfer': async (body: any) => {
    await simulateDelay(800, 1500);
    
    const { client_id, secret, sender_country, recipient_country, amount, recipient_phone } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!sender_country || !recipient_country || !amount) {
      throw createError('INVALID_INPUT', 'MISSING_DATA', 'Sender country, recipient country, and amount are required', 400);
    }
    
    // Mock exchange rates
    const exchangeRates: any = {
      'GHS-NGN': 84.5,
      'NGN-GHS': 0.0118,
      'GHS-XOF': 88.2,
    };
    
    const rateKey = `${amount.from_currency}-${amount.to_currency}`;
    const rate = exchangeRates[rateKey] || 1;
    
    return {
      transfer_id: generateId('ecowas_transfer'),
      status: 'processing',
      sender_country,
      recipient_country,
      amount: {
        send_amount: amount.value,
        send_currency: amount.from_currency,
        receive_amount: amount.value * rate,
        receive_currency: amount.to_currency,
        exchange_rate: rate,
        fees: amount.value * 0.015, // 1.5% fee
      },
      recipient_phone,
      estimated_delivery: '30 minutes',
      tracking_number: `ECOWAS${Date.now()}`,
      compliance_status: 'cleared',
      created_at: new Date().toISOString(),
      request_id: generateId('req'),
    };
  },

  // Verify Multiple IDs
  'POST /verification/multi_id': async (body: any) => {
    await simulateDelay(1000, 2000);
    
    const { client_id, secret, ghana_card, voter_id, nhis_card, drivers_license } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    const results = {
      ghana_card: ghana_card ? {
        provided: ghana_card,
        verified: true,
        source: 'NIA',
        confidence: 0.98,
      } : null,
      voter_id: voter_id ? {
        provided: voter_id,
        verified: true,
        source: 'Electoral Commission',
        confidence: 0.95,
      } : null,
      nhis_card: nhis_card ? {
        provided: nhis_card,
        verified: true,
        source: 'NHIA',
        confidence: 0.92,
      } : null,
      drivers_license: drivers_license ? {
        provided: drivers_license,
        verified: true,
        source: 'DVLA',
        confidence: 0.90,
      } : null,
    };
    
    const verifiedCount = Object.values(results).filter(r => r !== null).length;
    
    return {
      verification_id: generateId('multi_id_verify'),
      results,
      summary: {
        ids_verified: verifiedCount,
        overall_confidence: verifiedCount >= 2 ? 'high' : 'medium',
        recommendation: verifiedCount >= 2 ? 'approved' : 'needs_review',
      },
      verified_at: new Date().toISOString(),
      request_id: generateId('req'),
    };
  },

  // WhatsApp Banking Session
  'POST /whatsapp/session/create': async (body: any) => {
    await simulateDelay(300, 600);
    
    const { client_id, secret, phone_number, initial_message } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!phone_number) {
      throw createError('INVALID_INPUT', 'MISSING_PHONE', 'Phone number is required', 400);
    }
    
    return {
      session_id: generateId('whatsapp_session'),
      phone_number,
      platform: 'whatsapp',
      bot_response: 'Hello! 👋 Welcome to ReshADX Banking.\n\nHow can I help you today?\n\n1️⃣ Check Balance\n2️⃣ Recent Transactions\n3️⃣ Transfer Money\n4️⃣ Pay Bills\n5️⃣ Speak to Agent',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      request_id: generateId('req'),
    };
  },
};