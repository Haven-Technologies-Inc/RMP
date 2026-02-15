'use client';

import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/useToast';
import { DataTable, Column } from '@/components/dashboard/DataTable';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { DatePicker } from '@/components/ui/DatePicker';
import { Search, Download, Filter, Eye, User, FileText, Settings, Shield, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  status: 'success' | 'failure';
}

const mockLogs: AuditLog[] = [
  { id: '1', timestamp: '2026-01-15T14:32:15Z', userId: 'usr_admin', userName: 'Admin User', userRole: 'admin', action: 'UPDATE', resource: 'User', resourceId: 'usr_123', details: 'Changed user role to provider', ipAddress: '10.0.0.1', status: 'success' },
  { id: '2', timestamp: '2026-01-15T14:30:00Z', userId: 'usr_456', userName: 'Dr. Smith', userRole: 'provider', action: 'VIEW', resource: 'Patient', resourceId: 'pat_789', details: 'Viewed patient medical records', ipAddress: '192.168.1.50', status: 'success' },
  { id: '3', timestamp: '2026-01-15T14:28:45Z', userId: 'usr_admin', userName: 'Admin User', userRole: 'admin', action: 'DELETE', resource: 'APIKey', resourceId: 'key_old', details: 'Deleted expired API key', ipAddress: '10.0.0.1', status: 'success' },
  { id: '4', timestamp: '2026-01-15T14:25:30Z', userId: 'usr_789', userName: 'Nurse Jones', userRole: 'provider', action: 'CREATE', resource: 'Alert', resourceId: 'alt_123', details: 'Created critical alert for patient', ipAddress: '192.168.1.25', status: 'success' },
  { id: '5', timestamp: '2026-01-15T14:20:00Z', userId: 'unknown', userName: 'Unknown', userRole: '-', action: 'LOGIN', resource: 'Auth', details: 'Failed login attempt', ipAddress: '192.168.1.100', status: 'failure' },
  { id: '6', timestamp: '2026-01-15T14:15:00Z', userId: 'usr_admin', userName: 'Admin User', userRole: 'admin', action: 'UPDATE', resource: 'Settings', details: 'Updated SMTP configuration', ipAddress: '10.0.0.1', status: 'success' },
  { id: '7', timestamp: '2026-01-15T14:10:00Z', userId: 'usr_patient', userName: 'John Doe', userRole: 'patient', action: 'VIEW', resource: 'Vitals', details: 'Viewed own vital history', ipAddress: '73.45.123.89', status: 'success' },
  { id: '8', timestamp: '2026-01-15T14:05:00Z', userId: 'system', userName: 'System', userRole: 'system', action: 'CREATE', resource: 'Report', resourceId: 'rpt_456', details: 'Generated scheduled monthly report', ipAddress: 'internal', status: 'success' },
];

const actionFilters = [
  { value: 'all', label: 'All Actions' },
  { value: 'CREATE', label: 'Create' },
  { value: 'VIEW', label: 'View' },
  { value: 'UPDATE', label: 'Update' },
  { value: 'DELETE', label: 'Delete' },
  { value: 'LOGIN', label: 'Login' },
];

const resourceFilters = [
  { value: 'all', label: 'All Resources' },
  { value: 'User', label: 'Users' },
  { value: 'Patient', label: 'Patients' },
  { value: 'Vitals', label: 'Vitals' },
  { value: 'Alert', label: 'Alerts' },
  { value: 'Settings', label: 'Settings' },
  { value: 'Auth', label: 'Authentication' },
];

const actionIcons: Record<string, React.ElementType> = {
  CREATE: FileText,
  VIEW: Eye,
  UPDATE: Settings,
  DELETE: Database,
  LOGIN: Shield,
};

const actionColors: Record<string, string> = {
  CREATE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  VIEW: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  UPDATE: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  LOGIN: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

export default function AdminAuditLogsPage() {
  const { toast } = useToast();
  const [logs] = useState<AuditLog[]>(mockLogs);
  const [actionFilter, setActionFilter] = useState('all');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportLogs = useCallback(async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({ title: 'Export complete', description: 'Audit logs downloaded', type: 'success' });
    } finally {
      setIsExporting(false);
    }
  }, [toast]);

  const filteredLogs = logs.filter((log) => {
    if (actionFilter !== 'all' && log.action !== actionFilter) return false;
    if (resourceFilter !== 'all' && log.resource !== resourceFilter) return false;
    if (searchQuery && !log.userName.toLowerCase().includes(searchQuery.toLowerCase()) && !log.details.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const columns: Column<AuditLog>[] = [
    {
      key: 'timestamp',
      header: 'Time',
      render: (t: string) => (
        <div>
          <p className="font-medium">{new Date(t).toLocaleTimeString()}</p>
          <p className="text-xs text-gray-500">{new Date(t).toLocaleDateString()}</p>
        </div>
      ),
    },
    {
      key: 'userName',
      header: 'User',
      render: (_, log) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <User className="h-4 w-4 text-gray-500" />
          </div>
          <div>
            <p className="font-medium">{log.userName}</p>
            <p className="text-xs text-gray-500">{log.userRole}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (action: string) => {
        const Icon = actionIcons[action] || FileText;
        return (
          <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium', actionColors[action])}>
            <Icon className="h-3 w-3" />
            {action}
          </span>
        );
      },
    },
    {
      key: 'resource',
      header: 'Resource',
      render: (resource: string, log) => (
        <div>
          <p className="font-medium">{resource}</p>
          {log.resourceId && <p className="text-xs text-gray-500 font-mono">{log.resourceId}</p>}
        </div>
      ),
    },
    { key: 'details', header: 'Details', render: (d: string) => <span className="text-sm">{d}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (s: string) => (
        <Badge variant={s === 'success' ? 'success' : 'danger'}>{s}</Badge>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
            <p className="mt-1 text-sm text-gray-500">Track all system activities and changes</p>
          </div>
          <Button variant="outline" onClick={handleExportLogs} disabled={isExporting}>
            <Download className={`mr-2 h-4 w-4 ${isExporting ? 'animate-pulse' : ''}`} />
            {isExporting ? 'Exporting...' : 'Export Logs'}
          </Button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-4 border-b border-gray-200 p-4 dark:border-gray-700 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by user or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select options={actionFilters} value={actionFilter} onChange={setActionFilter} className="w-32" />
              <Select options={resourceFilters} value={resourceFilter} onChange={setResourceFilter} className="w-36" />
            </div>
          </div>
          <div className="p-4">
            <DataTable
              data={filteredLogs}
              columns={columns}
              onRowClick={(log) => { setSelectedLog(log); setShowModal(true); }}
            />
          </div>
        </div>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Audit Log Details" size="md">
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-3 dark:border-gray-700">
                  <p className="text-sm text-gray-500">Timestamp</p>
                  <p className="font-medium">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div className="rounded-lg border p-3 dark:border-gray-700">
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge variant={selectedLog.status === 'success' ? 'success' : 'danger'}>{selectedLog.status}</Badge>
                </div>
                <div className="rounded-lg border p-3 dark:border-gray-700">
                  <p className="text-sm text-gray-500">User</p>
                  <p className="font-medium">{selectedLog.userName}</p>
                  <p className="text-xs text-gray-500">{selectedLog.userId}</p>
                </div>
                <div className="rounded-lg border p-3 dark:border-gray-700">
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium capitalize">{selectedLog.userRole}</p>
                </div>
                <div className="rounded-lg border p-3 dark:border-gray-700">
                  <p className="text-sm text-gray-500">Action</p>
                  <span className={cn('inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium', actionColors[selectedLog.action])}>
                    {selectedLog.action}
                  </span>
                </div>
                <div className="rounded-lg border p-3 dark:border-gray-700">
                  <p className="text-sm text-gray-500">IP Address</p>
                  <p className="font-mono text-sm">{selectedLog.ipAddress}</p>
                </div>
              </div>
              <div className="rounded-lg border p-3 dark:border-gray-700">
                <p className="text-sm text-gray-500">Resource</p>
                <p className="font-medium">{selectedLog.resource}</p>
                {selectedLog.resourceId && <p className="font-mono text-sm text-gray-500">{selectedLog.resourceId}</p>}
              </div>
              <div className="rounded-lg border p-3 dark:border-gray-700">
                <p className="text-sm text-gray-500">Details</p>
                <p className="mt-1">{selectedLog.details}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
