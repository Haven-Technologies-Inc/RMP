import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SessionTimeoutGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return true; // Let JWT guard handle this

    const lastActivity = request.session?.lastActivity;
    const timeoutMinutes = this.configService.get('session.timeoutMinutes') || 15;

    if (lastActivity) {
      const elapsed = (Date.now() - new Date(lastActivity).getTime()) / 1000 / 60;
      if (elapsed > timeoutMinutes) {
        throw new UnauthorizedException('Session expired due to inactivity');
      }
    }

    // Update last activity
    if (request.session) {
      request.session.lastActivity = new Date().toISOString();
    }

    return true;
  }
}
