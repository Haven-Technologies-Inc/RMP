// Payment Routes - Payment initiation and management

import { PaymentInitiation } from '../../types/api';
import { generateId, validateCredentials, validateAccessToken, simulateDelay, createError } from '../index';

export const paymentRoutes = {
  // Create Payment
  'POST /payment_initiation/payment/create': async (body: any) => {
    await simulateDelay();
    
    const { client_id, secret, recipient_id, reference, amount } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!recipient_id) {
      throw createError('INVALID_INPUT', 'INVALID_RECIPIENT', 'Recipient ID is required', 400);
    }
    
    if (!amount || !amount.currency || amount.value == null) {
      throw createError('INVALID_INPUT', 'INVALID_AMOUNT', 'Amount with currency and value is required', 400);
    }
    
    const payment: PaymentInitiation = {
      payment_id: generateId('payment'),
      payment_token: generateId('payment_token'),
      reference: reference || '',
      amount: {
        currency: amount.currency,
        value: amount.value,
      },
      status: 'PAYMENT_STATUS_INPUT_NEEDED',
      recipient_id,
      created_at: new Date().toISOString(),
      last_status_update: new Date().toISOString(),
    };
    
    return payment;
  },
  
  // Get Payment
  'POST /payment_initiation/payment/get': async (body: any) => {
    await simulateDelay(100, 300);
    
    const { client_id, secret, payment_id } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!payment_id) {
      throw createError('INVALID_INPUT', 'INVALID_PAYMENT_ID', 'Payment ID is required', 400);
    }
    
    const payment: PaymentInitiation = {
      payment_id,
      payment_token: generateId('payment_token'),
      reference: 'INV-2024-001',
      amount: {
        currency: 'GHS',
        value: 500.00,
      },
      status: 'PAYMENT_STATUS_EXECUTED',
      recipient_id: 'recipient_123',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      last_status_update: new Date().toISOString(),
    };
    
    return payment;
  },
  
  // List Payments
  'POST /payment_initiation/payment/list': async (body: any) => {
    await simulateDelay();
    
    const { client_id, secret, options } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    const payments: PaymentInitiation[] = [
      {
        payment_id: 'payment_001',
        payment_token: generateId('payment_token'),
        reference: 'INV-2024-001',
        amount: { currency: 'GHS', value: 500.00 },
        status: 'PAYMENT_STATUS_EXECUTED',
        recipient_id: 'recipient_123',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        last_status_update: new Date(Date.now() - 82800000).toISOString(),
      },
      {
        payment_id: 'payment_002',
        payment_token: generateId('payment_token'),
        reference: 'INV-2024-002',
        amount: { currency: 'GHS', value: 1200.00 },
        status: 'PAYMENT_STATUS_INITIATED',
        recipient_id: 'recipient_456',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        last_status_update: new Date(Date.now() - 1800000).toISOString(),
      },
    ];
    
    const count = options?.count || 10;
    const offset = options?.offset || 0;
    
    return {
      payments: payments.slice(offset, offset + count),
      next_cursor: null,
      request_id: generateId('req'),
    };
  },
  
  // Create Recipient
  'POST /payment_initiation/recipient/create': async (body: any) => {
    await simulateDelay();
    
    const { client_id, secret, name, mobile_money, bank_account, address } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!name) {
      throw createError('INVALID_INPUT', 'INVALID_NAME', 'Recipient name is required', 400);
    }
    
    if (!mobile_money && !bank_account) {
      throw createError('INVALID_INPUT', 'INVALID_RECIPIENT_INFO', 'Either mobile_money or bank_account is required', 400);
    }
    
    return {
      recipient_id: generateId('recipient'),
      name,
      mobile_money: mobile_money || null,
      bank_account: bank_account || null,
      address: address || null,
      request_id: generateId('req'),
    };
  },
  
  // Get Recipient
  'POST /payment_initiation/recipient/get': async (body: any) => {
    await simulateDelay(100, 200);
    
    const { client_id, secret, recipient_id } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!recipient_id) {
      throw createError('INVALID_INPUT', 'INVALID_RECIPIENT_ID', 'Recipient ID is required', 400);
    }
    
    return {
      recipient_id,
      name: 'Ama Mensah',
      mobile_money: {
        provider: 'MTN',
        number: '+233501234567',
      },
      bank_account: null,
      address: null,
      request_id: generateId('req'),
    };
  },
};
