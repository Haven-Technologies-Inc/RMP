'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SkeletonMetricCard, SkeletonTable, Skeleton } from '@/components/ui/Skeleton';

export default function PatientsLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
        </div>
        <SkeletonTable rows={8} cols={7} />
      </div>
    </DashboardLayout>
  );
}
