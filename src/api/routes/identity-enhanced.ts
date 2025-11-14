// Enhanced Identity Product Routes - Complete Ghana Card Integration

import { generateId, validateCredentials, validateAccessToken, simulateDelay, createError } from '../index';

// Comprehensive mock identity data
function getEnhancedIdentityData() {
  return {
    names: ['Kwame Asante Mensah', 'K. A. Mensah', 'Kwame Mensah'],
    emails: [
      {
        data: 'kwame.mensah@gmail.com',
        primary: true,
        type: 'primary',
        verified: true,
      },
      {
        data: 'k.mensah@company.com',
        primary: false,
        type: 'work',
        verified: true,
      },
      {
        data: 'kwame_m@yahoo.com',
        primary: false,
        type: 'secondary',
        verified: false,
      },
    ],
    phone_numbers: [
      {
        data: '+233501234567',
        primary: true,
        type: 'mobile',
        verified: true,
        carrier: 'MTN',
      },
      {
        data: '+233244567890',
        primary: false,
        type: 'mobile',
        verified: true,
        carrier: 'Vodafone',
      },
      {
        data: '+233302123456',
        primary: false,
        type: 'landline',
        verified: false,
        carrier: null,
      },
    ],
    addresses: [
      {
        data: {
          street: '123 Independence Avenue',
          city: 'Accra',
          region: 'Greater Accra',
          postal_code: 'GA-123-4567',
          country: 'Ghana',
          country_code: 'GH',
        },
        primary: true,
        type: 'residential',
      },
      {
        data: {
          street: '45 Prempeh II Street',
          city: 'Kumasi',
          region: 'Ashanti',
          postal_code: 'AK-234-5678',
          country: 'Ghana',
          country_code: 'GH',
        },
        primary: false,
        type: 'previous',
      },
    ],
    ghana_card: {
      number: 'GHA-123456789-1',
      verified: true,
      verified_by_nia: true, // National Identification Authority
      issued_date: '2020-01-15',
      expiry_date: '2030-01-15',
      date_of_birth: '1990-05-20',
      place_of_birth: 'Accra',
      nationality: 'Ghanaian',
      gender: 'Male',
      marital_status: 'Single',
      occupation: 'Software Engineer',
      full_name: 'Kwame Asante Mensah',
      card_status: 'active',
      biometric_verified: true,
      photo_url: null, // Privacy - not returned by default
    },
    date_of_birth: '1990-05-20',
    age: 34,
    nationality: 'Ghanaian',
    tax_identification_number: 'TIN-GH-1234567890',
    social_security_number: 'SSN-GH-9876543210',
  };
}

export const identityEnhancedRoutes = {
  // Enhanced Identity Get - Complete identity data
  'POST /identity/get': async (body: any) => {
    await simulateDelay(300, 700);
    
    const { client_id, secret, access_token, options } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    const identity = getEnhancedIdentityData();
    
    // Respect privacy options
    if (options?.exclude_ghana_card_photo !== false) {
      if (identity.ghana_card) {
        identity.ghana_card.photo_url = null;
      }
    }
    
    // Get accounts
    const accountsModule = await import('./accounts');
    const accountsResponse = await accountsModule.accountRoutes['POST /accounts/get']({
      client_id,
      secret,
      access_token,
    });
    
    return {
      accounts: accountsResponse.accounts,
      identity,
      item: accountsResponse.item,
      verification_summary: {
        ghana_card_verified: identity.ghana_card?.verified || false,
        nia_verified: identity.ghana_card?.verified_by_nia || false,
        email_verified_count: identity.emails.filter(e => e.verified).length,
        phone_verified_count: identity.phone_numbers.filter(p => p.verified).length,
        address_count: identity.addresses.length,
        overall_confidence: 'high',
      },
      request_id: generateId('req'),
    };
  },

  // Ghana Card Verification (Enhanced)
  'POST /identity/ghana_card/verify': async (body: any) => {
    await simulateDelay(800, 1500);
    
    const { client_id, secret, ghana_card_number, date_of_birth, full_name, verification_level } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!ghana_card_number) {
      throw createError('INVALID_INPUT', 'MISSING_GHANA_CARD', 'Ghana Card number is required', 400);
    }
    
    // Validate Ghana Card format (GHA-XXXXXXXXX-X)
    const ghanaCardRegex = /^GHA-\d{9}-\d$/;
    if (!ghanaCardRegex.test(ghana_card_number)) {
      throw createError('INVALID_INPUT', 'INVALID_GHANA_CARD_FORMAT', 'Invalid Ghana Card number format', 400);
    }
    
    const identity = getEnhancedIdentityData();
    
    // Perform verification
    const cardMatch = identity.ghana_card?.number === ghana_card_number;
    const dobMatch = !date_of_birth || identity.date_of_birth === date_of_birth;
    const nameMatch = !full_name || identity.ghana_card?.full_name.toLowerCase().includes(full_name.toLowerCase());
    
    const verificationPassed = cardMatch && dobMatch && nameMatch;
    
    return {
      verification_id: generateId('ghana_card_verify'),
      status: verificationPassed ? 'verified' : 'failed',
      ghana_card_number,
      ghana_card_valid: cardMatch,
      card_status: identity.ghana_card?.card_status,
      name_match: nameMatch,
      dob_match: dobMatch,
      nia_verified: verificationPassed && identity.ghana_card?.verified_by_nia,
      biometric_verified: verification_level === 'biometric' && verificationPassed,
      verified_data: verificationPassed ? {
        full_name: identity.ghana_card?.full_name,
        date_of_birth: identity.ghana_card?.date_of_birth,
        place_of_birth: identity.ghana_card?.place_of_birth,
        nationality: identity.ghana_card?.nationality,
        gender: identity.ghana_card?.gender,
        issued_date: identity.ghana_card?.issued_date,
        expiry_date: identity.ghana_card?.expiry_date,
      } : null,
      confidence_level: verificationPassed ? 'high' : 'low',
      risk_score: verificationPassed ? 5 : 85,
      verified_at: verificationPassed ? new Date().toISOString() : null,
      request_id: generateId('req'),
    };
  },

  // Identity Match - Advanced matching
  'POST /identity/match': async (body: any) => {
    await simulateDelay(400, 900);
    
    const { client_id, secret, access_token, user } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    if (!user) {
      throw createError('INVALID_INPUT', 'INVALID_USER', 'User data is required for matching', 400);
    }
    
    const identity = getEnhancedIdentityData();
    
    // Name matching with fuzzy logic
    let nameMatch = false;
    let nameConfidence = 0.0;
    if (user.legal_name) {
      const providedName = user.legal_name.toLowerCase().trim();
      nameMatch = identity.names.some(name => {
        const accountName = name.toLowerCase().trim();
        if (accountName === providedName) {
          nameConfidence = 1.0;
          return true;
        }
        if (accountName.includes(providedName) || providedName.includes(accountName)) {
          nameConfidence = 0.85;
          return true;
        }
        return false;
      });
    }
    
    // Phone matching
    let phoneMatch = false;
    let phoneConfidence = 0.0;
    if (user.phone_number) {
      phoneMatch = identity.phone_numbers.some(phone => {
        if (phone.data === user.phone_number) {
          phoneConfidence = phone.verified ? 1.0 : 0.7;
          return true;
        }
        return false;
      });
    }
    
    // Email matching
    let emailMatch = false;
    let emailConfidence = 0.0;
    if (user.email_address) {
      emailMatch = identity.emails.some(email => {
        if (email.data.toLowerCase() === user.email_address.toLowerCase()) {
          emailConfidence = email.verified ? 1.0 : 0.7;
          return true;
        }
        return false;
      });
    }
    
    // Address matching
    let addressMatch = false;
    let addressConfidence = 0.0;
    if (user.address) {
      addressMatch = identity.addresses.some(addr => {
        const matches = [];
        if (user.address.city && addr.data.city.toLowerCase() === user.address.city.toLowerCase()) {
          matches.push(true);
        }
        if (user.address.region && addr.data.region.toLowerCase() === user.address.region.toLowerCase()) {
          matches.push(true);
        }
        if (matches.length > 0) {
          addressConfidence = matches.length / 2;
          return true;
        }
        return false;
      });
    }
    
    // Ghana Card matching
    let ghanaCardMatch = false;
    let ghanaCardVerified = false;
    if (user.ghana_card_number) {
      ghanaCardMatch = identity.ghana_card?.number === user.ghana_card_number;
      ghanaCardVerified = ghanaCardMatch && identity.ghana_card?.verified;
    }
    
    // Date of birth matching
    let dobMatch = false;
    if (user.date_of_birth) {
      dobMatch = identity.date_of_birth === user.date_of_birth;
    }
    
    // Calculate overall match score
    const scores = [nameConfidence, phoneConfidence, emailConfidence, addressConfidence];
    const validScores = scores.filter(s => s > 0);
    const overallScore = validScores.length > 0 
      ? validScores.reduce((a, b) => a + b, 0) / validScores.length 
      : 0;
    
    return {
      name: {
        is_match: nameMatch,
        confidence_score: nameConfidence,
        matched_name: nameMatch ? identity.names[0] : null,
      },
      phone_number: {
        is_match: phoneMatch,
        confidence_score: phoneConfidence,
        verified: phoneMatch && identity.phone_numbers.find(p => p.data === user.phone_number)?.verified,
      },
      email_address: {
        is_match: emailMatch,
        confidence_score: emailConfidence,
        verified: emailMatch && identity.emails.find(e => e.data.toLowerCase() === user.email_address.toLowerCase())?.verified,
      },
      address: {
        is_match: addressMatch,
        confidence_score: addressConfidence,
      },
      ghana_card: {
        is_match: ghanaCardMatch,
        verified: ghanaCardVerified,
        nia_verified: ghanaCardMatch && identity.ghana_card?.verified_by_nia,
      },
      date_of_birth: {
        is_match: dobMatch,
      },
      overall_match: {
        score: overallScore,
        confidence: overallScore >= 0.8 ? 'high' : overallScore >= 0.5 ? 'medium' : 'low',
        recommendation: overallScore >= 0.8 ? 'approved' : overallScore >= 0.5 ? 'manual_review' : 'rejected',
      },
      request_id: generateId('req'),
    };
  },

  // Phone Verification
  'POST /identity/phone/send_verification': async (body: any) => {
    await simulateDelay(300, 600);
    
    const { client_id, secret, phone_number } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!phone_number) {
      throw createError('INVALID_INPUT', 'MISSING_PHONE', 'Phone number is required', 400);
    }
    
    // Validate Ghana phone number format
    const ghanaPhoneRegex = /^\+233[2-5]\d{8}$/;
    if (!ghanaPhoneRegex.test(phone_number)) {
      throw createError('INVALID_INPUT', 'INVALID_PHONE_FORMAT', 'Invalid Ghana phone number format', 400);
    }
    
    return {
      verification_id: generateId('phone_verify'),
      phone_number,
      verification_code_sent: true,
      delivery_method: 'sms',
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
      request_id: generateId('req'),
    };
  },

  // Email Verification
  'POST /identity/email/send_verification': async (body: any) => {
    await simulateDelay(300, 600);
    
    const { client_id, secret, email_address } = body;
    
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!email_address) {
      throw createError('INVALID_INPUT', 'MISSING_EMAIL', 'Email address is required', 400);
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_address)) {
      throw createError('INVALID_INPUT', 'INVALID_EMAIL_FORMAT', 'Invalid email address format', 400);
    }
    
    return {
      verification_id: generateId('email_verify'),
      email_address,
      verification_link_sent: true,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      request_id: generateId('req'),
    };
  },
};
