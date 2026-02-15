/**
 * VitalWatch Auth Utilities
 * Helper functions for NextAuth.js
 */

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export type UserRole = 'patient' | 'provider' | 'admin' | 'superadmin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export async function getSession(): Promise<AuthSession | null> {
  const session = await getServerSession();
  return session as AuthSession | null;
}

export async function requireAuth(): Promise<AuthSession> {
  const session = await getSession();
  if (!session) {
    redirect('/auth/login');
  }
  return session;
}

export async function requireRole(allowedRoles: UserRole[]): Promise<AuthSession> {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.user.role)) {
    redirect('/unauthorized');
  }
  return session;
}

export function getRedirectPath(role: UserRole): string {
  switch (role) {
    case 'patient':
      return '/patient/dashboard';
    case 'provider':
      return '/provider/dashboard';
    case 'admin':
    case 'superadmin':
      return '/admin/dashboard';
    default:
      return '/';
  }
}

export function canAccessRoute(role: UserRole, pathname: string): boolean {
  const roleRoutes: Record<UserRole, string[]> = {
    patient: ['/patient'],
    provider: ['/provider', '/patient'], // Providers can view patients
    admin: ['/admin', '/provider', '/patient'],
    superadmin: ['/admin', '/provider', '/patient'],
  };

  const allowedPaths = roleRoutes[role] || [];
  return allowedPaths.some((path) => pathname.startsWith(path));
}
