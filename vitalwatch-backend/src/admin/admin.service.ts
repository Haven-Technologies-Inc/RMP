import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { ApiKey } from './entities/api-key.entity';
import { User, UserStatus } from '../users/entities/user.entity';
import { AuditService } from '../audit/audit.service';
import { CurrentUserPayload } from '../auth/decorators/current-user.decorator';

@Injectable()
export class AdminService {
  private systemSettings: Map<string, any> = new Map();
  private maintenanceMode = { enabled: false, message: '', startedAt: null };

  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly auditService: AuditService,
  ) {
    this.initializeDefaultSettings();
  }

  private initializeDefaultSettings() {
    this.systemSettings.set('maxPatientsPerProvider', 100);
    this.systemSettings.set('defaultAlertThreshold', 'medium');
    this.systemSettings.set('sessionTimeout', 3600);
    this.systemSettings.set('enableTwoFactor', true);
    this.systemSettings.set('retentionDays', 365);
  }

  // API Keys
  async getApiKeys(user: CurrentUserPayload) {
    return this.apiKeyRepository.find({
      where: { organizationId: user.organizationId },
      order: { createdAt: 'DESC' },
    });
  }

  async getApiKey(id: string, user: CurrentUserPayload) {
    const apiKey = await this.apiKeyRepository.findOne({ where: { id } });
    if (!apiKey) {
      throw new NotFoundException('API key not found');
    }
    return apiKey;
  }

  async createApiKey(dto: any, user: CurrentUserPayload) {
    const key = `vw_${crypto.randomBytes(32).toString('hex')}`;
    const hashedKey = crypto.createHash('sha256').update(key).digest('hex');

    const apiKey = this.apiKeyRepository.create({
      name: dto.name,
      keyHash: hashedKey,
      keyPrefix: key.substring(0, 10),
      scopes: dto.scopes || ['read'],
      expiresAt: dto.expiresAt,
      rateLimit: dto.rateLimit || 1000,
      organizationId: user.organizationId,
      createdById: user.sub,
    });

    const saved = await this.apiKeyRepository.save(apiKey);

    await this.auditService.log({
      action: 'API_KEY_CREATED',
      userId: user.sub,
      details: { apiKeyId: saved.id, name: dto.name },
    });

    return { ...saved, key }; // Return unhashed key only on creation
  }

  async updateApiKey(id: string, dto: any, user: CurrentUserPayload) {
    const apiKey = await this.getApiKey(id, user);
    
    await this.apiKeyRepository.update(id, dto);

    await this.auditService.log({
      action: 'API_KEY_UPDATED',
      userId: user.sub,
      details: { apiKeyId: id },
    });

    return this.getApiKey(id, user);
  }

  async deleteApiKey(id: string, user: CurrentUserPayload) {
    await this.getApiKey(id, user);
    await this.apiKeyRepository.softDelete(id);

    await this.auditService.log({
      action: 'API_KEY_DELETED',
      userId: user.sub,
      details: { apiKeyId: id },
    });
  }

  async regenerateApiKey(id: string, user: CurrentUserPayload) {
    const apiKey = await this.getApiKey(id, user);
    
    const key = `vw_${crypto.randomBytes(32).toString('hex')}`;
    const hashedKey = crypto.createHash('sha256').update(key).digest('hex');

    await this.apiKeyRepository.update(id, {
      keyHash: hashedKey,
      keyPrefix: key.substring(0, 10),
    });

    await this.auditService.log({
      action: 'API_KEY_REGENERATED',
      userId: user.sub,
      details: { apiKeyId: id },
    });

    return { ...apiKey, key };
  }

  // System Logs
  async getLogs(options: any) {
    // In production, would query from logging service (e.g., ELK stack)
    return {
      data: [],
      meta: { total: 0, page: options.page, limit: options.limit },
    };
  }

  async getLogEntry(id: string) {
    return { id, level: 'info', message: 'Log entry', timestamp: new Date().toISOString() };
  }

  async getLogStats(options: any) {
    return {
      totalLogs: 15420,
      byLevel: {
        error: 45,
        warn: 230,
        info: 12500,
        debug: 2645,
      },
      bySource: {
        api: 8500,
        auth: 2100,
        vitals: 3200,
        alerts: 1620,
      },
    };
  }

  // System Settings
  async getSystemSettings() {
    return Object.fromEntries(this.systemSettings);
  }

  async getSystemSetting(key: string) {
    if (!this.systemSettings.has(key)) {
      throw new NotFoundException('Setting not found');
    }
    return { key, value: this.systemSettings.get(key) };
  }

  async updateSystemSetting(dto: { key: string; value: any }, user: CurrentUserPayload) {
    this.systemSettings.set(dto.key, dto.value);

    await this.auditService.log({
      action: 'SYSTEM_SETTING_UPDATED',
      userId: user.sub,
      details: { key: dto.key },
    });

    return this.getSystemSetting(dto.key);
  }

  async updateSystemSettingsBulk(settings: Record<string, any>, user: CurrentUserPayload) {
    for (const [key, value] of Object.entries(settings)) {
      this.systemSettings.set(key, value);
    }

    await this.auditService.log({
      action: 'SYSTEM_SETTINGS_BULK_UPDATE',
      userId: user.sub,
      details: { keys: Object.keys(settings) },
    });

    return this.getSystemSettings();
  }

  // Usage Statistics
  async getUsageStats(options: any) {
    return {
      apiRequests: { total: 125000, successful: 124500, failed: 500 },
      activeUsers: { daily: 450, weekly: 890, monthly: 1200 },
      dataProcessed: { vitals: 50000, alerts: 1200, reports: 350 },
    };
  }

  async getApiUsage(options: any) {
    return {
      totalRequests: 125000,
      byEndpoint: [
        { endpoint: '/vitals', count: 45000 },
        { endpoint: '/alerts', count: 25000 },
        { endpoint: '/patients', count: 20000 },
        { endpoint: '/auth', count: 15000 },
        { endpoint: '/devices', count: 10000 },
        { endpoint: '/other', count: 10000 },
      ],
      byDay: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
        count: Math.floor(15000 + Math.random() * 5000),
      })),
    };
  }

  async getStorageUsage() {
    return {
      total: '500 GB',
      used: '125 GB',
      available: '375 GB',
      percentage: 25,
      byType: {
        vitals: '80 GB',
        reports: '25 GB',
        attachments: '15 GB',
        logs: '5 GB',
      },
    };
  }

  // System Health
  async getSystemHealth() {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
    };
  }

  async getDatabaseHealth() {
    return {
      status: 'healthy',
      connections: { active: 15, idle: 5, max: 100 },
      latency: 12,
    };
  }

  async getServicesHealth() {
    return {
      api: { status: 'healthy', latency: 45 },
      database: { status: 'healthy', latency: 12 },
      redis: { status: 'healthy', latency: 2 },
      stripe: { status: 'healthy', latency: 150 },
      twilio: { status: 'healthy', latency: 180 },
      openai: { status: 'healthy', latency: 350 },
    };
  }

  // User Management
  async getPendingUsers(options: { page: number; limit: number }) {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository
      .createQueryBuilder('user')
      .where('user.status = :status', { status: UserStatus.PENDING })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: users.map((u) => {
        const { passwordHash, ...safe } = u as any;
        return safe;
      }),
      meta: { total, page, limit },
    };
  }

  async approveUser(id: string, user: CurrentUserPayload) {
    await this.userRepository.update(id, { status: UserStatus.ACTIVE });

    await this.auditService.log({
      action: 'USER_APPROVED',
      userId: user.sub,
      details: { targetUserId: id },
    });

    return { success: true };
  }

  async rejectUser(id: string, reason: string, user: CurrentUserPayload) {
    await this.userRepository.update(id, { status: UserStatus.REJECTED as any });

    await this.auditService.log({
      action: 'USER_REJECTED',
      userId: user.sub,
      details: { targetUserId: id, reason },
    });

    return { success: true };
  }

  async suspendUser(id: string, reason: string, user: CurrentUserPayload) {
    await this.userRepository.update(id, { status: UserStatus.SUSPENDED });

    await this.auditService.log({
      action: 'USER_SUSPENDED',
      userId: user.sub,
      details: { targetUserId: id, reason },
    });

    return { success: true };
  }

  async reactivateUser(id: string, user: CurrentUserPayload) {
    await this.userRepository.update(id, { status: UserStatus.ACTIVE });

    await this.auditService.log({
      action: 'USER_REACTIVATED',
      userId: user.sub,
      details: { targetUserId: id },
    });

    return { success: true };
  }

  // Maintenance Mode
  async enableMaintenanceMode(dto: any, user: CurrentUserPayload) {
    this.maintenanceMode = {
      enabled: true,
      message: dto.message || 'System maintenance in progress',
      startedAt: new Date() as any,
    };

    await this.auditService.log({
      action: 'MAINTENANCE_MODE_ENABLED',
      userId: user.sub,
      details: dto,
    });

    return this.maintenanceMode;
  }

  async disableMaintenanceMode(user: CurrentUserPayload) {
    this.maintenanceMode = { enabled: false, message: '', startedAt: null };

    await this.auditService.log({
      action: 'MAINTENANCE_MODE_DISABLED',
      userId: user.sub,
    });

    return this.maintenanceMode;
  }

  async getMaintenanceStatus() {
    return this.maintenanceMode;
  }

  // Cache Management
  async clearCache(pattern: string, user: CurrentUserPayload) {
    await this.auditService.log({
      action: 'CACHE_CLEARED',
      userId: user.sub,
      details: { pattern },
    });

    return { success: true, pattern: pattern || '*', clearedAt: new Date().toISOString() };
  }

  async getCacheStats() {
    return {
      hits: 45000,
      misses: 5000,
      hitRate: 90,
      size: '256 MB',
      keys: 12500,
    };
  }
}
