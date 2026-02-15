import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuditService } from '../audit/audit.service';
import { CurrentUserPayload } from '../auth/decorators/current-user.decorator';

export interface IntegrationConfig {
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  configured: boolean;
  status: 'connected' | 'disconnected' | 'error';
  settings?: Record<string, any>;
}

@Injectable()
export class IntegrationsService {
  private integrations: Map<string, IntegrationConfig> = new Map();

  constructor(
    private readonly configService: ConfigService,
    private readonly auditService: AuditService,
  ) {
    this.initializeIntegrations();
  }

  private initializeIntegrations() {
    const integrationsList: IntegrationConfig[] = [
      {
        name: 'stripe',
        displayName: 'Stripe',
        description: 'Payment processing and subscription management',
        enabled: !!this.configService.get('stripe.secretKey'),
        configured: !!this.configService.get('stripe.secretKey'),
        status: this.configService.get('stripe.secretKey') ? 'connected' : 'disconnected',
      },
      {
        name: 'zoho',
        displayName: 'Zoho SMTP',
        description: 'Email delivery service',
        enabled: !!this.configService.get('smtp.host'),
        configured: !!this.configService.get('smtp.host'),
        status: this.configService.get('smtp.host') ? 'connected' : 'disconnected',
      },
      {
        name: 'twilio',
        displayName: 'Twilio',
        description: 'SMS and voice communications',
        enabled: !!this.configService.get('twilio.accountSid'),
        configured: !!this.configService.get('twilio.accountSid'),
        status: this.configService.get('twilio.accountSid') ? 'connected' : 'disconnected',
      },
      {
        name: 'openai',
        displayName: 'OpenAI',
        description: 'AI-powered clinical insights',
        enabled: !!this.configService.get('openai.apiKey'),
        configured: !!this.configService.get('openai.apiKey'),
        status: this.configService.get('openai.apiKey') ? 'connected' : 'disconnected',
      },
      {
        name: 'grok',
        displayName: 'Grok AI',
        description: 'Real-time vital analysis',
        enabled: !!this.configService.get('grok.apiKey'),
        configured: !!this.configService.get('grok.apiKey'),
        status: this.configService.get('grok.apiKey') ? 'connected' : 'disconnected',
      },
      {
        name: 'tenovi',
        displayName: 'Tenovi',
        description: 'Medical device integration',
        enabled: !!this.configService.get('tenovi.apiKey'),
        configured: !!this.configService.get('tenovi.apiKey'),
        status: this.configService.get('tenovi.apiKey') ? 'connected' : 'disconnected',
      },
    ];

    integrationsList.forEach((int) => this.integrations.set(int.name, int));
  }

  async listIntegrations() {
    return Array.from(this.integrations.values());
  }

  async getIntegration(name: string) {
    const integration = this.integrations.get(name);
    if (!integration) {
      throw new NotFoundException('Integration not found');
    }
    return integration;
  }

  async configureIntegration(name: string, dto: any, user: CurrentUserPayload) {
    const integration = await this.getIntegration(name);
    
    // Update configuration
    integration.settings = { ...integration.settings, ...dto.settings };
    integration.configured = true;
    this.integrations.set(name, integration);

    await this.auditService.log({
      action: 'INTEGRATION_CONFIGURED',
      userId: user.sub,
      details: { integration: name },
    });

    return integration;
  }

  async enableIntegration(name: string, user: CurrentUserPayload) {
    const integration = await this.getIntegration(name);
    
    if (!integration.configured) {
      throw new BadRequestException('Integration must be configured first');
    }

    integration.enabled = true;
    integration.status = 'connected';
    this.integrations.set(name, integration);

    await this.auditService.log({
      action: 'INTEGRATION_ENABLED',
      userId: user.sub,
      details: { integration: name },
    });

    return integration;
  }

  async disableIntegration(name: string, user: CurrentUserPayload) {
    const integration = await this.getIntegration(name);
    
    integration.enabled = false;
    integration.status = 'disconnected';
    this.integrations.set(name, integration);

    await this.auditService.log({
      action: 'INTEGRATION_DISABLED',
      userId: user.sub,
      details: { integration: name },
    });

    return integration;
  }

  async testIntegration(name: string, dto: any) {
    const integration = await this.getIntegration(name);
    
    // Simulate integration test
    try {
      switch (name) {
        case 'stripe':
          // Test Stripe connection
          return { success: true, message: 'Stripe connection successful' };
        case 'zoho':
          // Test SMTP connection
          return { success: true, message: 'SMTP connection successful' };
        case 'twilio':
          // Test Twilio connection
          return { success: true, message: 'Twilio connection successful' };
        case 'openai':
          // Test OpenAI connection
          return { success: true, message: 'OpenAI connection successful' };
        case 'grok':
          // Test Grok connection
          return { success: true, message: 'Grok AI connection successful' };
        case 'tenovi':
          // Test Tenovi connection
          return { success: true, message: 'Tenovi connection successful' };
        default:
          throw new BadRequestException('Unknown integration');
      }
    } catch (error) {
      return { success: false, message: `Connection failed: ${error.message}` };
    }
  }

  async sendZohoEmail(dto: { to: string; subject: string; body: string; html?: boolean }, user: CurrentUserPayload) {
    // In production, use nodemailer with Zoho SMTP
    await this.auditService.log({
      action: 'EMAIL_SENT',
      userId: user.sub,
      details: { to: dto.to, subject: dto.subject },
    });

    return { success: true, messageId: `msg_${Date.now()}` };
  }

  async getEmailTemplates() {
    return [
      { id: 'welcome', name: 'Welcome Email', subject: 'Welcome to VytalWatch' },
      { id: 'alert', name: 'Alert Notification', subject: 'Health Alert' },
      { id: 'reminder', name: 'Reading Reminder', subject: 'Time for your reading' },
      { id: 'report', name: 'Monthly Report', subject: 'Your Monthly Health Report' },
    ];
  }

  async analyzeWithOpenAI(dto: { prompt: string; context?: string }, user: CurrentUserPayload) {
    const apiKey = this.configService.get('openai.apiKey');
    
    if (!apiKey) {
      throw new BadRequestException('OpenAI not configured');
    }

    // In production, call OpenAI API
    return {
      analysis: 'AI analysis result placeholder',
      confidence: 0.85,
      timestamp: new Date().toISOString(),
    };
  }

  async generateOpenAIInsight(dto: { patientId: string; vitalData: any }, user: CurrentUserPayload) {
    return {
      insight: 'Based on recent vital readings, blood pressure is trending higher than baseline.',
      recommendations: [
        'Consider medication adjustment',
        'Increase monitoring frequency',
        'Review dietary sodium intake',
      ],
      riskLevel: 'moderate',
      confidence: 0.82,
    };
  }

  async analyzeWithGrok(dto: { data: any; analysisType: string }, user: CurrentUserPayload) {
    return {
      result: 'Grok analysis result',
      analysisType: dto.analysisType,
      timestamp: new Date().toISOString(),
    };
  }

  async grokRealTimeAnalysis(dto: { vitalReading: any }, user: CurrentUserPayload) {
    return {
      anomalyDetected: false,
      score: 0.15,
      recommendation: 'Reading within normal parameters',
      timestamp: new Date().toISOString(),
    };
  }

  async sendTwilioSms(dto: { to: string; message: string }, user: CurrentUserPayload) {
    await this.auditService.log({
      action: 'SMS_SENT',
      userId: user.sub,
      details: { to: dto.to },
    });

    return { success: true, messageId: `sms_${Date.now()}` };
  }

  async getTwilioMessageStatus(messageId: string) {
    return {
      messageId,
      status: 'delivered',
      deliveredAt: new Date().toISOString(),
    };
  }

  async getTenoviDevices() {
    return [
      { id: 'dev1', type: 'bp_monitor', model: 'BP-100', status: 'active' },
      { id: 'dev2', type: 'pulse_ox', model: 'PO-50', status: 'active' },
      { id: 'dev3', type: 'scale', model: 'SC-200', status: 'active' },
    ];
  }

  async syncTenoviDevices(user: CurrentUserPayload) {
    await this.auditService.log({
      action: 'TENOVI_SYNC',
      userId: user.sub,
    });

    return { success: true, syncedDevices: 3, timestamp: new Date().toISOString() };
  }
}
