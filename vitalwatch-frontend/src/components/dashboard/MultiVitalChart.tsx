'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface VitalData {
  timestamp: string;
  [key: string]: string | number;
}

interface VitalConfig {
  key: string;
  name: string;
  color: string;
  unit: string;
  yAxisId?: 'left' | 'right';
}

interface MultiVitalChartProps {
  data: VitalData[];
  vitals: VitalConfig[];
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  className?: string;
}

const defaultVitals: VitalConfig[] = [
  { key: 'systolic', name: 'Systolic BP', color: '#ef4444', unit: 'mmHg', yAxisId: 'left' },
  { key: 'diastolic', name: 'Diastolic BP', color: '#f97316', unit: 'mmHg', yAxisId: 'left' },
  { key: 'heartRate', name: 'Heart Rate', color: '#3b82f6', unit: 'bpm', yAxisId: 'right' },
  { key: 'spo2', name: 'SpO2', color: '#22c55e', unit: '%', yAxisId: 'right' },
];

export function MultiVitalChart({
  data,
  vitals = defaultVitals,
  height = 300,
  showLegend = true,
  showGrid = true,
  className,
}: MultiVitalChartProps) {
  const [activeVitals, setActiveVitals] = useState<Set<string>>(new Set(vitals.map((v) => v.key)));

  const toggleVital = (key: string) => {
    const newActive = new Set(activeVitals);
    if (newActive.has(key)) {
      newActive.delete(key);
    } else {
      newActive.add(key);
    }
    setActiveVitals(newActive);
  };

  const hasLeftAxis = vitals.some((v) => v.yAxisId === 'left' && activeVitals.has(v.key));
  const hasRightAxis = vitals.some((v) => v.yAxisId === 'right' && activeVitals.has(v.key));

  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900', className)}>
      {/* Legend/Toggle buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {vitals.map((vital) => (
          <button
            key={vital.key}
            onClick={() => toggleVital(vital.key)}
            className={cn(
              'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all',
              activeVitals.has(vital.key)
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'bg-gray-50 opacity-50 dark:bg-gray-900'
            )}
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: vital.color }}
            />
            <span className="text-gray-700 dark:text-gray-300">{vital.name}</span>
            <span className="text-xs text-gray-500">({vital.unit})</span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />}
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            className="text-gray-500"
          />
          {hasLeftAxis && (
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-gray-500"
            />
          )}
          {hasRightAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-gray-500"
            />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg, #fff)',
              border: '1px solid var(--tooltip-border, #e5e7eb)',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            labelStyle={{ fontWeight: 600 }}
          />
          {showLegend && <Legend />}
          {vitals.map((vital) => (
            activeVitals.has(vital.key) && (
              <Line
                key={vital.key}
                type="monotone"
                dataKey={vital.key}
                name={vital.name}
                stroke={vital.color}
                yAxisId={vital.yAxisId || 'left'}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Preset vital combinations
export function BloodPressureChart({ data, height = 250 }: { data: VitalData[]; height?: number }) {
  return (
    <MultiVitalChart
      data={data}
      vitals={[
        { key: 'systolic', name: 'Systolic', color: '#ef4444', unit: 'mmHg', yAxisId: 'left' },
        { key: 'diastolic', name: 'Diastolic', color: '#f97316', unit: 'mmHg', yAxisId: 'left' },
      ]}
      height={height}
      showLegend={false}
    />
  );
}

export function CardiacChart({ data, height = 250 }: { data: VitalData[]; height?: number }) {
  return (
    <MultiVitalChart
      data={data}
      vitals={[
        { key: 'heartRate', name: 'Heart Rate', color: '#ef4444', unit: 'bpm', yAxisId: 'left' },
        { key: 'spo2', name: 'SpO2', color: '#3b82f6', unit: '%', yAxisId: 'right' },
      ]}
      height={height}
      showLegend={false}
    />
  );
}
