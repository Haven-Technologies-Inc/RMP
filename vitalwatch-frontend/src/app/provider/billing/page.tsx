'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DataTable, Column } from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { 
  DollarSign, 
  FileText, 
  Clock, 
  CheckCircle2,
  Download,
  Send,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/useToast';

interface BillingRecord {
  id: string;
  patientName: string;
  month: string;
  cptCodes: string[];
  amount: number;
  status: 'pending' | 'submitted' | 'paid' | 'rejected';
  submittedAt?: string;
  paidAt?: string;
}

const mockBillingRecords: BillingRecord[] = [
  {
    id: '1',
    patientName: 'Maria Garcia',
    month: '2026-01',
    cptCodes: ['99454', '99457', '99458'],
    amount: 156,
    status: 'pending',
  },
  {
    id: '2',
    patientName: 'James Wilson',
    month: '2026-01',
    cptCodes: ['99454', '99457'],
    amount: 115,
    status: 'submitted',
    submittedAt: '2026-01-10',
  },
  {
    id: '3',
    patientName: 'Susan Chen',
    month: '2026-01',
    cptCodes: ['99454', '99457'],
    amount: 115,
    status: 'paid',
    submittedAt: '2026-01-05',
    paidAt: '2026-01-12',
  },
  {
    id: '4',
    patientName: 'Robert Johnson',
    month: '2025-12',
    cptCodes: ['99454', '99457'],
    amount: 115,
    status: 'paid',
    submittedAt: '2025-12-28',
    paidAt: '2026-01-08',
  },
  {
    id: '5',
    patientName: 'Linda Martinez',
    month: '2025-12',
    cptCodes: ['99454'],
    amount: 64,
    status: 'rejected',
    submittedAt: '2025-12-28',
  },
];

const monthFilters = [
  { value: 'all', label: 'All Months' },
  { value: '2026-01', label: 'January 2026' },
  { value: '2025-12', label: 'December 2025' },
  { value: '2025-11', label: 'November 2025' },
];

const statusFilters = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'paid', label: 'Paid' },
  { value: 'rejected', label: 'Rejected' },
];

export default function ProviderBillingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [records, setRecords] = useState<BillingRecord[]>(mockBillingRecords);
  const [monthFilter, setMonthFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExportReport = useCallback(async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({ title: 'Report exported', description: 'Billing report has been downloaded', type: 'success' });
    } finally {
      setIsExporting(false);
    }
  }, [toast]);

  const handleSubmitClaims = useCallback(async () => {
    const pendingClaims = records.filter(r => r.status === 'pending');
    if (pendingClaims.length === 0) {
      toast({ title: 'No pending claims', description: 'All claims have already been submitted', type: 'info' });
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setRecords(prev => prev.map(r => 
        r.status === 'pending' ? { ...r, status: 'submitted' as const, submittedAt: new Date().toISOString().split('T')[0] } : r
      ));
      toast({ 
        title: 'Claims submitted', 
        description: `${pendingClaims.length} claims submitted successfully`, 
        type: 'success' 
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [records, toast]);

  const handleViewRecord = useCallback((record: BillingRecord) => {
    router.push(`/provider/billing/${record.id}`);
  }, [router]);

  const handleSubmitSingle = useCallback(async (record: BillingRecord) => {
    if (record.status !== 'pending') {
      toast({ title: 'Cannot submit', description: 'This claim has already been submitted', type: 'warning' });
      return;
    }
    setRecords(prev => prev.map(r => 
      r.id === record.id ? { ...r, status: 'submitted' as const, submittedAt: new Date().toISOString().split('T')[0] } : r
    ));
    toast({ title: 'Claim submitted', description: `Claim for ${record.patientName} submitted`, type: 'success' });
  }, [toast]);

  const filteredRecords = records.filter((r) => {
    if (monthFilter !== 'all' && r.month !== monthFilter) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  const pendingAmount = records
    .filter((r) => r.status === 'pending')
    .reduce((sum, r) => sum + r.amount, 0);
  const submittedAmount = records
    .filter((r) => r.status === 'submitted')
    .reduce((sum, r) => sum + r.amount, 0);
  const paidAmount = records
    .filter((r) => r.status === 'paid')
    .reduce((sum, r) => sum + r.amount, 0);
  const totalPotential = records.reduce((sum, r) => sum + r.amount, 0);

  const columns: Column<BillingRecord>[] = [
    {
      key: 'patientName',
      header: 'Patient',
    },
    {
      key: 'month',
      header: 'Service Month',
      render: (month: string) => {
        const [year, m] = month.split('-');
        return new Date(parseInt(year), parseInt(m) - 1).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
      },
    },
    {
      key: 'cptCodes',
      header: 'CPT Codes',
      render: (codes: string[]) => (
        <div className="flex gap-1">
          {codes.map((code) => (
            <Badge key={code} variant="secondary" className="text-xs">
              {code}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (amount: number) => (
        <span className="font-medium">${amount.toFixed(2)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (status: string) => {
        const variants: Record<string, 'warning' | 'info' | 'success' | 'danger'> = {
          pending: 'warning',
          submitted: 'info',
          paid: 'success',
          rejected: 'danger',
        };
        return <Badge variant={variants[status]}>{status}</Badge>;
      },
    },
    {
      key: 'submittedAt',
      header: 'Submitted',
      render: (date: string | undefined) =>
        date ? new Date(date).toLocaleDateString() : '—',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage RPM billing and reimbursement tracking
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportReport} disabled={isExporting}>
              {isExporting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              {isExporting ? 'Exporting...' : 'Export Report'}
            </Button>
            <Button onClick={handleSubmitClaims} disabled={isSubmitting}>
              {isSubmitting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              {isSubmitting ? 'Submitting...' : 'Submit Claims'}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Pending Submission"
            value={`$${pendingAmount.toLocaleString()}`}
            icon={<Clock className="h-5 w-5" />}
            subtitle={`${records.filter((r) => r.status === 'pending').length} claims`}
          />
          <MetricCard
            title="Awaiting Payment"
            value={`$${submittedAmount.toLocaleString()}`}
            icon={<FileText className="h-5 w-5" />}
            subtitle={`${records.filter((r) => r.status === 'submitted').length} claims`}
          />
          <MetricCard
            title="Paid This Month"
            value={`$${paidAmount.toLocaleString()}`}
            icon={<CheckCircle2 className="h-5 w-5" />}
            className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
          />
          <MetricCard
            title="Total Potential"
            value={`$${totalPotential.toLocaleString()}`}
            icon={<DollarSign className="h-5 w-5" />}
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            CPT Code Reference
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <p className="font-mono text-lg font-bold text-primary">99453</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Initial setup</p>
              <p className="mt-2 font-semibold">$19</p>
              <p className="text-xs text-gray-500">One-time</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <p className="font-mono text-lg font-bold text-primary">99454</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Device supply (16+ days)</p>
              <p className="mt-2 font-semibold">$64</p>
              <p className="text-xs text-gray-500">Monthly</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <p className="font-mono text-lg font-bold text-primary">99457</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">First 20 min review</p>
              <p className="mt-2 font-semibold">$51</p>
              <p className="text-xs text-gray-500">Monthly</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <p className="font-mono text-lg font-bold text-primary">99458</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Additional 20 min</p>
              <p className="mt-2 font-semibold">$41</p>
              <p className="text-xs text-gray-500">Monthly</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select
            options={monthFilters}
            value={monthFilter}
            onChange={setMonthFilter}
            className="w-40"
          />
          <Select
            options={statusFilters}
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-36"
          />
        </div>

        <DataTable
          data={filteredRecords}
          columns={columns}
          actions={[
            {
              label: 'View',
              onClick: handleViewRecord,
            },
            {
              label: 'Submit',
              onClick: handleSubmitSingle,
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
