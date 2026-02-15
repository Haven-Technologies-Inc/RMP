import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report, ReportStatus, ReportType } from './entities/report.entity';
import { AuditService } from '../audit/audit.service';
import { CurrentUserPayload } from '../auth/decorators/current-user.decorator';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly auditService: AuditService,
  ) {}

  async findAll(options: {
    page: number;
    limit: number;
    type?: string;
    status?: string;
    organizationId?: string;
    userId?: string;
  }) {
    const { page, limit, type, status, organizationId, userId } = options;
    const skip = (page - 1) * limit;

    const query = this.reportRepository.createQueryBuilder('report');

    if (organizationId) {
      query.andWhere('report.organizationId = :organizationId', { organizationId });
    }

    if (type) {
      query.andWhere('report.type = :type', { type });
    }

    if (status) {
      query.andWhere('report.status = :status', { status });
    }

    const [reports, total] = await query
      .orderBy('report.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: reports,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getTemplates() {
    return [
      {
        id: 'patient_summary',
        name: 'Patient Summary Report',
        description: 'Comprehensive patient health summary',
        parameters: ['patientId', 'startDate', 'endDate'],
      },
      {
        id: 'vitals_history',
        name: 'Vitals History Report',
        description: 'Detailed vital signs history',
        parameters: ['patientId', 'vitalType', 'startDate', 'endDate'],
      },
      {
        id: 'billing',
        name: 'Billing Report',
        description: 'CPT codes and billing summary',
        parameters: ['organizationId', 'startDate', 'endDate'],
      },
      {
        id: 'compliance',
        name: 'Compliance Report',
        description: 'Patient monitoring compliance metrics',
        parameters: ['organizationId', 'startDate', 'endDate'],
      },
      {
        id: 'population_health',
        name: 'Population Health Report',
        description: 'Aggregate health metrics across patient population',
        parameters: ['organizationId', 'startDate', 'endDate'],
      },
    ];
  }

  async findOne(id: string, user: CurrentUserPayload) {
    const report = await this.reportRepository.findOne({ where: { id } });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    if (user.role !== UserRole.ADMIN && report.organizationId !== user.organizationId) {
      throw new ForbiddenException('Access denied');
    }

    return report;
  }

  async generate(dto: any, user: CurrentUserPayload) {
    const report = this.reportRepository.create({
      type: dto.type as ReportType,
      title: dto.title || `${dto.type} Report`,
      status: ReportStatus.GENERATING,
      organizationId: user.organizationId,
      createdById: user.sub,
      parameters: dto.parameters || {},
      format: dto.format || 'pdf',
    });

    const saved = await this.reportRepository.save(report);

    // Generate report asynchronously
    this.generateReportAsync(saved.id, dto);

    await this.auditService.log({
      action: 'REPORT_GENERATED',
      userId: user.sub,
      details: { reportId: saved.id, type: dto.type },
    });

    return saved;
  }

  private async generateReportAsync(reportId: string, dto: any) {
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await this.reportRepository.update(reportId, {
        status: ReportStatus.COMPLETED,
        completedAt: new Date(),
        fileUrl: `/reports/${reportId}.${dto.format || 'pdf'}`,
        fileSize: Math.floor(Math.random() * 1000000),
      });
    } catch (error) {
      await this.reportRepository.update(reportId, {
        status: ReportStatus.FAILED,
        error: error.message,
      });
    }
  }

  async getReportFile(id: string, user: CurrentUserPayload) {
    const report = await this.findOne(id, user);

    if (report.status !== ReportStatus.COMPLETED) {
      throw new NotFoundException('Report file not ready');
    }

    // In production, fetch from storage
    return {
      data: Buffer.from('Report content placeholder'),
      filename: `${report.title}.${report.format}`,
      contentType: report.format === 'pdf' ? 'application/pdf' : 'text/csv',
    };
  }

  async remove(id: string, user: CurrentUserPayload) {
    await this.findOne(id, user);
    await this.reportRepository.softDelete(id);

    await this.auditService.log({
      action: 'REPORT_DELETED',
      userId: user.sub,
      details: { reportId: id },
    });
  }

  async getScheduledReports(user: CurrentUserPayload) {
    // Return scheduled reports for the user/organization
    return [];
  }

  async scheduleReport(dto: any, user: CurrentUserPayload) {
    await this.auditService.log({
      action: 'REPORT_SCHEDULED',
      userId: user.sub,
      details: { reportType: dto.reportType, schedule: dto.schedule },
    });

    return {
      id: `sched_${Date.now()}`,
      ...dto,
      createdAt: new Date().toISOString(),
    };
  }

  async cancelScheduledReport(id: string, user: CurrentUserPayload) {
    await this.auditService.log({
      action: 'SCHEDULED_REPORT_CANCELLED',
      userId: user.sub,
      details: { scheduleId: id },
    });
  }

  async generatePatientSummary(patientId: string, options: any, user: CurrentUserPayload) {
    return {
      patientId,
      generatedAt: new Date().toISOString(),
      period: options,
      summary: {
        totalReadings: 145,
        alertsGenerated: 3,
        adherenceRate: 78,
        riskScore: 35,
      },
      vitals: {
        bloodPressure: { avg: '125/82', trend: 'stable' },
        heartRate: { avg: 72, trend: 'stable' },
        weight: { current: 175, change: -2 },
        glucose: { avg: 105, trend: 'improving' },
      },
      recommendations: [
        'Continue current medication regimen',
        'Increase daily readings to twice per day',
        'Schedule follow-up appointment in 2 weeks',
      ],
    };
  }

  async generateVitalsReport(patientId: string, options: any, user: CurrentUserPayload) {
    return {
      patientId,
      vitalType: options.type || 'all',
      period: { startDate: options.startDate, endDate: options.endDate },
      readings: [],
      statistics: {
        total: 145,
        average: 0,
        min: 0,
        max: 0,
        trend: 'stable',
      },
    };
  }

  async generateComplianceReport(orgId: string, options: any) {
    return {
      organizationId: orgId,
      period: options,
      metrics: {
        patientsMonitored: 150,
        activeDevices: 145,
        readingsPerPatient: 28,
        cptCodeEligibility: {
          '99453': { eligible: 45, percentage: 30 },
          '99454': { eligible: 120, percentage: 80 },
          '99457': { eligible: 135, percentage: 90 },
          '99458': { eligible: 60, percentage: 40 },
        },
      },
    };
  }

  async generateBillingReport(orgId: string, options: any) {
    return {
      organizationId: orgId,
      period: options,
      billing: {
        totalBillable: 25500,
        byCode: [
          { code: '99453', count: 45, amount: 855 },
          { code: '99454', count: 120, amount: 7680 },
          { code: '99457', count: 135, amount: 6885 },
          { code: '99458', count: 60, amount: 2460 },
        ],
        trends: {
          monthOverMonth: 12,
          quarterOverQuarter: 28,
        },
      },
    };
  }
}
