import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface TurnCredentials {
  iceServers: RTCIceServer[];
  ttl: number;
}

@Injectable()
export class WebRTCService {
  private readonly logger = new Logger(WebRTCService.name);

  constructor(private configService: ConfigService) {
    const turnUrl = this.configService.get<string>('turn.url');
    this.logger.log(`WebRTC TURN server configured: ${turnUrl}`);
  }

  async getTurnCredentials(): Promise<TurnCredentials> {
    const turnUrl = this.configService.get<string>('turn.url') || 'turn:localhost:3478';
    const username = this.configService.get<string>('turn.username') || 'vitalwatch';
    const credential = this.configService.get<string>('turn.credential') || 'VitalWatch2024!';
    const ttl = this.configService.get<number>('turn.ttl') || 3600;

    // Extract host for TURNS (TLS) URL
    const turnsUrl = turnUrl.replace('turn:', 'turns:').replace(':3478', ':5349');

    const iceServers: RTCIceServer[] = [
      // Public STUN servers (fallback)
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      // Self-hosted STUN (no auth needed)
      { urls: turnUrl.replace('turn:', 'stun:') },
      // Self-hosted TURN (UDP)
      {
        urls: turnUrl,
        username,
        credential,
      },
      // Self-hosted TURN (TCP fallback)
      {
        urls: `${turnUrl}?transport=tcp`,
        username,
        credential,
      },
      // Self-hosted TURNS (TLS for strict firewalls)
      {
        urls: turnsUrl,
        username,
        credential,
      },
    ];

    this.logger.debug(`Generated TURN credentials for ${turnUrl} with TTL: ${ttl}s`);
    return { iceServers, ttl };
  }
}
