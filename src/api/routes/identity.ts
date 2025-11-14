// Identity Routes - Identity verification and Ghana Card data

import { IdentityGetResponse, Identity } from '../../types/api';
import { generateId, validateCredentials, validateAccessToken, simulateDelay, createError } from '../index';

function getMockIdentity(): Identity {
  return {
    addresses: [
      {
        data: {
          city: 'Accra',
          region: 'Greater Accra',
          street: '123 Independence Avenue',
          postal_code: 'GA-123-4567',
          country: 'Ghana',
        },
        primary: true,
      },
      {
        data: {
          city: 'Kumasi',
          region: 'Ashanti',
          street: '45 Prempeh II Street',
          postal_code: 'AK-234-5678',
          country: 'Ghana',
        },
        primary: false,
      },
    ],
    emails: [
      {
        data: 'kwame.mensah@email.com',
        primary: true,
        type: 'primary',
      },
      {
        data: 'k.mensah@work.com',
        primary: false,
        type: 'work',
      },
    ],
    names: ['Kwame Mensah', 'Kwame A. Mensah'],
    phone_numbers: [
      {
        data: '+233501234567',
        primary: true,
        type: 'mobile',
      },
      {
        data: '+233244567890',
        primary: false,
        type: 'mobile',
      },
    ],
    ghana_card: {
      number: 'GHA-123456789-1',
      verified: true,
      issued_date: '2020-01-15',
      expiry_date: '2030-01-15',
    },
  };
}

export const identityRoutes = {
  // Get Identity
  'POST /identity/get': async (body: any) => {
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
    
    // Get accounts
    const accountsModule = await import('./accounts');
    const accountsResponse = await accountsModule.accountRoutes['POST /accounts/get']({
      client_id,
      secret,
      access_token,
    });
    
    const response: IdentityGetResponse = {
      accounts: accountsResponse.accounts,
      identity: getMockIdentity(),
      item: accountsResponse.item,
      request_id: generateId('req'),
    };
    
    return response;
  },
  
  // Identity Match (verification)
  'POST /identity/match': async (body: any) => {
    await simulateDelay();
    
    const { client_id, secret, access_token, user } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate access token
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    if (!user) {
      throw createError('INVALID_INPUT', 'INVALID_USER', 'User data is required for matching', 400);
    }
    
    const identity = getMockIdentity();
    
    // Perform matching
    const nameMatch = user.legal_name && identity.names.some(name => 
      name.toLowerCase().includes(user.legal_name.toLowerCase())
    );
    
    const phoneMatch = user.phone_number && identity.phone_numbers.some(phone =>
      phone.data === user.phone_number
    );
    
    const emailMatch = user.email_address && identity.emails.some(email =>
      email.data.toLowerCase() === user.email_address.toLowerCase()
    );
    
    return {
      name: {
        is_match: nameMatch || false,
        confidence_score: nameMatch ? 0.95 : 0.0,
      },
      phone_number: {
        is_match: phoneMatch || false,
        confidence_score: phoneMatch ? 1.0 : 0.0,
      },
      email_address: {
        is_match: emailMatch || false,
        confidence_score: emailMatch ? 1.0 : 0.0,
      },
      ghana_card: {
        is_match: user.ghana_card_number === identity.ghana_card?.number,
        verified: identity.ghana_card?.verified || false,
      },
      request_id: generateId('req'),
    };
  },
};
