'use client';

import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Info, Phone, Eye, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

type AlertSeverity = 'critical' | 'warning' | 'info';

interface AlertCardProps {
  id: string;
  severity: AlertSeverity;
  patient?: {
    id: string;
    name: string;
    photo?: string;
  };
  title: string;
  message: string;
  timestamp: Date | string;
  onView?: () => void;
  onDismiss?: () => void;
  onContact?: () => void;
  className?: string;
}

const severityConfig: Record<AlertSeverity, { 
  icon: React.ElementType; 
  badge: 'danger' | 'warning' | 'info';
  bgClass: string;
  borderClass: string;
}> = {
  critical: { 
    icon: AlertTriangle, 
    badge: 'danger',
    bgClass: 'bg-red-50 dark:bg-red-950/20',
    borderClass: 'border-red-200 dark:border-red-900',
  },
  warning: { 
    icon: AlertCircle, 
    badge: 'warning',
    bgClass: 'bg-yellow-50 dark:bg-yellow-950/20',
    borderClass: 'border-yellow-200 dark:border-yellow-900',
  },
  info: { 
    icon: Info, 
    badge: 'info',
    bgClass: 'bg-blue-50 dark:bg-blue-950/20',
    borderClass: 'border-blue-200 dark:border-blue-900',
  },
};

export function AlertCard({
  id,
  severity,
  patient,
  title,
  message,
  timestamp,
  onView,
  onDismiss,
  onContact,
  className,
}: AlertCardProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  const formattedTime = typeof timestamp === 'string'
    ? timestamp
    : formatRelativeTime(new Date(timestamp));

  return (
    <div
      className={cn(
        'rounded-xl border p-4',
        config.bgClass,
        config.borderClass,
        'transition-all duration-200',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'rounded-full p-2',
          severity === 'critical' && 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400',
          severity === 'warning' && 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400',
          severity === 'info' && 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
        )}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant={config.badge}>{severity.toUpperCase()}</Badge>
                {patient && (
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {patient.name}
                  </span>
                )}
              </div>
              <h4 className="mt-1 font-semibold text-gray-900 dark:text-white">{title}</h4>
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Dismiss alert"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{message}</p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{formattedTime}</span>
            </div>

            <div className="flex items-center gap-2">
              {onView && (
                <Button size="sm" variant="outline" onClick={onView}>
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
              )}
              {onContact && severity === 'critical' && (
                <Button size="sm" onClick={onContact}>
                  <Phone className="mr-1 h-3 w-3" />
                  Contact
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
}
