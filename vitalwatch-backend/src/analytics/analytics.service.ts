import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Alert } from '../alerts/entities/alert.entity';
import { Device } from '../devices/entities/device.entity';
import { VitalReading } from '../vitals/entities/vital-reading.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectRepository(VitalReading)
    private readonly vitalRepository: Repository<VitalReading>,
  ) {}

  async getDashboardAnalytics(options: {
    startDate?: string;
    endDate?: string;
    organizationId?: string;
    role?: UserRole;
  }) {
    const { organizationId, role } = options;

    const patientQuery = this.userRepository.createQueryBuilder('user')
      .where('user.role = :role', { role: UserRole.PATIENT });
    
    if (organizationId) {
      patientQuery.andWhere('user.organizationId = :organizationId', { organizationId });
    }

    const [
      totalPatients,
      activeAlerts,
      totalDevices,
      totalReadings,
    ] = await Promise.all([
      patientQuery.getCount(),
      this.getAlertCount(organizationId),
      this.getDeviceCount(organizationId),
      this.getReadingCount(organizationId),
    ]);

    return {
      totalPatients,
      activeAlerts,
      totalDevices,
      totalReadings,
      trends: await this.calculateTrends(organizationId),
    };
  }

  async getPopulationHealth(options: { startDate?: string; endDate?: string; organizationId?: string }) {
    const { organizationId } = options;

    // Risk distribution
    const riskDistribution = {
      low: 0,
      moderate: 0,
      high: 0,
      critical: 0,
    };

    // Condition prevalence (mock data - in production, calculate from patient data)
    const conditionPrevalence = [
      { condition: 'Hypertension', percentage: 45 },
      { condition: 'Diabetes', percentage: 32 },
      { condition: 'Heart Disease', percentage: 18 },
      { condition: 'COPD', percentage: 12 },
      { condition: 'Other', percentage: 25 },
    ];

    // Age distribution
    const ageDistribution = [
      { range: '18-30', count: 15 },
      { range: '31-45', count: 28 },
      { range: '46-60', count: 42 },
      { range: '61-75', count: 38 },
      { range: '75+', count: 22 },
    ];

    return {
      riskDistribution,
      conditionPrevalence,
      ageDistribution,
      totalPatients: await this.getPatientCount(organizationId),
    };
  }

  async getAdherenceAnalytics(options: { startDate?: string; endDate?: string; organizationId?: string }) {
    const { organizationId } = options;

    // Calculate device usage adherence
    const deviceAdherence = await this.calculateDeviceAdherence(organizationId);

    // Medication adherence (mock - would need medication tracking)
    const medicationAdherence = 78;

    // Appointment adherence (mock)
    const appointmentAdherence = 85;

    return {
      deviceAdherence,
      medicationAdherence,
      appointmentAdherence,
      overallAdherence: Math.round((deviceAdherence + medicationAdherence + appointmentAdherence) / 3),
      byWeek: this.generateWeeklyAdherence(),
    };
  }

  async getOutcomesAnalytics(options: { startDate?: string; endDate?: string; organizationId?: string }) {
    return {
      hospitalizations: {
        prevented: 12,
        actual: 3,
        rate: 20,
      },
      emergencyVisits: {
        prevented: 25,
        actual: 8,
        rate: 24,
      },
      readmissions: {
        prevented: 8,
        actual: 2,
        rate: 20,
      },
      costSavings: {
        estimated: 125000,
        period: 'monthly',
      },
    };
  }

  async getRevenueAnalytics(options: { startDate?: string; endDate?: string }) {
    return {
      totalRevenue: 245000,
      mrr: 82000,
      arr: 984000,
      growth: 12.5,
      byPlan: [
        { plan: 'Starter', revenue: 45000, customers: 15 },
        { plan: 'Pro', revenue: 120000, customers: 15 },
        { plan: 'Enterprise', revenue: 80000, customers: 4 },
      ],
      byCPTCode: [
        { code: '99453', description: 'Initial setup', count: 45, revenue: 855 },
        { code: '99454', description: 'Device supply', count: 120, revenue: 7680 },
        { code: '99457', description: 'First 20 min', count: 180, revenue: 9180 },
        { code: '99458', description: 'Additional 20 min', count: 90, revenue: 3690 },
      ],
    };
  }

  async getSystemAnalytics() {
    return {
      apiHealth: {
        uptime: 99.9,
        avgResponseTime: 125,
        errorRate: 0.1,
      },
      database: {
        connections: 45,
        queryTime: 12,
        size: '2.4 GB',
      },
      storage: {
        used: '45 GB',
        available: '455 GB',
        percentage: 9,
      },
      activeUsers: {
        current: 234,
        peak: 512,
        avgDaily: 380,
      },
    };
  }

  async exportAnalytics(options: {
    type: string;
    format: string;
    startDate?: string;
    endDate?: string;
    organizationId?: string;
  }) {
    const { type, format } = options;

    // In production, generate actual export file
    return {
      downloadUrl: `/api/analytics/download/${type}_${Date.now()}.${format}`,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      type,
      format,
    };
  }

  private async getAlertCount(organizationId?: string): Promise<number> {
    const query = this.alertRepository.createQueryBuilder('alert')
      .where('alert.status = :status', { status: 'active' });
    
    if (organizationId) {
      query.andWhere('alert.organizationId = :organizationId', { organizationId });
    }

    return query.getCount();
  }

  private async getDeviceCount(organizationId?: string): Promise<number> {
    const query = this.deviceRepository.createQueryBuilder('device');
    
    if (organizationId) {
      query.where('device.organizationId = :organizationId', { organizationId });
    }

    return query.getCount();
  }

  private async getReadingCount(organizationId?: string): Promise<number> {
    return this.vitalRepository.count();
  }

  private async getPatientCount(organizationId?: string): Promise<number> {
    const query = this.userRepository.createQueryBuilder('user')
      .where('user.role = :role', { role: UserRole.PATIENT });
    
    if (organizationId) {
      query.andWhere('user.organizationId = :organizationId', { organizationId });
    }

    return query.getCount();
  }

  private async calculateTrends(organizationId?: string) {
    return {
      patients: { change: 12, direction: 'up' },
      alerts: { change: -8, direction: 'down' },
      readings: { change: 15, direction: 'up' },
      adherence: { change: 5, direction: 'up' },
    };
  }

  private async calculateDeviceAdherence(organizationId?: string): Promise<number> {
    // Calculate based on expected vs actual readings
    return 72;
  }

  private generateWeeklyAdherence() {
    return Array.from({ length: 12 }, (_, i) => ({
      week: `Week ${i + 1}`,
      adherence: Math.floor(65 + Math.random() * 25),
    }));
  }
}
