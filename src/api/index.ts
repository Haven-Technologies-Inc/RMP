// ReshADX - Africa Open Data Exchange API - Main Entry Point
// This file simulates a backend API server for demonstration purposes

import { verificationRoutes } from './routes/verification';

// API Configuration
export const API_CONFIG = {
  version: 'v1',
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.reshadx.com/v1'
    : 'http://localhost:3000/api/v1',
  sandboxUrl: 'https://sandbox.reshadx.com/v1',
  timeout: 30000, // 30 seconds
  rateLimits: {
    sandbox: {
      requestsPerMinute: 100,
      requestsPerHour: 1000,
      requestsPerDay: 10000,
    },
    development: {
      requestsPerMinute: 500,
      requestsPerHour: 10000,
      requestsPerDay: 100000,
    },
    production: {
      requestsPerMinute: 1000,
      requestsPerHour: 50000,
      requestsPerDay: 1000000,
    },
  },
};

// Route registry
const routes = {
  // Verification
  ...verificationRoutes,
};

// Mock API request handler
export async function handleApiRequest(
  endpoint: string,
  method: string,
  body: any,
  headers: Record<string, string> = {}
): Promise<any> {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Add request ID to all responses
  headers['x-request-id'] = requestId;
  
  // Find matching route
  const routeKey = `${method} ${endpoint}`;
  const handler = routes[routeKey];
  
  if (!handler) {
    throw createError(
      'INVALID_REQUEST',
      'INVALID_ENDPOINT',
      `Endpoint ${method} ${endpoint} not found`,
      404,
      requestId
    );
  }
  
  try {
    // Validate request body
    if (method === 'POST' && !body) {
      throw createError(
        'INVALID_REQUEST',
        'MISSING_BODY',
        'Request body is required',
        400,
        requestId
      );
    }
    
    // Execute handler
    const response = await handler(body, headers);
    
    // Add request ID to response
    return {
      ...response,
      request_id: requestId,
    };
  } catch (error: any) {
    // Handle errors
    if (error.error_type) {
      throw error;
    }
    
    throw createError(
      'API_ERROR',
      'INTERNAL_ERROR',
      error.message || 'An unexpected error occurred',
      500,
      requestId
    );
  }
}

// Error creator helper
export function createError(
  errorType: string,
  errorCode: string,
  message: string,
  status: number = 400,
  requestId?: string
): ApiError {
  return {
    error_type: errorType as any,
    error_code: errorCode,
    error_message: message,
    display_message: getDisplayMessage(errorCode),
    request_id: requestId || `req_${Date.now()}`,
    causes: [],
    status,
    documentation_url: `https://docs.reshadx.com/errors/${errorCode.toLowerCase()}`,
    suggested_action: getSuggestedAction(errorCode),
  };
}

// Get user-friendly error messages
function getDisplayMessage(errorCode: string): string {
  const messages: Record<string, string> = {
    INVALID_ACCESS_TOKEN: 'Unable to verify your credentials. Please reconnect your account.',
    INVALID_REQUEST: 'There was an issue with your request. Please check your parameters.',
    RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again in a few moments.',
    ITEM_LOGIN_REQUIRED: 'Please log in to your financial institution to continue.',
    INSTITUTION_DOWN: 'This institution is temporarily unavailable. Please try again later.',
    INSUFFICIENT_CREDENTIALS: 'Additional verification is required.',
  };
  
  return messages[errorCode] || 'An error occurred. Please try again.';
}

// Get suggested actions for errors
function getSuggestedAction(errorCode: string): string | null {
  const actions: Record<string, string> = {
    INVALID_ACCESS_TOKEN: 'Re-initialize Link to reconnect the account',
    RATE_LIMIT_EXCEEDED: 'Wait before making additional requests',
    ITEM_LOGIN_REQUIRED: 'Update credentials via Link update mode',
    INSTITUTION_DOWN: 'Retry the request later or use cached data',
  };
  
  return actions[errorCode] || null;
}

// Validate client credentials
export function validateCredentials(clientId: string, secret: string): boolean {
  // In production, this would validate against a database
  // For demo, we accept any non-empty credentials
  return !!(clientId && secret);
}

// Validate access token
export function validateAccessToken(accessToken: string): boolean {
  // In production, this would validate against a database
  // For demo, we accept tokens that start with 'access-'
  return accessToken?.startsWith('access-');
}

// Generate unique ID
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Simulate network delay
export async function simulateDelay(minMs: number = 200, maxMs: number = 800): Promise<void> {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
}

// Export route registry for documentation
export { routes };