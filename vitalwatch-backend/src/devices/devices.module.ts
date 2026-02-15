import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Device } from './entities/device.entity';
import {
  TenoviGateway,
  TenoviWhitelistedDevice,
  TenoviGatewayProperty,
} from './entities/tenovi-gateway.entity';
import { TenoviHwiDevice } from './entities/tenovi-hwi-device.entity';
import { DevicesService } from './devices.service';
import { TenoviService } from './tenovi.service';
import { DevicesController } from './devices.controller';
import { TenoviWebhookController, TenoviController } from './tenovi-webhook.controller';
import { VitalsModule } from '../vitals/vitals.module';
import { AuditModule } from '../audit/audit.module';
import { AlertsModule } from '../alerts/alerts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Device,
      TenoviGateway,
      TenoviWhitelistedDevice,
      TenoviGatewayProperty,
      TenoviHwiDevice,
    ]),
    ConfigModule,
    forwardRef(() => VitalsModule),
    forwardRef(() => AlertsModule),
    AuditModule,
  ],
  controllers: [DevicesController, TenoviWebhookController, TenoviController],
  providers: [DevicesService, TenoviService],
  exports: [DevicesService, TenoviService],
})
export class DevicesModule {}
