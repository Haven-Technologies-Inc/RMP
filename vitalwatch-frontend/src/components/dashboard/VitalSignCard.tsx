'use client';

import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Activity, Heart, Droplets, Scale, Thermometer, Wind } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

type VitalType = 'bp' | 'heart_rate' | 'glucose' | 'spo2' | 'weight' | 'temperature' | 'respiratory_rate';
type VitalStatus = 'normal' | 'warning' | 'critical';
type TrendDirection = 'up' | 'down' | 'stable';

interface VitalSignCardProps {
  type: VitalType;
  value: string;
  unit: string;
  status: VitalStatus;
  timestamp: Date | string;
  trend?: TrendDirection;
  secondaryValue?: string;
  onViewHistory?: () => void;
  className?: string;
}

const vitalConfig: Record<VitalType, { label: string; icon: React.ElementType; color: string }> = {
  bp: { label: 'Blood Pressure', icon: Activity, color: 'text-red-500' },
  heart_rate: { label: 'Heart Rate', icon: Heart, color: 'text-pink-500' },
  glucose: { label: 'Blood Glucose', icon: Droplets, color: 'text-purple-500' },
  spo2: { label: 'Oxygen (SpO2)', icon: Wind, color: 'text-blue-500' },
  weight: { label: 'Weight', icon: Scale, color: 'text-green-500' },
  temperature: { label: 'Temperature', icon: Thermometer, color: 'text-orange-500' },
  respiratory_rate: { label: 'Respiratory Rate', icon: Wind, color: 'text-cyan-500' },
};

const statusConfig: Record<VitalStatus, { badge: 'success' | 'warning' | 'danger'; label: string }> = {
  normal: { badge: 'success', label: 'Normal' },
  warning: { badge: 'warning', label: 'Warning' },
  critical: { badge: 'danger', label: 'Critical' },
};

export function VitalSignCard({
  type,
  value,
  unit,
  status,
  timestamp,
  trend,
  secondaryValue,
  onViewHistory,
  className,
}: VitalSignCardProps) {
  const config = vitalConfig[type];
  const statusCfg = statusConfig[status];
  const Icon = config.icon;
  
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  
  const formattedTime = typeof timestamp === 'string' 
    ? timestamp 
    : new Intl.DateTimeFormat('en-US', { 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true 
      }).format(new Date(timestamp));

  return (
    <div
      className={cn(
        'rounded-xl border bg-white p-5 dark:bg-gray-900',
        status === 'critical' && 'border-red-300 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20',
        status === 'warning' && 'border-yellow-300 bg-yellow-50/50 dark:border-yellow-900 dark:bg-yellow-950/20',
        status === 'normal' && 'border-gray-200 dark:border-gray-800',
        'transition-all duration-200 hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn('rounded-lg bg-gray-100 p-2 dark:bg-gray-800', config.color)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{config.label}</p>
            <Badge variant={statusCfg.badge} className="mt-1">
              {statusCfg.label}
            </Badge>
          </div>
        </div>
        
        {trend && (
          <div className={cn(
            'flex items-center gap-1 text-sm',
            trend === 'up' && 'text-red-500',
            trend === 'down' && 'text-green-500',
            trend === 'stable' && 'text-gray-400'
          )}>
            <TrendIcon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
        </div>
        {secondaryValue && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{secondaryValue}</p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
        <span className="text-xs text-gray-400">Last reading: {formattedTime}</span>
        {onViewHistory && (
          <button
            onClick={onViewHistory}
            className="text-xs font-medium text-primary hover:underline"
          >
            View History
          </button>
        )}
      </div>
    </div>
  );
}
