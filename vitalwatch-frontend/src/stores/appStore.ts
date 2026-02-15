/**
 * VitalWatch App Store
 * Global application state management
 */

import { create } from 'zustand';

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
}

interface AppState {
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Sidebar
  sidebar: SidebarState;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;

  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMessage: string | null;
  setLoadingMessage: (message: string | null) => void;

  // Error handling
  globalError: string | null;
  setGlobalError: (error: string | null) => void;
  clearGlobalError: () => void;

  // Toast/Notifications
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Theme
  theme: 'system',
  setTheme: (theme) => set({ theme }),

  // Sidebar
  sidebar: {
    isCollapsed: false,
    isMobileOpen: false,
  },
  toggleSidebar: () =>
    set((state) => ({
      sidebar: { ...state.sidebar, isCollapsed: !state.sidebar.isCollapsed },
    })),
  setSidebarCollapsed: (collapsed) =>
    set((state) => ({
      sidebar: { ...state.sidebar, isCollapsed: collapsed },
    })),
  toggleMobileSidebar: () =>
    set((state) => ({
      sidebar: { ...state.sidebar, isMobileOpen: !state.sidebar.isMobileOpen },
    })),
  setMobileSidebarOpen: (open) =>
    set((state) => ({
      sidebar: { ...state.sidebar, isMobileOpen: open },
    })),

  // Loading
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  loadingMessage: null,
  setLoadingMessage: (message) => set({ loadingMessage: message }),

  // Error handling
  globalError: null,
  setGlobalError: (error) => set({ globalError: error }),
  clearGlobalError: () => set({ globalError: null }),

  // Toasts
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    // Auto-remove after duration
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),
}));
