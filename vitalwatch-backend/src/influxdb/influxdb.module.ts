/**
 * VitalWatch InfluxDB Module
 * Time-series database for vitals data
 */

import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfluxDBService } from './influxdb.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [InfluxDBService],
  exports: [InfluxDBService],
})
export class InfluxDBModule {}
