// Income Routes - Income verification and analysis

import { Income } from '../../types/api';
import { generateId, validateCredentials, validateAccessToken, simulateDelay, createError } from '../index';

function getMockIncome(): Income {
  return {
    income_streams: [
      {
        account_id: 'acc_checking_001',
        stream_id: 'stream_salary_001',
        name: 'Monthly Salary',
        confidence: 'HIGH',
        days: 365,
        monthly_flow: 5500.00,
        transaction_ids: ['txn_salary_001', 'txn_salary_002', 'txn_salary_003'],
        start_date: '2023-01-01',
        end_date: '2024-11-13',
        category: ['Income', 'Salary'],
      },
      {
        account_id: 'acc_mobile_money_001',
        stream_id: 'stream_business_001',
        name: 'Business Income',
        confidence: 'MEDIUM',
        days: 180,
        monthly_flow: 1200.00,
        transaction_ids: ['txn_biz_001', 'txn_biz_002'],
        start_date: '2024-05-01',
        end_date: '2024-11-13',
        category: ['Income', 'Business'],
      },
    ],
    last_year_income: 66000.00,
    projected_yearly_income: 80400.00,
    number_of_income_streams: 2,
  };
}

export const incomeRoutes = {
  // Get Income
  'POST /income/get': async (body: any) => {
    await simulateDelay(500, 1200); // Income analysis takes longer
    
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
      ...getMockIncome(),
      request_id: generateId('req'),
    };
  },
  
  // Verify Income
  'POST /income/verification/create': async (body: any) => {
    await simulateDelay(800, 1500);
    
    const { client_id, secret, access_token, user } = body;
    
    // Validate credentials
    if (!validateCredentials(client_id, secret)) {
      throw createError('INVALID_REQUEST', 'INVALID_CREDENTIALS', 'Invalid client credentials', 401);
    }
    
    // Validate access token
    if (!validateAccessToken(access_token)) {
      throw createError('INVALID_REQUEST', 'INVALID_ACCESS_TOKEN', 'Invalid access token', 401);
    }
    
    const income = getMockIncome();
    
    return {
      income_verification_id: generateId('income_verification'),
      user_id: user?.client_user_id || 'user_123',
      income_summary: {
        total_annual_income: income.projected_yearly_income,
        monthly_average: income.projected_yearly_income / 12,
        income_stability: 'STABLE',
        income_variance: 0.08,
      },
      income_sources: income.income_streams.map(stream => ({
        source: stream.name,
        monthly_amount: stream.monthly_flow,
        frequency: 'MONTHLY',
        confidence: stream.confidence,
      })),
      verification_status: 'VERIFIED',
      verified_at: new Date().toISOString(),
      request_id: generateId('req'),
    };
  },
  
  // Precheck Income
  'POST /income/verification/precheck': async (body: any) => {
    await simulateDelay(300, 600);
    
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
      precheck_id: generateId('precheck'),
      confidence: 'HIGH',
      estimated_monthly_income: 5500.00,
      estimated_annual_income: 66000.00,
      has_sufficient_history: true,
      income_sources_detected: 2,
      request_id: generateId('req'),
    };
  },
};
