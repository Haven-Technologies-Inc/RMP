'use client';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ToastProvider } from '@/components/ui/Toast';
import { Preloader } from '@/components/ui/Preloader';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="vytalwatch-theme"
    >
      <Preloader />
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
