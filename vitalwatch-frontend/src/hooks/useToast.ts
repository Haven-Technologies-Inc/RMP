// Re-export and wrap useToast from Toast component
import { useToast as useToastOriginal } from '@/components/ui/Toast';

interface ToastOptions {
  title: string;
  description?: string;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export function useToast() {
  const context = useToastOriginal();
  
  const toast = (options: ToastOptions) => {
    const type = options.type || 'info';
    const message = options.description || options.message;
    context.addToast({ type, title: options.title, message });
  };

  return { ...context, toast };
}
