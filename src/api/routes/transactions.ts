// Transaction Routes - Retrieve and sync transaction data

import { TransactionsGetResponse, Transaction } from '../../types/api';
import { generateId, validateCredentials, validateAccessToken, simulateDelay, createError } from '../index';

// Mock transaction data generator
function generateMockTransactions(startDate: string, endDate: string, accountIds?: string[]): Transaction[] {
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
    {
      transaction_id: 'txn_006',
      account_id: 'acc_checking_001',
      amount: 5500.00,
      iso_currency_code: 'GHS',
      unofficial_currency_code: null,
      category: ['Income', 'Salary'],
      category_id: '21001000',
      date: '2024-11-01',
      authorized_date: '2024-11-01',
      name: 'Monthly Salary Deposit',
      merchant_name: 'Employer XYZ Ltd',
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
        reference_number: 'SAL202411',
        ppd_id: null,
        payee: 'Kwame Mensah',
        by_order_of: null,
        payer: 'Employer XYZ Ltd',
        payment_method: 'bank_transfer',
        payment_processor: 'GCB',
        reason: 'November 2024 Salary',
      },
      transaction_type: 'special',
    },
    {
      transaction_id: 'txn_007',
      account_id: 'acc_savings_001',
      amount: -89.99,
      iso_currency_code: 'GHS',
      unofficial_currency_code: null,
      category: ['Shops', 'Supermarkets'],
      category_id: '19046000',
      date: '2024-11-07',
      authorized_date: '2024-11-07',
      name: 'Shoprite Purchase',
      merchant_name: 'Shoprite',
      payment_channel: 'in_store',
      pending: false,
      pending_transaction_id: null,
      account_owner: null,
      location: {
        address: 'Accra Mall',
        city: 'Accra',
        region: 'Greater Accra',
        postal_code: null,
        country: 'GH',
        lat: 5.6037,
        lon: -0.1870,
      },
      payment_meta: {
        reference_number: 'SHOP20241107001',
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
      transaction_id: 'txn_008',
      account_id: 'acc_mobile_money_001',
      amount: -20.00,
      iso_currency_code: 'GHS',
      unofficial_currency_code: null,
      category: ['Service', 'Telecommunication'],
      category_id: '19012000',
      date: '2024-11-06',
      authorized_date: '2024-11-06',
      name: 'MTN Airtime Purchase',
      merchant_name: 'MTN Ghana',
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
        reference_number: 'MTN20241106001',
        ppd_id: null,
        payee: 'MTN Ghana',
        by_order_of: null,
        payer: 'Kwame Mensah',
        payment_method: 'mobile_money',
        payment_processor: 'MTN',
        reason: 'Airtime purchase',
      },
      transaction_type: 'digital',
    },
  ];
  
  // Filter by account IDs if provided
  if (accountIds && accountIds.length > 0) {
    return transactions.filter(txn => accountIds.includes(txn.account_id));
  }
  
  return transactions;
}

export const transactionRoutes = {
  // Get Transactions
  'POST /transactions/get': async (body: any) => {
    await simulateDelay(400, 1000); // Transactions take longer
    
    const { client_id, secret, access_token, start_date, end_date, options } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate access token
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    // Validate dates
    if (!start_date || !end_date) {
      throw createError('INVALID_INPUT', 'INVALID_DATES', 'start_date and end_date are required', 400);
    }
    
    const transactions = generateMockTransactions(start_date, end_date, options?.account_ids);
    
    // Apply pagination
    const count = options?.count || 100;
    const offset = options?.offset || 0;
    const paginatedTransactions = transactions.slice(offset, offset + count);
    
    // Get accounts for response
    const accountsModule = await import('./accounts');
    const accountsResponse = await accountsModule.accountRoutes['POST /accounts/get']({
      client_id,
      secret,
      access_token,
      options: { account_ids: options?.account_ids },
    });
    
    const response: TransactionsGetResponse = {
      accounts: accountsResponse.accounts,
      transactions: paginatedTransactions,
      item: accountsResponse.item,
      total_transactions: transactions.length,
      request_id: generateId('req'),
    };
    
    return response;
  },
  
  // Sync Transactions (incremental update)
  'POST /transactions/sync': async (body: any) => {
    await simulateDelay(300, 700);
    
    const { client_id, secret, access_token, cursor } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate access token
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    // Mock sync response
    const added = generateMockTransactions('2024-11-13', '2024-11-13').slice(0, 2);
    const modified: Transaction[] = [];
    const removed: string[] = [];
    
    return {
      added,
      modified,
      removed,
      next_cursor: cursor ? `cursor_${Date.now()}` : null,
      has_more: false,
      request_id: generateId('req'),
    };
  },
  
  // Refresh Transactions
  'POST /transactions/refresh': async (body: any) => {
    await simulateDelay(200, 500);
    
    const { client_id, secret, access_token } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate access token
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    return {
      refresh_status: 'initiated',
      webhook_delivered: true,
      request_id: generateId('req'),
    };
  },
};
