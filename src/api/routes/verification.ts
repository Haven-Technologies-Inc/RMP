// Verification Routes - Account and Identity Verification

import { generateId, validateCredentials, simulateDelay, createError } from '../index';

export const verificationRoutes = {
  // Verify Account
  'POST /verification/account': async (body: any) => {
    await simulateDelay(400, 800);
    
    const { client_id, secret, account_number, routing_number, account_holder_name, verification_method } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!account_number || !routing_number) {
      throw createError('INVALID_INPUT', 'MISSING_ACCOUNT_INFO', 'Account number and routing number are required', 400);
    }
    
    return {
      verification_id: generateId('verify_acc'),
      status: 'verified',
      account_exists: true,
      account_open: true,
      name_match: account_holder_name ? 'exact' : null,
      account_type: 'checking',
      verification_method: verification_method || 'instant',
      confidence_score: 98,
      verified_at: new Date().toISOString(),
      request_id: generateId('req'),
    };
  },
  
  // Verify Identity
  'POST /verification/identity': async (body: any) => {
    await simulateDelay(600, 1200);
    
    const { client_id, secret, ghana_card_number, full_name, date_of_birth, phone_number, verification_level } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!ghana_card_number || !full_name) {
      throw createError('INVALID_INPUT', 'MISSING_IDENTITY_INFO', 'Ghana Card number and full name are required', 400);
    }
    
    return {
      verification_id: generateId('verify_id'),
      status: 'verified',
      ghana_card_valid: true,
      name_match: true,
      dob_match: date_of_birth ? true : null,
      phone_match: phone_number ? true : null,
      biometric_match: verification_level === 'biometric' ? true : null,
      risk_score: 5,
      confidence_level: 'high',
      verified_at: new Date().toISOString(),
      nia_verified: true,
      request_id: generateId('req'),
    };
  },
  
  // Verify Phone Number
  'POST /verification/phone': async (body: any) => {
    await simulateDelay(300, 600);
    
    const { client_id, secret, phone_number } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!phone_number) {
      throw createError('INVALID_INPUT', 'MISSING_PHONE', 'Phone number is required', 400);
    }
    
    return {
      verification_id: generateId('verify_phone'),
      phone_number,
      is_valid: true,
      carrier: 'MTN',
      line_type: 'mobile',
      country_code: 'GH',
      verification_code_sent: true,
      request_id: generateId('req'),
    };
  },
  
  // Verify Phone Code
  'POST /verification/phone/confirm': async (body: any) => {
    await simulateDelay(200, 400);
    
    const { client_id, secret, verification_id, code } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!verification_id || !code) {
      throw createError('INVALID_INPUT', 'MISSING_VERIFICATION_DATA', 'Verification ID and code are required', 400);
    }
    
    // Simulate code verification (accept any 6-digit code)
    const isValid = /^\d{6}$/.test(code);
    
    return {
      verification_id,
      verified: isValid,
      verified_at: isValid ? new Date().toISOString() : null,
      request_id: generateId('req'),
    };
  },
};
