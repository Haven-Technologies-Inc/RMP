'use client';

import { cn } from '@/lib/utils';

interface RiskScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeConfig = {
  sm: { width: 80, strokeWidth: 6, fontSize: 'text-lg', labelSize: 'text-xs' },
  md: { width: 120, strokeWidth: 8, fontSize: 'text-2xl', labelSize: 'text-sm' },
  lg: { width: 160, strokeWidth: 10, fontSize: 'text-3xl', labelSize: 'text-base' },
};

function getScoreColor(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  if (percentage <= 30) return '#22c55e'; // green
  if (percentage <= 60) return '#f59e0b'; // yellow/amber
  if (percentage <= 80) return '#f97316'; // orange
  return '#ef4444'; // red
}

function getRiskLabel(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  if (percentage <= 30) return 'Low Risk';
  if (percentage <= 60) return 'Moderate';
  if (percentage <= 80) return 'Elevated';
  return 'High Risk';
}

export function RiskScoreGauge({
  score,
  maxScore = 100,
  size = 'md',
  showLabel = true,
  label,
  className,
}: RiskScoreGaugeProps) {
  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const percentage = Math.min(Math.max(score / maxScore, 0), 1);
  const strokeDashoffset = circumference * (1 - percentage * 0.75); // 270 degrees (3/4 circle)
  const color = getScoreColor(score, maxScore);
  const riskLabel = label || getRiskLabel(score, maxScore);

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative" style={{ width: config.width, height: config.width }}>
        <svg
          width={config.width}
          height={config.width}
          viewBox={`0 0 ${config.width} ${config.width}`}
          className="transform rotate-[135deg]"
        >
          {/* Background arc */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress arc */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold', config.fontSize)} style={{ color }}>
            {Math.round(score)}
          </span>
          {showLabel && (
            <span className={cn('text-gray-500 dark:text-gray-400', config.labelSize)}>
              {riskLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface RiskScoreCardProps {
  score: number;
  patientName?: string;
  trend?: 'up' | 'down' | 'stable';
  lastUpdated?: string;
  factors?: { name: string; impact: 'high' | 'medium' | 'low' }[];
  className?: string;
}

export function RiskScoreCard({
  score,
  patientName,
  trend,
  lastUpdated,
  factors,
  className,
}: RiskScoreCardProps) {
  const trendIcons = {
    up: '↑',
    down: '↓',
    stable: '→',
  };
  const trendColors = {
    up: 'text-red-500',
    down: 'text-green-500',
    stable: 'text-gray-500',
  };

  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900', className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Risk Score</h3>
          {patientName && <p className="text-sm text-gray-500">{patientName}</p>}
        </div>
        {trend && (
          <span className={cn('text-lg font-bold', trendColors[trend])}>
            {trendIcons[trend]}
          </span>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <RiskScoreGauge score={score} size="lg" />
      </div>

      {factors && factors.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Risk Factors</p>
          <div className="space-y-1">
            {factors.map((factor) => (
              <div key={factor.name} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{factor.name}</span>
                <span className={cn(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  factor.impact === 'high' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                  factor.impact === 'medium' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                  factor.impact === 'low' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                )}>
                  {factor.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {lastUpdated && (
        <p className="mt-4 text-xs text-gray-400 text-center">
          Last updated: {lastUpdated}
        </p>
      )}
    </div>
  );
}
