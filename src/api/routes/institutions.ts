// Institution Routes - Get financial institution information

import { Institution } from '../../types/api';
import { GHANA_INSTITUTIONS } from '../../data/institutions';
import { generateId, validateCredentials, simulateDelay, createError } from '../index';

export const institutionRoutes = {
  // Get All Institutions
  'POST /institutions/get': async (body: any) => {
    await simulateDelay(100, 300);
    
    const { client_id, secret, country_codes, options } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    let institutions = [...GHANA_INSTITUTIONS];
    
    // Filter by country codes
    if (country_codes && country_codes.length > 0) {
      institutions = institutions.filter(inst =>
        inst.country_codes.some(code => country_codes.includes(code))
      );
    }
    
    // Filter by products
    if (options?.products && options.products.length > 0) {
      institutions = institutions.filter(inst =>
        options.products.some((product: string) => inst.products.includes(product as any))
      );
    }
    
    // Apply pagination
    const count = options?.count || 50;
    const offset = options?.offset || 0;
    
    return {
      institutions: institutions.slice(offset, offset + count),
      total: institutions.length,
      request_id: generateId('req'),
    };
  },
  
  // Get Institution by ID
  'POST /institutions/get_by_id': async (body: any) => {
    await simulateDelay(100, 200);
    
    const { client_id, secret, institution_id, country_codes } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!institution_id) {
      throw createError('INVALID_INPUT', 'INVALID_INSTITUTION_ID', 'Institution ID is required', 400);
    }
    
    const institution = GHANA_INSTITUTIONS.find(inst => inst.institution_id === institution_id);
    
    if (!institution) {
      throw createError('INVALID_INPUT', 'INSTITUTION_NOT_FOUND', 'Institution not found', 404);
    }
    
    return {
      institution,
      request_id: generateId('req'),
    };
  },
  
  // Search Institutions
  'POST /institutions/search': async (body: any) => {
    await simulateDelay(100, 300);
    
    const { client_id, secret, query, country_codes, products } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    if (!query) {
      throw createError('INVALID_INPUT', 'INVALID_QUERY', 'Search query is required', 400);
    }
    
    const lowerQuery = query.toLowerCase();
    let institutions = GHANA_INSTITUTIONS.filter(inst =>
      inst.name.toLowerCase().includes(lowerQuery) ||
      inst.type.toLowerCase().includes(lowerQuery)
    );
    
    // Filter by country
    if (country_codes && country_codes.length > 0) {
      institutions = institutions.filter(inst =>
        inst.country_codes.some(code => country_codes.includes(code))
      );
    }
    
    // Filter by products
    if (products && products.length > 0) {
      institutions = institutions.filter(inst =>
        products.some((product: string) => inst.products.includes(product as any))
      );
    }
    
    return {
      institutions,
      request_id: generateId('req'),
    };
  },
};
