/**
 * VytalWatch Health Check Controller
 * Kubernetes/Container orchestration health endpoints
 */

import { Controller, Get } from '@nestjs/common';
import { HealthService, HealthStatus } from './health.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /**
   * Basic health check - for load balancers
   */
  @Public()
  @Get('health')
  async health(): Promise<HealthStatus> {
    return this.healthService.check();
  }

  /**
   * Readiness probe - is the app ready to serve traffic?
   */
  @Public()
  @Get('ready')
  async ready(): Promise<HealthStatus> {
    return this.healthService.checkReadiness();
  }

  /**
   * Liveness probe - is the app alive?
   */
  @Public()
  @Get('live')
  async live(): Promise<{ status: string; timestamp: string }> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Detailed health check - for monitoring dashboards
   */
  @Public()
  @Get('health/detailed')
  async detailedHealth(): Promise<HealthStatus> {
    return this.healthService.checkDetailed();
  }
}
