import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebRTCService } from './webrtc.service';
import { WebRTCController } from './webrtc.controller';

@Module({
  imports: [ConfigModule],
  controllers: [WebRTCController],
  providers: [WebRTCService],
  exports: [WebRTCService],
})
export class WebRTCModule {}
