// Item Routes - Manage connected Items

import { Item } from '../../types/api';
import { generateId, validateCredentials, validateAccessToken, simulateDelay, createError } from '../index';

function getMockItem(): Item {
  return {
    item_id: generateId('item'),
    institution_id: 'ins_gcb_bank',
    webhook: '',
    error: null,
    available_products: ['auth', 'balance', 'transactions', 'identity', 'income', 'liabilities'],
    billed_products: ['auth', 'balance', 'transactions'],
    consent_expiration_time: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    update_type: 'background',
  };
}

export const itemRoutes = {
  // Get Item
  'POST /item/get': async (body: any) => {
    await simulateDelay(100, 300);
    
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
      item: getMockItem(),
      status: {
        transactions: {
          last_successful_update: new Date(Date.now() - 3600000).toISOString(),
          last_failed_update: null,
        },
        balance: {
          last_successful_update: new Date(Date.now() - 600000).toISOString(),
          last_failed_update: null,
        },
      },
      request_id: generateId('req'),
    };
  },
  
  // Remove Item
  'POST /item/remove': async (body: any) => {
    await simulateDelay(200, 400);
    
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
      removed: true,
      request_id: generateId('req'),
    };
  },
  
  // Update Webhook
  'POST /item/webhook/update': async (body: any) => {
    await simulateDelay(100, 200);
    
    const { client_id, secret, access_token, webhook } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate access token
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    if (!webhook) {
      throw createError('INVALID_INPUT', 'INVALID_WEBHOOK', 'Webhook URL is required', 400);
    }
    
    // Validate webhook URL
    try {
      new URL(webhook);
    } catch {
      throw createError('INVALID_INPUT', 'INVALID_WEBHOOK_URL', 'Invalid webhook URL format', 400);
    }
    
    const item = getMockItem();
    item.webhook = webhook;
    
    return {
      item,
      request_id: generateId('req'),
    };
  },
  
  // Refresh Item
  'POST /item/refresh': async (body: any) => {
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
      webhook_will_fire: true,
      request_id: generateId('req'),
    };
  },
  
  // Get Item Access Token
  'POST /item/access_token/invalidate': async (body: any) => {
    await simulateDelay(100, 200);
    
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
      new_access_token: generateId('access'),
      request_id: generateId('req'),
    };
  },
};
