/**
 * VitalWatch WebSocket Service
 * Service for emitting real-time events
 */

import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

interface ConnectedClient {
  socketId: string;
  userId: string;
  role?: string;
  organizationId?: string;
}

export interface VitalUpdate {
  patientId: string;
  type: string;
  values: Record<string, number>;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  timestamp: Date;
  deviceId?: string;
}

export interface AlertUpdate {
  id: string;
  patientId: string;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
}

export interface NotificationUpdate {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
}

@Injectable()
export class WebSocketService {
  private server: Server;
  private readonly logger = new Logger(WebSocketService.name);
  private clients: Map<string, ConnectedClient> = new Map();

  setServer(server: Server) {
    this.server = server;
  }

  addClient(socketId: string, client: ConnectedClient) {
    this.clients.set(socketId, client);
  }

  removeClient(socketId: string) {
    this.clients.delete(socketId);
  }

  getConnectedClients(): ConnectedClient[] {
    return Array.from(this.clients.values());
  }

  getClientsByUserId(userId: string): ConnectedClient[] {
    return this.getConnectedClients().filter((c) => c.userId === userId);
  }

  getClientsByRole(role: string): ConnectedClient[] {
    return this.getConnectedClients().filter((c) => c.role === role);
  }

  // Emit new vital reading to patient's room
  emitVitalUpdate(vital: VitalUpdate) {
    if (!this.server) return;

    this.server.to(`patient:${vital.patientId}`).emit('vital:new', vital);
    this.logger.debug(`Emitted vital update for patient ${vital.patientId}`);

    // Also emit to the patient's own user room
    this.server.to(`user:${vital.patientId}`).emit('vital:new', vital);
  }

  // Emit alert to relevant rooms
  emitAlert(alert: AlertUpdate) {
    if (!this.server) return;

    // Emit to patient's room
    this.server.to(`patient:${alert.patientId}`).emit('alert:new', alert);

    // Emit to all subscribed providers
    this.server.to('alerts:all').emit('alert:new', alert);

    // Emit to provider role room for critical alerts
    if (alert.severity === 'critical') {
      this.server.to('role:provider').emit('alert:critical', alert);
      this.server.to('role:admin').emit('alert:critical', alert);
    }

    this.logger.debug(`Emitted alert ${alert.id} (${alert.severity})`);
  }

  // Emit notification to specific user
  emitNotification(notification: NotificationUpdate) {
    if (!this.server) return;

    this.server.to(`user:${notification.userId}`).emit('notification:new', notification);
    this.logger.debug(`Emitted notification to user ${notification.userId}`);
  }

  // Emit to specific user
  emitToUser(userId: string, event: string, data: any) {
    if (!this.server) return;
    this.server.to(`user:${userId}`).emit(event, data);
  }

  // Emit to specific role
  emitToRole(role: string, event: string, data: any) {
    if (!this.server) return;
    this.server.to(`role:${role}`).emit(event, data);
  }

  // Emit to organization
  emitToOrganization(organizationId: string, event: string, data: any) {
    if (!this.server) return;
    this.server.to(`org:${organizationId}`).emit(event, data);
  }

  // Emit dashboard stats update
  emitDashboardUpdate(organizationId: string, stats: any) {
    if (!this.server) return;
    this.server.to(`org:${organizationId}`).emit('dashboard:update', stats);
  }

  // Emit device status change
  emitDeviceStatus(patientId: string, device: any) {
    if (!this.server) return;
    this.server.to(`patient:${patientId}`).emit('device:status', device);
  }

  // Broadcast to all connected clients
  broadcast(event: string, data: any) {
    if (!this.server) return;
    this.server.emit(event, data);
  }
}
