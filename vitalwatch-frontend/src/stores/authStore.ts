import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";
import { config } from "@/config";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  useDemoMode: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  setDemoMode: (enabled: boolean) => void;
}

// Demo users for testing
const DEMO_USERS: Record<string, User> = {
  "patient@demo.com": {
    id: "pat_demo_001",
    email: "patient@demo.com",
    name: "John Doe",
    firstName: "John",
    lastName: "Doe",
    role: "patient" as UserRole,
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    phone: "+1 (555) 123-4567",
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date(),
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: false,
  },
  "provider@demo.com": {
    id: "prov_demo_001",
    email: "provider@demo.com",
    name: "Dr. Sarah Chen",
    firstName: "Sarah",
    lastName: "Chen",
    role: "provider" as UserRole,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    phone: "+1 (555) 234-5678",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date(),
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: true,
    organizationId: "org_demo_001",
  },
  "admin@demo.com": {
    id: "admin_demo_001",
    email: "admin@demo.com",
    name: "Michael Torres",
    firstName: "Michael",
    lastName: "Torres",
    role: "superadmin" as UserRole,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    phone: "+1 (555) 345-6789",
    createdAt: new Date("2022-12-01"),
    updatedAt: new Date(),
    emailVerified: true,
    phoneVerified: true,
    mfaEnabled: true,
    organizationId: "org_demo_001",
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,
      refreshToken: null,
      useDemoMode: false,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
      },

      setDemoMode: (enabled) => {
        set({ useDemoMode: enabled });
      },

      login: async (email, password) => {
        set({ isLoading: true });

        // Check for demo login first
        const demoUser = DEMO_USERS[email.toLowerCase()];
        if (demoUser && password === "demo123") {
          set({
            user: demoUser,
            isAuthenticated: true,
            isLoading: false,
            useDemoMode: true,
            accessToken: "demo_access_token_" + Date.now(),
            refreshToken: "demo_refresh_token_" + Date.now(),
          });
          return;
        }

        // Try real backend authentication
        try {
          const response = await fetch(`${config.api.baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Invalid email or password");
          }

          set({
            user: data.data?.user || data.user,
            isAuthenticated: true,
            isLoading: false,
            useDemoMode: false,
            accessToken: data.data?.accessToken || data.accessToken,
            refreshToken: data.data?.refreshToken || data.refreshToken,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error instanceof Error ? error : new Error("Login failed");
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        // In production, redirect to backend OAuth endpoint
        // For now, use demo mode
        await new Promise((resolve) => setTimeout(resolve, 1500));
        set({
          user: DEMO_USERS["provider@demo.com"],
          isAuthenticated: true,
          isLoading: false,
          useDemoMode: true,
          accessToken: "google_access_token_" + Date.now(),
          refreshToken: "google_refresh_token_" + Date.now(),
        });
      },

      loginWithMicrosoft: async () => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        set({
          user: DEMO_USERS["provider@demo.com"],
          isAuthenticated: true,
          isLoading: false,
          useDemoMode: true,
          accessToken: "microsoft_access_token_" + Date.now(),
          refreshToken: "microsoft_refresh_token_" + Date.now(),
        });
      },

      loginWithApple: async () => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        set({
          user: DEMO_USERS["patient@demo.com"],
          isAuthenticated: true,
          isLoading: false,
          useDemoMode: true,
          accessToken: "apple_access_token_" + Date.now(),
          refreshToken: "apple_refresh_token_" + Date.now(),
        });
      },

      logout: async () => {
        const { accessToken, useDemoMode } = get();
        
        // Call backend logout if not in demo mode
        if (!useDemoMode && accessToken) {
          try {
            await fetch(`${config.api.baseUrl}/auth/logout`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            });
          } catch {
            // Ignore logout errors
          }
        }

        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          useDemoMode: false,
        });
      },

      refreshSession: async () => {
        const { refreshToken, useDemoMode } = get();
        if (!refreshToken) {
          get().logout();
          return;
        }

        if (useDemoMode) {
          set({ accessToken: "refreshed_demo_token_" + Date.now() });
          return;
        }

        try {
          const response = await fetch(`${config.api.baseUrl}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error("Token refresh failed");
          }

          set({
            accessToken: data.data?.accessToken || data.accessToken,
            refreshToken: data.data?.refreshToken || data.refreshToken || refreshToken,
          });
        } catch {
          get().logout();
        }
      },
    }),
    {
      name: "vytalwatch-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        useDemoMode: state.useDemoMode,
      }),
    }
  )
);

// Helper function to get redirect path based on role
export function getRedirectPath(role: UserRole): string {
  switch (role) {
    case "patient":
      return "/patient/dashboard";
    case "provider":
      return "/provider/dashboard";
    case "admin":
    case "superadmin":
      return "/admin/dashboard";
    default:
      return "/";
  }
}
