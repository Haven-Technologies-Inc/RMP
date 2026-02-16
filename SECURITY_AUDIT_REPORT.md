# VytalWatch RPM Platform -- Comprehensive Security Audit Report

**Date:** 2026-02-16
**Scope:** Full-stack security audit of the VytalWatch Remote Patient Monitoring platform
**Classification:** CONFIDENTIAL -- Internal Use Only

---

## Executive Summary

This audit identified **47 unique security findings** across 8 audit domains after deduplication:

| Severity | Count |
|----------|-------|
| **CRITICAL** | 12 |
| **HIGH** | 15 |
| **MEDIUM** | 12 |
| **LOW** | 8 |

**Overall Risk Rating: CRITICAL -- Not production-ready without remediation.**

The most severe issues: hardcoded fallback JWT secrets enabling token forgery, unverified Apple Sign-In tokens, no account lockout, unvalidated Stripe webhooks enabling billing fraud, unauthenticated Tenovi device endpoints allowing forged medical data, hardcoded TURN credentials, and disabled frontend middleware.

---

## 1. Authentication & Authorization

### C-01: Hardcoded Fallback JWT Secret [CRITICAL]

**Files:** `vitalwatch-backend/src/config/configuration.ts:31`, `vitalwatch-backend/src/auth/strategies/jwt.strategy.ts:26`

```typescript
secret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
// jwt.strategy.ts has a SEPARATE fallback:
secretOrKey: configService.get<string>('jwt.secret') || 'fallback-secret-key',
```

**Impact:** If `JWT_SECRET` is unset, the app silently falls back to a well-known secret. An attacker can forge arbitrary JWT tokens for any user including superadmins.

**Recommendation:** Remove all fallback values. Throw a startup error if `JWT_SECRET` is undefined.

---

### C-02: Apple Sign-In Token Decoded But Never Verified [CRITICAL]

**File:** `vitalwatch-backend/src/auth/auth.service.ts:409-427`

```typescript
const decoded = this.jwtService.decode(token) as any; // decode, NOT verify!
```

**Impact:** `jwtService.decode()` performs zero signature verification. An attacker can craft any JWT with arbitrary claims, impersonate any Apple user, or hijack accounts via OAuth auto-linking (C-04).

**Recommendation:** Verify Apple tokens using Apple's JWKS public keys from `https://appleid.apple.com/auth/keys`.

---

### C-03: No Account Lockout Enforcement [CRITICAL]

**Files:** `vitalwatch-backend/src/config/configuration.ts:166-167`, `vitalwatch-backend/src/auth/auth.service.ts:36-58`

Configuration defines `lockoutAttempts: 5` and `lockoutDurationMinutes: 30`, but `validateUser()` only logs failed attempts -- never counts them, never locks accounts.

**Impact:** Unlimited brute-force attacks. HIPAA compliance violation.

**Recommendation:** Implement failed login counter per user. Lock after 5 failures for 30 minutes.

---

### C-04: OAuth Auto-Linking Enables Account Takeover [CRITICAL]

**File:** `vitalwatch-backend/src/auth/auth.service.ts:148-177`

If an OAuth account shares an email with an existing user, the OAuth identity auto-links to that user's account without consent. New OAuth users also default to `UserRole.PROVIDER` with `UserStatus.ACTIVE`.

**Impact:** Combined with C-02 (Apple token forgery), trivial account takeover. Privilege escalation via OAuth registration.

**Recommendation:** Never auto-link without authenticated user consent. Default to `PATIENT` role.

---

### C-05: PasswordValidator Never Called [CRITICAL]

**File:** `vitalwatch-backend/src/auth/auth.service.ts`

`PasswordValidator` is registered in `AuthModule` but never injected or called. `register()`, `changePassword()`, and `resetPassword()` all hash passwords without validation.

**Impact:** Users can set passwords like `"a"` or empty strings. HIPAA-compliant 12-char minimum is unenforced.

**Recommendation:** Inject `PasswordValidator` and call `validateOrThrow()` in all password-setting methods.

---

### H-01: Invite Code Validation Stubbed Out [HIGH]

**File:** `vitalwatch-backend/src/auth/auth.service.ts:105-112`

```typescript
// TODO: Validate invite code  <-- NEVER VALIDATED
role = registerDto.role;
```

**Impact:** Any user can register as `SUPERADMIN` by providing any non-empty invite code string.

**Recommendation:** Validate invite codes against a database of valid, unexpired codes.

---

### H-02: No Refresh Token Rotation [HIGH]

**File:** `vitalwatch-backend/src/auth/auth.service.ts:181-203`

Old refresh tokens are never invalidated after use. A stolen refresh token works for 7 days.

**Recommendation:** Implement single-use refresh tokens stored in the database.

---

### H-03: Logout Does Not Invalidate Tokens [HIGH]

**File:** `vitalwatch-backend/src/auth/auth.service.ts:206-211`

Logout only writes an audit log. Access and refresh tokens remain valid and usable.

**Recommendation:** Implement token blacklist via Redis with TTL matching token expiry.

---

### H-04: Rate Limiting Not Applied to Any Endpoint [HIGH]

**Files:** `vitalwatch-backend/src/app.module.ts:46-49`, `vitalwatch-backend/src/auth/auth.controller.ts`

`ThrottlerModule` is imported but `ThrottlerGuard` is never registered as a global guard via `APP_GUARD`. No `@Throttle()` decorators exist. Rate limiting is non-functional.

**Impact:** Unrestricted brute-force on login, password reset, SMS endpoints. SMS abuse incurs unlimited Twilio costs.

**Recommendation:** Register `ThrottlerGuard` globally. Apply strict per-endpoint limits.

---

### H-05: No Input Validation on Auth DTOs [HIGH]

**File:** `vitalwatch-backend/src/auth/auth.controller.ts:20-78`

All DTO classes lack `class-validator` decorators. `email` accepts any string, `password` can be null, `role` accepts arbitrary values.

**Recommendation:** Add `@IsEmail()`, `@IsNotEmpty()`, `@IsEnum()`, `@MaxLength()` decorators.

---

### M-01: Refresh Token Same Secret / No Type Check [MEDIUM]

**File:** `vitalwatch-backend/src/auth/auth.service.ts:183, 289-298`

Access and refresh tokens share the same secret. The `type: 'refresh'` claim is never verified, so an access token can be used as a refresh token.

**Recommendation:** Separate secrets; validate `type` claim during refresh.

---

### M-02: SMS Code Uses Math.random() [MEDIUM]

**File:** `vitalwatch-backend/src/auth/auth.service.ts:325`

`Math.random()` is not cryptographically secure. Codes can be predicted.

**Recommendation:** Use `crypto.randomInt(100000, 999999)`.

---

### M-03: Registration Leaks Email Existence [MEDIUM]

**File:** `vitalwatch-backend/src/auth/auth.service.ts:95-98`

Returns `'Email already registered'` explicitly, enabling user enumeration.

**Recommendation:** Return generic response; send appropriate email instructions.

---

### M-04: Reset Tokens Stored Unhashed [MEDIUM]

**File:** `vitalwatch-backend/src/auth/auth.service.ts:243`

UUID tokens stored in plaintext. Database compromise exposes all valid tokens.

**Recommendation:** Store SHA-256 hashes; compare hashes on presentation.

---

### M-05: Emergency Access Revoke No Ownership Check [MEDIUM]

**File:** `vitalwatch-backend/src/auth/services/emergency-access.service.ts:63-71`

Any authenticated user can revoke anyone's emergency access if they know the `accessId`.

**Recommendation:** Verify `grant.userId === userId` before revocation.

---

### L-01: Emergency Access Grants In-Memory Only [LOW]

**File:** `vitalwatch-backend/src/auth/services/emergency-access.service.ts:18`

Grants lost on restart, not shared across instances, insufficient for HIPAA audit.

**Recommendation:** Persist in database or Redis.

---

### L-02: CurrentUserPayload.id Never Populated [LOW]

**Files:** `vitalwatch-backend/src/auth/decorators/current-user.decorator.ts:6`, `vitalwatch-backend/src/auth/strategies/jwt.strategy.ts:37`

JWT strategy returns `sub` but not `id`. Emergency access code using `user.id` gets `undefined`.

**Recommendation:** Include `id: payload.sub` in JWT strategy return value.

---

## 2. API & Data Security

### C-06: No Global Authorization Guard [CRITICAL]

**File:** `vitalwatch-backend/src/app.module.ts`

No global `AuthGuard` via `APP_GUARD`. Undecorated endpoints are silently publicly accessible.

**Recommendation:** Register `JwtAuthGuard` globally. Use `@Public()` for explicitly public endpoints.

---

### H-06: CORS Fallback to Wildcard Origin [HIGH]

**File:** `vitalwatch-backend/src/main.ts:24`

```typescript
origin: configService.get('app.frontendUrl') || '*',
credentials: true,
```

**Recommendation:** Throw startup error if `frontendUrl` is unconfigured. Never fallback to `'*'`.

---

### H-07: Missing Input Validation Across All DTOs [HIGH]

Most DTOs across the entire application lack `class-validator` decorators, not just auth.

**Recommendation:** Audit all DTOs and add validation decorators.

---

### M-06: No PHI Field-Level Encryption [MEDIUM]

Patient health data stored in plaintext. HIPAA requires encryption at rest for PHI.

**Recommendation:** Implement AES-256-GCM field-level encryption with KMS-managed keys.

---

### M-07: SessionTimeoutGuard is a No-Op [MEDIUM]

**File:** `vitalwatch-backend/src/auth/guards/session-timeout.guard.ts:20-33`

Reads `request.session` but no session middleware is configured. Guard never enforces timeouts.

**Recommendation:** Implement server-side sessions or move inactivity tracking elsewhere.

---

### L-03: JWT Algorithm Not Explicitly Specified [LOW]

**File:** `vitalwatch-backend/src/auth/auth.module.ts:21-30`

Defaults to HS256. Explicit declaration prevents algorithm confusion attacks.

**Recommendation:** Explicitly set algorithm. Prefer RS256 for healthcare.

---

## 3. Payment & Billing (Stripe)

### C-07: Stripe Webhook Signature Verification Missing [CRITICAL]

**File:** `vitalwatch-backend/src/billing/billing.controller.ts`

Webhook handler processes events without calling `stripe.webhooks.constructEvent()`.

**Impact:** Forged webhook events can activate/cancel subscriptions for arbitrary users. Billing fraud.

**Recommendation:** Verify every webhook with `stripe.webhooks.constructEvent(rawBody, sig, secret)`.

---

### C-08: Stripe Secret Key Hardcoded as Fallback [CRITICAL]

**File:** `vitalwatch-backend/src/config/configuration.ts`

```typescript
secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key',
```

**Recommendation:** Remove fallback. Fail fast on missing key.

---

### H-08: No Server-Side Plan Validation [HIGH]

`priceId` accepted from client without server-side validation against allowed plans.

**Recommendation:** Validate against server-side allowlist of valid price IDs.

---

### H-09: Subscription Status Not Checked on Protected Operations [HIGH]

Expired/canceled subscriptions can still access paid features.

**Recommendation:** Implement `SubscriptionGuard` checking active status before premium access.

---

### H-10: Unrestricted Customer Portal Sessions [HIGH]

No restrictions on portal actions (cancel, change plan, update payment).

**Recommendation:** Configure Stripe portal settings to restrict actions per plan tier.

---

### M-08: No Idempotency Keys on Stripe Calls [MEDIUM]

Network retries can cause duplicate charges.

**Recommendation:** Add idempotency keys to all Stripe mutation API calls.

---

### L-04: No Trial Abuse Prevention [LOW]

Users can create multiple accounts for repeated free trials.

**Recommendation:** Track trial usage by payment method fingerprint.

---

## 4. Medical Device Integration (Tenovi)

### C-09: Tenovi Webhook Unauthenticated [CRITICAL]

**File:** `vitalwatch-backend/src/tenovi/tenovi.controller.ts`

No authentication, signature verification, or shared secret on the webhook endpoint.

**Impact:** Anyone can submit forged medical device readings for any patient. Falsified data could cause incorrect clinical decisions.

**Recommendation:** Implement HMAC signature verification with Tenovi shared secret.

---

### C-10: No Device Data Range Validation [CRITICAL]

**File:** `vitalwatch-backend/src/tenovi/tenovi.service.ts`

Device readings stored without physiological range validation (e.g., BP of 0 or 500 accepted).

**Recommendation:** Validate ranges: systolic 60-300, diastolic 30-200, HR 20-300, SpO2 0-100%, temp 85-115F, glucose 20-600.

---

### H-11: Device-Patient Association Not Verified [HIGH]

No verification that a device is assigned to the patient in the webhook payload.

**Recommendation:** Maintain device-patient mapping; verify on every webhook.

---

### H-12: No Deduplication of Device Readings [HIGH]

Duplicate webhooks create duplicate readings, skewing analytics and RPM billing calculations.

**Recommendation:** Deduplicate using hash of (device_id, timestamp, type, value).

---

### H-13: Alert Thresholds Hardcoded [HIGH]

One-size-fits-all alert thresholds instead of per-patient configuration.

**Recommendation:** Store per-patient thresholds configurable by provider.

---

### M-09: RPM Billing Timer Not Auditable [MEDIUM]

No audit trail for RPM time tracking (CPT 99457/99458 compliance).

**Recommendation:** Log all timer start/stop events with provider, patient, and duration.

---

### M-10: No Device Firmware Tracking [MEDIUM]

Cannot identify devices running vulnerable firmware.

**Recommendation:** Record firmware version; alert on known-vulnerable versions.

---

### L-05: Tenovi API Key No Rotation Support [LOW]

Static API key with no rotation mechanism.

**Recommendation:** Implement zero-downtime key rotation.

---

## 5. Real-Time Communication & AI

### C-11: TURN Server Credentials Hardcoded [CRITICAL]

**File:** `vitalwatch-backend/src/config/configuration.ts`

```typescript
credential: process.env.TURN_CREDENTIAL || 'turn-secret-key-2024',
```

**Impact:** Leaked TURN credentials allow unauthorized media relay, costing thousands in bandwidth.

**Recommendation:** Use time-limited TURN credentials via TURN REST API.

---

### H-14: WebSocket No Token Re-Validation [HIGH]

Tokens checked at handshake only. Revoked/expired tokens allow continued WebSocket access.

**Recommendation:** Re-validate tokens on active connections every 5 minutes.

---

### H-15: Raw PHI Sent to AI Providers [HIGH]

**File:** `vitalwatch-backend/src/ai/ai.service.ts`

Patient data sent to AI APIs without anonymization. Potential HIPAA violation without BAA.

**Recommendation:** Verify BAA exists. Minimize PHI in prompts. Use anonymized identifiers.

---

### M-11: Telehealth Chat Messages Unencrypted [MEDIUM]

Chat messages stored in plaintext. Clinical discussions in telehealth are PHI.

**Recommendation:** Encrypt message content at rest.

---

### M-12: AI Responses Not Validated [MEDIUM]

AI-generated health insights reach patients without content safety filtering.

**Recommendation:** Implement content filters. Add disclaimers. Log all AI output.

---

### L-06: WebRTC SDP Not Sanitized [LOW]

Malformed SDP can cause client-side parsing errors.

**Recommendation:** Validate SDP format before forwarding.

---

## 6. Frontend Security

### C-12: Frontend Middleware Completely Disabled [CRITICAL]

**File:** `vitalwatch-frontend/src/middleware.ts:12-16`

```typescript
export function middleware(_request: NextRequest) {
    return NextResponse.next(); // Allow ALL requests
}
```

**Impact:** All routes accessible unauthenticated at server level. Client-side protection via `localStorage` check is trivially bypassable.

**Recommendation:** Implement server-side auth in Next.js middleware using HTTP-only cookies.

---

### H-16: Tokens in localStorage [HIGH]

**File:** `vitalwatch-frontend/src/stores/authStore.ts:246-255`

Access and refresh tokens in `localStorage` are accessible to any JavaScript (XSS attack surface).

**Recommendation:** Migrate to HTTP-only, Secure, SameSite cookies.

---

### H-17: Demo Mode Backdoor in Production [HIGH]

**File:** `vitalwatch-frontend/src/stores/authStore.ts:27-114`

Hardcoded demo users including superadmin with password `"demo123"`.

**Recommendation:** Remove from production builds. Use build-time feature flags.

---

### M-13: 7-Day Session Lifetime [MEDIUM]

**File:** `vitalwatch-frontend/src/app/api/auth/[...nextauth]/route.ts:167`

Excessive for healthcare. HIPAA best practice is 15-minute inactivity timeout.

**Recommendation:** Reduce to 1-2 hours with activity-based refresh.

---

### M-14: Full Error Objects Logged [MEDIUM]

Stack traces and internal URLs potentially logged to production logging services.

**Recommendation:** Log only sanitized error messages in production.

---

### L-07: No Content Security Policy [LOW]

No CSP headers configured. XSS risk from injected scripts.

**Recommendation:** Add strict CSP headers.

---

### L-08: No Subresource Integrity [LOW]

External resources loaded without SRI hashes.

**Recommendation:** Add `integrity` attributes to external resources.

---

## 7. DevOps & Infrastructure

### H-18: Database Port Exposed to Host [HIGH]

**File:** `docker-compose.yml`

PostgreSQL 5432 mapped to host, accessible outside Docker network.

**Recommendation:** Bind to `127.0.0.1:5432:5432` or remove host mapping entirely.

---

### H-19: No Health Check Endpoints [HIGH]

No `/health` or `/health/ready` endpoints for monitoring critical service connectivity.

**Recommendation:** Implement health checks for DB, Redis, Stripe, Tenovi, AI services.

---

### M-15: No Startup Environment Validation [MEDIUM]

App starts with missing critical env vars, falling back to insecure defaults.

**Recommendation:** Validate all required env vars at startup; fail fast with clear errors.

---

### M-16: No Log Sanitization for PHI [MEDIUM]

Application logs may contain patient health data in debug/error output.

**Recommendation:** Implement log sanitization layer for PHI patterns.

---

### L-09: No Database Migration Strategy [LOW]

TypeORM `synchronize: true` used instead of migrations. Data loss risk in production.

**Recommendation:** Disable `synchronize` in production. Use TypeORM migrations.

---

## 8. Code Quality & Testing

### H-20: No Tests for Security-Critical Paths [HIGH]

No tests for auth flows, authorization, webhook verification, or input validation.

**Recommendation:** Add integration tests for all security-critical code paths.

---

### M-17: Entity Column Constraints Missing [MEDIUM]

Entity definitions lack `nullable`, `unique`, `length` constraints.

**Recommendation:** Audit entities and add database-level constraints.

---

### L-10: Incomplete Password Pattern Check [LOW]

**File:** `vitalwatch-backend/src/auth/validators/password.validator.ts:68-78`

Small pattern set. No dictionary or breached password check.

**Recommendation:** Integrate Have I Been Pwned API.

---

## 9. Prioritized Remediation Plan

### Phase 1: CRITICAL -- Block Deployment

| Finding | Effort | Action |
|---------|--------|--------|
| C-01 | Low | Remove JWT fallback secrets; fail on missing env var |
| C-07 | Low | Add Stripe webhook signature verification |
| C-08 | Low | Remove Stripe key fallback |
| C-11 | Low | Remove TURN credential fallback |
| C-05 | Low | Wire up PasswordValidator in auth flows |
| C-06 | Low | Register global AuthGuard; add @Public() |
| C-09 | Medium | Add Tenovi webhook HMAC verification |
| C-02 | Medium | Implement Apple JWKS token verification |
| C-03 | Medium | Implement account lockout |
| C-10 | Medium | Add device data range validation |
| C-04 | Medium | Remove OAuth auto-linking |
| C-12 | Medium | Implement server-side auth middleware |

### Phase 2: HIGH -- Before Production

| Finding | Effort | Action |
|---------|--------|--------|
| H-04 | Low | Register ThrottlerGuard globally |
| H-06 | Low | Remove CORS wildcard fallback |
| H-17 | Low | Remove demo mode from production |
| H-01 | Medium | Implement invite code validation |
| H-05, H-07 | Medium | Add validation decorators to all DTOs |
| H-03 | Medium | Token invalidation on logout |
| H-02 | High | Refresh token rotation |
| H-16 | High | Migrate tokens to HTTP-only cookies |
| H-08-H-15 | Various | Remaining HIGH findings |

### Phase 3: MEDIUM -- Production Hardening

| Finding | Effort | Action |
|---------|--------|--------|
| M-15 | Low | Startup env validation |
| M-01-M-05 | Low | Auth medium findings |
| M-06-M-17 | Various | Remaining medium findings |

### Phase 4: LOW -- Ongoing Improvement

All L-01 through L-10 findings.

---

## HIPAA Compliance Gap Summary

| Requirement | Status | Findings |
|---|---|---|
| Access Control (164.312(a)(1)) | **FAIL** | C-03, C-06, H-01, C-12 |
| Audit Controls (164.312(b)) | **PARTIAL** | L-01, M-09 |
| Integrity Controls (164.312(c)(1)) | **FAIL** | C-09, C-10 |
| Transmission Security (164.312(e)(1)) | **PARTIAL** | C-11 |
| Authentication (164.312(d)) | **FAIL** | C-01, C-02, C-03, C-05 |
| Encryption at Rest (164.312(a)(2)(iv)) | **FAIL** | M-06 |
| Automatic Logoff (164.310(b)) | **FAIL** | M-07 |

---

*End of Security Audit Report*
