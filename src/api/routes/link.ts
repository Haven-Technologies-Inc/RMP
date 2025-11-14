// Link Token Routes - Initialize and manage Link flow

import { LinkToken, PublicToken, AccessToken } from '../../types/api';
import { generateId, validateCredentials, simulateDelay, createError } from '../index';

export const linkRoutes = {
  // Create Link Token
  'POST /link/token/create': async (body: any) => {
    await simulateDelay();
    
    const { client_id, secret, client_name, user, products, country_codes, language, webhook } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate required fields
    if (!user?.client_user_id) {
      throw createError('INVALID_INPUT', 'INVALID_USER', 'User client_user_id is required', 400);
    }
    
    if (!products || products.length === 0) {
      throw createError('INVALID_INPUT', 'INVALID_PRODUCTS', 'At least one product is required', 400);
    }
    
    const linkToken: LinkToken = {
      link_token: generateId('link'),
      expiration: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      request_id: generateId('req'),
    };
    
    return linkToken;
  },
  
  // Exchange Public Token for Access Token
  'POST /item/public_token/exchange': async (body: any) => {
    await simulateDelay();
    
    const { client_id, secret, public_token } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate public token
    if (!public_token || !public_token.startsWith('public-')) {
      throw createError('INVALID_INPUT', 'INVALID_PUBLIC_TOKEN', 'Invalid public token', 400);
    }
    
    const accessToken: AccessToken = {
      access_token: generateId('access'),
      item_id: generateId('item'),
      request_id: generateId('req'),
    };
    
    return accessToken;
  },
  
  // Create Public Token (for Sandbox)
  'POST /sandbox/public_token/create': async (body: any) => {
    await simulateDelay();
    
    const { institution_id, initial_products } = body;
    
    if (!institution_id) {
      throw createError('INVALID_INPUT', 'INVALID_INSTITUTION', 'Institution ID is required', 400);
    }
    
    const publicToken: PublicToken = {
      public_token: generateId('public_sandbox'),
      expiration: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };
    
    return publicToken;
  },
};
