/**
 * VitalWatch WebSocket Module
 * Socket.io for real-time dashboard updates
 */

import { Module } from '@nestjs/common';
import { WebSocketGatewayService } from './websocket.gateway';
import { WebSocketService } from './websocket.service';

@Module({
  providers: [WebSocketGatewayService, WebSocketService],
  exports: [WebSocketService],
})
export class WebSocketModule {}
