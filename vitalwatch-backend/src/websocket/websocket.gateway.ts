/**
 * VitalWatch WebSocket Gateway
 * Socket.io gateway for real-time communication
 */

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WebSocketService } from './websocket.service';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  role?: string;
  organizationId?: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/live',
})
export class WebSocketGatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebSocketGatewayService.name);

  constructor(private wsService: WebSocketService) {}

  afterInit(server: Server) {
    this.wsService.setServer(server);
    this.logger.log('WebSocket Gateway initialized');
  }

  async handleConnection(client: AuthenticatedSocket) {
    try {
      // Extract token from handshake
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization;
      
      if (!token) {
        this.logger.warn(`Client ${client.id} connection rejected: No token`);
        client.disconnect();
        return;
      }

      // TODO: Verify JWT token and extract user info
      // For now, accept connections with basic validation
      const userId = client.handshake.auth?.userId;
      const role = client.handshake.auth?.role;
      const organizationId = client.handshake.auth?.organizationId;

      if (!userId) {
        client.disconnect();
        return;
      }

      client.userId = userId;
      client.role = role;
      client.organizationId = organizationId;

      // Join user-specific room
      client.join(`user:${userId}`);

      // Join role-specific room
      if (role) {
        client.join(`role:${role}`);
      }

      // Join organization room
      if (organizationId) {
        client.join(`org:${organizationId}`);
      }

      // Providers join patient rooms they're assigned to
      if (role === 'provider' || role === 'admin') {
        // TODO: Fetch assigned patients and join their rooms
      }

      this.wsService.addClient(client.id, {
        socketId: client.id,
        userId,
        role,
        organizationId,
      });

      this.logger.log(`Client connected: ${client.id} (User: ${userId}, Role: ${role})`);
      
      // Send connection confirmation
      client.emit('connected', { userId, role });

    } catch (error) {
      this.logger.error(`Connection error: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.wsService.removeClient(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe:patient')
  handleSubscribePatient(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { patientId: string }
  ) {
    // Only providers/admins can subscribe to patient updates
    if (client.role !== 'provider' && client.role !== 'admin' && client.role !== 'superadmin') {
      // Patients can only subscribe to their own data
      if (client.userId !== data.patientId) {
        return { error: 'Unauthorized' };
      }
    }

    client.join(`patient:${data.patientId}`);
    this.logger.debug(`Client ${client.id} subscribed to patient ${data.patientId}`);
    return { success: true };
  }

  @SubscribeMessage('unsubscribe:patient')
  handleUnsubscribePatient(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { patientId: string }
  ) {
    client.leave(`patient:${data.patientId}`);
    return { success: true };
  }

  @SubscribeMessage('subscribe:alerts')
  handleSubscribeAlerts(@ConnectedSocket() client: AuthenticatedSocket) {
    if (client.role === 'provider' || client.role === 'admin' || client.role === 'superadmin') {
      client.join('alerts:all');
      return { success: true };
    }
    return { error: 'Unauthorized' };
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    return { event: 'pong', timestamp: Date.now() };
  }

  // ==================== WebRTC Signaling ====================

  @SubscribeMessage('call:initiate')
  handleCallInitiate(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { 
      targetUserId: string; 
      callType: 'video' | 'audio';
      callerName: string;
    }
  ) {
    const callId = `call_${Date.now()}_${client.userId}_${data.targetUserId}`;
    
    // Join call room
    client.join(`call:${callId}`);
    
    // Notify target user of incoming call
    this.server.to(`user:${data.targetUserId}`).emit('call:incoming', {
      callId,
      callerId: client.userId,
      callerName: data.callerName,
      callType: data.callType,
      timestamp: new Date().toISOString(),
    });

    this.logger.log(`Call initiated: ${callId} from ${client.userId} to ${data.targetUserId}`);
    
    return { success: true, callId };
  }

  @SubscribeMessage('call:accept')
  handleCallAccept(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { callId: string; callerId: string }
  ) {
    // Join call room
    client.join(`call:${data.callId}`);
    
    // Notify caller that call was accepted
    this.server.to(`user:${data.callerId}`).emit('call:accepted', {
      callId: data.callId,
      acceptedBy: client.userId,
      timestamp: new Date().toISOString(),
    });

    this.logger.log(`Call accepted: ${data.callId} by ${client.userId}`);
    
    return { success: true };
  }

  @SubscribeMessage('call:reject')
  handleCallReject(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { callId: string; callerId: string; reason?: string }
  ) {
    // Notify caller that call was rejected
    this.server.to(`user:${data.callerId}`).emit('call:rejected', {
      callId: data.callId,
      rejectedBy: client.userId,
      reason: data.reason || 'User declined the call',
      timestamp: new Date().toISOString(),
    });

    this.logger.log(`Call rejected: ${data.callId} by ${client.userId}`);
    
    return { success: true };
  }

  @SubscribeMessage('call:end')
  handleCallEnd(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { callId: string }
  ) {
    // Notify all participants in call room
    this.server.to(`call:${data.callId}`).emit('call:ended', {
      callId: data.callId,
      endedBy: client.userId,
      timestamp: new Date().toISOString(),
    });

    // Leave call room
    client.leave(`call:${data.callId}`);

    this.logger.log(`Call ended: ${data.callId} by ${client.userId}`);
    
    return { success: true };
  }

  @SubscribeMessage('webrtc:offer')
  handleWebRTCOffer(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { 
      callId: string; 
      targetUserId: string; 
      offer: RTCSessionDescriptionInit 
    }
  ) {
    // Forward SDP offer to target user
    this.server.to(`user:${data.targetUserId}`).emit('webrtc:offer', {
      callId: data.callId,
      fromUserId: client.userId,
      offer: data.offer,
    });

    this.logger.debug(`WebRTC offer sent from ${client.userId} to ${data.targetUserId}`);
    
    return { success: true };
  }

  @SubscribeMessage('webrtc:answer')
  handleWebRTCAnswer(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { 
      callId: string; 
      targetUserId: string; 
      answer: RTCSessionDescriptionInit 
    }
  ) {
    // Forward SDP answer to target user
    this.server.to(`user:${data.targetUserId}`).emit('webrtc:answer', {
      callId: data.callId,
      fromUserId: client.userId,
      answer: data.answer,
    });

    this.logger.debug(`WebRTC answer sent from ${client.userId} to ${data.targetUserId}`);
    
    return { success: true };
  }

  @SubscribeMessage('webrtc:ice-candidate')
  handleICECandidate(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { 
      callId: string; 
      targetUserId: string; 
      candidate: RTCIceCandidateInit 
    }
  ) {
    // Forward ICE candidate to target user
    this.server.to(`user:${data.targetUserId}`).emit('webrtc:ice-candidate', {
      callId: data.callId,
      fromUserId: client.userId,
      candidate: data.candidate,
    });

    this.logger.debug(`ICE candidate sent from ${client.userId} to ${data.targetUserId}`);
    
    return { success: true };
  }

  @SubscribeMessage('call:toggle-media')
  handleToggleMedia(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { 
      callId: string; 
      mediaType: 'audio' | 'video'; 
      enabled: boolean 
    }
  ) {
    // Notify other participants in call
    client.to(`call:${data.callId}`).emit('call:media-toggled', {
      callId: data.callId,
      userId: client.userId,
      mediaType: data.mediaType,
      enabled: data.enabled,
    });

    return { success: true };
  }
}
