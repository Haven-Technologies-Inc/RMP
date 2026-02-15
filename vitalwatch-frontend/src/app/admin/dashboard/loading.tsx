'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SkeletonMetricCard, SkeletonChart, SkeletonTable } from '@/components/ui/Skeleton';

export default function AdminDashboardLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <SkeletonChart height={250} />
          <SkeletonChart height={250} />
        </div>
        <SkeletonTable rows={5} cols={5} />
      </div>
    </DashboardLayout>
  );
}
