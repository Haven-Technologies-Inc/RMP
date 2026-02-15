'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SkeletonMetricCard, SkeletonChart, SkeletonTable, SkeletonCard } from '@/components/ui/Skeleton';

export default function ProviderDashboardLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SkeletonChart height={300} />
          </div>
          <SkeletonCard />
        </div>
        <SkeletonTable rows={5} cols={6} />
      </div>
    </DashboardLayout>
  );
}
