import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator';
import { AnalyticsService } from './analytics.service';
import { UserRole } from '../users/entities/user.entity';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @Roles(UserRole.ADMIN, UserRole.PROVIDER)
  async getDashboard(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @CurrentUser() user?: CurrentUserPayload,
  ) {
    return this.analyticsService.getDashboardAnalytics({
      startDate,
      endDate,
      organizationId: user?.organizationId,
      role: user?.role as any,
    });
  }

  @Get('population-health')
  @Roles(UserRole.ADMIN, UserRole.PROVIDER)
  async getPopulationHealth(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @CurrentUser() user?: CurrentUserPayload,
  ) {
    return this.analyticsService.getPopulationHealth({
      startDate,
      endDate,
      organizationId: user?.organizationId,
    });
  }

  @Get('adherence')
  @Roles(UserRole.ADMIN, UserRole.PROVIDER)
  async getAdherenceAnalytics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @CurrentUser() user?: CurrentUserPayload,
  ) {
    return this.analyticsService.getAdherenceAnalytics({
      startDate,
      endDate,
      organizationId: user?.organizationId,
    });
  }

  @Get('outcomes')
  @Roles(UserRole.ADMIN, UserRole.PROVIDER)
  async getOutcomes(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @CurrentUser() user?: CurrentUserPayload,
  ) {
    return this.analyticsService.getOutcomesAnalytics({
      startDate,
      endDate,
      organizationId: user?.organizationId,
    });
  }

  @Get('revenue')
  @Roles(UserRole.ADMIN)
  async getRevenue(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getRevenueAnalytics({ startDate, endDate });
  }

  @Get('system')
  @Roles(UserRole.ADMIN)
  async getSystemAnalytics() {
    return this.analyticsService.getSystemAnalytics();
  }

  @Get('export')
  @Roles(UserRole.ADMIN, UserRole.PROVIDER)
  async exportAnalytics(
    @Query('type') type: string,
    @Query('format') format: string = 'csv',
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @CurrentUser() user?: CurrentUserPayload,
  ) {
    return this.analyticsService.exportAnalytics({
      type,
      format,
      startDate,
      endDate,
      organizationId: user?.organizationId,
    });
  }
}
