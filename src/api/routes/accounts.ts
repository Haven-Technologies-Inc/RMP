// Account Routes - Retrieve account information and balances

import { AccountsGetResponse, BalanceGetResponse, Account, Item } from '../../types/api';
import { generateId, validateCredentials, validateAccessToken, simulateDelay, createError } from '../index';

// Mock account data
function getMockAccounts(): Account[] {
  return [
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
    {
      account_id: 'acc_credit_001',
      balances: {
        available: 4500.00,
        current: -1500.00,
        limit: 6000.00,
        iso_currency_code: 'GHS',
        unofficial_currency_code: null,
      },
      mask: '2345',
      name: 'Credit Card',
      official_name: 'Ecobank Visa Credit Card',
      type: 'credit',
      subtype: 'credit_card',
      verification_status: 'automatically_verified',
    },
  ];
}

function getMockItem(): Item {
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

export const accountRoutes = {
  // Get Accounts
  'POST /accounts/get': async (body: any) => {
    await simulateDelay();
    
    const { client_id, secret, access_token, options } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate access token
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    let accounts = getMockAccounts();
    
    // Filter by account IDs if provided
    if (options?.account_ids && options.account_ids.length > 0) {
      accounts = accounts.filter(acc => options.account_ids.includes(acc.account_id));
    }
    
    const response: AccountsGetResponse = {
      accounts,
      item: getMockItem(),
      request_id: generateId('req'),
    };
    
    return response;
  },
  
  // Get Balance
  'POST /balance/get': async (body: any) => {
    await simulateDelay(100, 400); // Faster for balance checks
    
    const { client_id, secret, access_token, options } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate access token
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    let accounts = getMockAccounts();
    
    // Filter by account IDs if provided
    if (options?.account_ids && options.account_ids.length > 0) {
      accounts = accounts.filter(acc => options.account_ids.includes(acc.account_id));
    }
    
    const response: BalanceGetResponse = {
      accounts,
      item: getMockItem(),
      request_id: generateId('req'),
    };
    
    return response;
  },
  
  // Get Account Numbers (Auth)
  'POST /auth/get': async (body: any) => {
    await simulateDelay();
    
    const { client_id, secret, access_token } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate access token
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    const accounts = getMockAccounts();
    
    const auth_accounts = accounts.map(acc => ({
      account_id: acc.account_id,
      balances: acc.balances,
      mask: acc.mask,
      name: acc.name,
      official_name: acc.official_name,
      type: acc.type,
      subtype: acc.subtype,
      account_number: `GH${Math.random().toString().slice(2, 14)}`,
      routing_number: acc.type === 'depository' && acc.subtype === 'mobile_money' 
        ? 'MTN-GH-001'
        : '040101', // GCB bank code
      wire_routing_number: acc.type === 'depository' && acc.subtype !== 'mobile_money' 
        ? '040101001'
        : null,
    }));
    
    return {
      accounts: auth_accounts,
      numbers: {
        ach: auth_accounts.map(acc => ({
          account_id: acc.account_id,
          account: acc.account_number,
          routing: acc.routing_number,
          wire_routing: acc.wire_routing_number,
        })),
      },
      item: getMockItem(),
      request_id: generateId('req'),
    };
  },
};
