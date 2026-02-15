import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { User, UserRole, UserStatus } from '../users/entities/user.entity';
import { AuditService } from '../audit/audit.service';
import { NotificationsService } from '../notifications/notifications.service';

interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  organizationId?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly auditService: AuditService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.passwordHash) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      await this.auditService.log({
        action: 'LOGIN_FAILED',
        userId: user.id,
        details: { reason: 'Invalid password' },
      });
      return null;
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is not active');
    }

    return user;
  }

  async login(user: User, ip?: string): Promise<TokenPair> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    };

    const tokens = await this.generateTokens(payload);

    // Update last login
    await this.usersService.updateLastLogin(user.id, ip);

    // Audit log
    await this.auditService.log({
      action: 'LOGIN_SUCCESS',
      userId: user.id,
      details: { ip, role: user.role },
    });

    return tokens;
  }

  async register(registerDto: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
    phone?: string;
    organizationId?: string;
    inviteCode?: string;
  }): Promise<User> {
    // Check if user exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(registerDto.password, this.SALT_ROUNDS);

    // Determine role
    let role = UserRole.PATIENT;
    if (registerDto.role && registerDto.role !== UserRole.PATIENT) {
      // Validate invite code for non-patient roles
      if (!registerDto.inviteCode) {
        throw new BadRequestException('Invite code required for provider accounts');
      }
      // TODO: Validate invite code
      role = registerDto.role;
    }

    // Create user
    const user = await this.usersService.create({
      email: registerDto.email,
      passwordHash,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phone: registerDto.phone,
      role,
      status: UserStatus.PENDING,
      organizationId: registerDto.organizationId,
    });

    // Send verification email
    await this.notificationsService.sendEmailVerification(user);

    // Audit log
    await this.auditService.log({
      action: 'USER_REGISTERED',
      userId: user.id,
      details: { role, email: user.email },
    });

    return user;
  }

  async validateOAuthLogin(profile: {
    provider: 'google' | 'microsoft' | 'apple';
    providerId: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }): Promise<User> {
    // Check if user exists with this OAuth provider
    let user = await this.usersService.findByOAuthId(profile.provider, profile.providerId);

    if (!user) {
      // Check if user exists with this email
      user = await this.usersService.findByEmail(profile.email);

      if (user) {
        // Link OAuth account to existing user
        await this.usersService.linkOAuthAccount(user.id, profile.provider, profile.providerId);
      } else {
        // Create new user
        user = await this.usersService.create({
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          avatar: profile.avatar,
          role: UserRole.PROVIDER, // Default to provider for OAuth
          status: UserStatus.ACTIVE, // OAuth users are auto-verified
          emailVerified: true,
          [`${profile.provider}Id`]: profile.providerId,
        });

        await this.auditService.log({
          action: 'OAUTH_REGISTRATION',
          userId: user.id,
          details: { provider: profile.provider },
        });
      }
    }

    return user;
  }

  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('jwt.secret'),
      });

      const user = await this.usersService.findById(payload.sub);

      if (!user || user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      };

      return this.generateTokens(newPayload);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    await this.auditService.log({
      action: 'LOGOUT',
      userId,
    });
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findById(userId);

    if (!user || !user.passwordHash) {
      throw new BadRequestException('Cannot change password for OAuth-only accounts');
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);

    if (!isOldPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, this.SALT_ROUNDS);
    await this.usersService.updatePassword(userId, newPasswordHash);

    await this.auditService.log({
      action: 'PASSWORD_CHANGED',
      userId,
    });
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      // Don't reveal if user exists
      return;
    }

    const resetToken = uuidv4();
    await this.usersService.setResetToken(user.id, resetToken);
    await this.notificationsService.sendPasswordResetEmail(user, resetToken);

    await this.auditService.log({
      action: 'PASSWORD_RESET_REQUESTED',
      userId: user.id,
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findByResetToken(token);

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, this.SALT_ROUNDS);
    await this.usersService.updatePassword(user.id, newPasswordHash);
    await this.usersService.clearResetToken(user.id);

    await this.auditService.log({
      action: 'PASSWORD_RESET_COMPLETED',
      userId: user.id,
    });
  }

  async verifyEmail(token: string): Promise<void> {
    const user = await this.usersService.findByVerificationToken(token);

    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }

    await this.usersService.verifyEmail(user.id);

    await this.auditService.log({
      action: 'EMAIL_VERIFIED',
      userId: user.id,
    });
  }

  private async generateTokens(payload: JwtPayload): Promise<TokenPair> {
    const accessTokenExpiry = this.configService.get('jwt.accessTokenExpiry');
    const refreshTokenExpiry = this.configService.get('jwt.refreshTokenExpiry');

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: accessTokenExpiry,
      }),
      this.jwtService.signAsync(
        { ...payload, type: 'refresh' },
        {
          expiresIn: refreshTokenExpiry,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.parseExpiry(accessTokenExpiry),
    };
  }

  private parseExpiry(expiry: string): number {
    const match = expiry.match(/^(\d+)([smhd])$/);
    if (!match) return 900; // Default 15 minutes

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 3600;
      case 'd': return value * 86400;
      default: return 900;
    }
  }

  async sendSmsVerificationCode(phone: string): Promise<void> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store code with expiry (5 minutes)
    await this.usersService.setSmsVerificationCode(phone, code);
    
    // Send via Twilio
    await this.notificationsService.sendSmsVerificationCode(phone, code);
  }

  async verifySmsCode(phone: string, code: string): Promise<void> {
    const isValid = await this.usersService.verifySmsCode(phone, code);
    
    if (!isValid) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    await this.usersService.markPhoneVerified(phone);
  }

  async validateSocialLogin(provider: 'google' | 'microsoft' | 'apple', token: string): Promise<User> {
    let profile: { providerId: string; email: string; firstName: string; lastName: string; avatar?: string };

    switch (provider) {
      case 'google':
        profile = await this.verifyGoogleToken(token);
        break;
      case 'microsoft':
        profile = await this.verifyMicrosoftToken(token);
        break;
      case 'apple':
        profile = await this.verifyAppleToken(token);
        break;
      default:
        throw new BadRequestException('Invalid provider');
    }

    return this.validateOAuthLogin({ provider, ...profile });
  }

  private async verifyGoogleToken(token: string): Promise<{ providerId: string; email: string; firstName: string; lastName: string; avatar?: string }> {
    // In production, verify with Google OAuth API
    // For now, decode the token (assuming it's a JWT from Google)
    try {
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
      const data = await response.json();
      
      if (!data.email) {
        throw new BadRequestException('Invalid Google token');
      }

      return {
        providerId: data.sub,
        email: data.email,
        firstName: data.given_name || '',
        lastName: data.family_name || '',
        avatar: data.picture,
      };
    } catch {
      throw new BadRequestException('Failed to verify Google token');
    }
  }

  private async verifyMicrosoftToken(token: string): Promise<{ providerId: string; email: string; firstName: string; lastName: string; avatar?: string }> {
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!data.mail && !data.userPrincipalName) {
        throw new BadRequestException('Invalid Microsoft token');
      }

      return {
        providerId: data.id,
        email: data.mail || data.userPrincipalName,
        firstName: data.givenName || '',
        lastName: data.surname || '',
      };
    } catch {
      throw new BadRequestException('Failed to verify Microsoft token');
    }
  }

  private async verifyAppleToken(token: string): Promise<{ providerId: string; email: string; firstName: string; lastName: string }> {
    try {
      // Apple tokens are JWTs that need to be verified with Apple's public keys
      const decoded = this.jwtService.decode(token) as any;
      
      if (!decoded || !decoded.sub) {
        throw new BadRequestException('Invalid Apple token');
      }

      return {
        providerId: decoded.sub,
        email: decoded.email || '',
        firstName: decoded.firstName || '',
        lastName: decoded.lastName || '',
      };
    } catch {
      throw new BadRequestException('Failed to verify Apple token');
    }
  }

  async sendMagicLink(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      // Don't reveal if user exists
      return;
    }

    const magicToken = uuidv4();
    await this.usersService.setMagicLinkToken(user.id, magicToken);
    await this.notificationsService.sendMagicLinkEmail(user, magicToken);

    await this.auditService.log({
      action: 'MAGIC_LINK_REQUESTED',
      userId: user.id,
    });
  }

  async verifyMagicLink(token: string): Promise<User> {
    const user = await this.usersService.findByMagicLinkToken(token);
    
    if (!user) {
      throw new BadRequestException('Invalid or expired magic link');
    }

    await this.usersService.clearMagicLinkToken(user.id);

    await this.auditService.log({
      action: 'MAGIC_LINK_LOGIN',
      userId: user.id,
    });

    return user;
  }

  async getCurrentUser(userId: string): Promise<Partial<User>> {
    const user = await this.usersService.findById(userId);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return user without sensitive data
    const { passwordHash, resetToken, verificationToken, magicLinkToken, ...safeUser } = user as any;
    return safeUser;
  }
}
