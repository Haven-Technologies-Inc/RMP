'use client';

import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    direction?: 'up' | 'down' | 'stable';
    value: string | number;
    positive?: boolean;
    isPositive?: boolean;
  };
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  subtitle,
  className,
  onClick,
}: MetricCardProps) {
  const TrendIcon = trend?.direction === 'up' 
    ? TrendingUp 
    : trend?.direction === 'down' 
    ? TrendingDown 
    : Minus;

  const isPositive = trend?.positive ?? trend?.isPositive;
  const trendColor = isPositive 
    ? 'text-green-600 dark:text-green-400' 
    : isPositive === false 
    ? 'text-red-600 dark:text-red-400' 
    : 'text-slate-500 dark:text-slate-400';

  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800',
        'transition-all duration-200',
        onClick && 'cursor-pointer hover:border-primary/50 hover:shadow-md',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          
          {trend && (
            <div className={cn('mt-2 flex items-center gap-1 text-sm', trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span>{trend.value}</span>
            </div>
          )}
          
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        
        {icon && (
          <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-3 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
