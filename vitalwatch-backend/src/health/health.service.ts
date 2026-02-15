import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency?: number;
  message?: string;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  uptime: number;
  timestamp: string;
  services?: Record<string, ServiceHealth>;
  memory?: { heapUsed: number; heapTotal: number; rss: number };
}

@Injectable()
export class HealthService {
  private readonly startTime = Date.now();

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async check(): Promise<HealthStatus> {
    return {
      status: 'healthy',
      version: this.configService.get('app.version') || '1.0.0',
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString(),
    };
  }

  async checkReadiness(): Promise<HealthStatus> {
    const dbHealth = await this.checkDatabase();
    return {
      status: dbHealth.status === 'healthy' ? 'healthy' : 'unhealthy',
      version: this.configService.get('app.version') || '1.0.0',
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString(),
      services: { database: dbHealth },
    };
  }

  async checkDetailed(): Promise<HealthStatus> {
    const dbHealth = await this.checkDatabase();
    const mem = process.memoryUsage();
    return {
      status: dbHealth.status,
      version: this.configService.get('app.version') || '1.0.0',
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString(),
      services: { database: dbHealth },
      memory: { heapUsed: mem.heapUsed, heapTotal: mem.heapTotal, rss: mem.rss },
    };
  }

  private async checkDatabase(): Promise<ServiceHealth> {
    const start = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy', latency: Date.now() - start };
    } catch (error) {
      return { status: 'unhealthy', message: error.message };
    }
  }
}
