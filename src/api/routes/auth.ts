// OAuth and Authentication Routes

import { generateId, validateCredentials, simulateDelay, createError } from '../index';

export const authRoutes = {
  // OAuth: Initiate Authorization
  'POST /oauth/authorize': async (body: any) => {
    await simulateDelay();
    
    const { client_id, redirect_uri, state, institution_id, products } = body;
    
    if (!validateCredentials(client_id, '')) {
      throw createError('INVALID_REQUEST', 'INVALID_CLIENT_ID', 'Invalid client ID', 401);
    }
    
    if (!redirect_uri) {
      throw createError('INVALID_INPUT', 'INVALID_REDIRECT_URI', 'Redirect URI is required', 400);
    }
    
    const authUrl = new URL('https://auth.ghodex.com/oauth/authorize');
    authUrl.searchParams.set('client_id', client_id);
    authUrl.searchParams.set('redirect_uri', redirect_uri);
    authUrl.searchParams.set('state', state || '');
    authUrl.searchParams.set('institution_id', institution_id || '');
    authUrl.searchParams.set('products', (products || []).join(','));
    
    return {
      authorization_url: authUrl.toString(),
      request_id: generateId('req'),
    };
  },
  
  // OAuth: Exchange Authorization Code
  'POST /oauth/token': async (body: any) => {
    await simulateDelay();
    
    const { client_id, client_secret, code, redirect_uri, grant_type } = body;
    
    if (!validateCredentials(client_id, client_secret)) {
      throw createError('OAUTH_ERROR', 'INVALID_CLIENT', 'Invalid client credentials', 401);
    }
    
    if (grant_type === 'authorization_code' && !code) {
      throw createError('OAUTH_ERROR', 'INVALID_GRANT', 'Authorization code is required', 400);
    }
    
    return {
      access_token: generateId('oauth_access'),
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: generateId('oauth_refresh'),
      scope: 'auth transactions balance identity',
      item_id: generateId('item'),
      request_id: generateId('req'),
    };
  },
};
