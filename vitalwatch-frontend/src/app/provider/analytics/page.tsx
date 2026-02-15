'use client';

import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { TrendChart, SimpleBarChart, DonutChart } from '@/components/dashboard/Charts';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Download,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/useToast';

const timeRanges = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '12m', label: 'Last 12 Months' },
];

const mockPatientGrowth = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2025, i).toLocaleDateString('en-US', { month: 'short' }),
  patients: 20 + Math.floor(i * 2.5 + Math.random() * 5),
}));

const mockReadingsData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  readings: 150 + Math.floor(Math.random() * 100),
}));

const mockAlertDistribution = [
  { name: 'Critical', value: 12, color: '#EF4444' },
  { name: 'Warning', value: 35, color: '#F59E0B' },
  { name: 'Info', value: 53, color: '#3B82F6' },
];

const mockConditionBreakdown = [
  { condition: 'Hypertension', count: 28 },
  { condition: 'Diabetes', count: 22 },
  { condition: 'CHF', count: 15 },
  { condition: 'COPD', count: 12 },
  { condition: 'Other', count: 8 },
];

const mockAdherenceData = Array.from({ length: 7 }, (_, i) => ({
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  adherence: 75 + Math.floor(Math.random() * 20),
}));

export default function ProviderAnalyticsPage() {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('30d');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportReport = useCallback(async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({ 
        title: 'Report exported', 
        description: 'Analytics report has been downloaded',
        type: 'success' 
      });
    } finally {
      setIsExporting(false);
    }
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Monitor your practice performance and patient outcomes
            </p>
          </div>
          <div className="flex gap-3">
            <Select
              options={timeRanges}
              value={timeRange}
              onChange={setTimeRange}
              className="w-40"
            />
            <Button 
              variant="outline" 
              onClick={handleExportReport}
              disabled={isExporting}
            >
              {isExporting ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {isExporting ? 'Exporting...' : 'Export Report'}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Patients"
            value="47"
            icon={<Users className="h-5 w-5" />}
            trend={{ direction: 'up', value: '+3 this month', positive: true }}
          />
          <MetricCard
            title="Readings This Month"
            value="4,238"
            icon={<Activity className="h-5 w-5" />}
            trend={{ direction: 'up', value: '+12% vs last month', positive: true }}
          />
          <MetricCard
            title="Avg. Adherence Rate"
            value="89%"
            icon={<TrendingUp className="h-5 w-5" />}
            trend={{ direction: 'up', value: '+4% vs last month', positive: true }}
          />
          <MetricCard
            title="Monthly Revenue"
            value="$5,875"
            icon={<DollarSign className="h-5 w-5" />}
            subtitle="47 patients × $125 avg"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Patient Growth
            </h2>
            <SimpleBarChart
              data={mockPatientGrowth}
              xKey="month"
              yKey="patients"
              color="#0066FF"
              height={280}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Daily Readings
            </h2>
            <TrendChart
              data={mockReadingsData}
              xKey="date"
              yKey="readings"
              type="area"
              color="#00C48C"
              height={280}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Alert Distribution
            </h2>
            <DonutChart
              data={mockAlertDistribution}
              dataKey="value"
              nameKey="name"
              height={280}
              colors={['#EF4444', '#F59E0B', '#3B82F6']}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Patients by Condition
            </h2>
            <SimpleBarChart
              data={mockConditionBreakdown}
              xKey="condition"
              yKey="count"
              color="#8B5CF6"
              height={280}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Weekly Adherence
            </h2>
            <SimpleBarChart
              data={mockAdherenceData}
              xKey="day"
              yKey="adherence"
              color="#10B981"
              height={200}
            />
          </div>

          <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Key Performance Indicators
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
                <p className="text-sm text-green-600 dark:text-green-400">Readmission Rate</p>
                <p className="mt-1 text-2xl font-bold text-green-700 dark:text-green-300">8%</p>
                <p className="mt-1 text-xs text-green-600">↓ 14% from baseline</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
                <p className="text-sm text-blue-600 dark:text-blue-400">Avg. Response Time</p>
                <p className="mt-1 text-2xl font-bold text-blue-700 dark:text-blue-300">12 min</p>
                <p className="mt-1 text-xs text-blue-600">To critical alerts</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-950/20">
                <p className="text-sm text-purple-600 dark:text-purple-400">Patient Satisfaction</p>
                <p className="mt-1 text-2xl font-bold text-purple-700 dark:text-purple-300">4.8/5</p>
                <p className="mt-1 text-xs text-purple-600">Based on surveys</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Billing Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left font-medium text-gray-500">CPT Code</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Description</th>
                  <th className="pb-3 text-right font-medium text-gray-500">Patients Eligible</th>
                  <th className="pb-3 text-right font-medium text-gray-500">Rate</th>
                  <th className="pb-3 text-right font-medium text-gray-500">Potential Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr>
                  <td className="py-3 font-medium">99454</td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">Device supply (16+ days)</td>
                  <td className="py-3 text-right">42</td>
                  <td className="py-3 text-right">$64</td>
                  <td className="py-3 text-right font-medium">$2,688</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">99457</td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">First 20 min clinical review</td>
                  <td className="py-3 text-right">47</td>
                  <td className="py-3 text-right">$51</td>
                  <td className="py-3 text-right font-medium">$2,397</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">99458</td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">Additional 20 min</td>
                  <td className="py-3 text-right">19</td>
                  <td className="py-3 text-right">$41</td>
                  <td className="py-3 text-right font-medium">$779</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td colSpan={4} className="pt-3 text-right font-semibold">Total Potential:</td>
                  <td className="pt-3 text-right text-lg font-bold text-primary">$5,864</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
