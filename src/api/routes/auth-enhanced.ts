// Enhanced Auth Product Routes - Complete Implementation

import { generateId, validateCredentials, validateAccessToken, simulateDelay, createError } from '../index';

// Enhanced mock data with more realistic scenarios
function getEnhancedAuthData(accountId?: string) {
  const allAccounts = [
    {
      account_id: 'acc_savings_001',
      account_number: 'GH1234567890123',
      routing_number: '040101', // GCB Bank routing number
      wire_routing_number: '040101001',
      account_holder_name: 'Kwame Mensah',
      bank_name: 'GCB Bank Limited',
      bank_code: '040101',
      branch_name: 'Accra Main Branch',
      branch_code: '001',
      account_type: 'savings',
      account_status: 'active',
      opened_date: '2020-03-15',
      verification_status: 'automatically_verified',
      verification_method: 'instant',
      verification_timestamp: new Date().toISOString(),
      balances: {
        available: 15420.50,
        current: 15420.50,
        limit: null,
        iso_currency_code: 'GHS',
      },
      name: 'Savings Account',
      official_name: 'GCB Premium Savings Account',
      type: 'depository',
      subtype: 'savings',
      mask: '0123',
    },
    {
      account_id: 'acc_checking_001',
      account_number: 'GH9876543210987',
      routing_number: '040101',
      wire_routing_number: '040101002',
      account_holder_name: 'Kwame Mensah',
      bank_name: 'GCB Bank Limited',
      bank_code: '040101',
      branch_name: 'Osu Branch',
      branch_code: '002',
      account_type: 'checking',
      account_status: 'active',
      opened_date: '2019-06-20',
      verification_status: 'automatically_verified',
      verification_method: 'instant',
      verification_timestamp: new Date().toISOString(),
      balances: {
        available: 8750.25,
        current: 8750.25,
        limit: null,
        iso_currency_code: 'GHS',
      },
      name: 'Current Account',
      official_name: 'GCB Current Account',
      type: 'depository',
      subtype: 'checking',
      mask: '0987',
    },
    {
      account_id: 'acc_mobile_money_001',
      account_number: '+233501234567',
      routing_number: 'MTN-GH-001',
      wire_routing_number: null,
      account_holder_name: 'Kwame Mensah',
      bank_name: 'MTN Mobile Money',
      bank_code: 'MTN-GH',
      branch_name: 'Mobile Money',
      branch_code: '001',
      account_type: 'mobile_money',
      account_status: 'active',
      opened_date: '2018-01-10',
      verification_status: 'automatically_verified',
      verification_method: 'database_match',
      verification_timestamp: new Date().toISOString(),
      balances: {
        available: 2345.75,
        current: 2345.75,
        limit: 5000.00,
        iso_currency_code: 'GHS',
      },
      name: 'MTN Mobile Money',
      official_name: 'MTN MoMo Account',
      type: 'depository',
      subtype: 'mobile_money',
      mask: '4567',
    },
  ];

  if (accountId) {
    return allAccounts.filter(acc => acc.account_id === accountId);
  }

  return allAccounts;
}

export const authEnhancedRoutes = {
  // Enhanced Auth Get - Complete account verification data
  'POST /auth/get': async (body: any) => {
    await simulateDelay(200, 500);
    
    const { client_id, secret, access_token, options } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate access token
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    let accounts = getEnhancedAuthData();
    
    // Filter by account IDs if provided
    if (options?.account_ids && options.account_ids.length > 0) {
      accounts = accounts.filter(acc => options.account_ids.includes(acc.account_id));
    }
    
    // Format response with ACH numbers
    const achNumbers = accounts.map(acc => ({
      account_id: acc.account_id,
      account: acc.account_number,
      routing: acc.routing_number,
      wire_routing: acc.wire_routing_number,
      account_holder_name: acc.account_holder_name,
    }));
    
    return {
      accounts: accounts.map(acc => ({
        account_id: acc.account_id,
        balances: acc.balances,
        mask: acc.mask,
        name: acc.name,
        official_name: acc.official_name,
        type: acc.type,
        subtype: acc.subtype,
        verification_status: acc.verification_status,
      })),
      numbers: {
        ach: achNumbers,
        bank_details: accounts.map(acc => ({
          account_id: acc.account_id,
          bank_name: acc.bank_name,
          bank_code: acc.bank_code,
          branch_name: acc.branch_name,
          branch_code: acc.branch_code,
          account_type: acc.account_type,
          account_status: acc.account_status,
          opened_date: acc.opened_date,
        })),
      },
      verification: {
        status: 'verified',
        method: 'instant',
        verified_at: new Date().toISOString(),
        confidence_score: 98,
      },
      item: {
        item_id: generateId('item'),
        institution_id: 'ins_gcb_bank',
        webhook: '',
        error: null,
        available_products: ['auth', 'balance', 'transactions', 'identity'],
        billed_products: ['auth'],
        consent_expiration_time: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        update_type: 'background',
      },
      request_id: generateId('req'),
    };
  },

  // Verify Account Ownership
  'POST /auth/verify_ownership': async (body: any) => {
    await simulateDelay(400, 800);
    
    const { client_id, secret, access_token, account_id, owner_name } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    if (!account_id) {
      throw createError('INVALID_INPUT', 'MISSING_ACCOUNT_ID', 'Account ID is required', 400);
    }
    
    const accounts = getEnhancedAuthData(account_id);
    
    if (accounts.length === 0) {
      throw createError('INVALID_INPUT', 'ACCOUNT_NOT_FOUND', 'Account not found', 404);
    }
    
    const account = accounts[0];
    
    // Perform name matching
    let nameMatch: 'exact' | 'partial' | 'no_match' = 'no_match';
    let confidenceScore = 0;
    
    if (owner_name) {
      const normalizedOwner = owner_name.toLowerCase().trim();
      const normalizedAccount = account.account_holder_name.toLowerCase().trim();
      
      if (normalizedOwner === normalizedAccount) {
        nameMatch = 'exact';
        confidenceScore = 100;
      } else if (normalizedAccount.includes(normalizedOwner) || normalizedOwner.includes(normalizedAccount)) {
        nameMatch = 'partial';
        confidenceScore = 75;
      } else {
        nameMatch = 'no_match';
        confidenceScore = 0;
      }
    }
    
    return {
      account_id: account.account_id,
      verification_status: nameMatch === 'exact' || nameMatch === 'partial' ? 'verified' : 'failed',
      name_match: nameMatch,
      confidence_score: confidenceScore,
      account_holder_name: account.account_holder_name,
      provided_name: owner_name,
      verified_at: nameMatch !== 'no_match' ? new Date().toISOString() : null,
      request_id: generateId('req'),
    };
  },

  // Verify Account Status
  'POST /auth/verify_status': async (body: any) => {
    await simulateDelay(300, 600);
    
    const { client_id, secret, account_number, routing_number } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!account_number || !routing_number) {
      throw createError('INVALID_INPUT', 'MISSING_ACCOUNT_INFO', 'Account number and routing number are required', 400);
    }
    
    // Find matching account
    const accounts = getEnhancedAuthData();
    const account = accounts.find(acc => 
      acc.account_number === account_number && acc.routing_number === routing_number
    );
    
    if (!account) {
      return {
        account_exists: false,
        account_open: false,
        verification_status: 'not_found',
        request_id: generateId('req'),
      };
    }
    
    return {
      account_exists: true,
      account_open: account.account_status === 'active',
      account_status: account.account_status,
      account_type: account.account_type,
      bank_name: account.bank_name,
      verification_status: 'verified',
      verification_method: 'database_match',
      confidence_score: 95,
      verified_at: new Date().toISOString(),
      request_id: generateId('req'),
    };
  },

  // Micro-deposit verification (for edge cases)
  'POST /auth/micro_deposit/initiate': async (body: any) => {
    await simulateDelay(500, 1000);
    
    const { client_id, secret, access_token, account_id } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    return {
      verification_id: generateId('micro_deposit'),
      status: 'initiated',
      expected_completion: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days
      deposits_sent: 2,
      instructions: 'Two small deposits will appear in your account within 1-2 business days. Enter the amounts to verify.',
      request_id: generateId('req'),
    };
  },

  // Verify micro-deposits
  'POST /auth/micro_deposit/verify': async (body: any) => {
    await simulateDelay(300, 500);
    
    const { client_id, secret, verification_id, amounts } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!verification_id || !amounts || amounts.length !== 2) {
      throw createError('INVALID_INPUT', 'INVALID_AMOUNTS', 'Two deposit amounts are required', 400);
    }
    
    // Mock verification (accept any two amounts for demo)
    const verified = amounts.every((amt: number) => amt > 0 && amt < 1);
    
    if (!verified) {
      throw createError('VERIFICATION_FAILED', 'INCORRECT_AMOUNTS', 'The amounts provided do not match our records', 400);
    }
    
    return {
      verification_id,
      status: 'verified',
      verified_at: new Date().toISOString(),
      request_id: generateId('req'),
    };
  },
};
