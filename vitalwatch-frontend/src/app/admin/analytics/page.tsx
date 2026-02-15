'use client';

import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { useToast } from '@/hooks/useToast';
import { SimpleBarChart, DonutChart, TrendChart } from '@/components/dashboard/Charts';
import { DataTable, Column } from '@/components/dashboard/DataTable';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, 
  Activity, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Building2, 
  Download,
  Calendar
} from 'lucide-react';

const timeRanges = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' },
];

const revenueData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Apr', value: 61000 },
  { name: 'May', value: 55000 },
  { name: 'Jun', value: 67000 },
];

const userGrowthData = [
  { name: 'Jan', value: 850 },
  { name: 'Feb', value: 920 },
  { name: 'Mar', value: 1050 },
  { name: 'Apr', value: 1180 },
  { name: 'May', value: 1320 },
  { name: 'Jun', value: 1450 },
];

const planDistribution = [
  { name: 'Starter', value: 35, color: '#6b7280' },
  { name: 'Professional', value: 45, color: '#3b82f6' },
  { name: 'Enterprise', value: 20, color: '#10b981' },
];

const topOrganizations = [
  { id: '1', name: 'General Hospital', patients: 450, revenue: 56250, growth: 12 },
  { id: '2', name: 'Senior Care Network', patients: 280, revenue: 35000, growth: 8 },
  { id: '3', name: 'Heart Care Center', patients: 180, revenue: 22500, growth: 15 },
  { id: '4', name: 'City Clinic', patients: 120, revenue: 15000, growth: 5 },
  { id: '5', name: 'Family Practice', patients: 35, revenue: 4375, growth: 22 },
];

export default function AdminAnalyticsPage() {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('30d');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({ title: 'Export complete', description: 'Analytics report downloaded', type: 'success' });
    } finally {
      setIsExporting(false);
    }
  }, [toast]);

  const orgColumns: Column<typeof topOrganizations[0]>[] = [
    { key: 'name', header: 'Organization' },
    { key: 'patients', header: 'Patients', render: (v: number) => v.toLocaleString() },
    { key: 'revenue', header: 'Monthly Revenue', render: (v: number) => `$${v.toLocaleString()}` },
    { 
      key: 'growth', 
      header: 'Growth', 
      render: (v: number) => (
        <Badge variant={v > 10 ? 'success' : 'info'}>+{v}%</Badge>
      )
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">Monitor platform performance and growth</p>
          </div>
          <div className="flex items-center gap-3">
            <Select options={timeRanges} value={timeRange} onChange={setTimeRange} className="w-40" />
            <Button variant="outline" onClick={handleExport} disabled={isExporting}>
              <Download className={`mr-2 h-4 w-4 ${isExporting ? 'animate-pulse' : ''}`} />
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Users"
            value="1,450"
            subtitle="+130 this month"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 9.8, isPositive: true }}
          />
          <MetricCard
            title="Active Patients"
            value="1,065"
            subtitle="Across all organizations"
            icon={<Activity className="h-5 w-5" />}
            trend={{ value: 12.3, isPositive: true }}
          />
          <MetricCard
            title="Monthly Revenue"
            value="$128,750"
            subtitle="From all subscriptions"
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: 15.2, isPositive: true }}
            className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
          />
          <MetricCard
            title="Organizations"
            value="5"
            subtitle="2 Enterprise, 2 Pro, 1 Starter"
            icon={<Building2 className="h-5 w-5" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            <TrendChart data={revenueData} color="#10b981" height={250} />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">User Growth</h3>
            <TrendChart data={userGrowthData} color="#3b82f6" height={250} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Plan Distribution</h3>
            <DonutChart data={planDistribution} height={200} />
          </div>
          <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Platform Health</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-4 dark:border-gray-700">
                <p className="text-sm text-gray-500">API Uptime</p>
                <p className="text-2xl font-bold text-green-600">99.98%</p>
              </div>
              <div className="rounded-lg border p-4 dark:border-gray-700">
                <p className="text-sm text-gray-500">Avg Response Time</p>
                <p className="text-2xl font-bold text-primary">45ms</p>
              </div>
              <div className="rounded-lg border p-4 dark:border-gray-700">
                <p className="text-sm text-gray-500">Error Rate</p>
                <p className="text-2xl font-bold text-green-600">0.02%</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4 dark:border-gray-700">
                <p className="text-sm text-gray-500">Vitals Processed (24h)</p>
                <p className="text-2xl font-bold text-primary">24,856</p>
              </div>
              <div className="rounded-lg border p-4 dark:border-gray-700">
                <p className="text-sm text-gray-500">Alerts Generated (24h)</p>
                <p className="text-2xl font-bold text-yellow-600">127</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Top Organizations</h3>
          <DataTable data={topOrganizations} columns={orgColumns} />
        </div>
      </div>
    </DashboardLayout>
  );
}
