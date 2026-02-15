import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PasswordValidator } from './password.validator';

describe('PasswordValidator', () => {
  let validator: PasswordValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordValidator,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config: Record<string, any> = {
                'passwordPolicy.minLength': 12,
                'passwordPolicy.requireUppercase': true,
                'passwordPolicy.requireLowercase': true,
                'passwordPolicy.requireNumbers': true,
                'passwordPolicy.requireSpecialChars': true,
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    validator = module.get<PasswordValidator>(PasswordValidator);
  });

  describe('validate', () => {
    it('should accept a valid password', () => {
      const result = validator.validate('SecureP@ss123!');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject password shorter than minimum length', () => {
      const result = validator.validate('Short1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 12 characters long');
    });

    it('should reject password without uppercase', () => {
      const result = validator.validate('securep@ss123!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should reject password without lowercase', () => {
      const result = validator.validate('SECUREP@SS123!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should reject password without numbers', () => {
      const result = validator.validate('SecureP@ssword!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should reject password without special characters', () => {
      const result = validator.validate('SecurePassword123');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character');
    });

    it('should reject common patterns', () => {
      const result = validator.validate('Password123456!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password contains common patterns that are not allowed');
    });

    it('should reject passwords with repeated characters', () => {
      const result = validator.validate('Secuuuure123!@#');
      expect(result.valid).toBe(false);
    });
  });

  describe('validateOrThrow', () => {
    it('should not throw for valid password', () => {
      expect(() => validator.validateOrThrow('SecureP@ss123!')).not.toThrow();
    });

    it('should throw BadRequestException for invalid password', () => {
      expect(() => validator.validateOrThrow('weak')).toThrow();
    });
  });

  describe('getPolicy', () => {
    it('should return the password policy', () => {
      const policy = validator.getPolicy();
      expect(policy.minLength).toBe(12);
      expect(policy.requireUppercase).toBe(true);
      expect(policy.requireLowercase).toBe(true);
      expect(policy.requireNumbers).toBe(true);
      expect(policy.requireSpecialChars).toBe(true);
    });
  });
});
