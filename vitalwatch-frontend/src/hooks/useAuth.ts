/**
 * VitalWatch Auth Hook
 * Convenient hook for authentication state and actions
 */

'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useAuthStore, getRedirectPath } from '@/stores';

export function useAuth() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    accessToken,
    login: storeLogin,
    logout: storeLogout,
    loginWithGoogle,
    loginWithMicrosoft,
    loginWithApple,
  } = useAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      await storeLogin(email, password);
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        router.push(getRedirectPath(currentUser.role));
      }
    },
    [storeLogin, router]
  );

  const logout = useCallback(() => {
    storeLogout();
    router.push('/auth/login');
  }, [storeLogout, router]);

  const socialLogin = useCallback(
    async (provider: 'google' | 'microsoft' | 'apple') => {
      switch (provider) {
        case 'google':
          await loginWithGoogle();
          break;
        case 'microsoft':
          await loginWithMicrosoft();
          break;
        case 'apple':
          await loginWithApple();
          break;
      }
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        router.push(getRedirectPath(currentUser.role));
      }
    },
    [loginWithGoogle, loginWithMicrosoft, loginWithApple, router]
  );

  const requireAuth = useCallback(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/auth/login');
      return false;
    }
    return true;
  }, [isAuthenticated, isLoading, router]);

  const requireRole = useCallback(
    (allowedRoles: string[]) => {
      if (!user || !allowedRoles.includes(user.role)) {
        router.push('/unauthorized');
        return false;
      }
      return true;
    },
    [user, router]
  );

  return {
    user,
    isAuthenticated,
    isLoading,
    accessToken,
    login,
    logout,
    socialLogin,
    requireAuth,
    requireRole,
  };
}
