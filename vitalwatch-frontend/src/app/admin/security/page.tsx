'use client';

import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/useToast';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DataTable, Column } from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Shield, Lock, AlertTriangle, UserX, Globe, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecurityEvent {
  id: string;
  type: 'login_failed' | 'suspicious_activity' | 'password_reset' | 'account_locked' | 'permission_change';
  description: string;
  user: string;
  ip: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface BlockedIP {
  id: string;
  ip: string;
  reason: string;
  blockedAt: string;
  attempts: number;
}

const mockEvents: SecurityEvent[] = [
  { id: '1', type: 'login_failed', description: 'Multiple failed login attempts', user: 'unknown@email.com', ip: '192.168.1.100', timestamp: '2026-01-15T14:30:00Z', severity: 'medium' },
  { id: '2', type: 'suspicious_activity', description: 'Login from new location', user: 'dr.smith@clinic.com', ip: '10.0.0.50', timestamp: '2026-01-15T14:25:00Z', severity: 'low' },
  { id: '3', type: 'account_locked', description: 'Account locked after 5 failed attempts', user: 'nurse.jones@hospital.org', ip: '172.16.0.25', timestamp: '2026-01-15T14:20:00Z', severity: 'high' },
  { id: '4', type: 'permission_change', description: 'User role changed to Admin', user: 'admin@VytalWatch.ai', ip: '10.0.0.1', timestamp: '2026-01-15T14:15:00Z', severity: 'medium' },
  { id: '5', type: 'password_reset', description: 'Password reset requested', user: 'patient123@gmail.com', ip: '192.168.1.50', timestamp: '2026-01-15T14:10:00Z', severity: 'low' },
];

const mockBlockedIPs: BlockedIP[] = [
  { id: '1', ip: '192.168.1.100', reason: 'Brute force attack', blockedAt: '2026-01-15T14:30:00Z', attempts: 15 },
  { id: '2', ip: '10.10.10.10', reason: 'Suspicious activity pattern', blockedAt: '2026-01-14T10:00:00Z', attempts: 8 },
];

const severityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function AdminSecurityPage() {
  const { toast } = useToast();
  const [events] = useState<SecurityEvent[]>(mockEvents);
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>(mockBlockedIPs);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [newBlockIP, setNewBlockIP] = useState('');
  const [newBlockReason, setNewBlockReason] = useState('');

  const handleBlockIP = useCallback(() => {
    if (newBlockIP && newBlockReason) {
      setBlockedIPs(prev => [
        { id: Date.now().toString(), ip: newBlockIP, reason: newBlockReason, blockedAt: new Date().toISOString(), attempts: 0 },
        ...prev,
      ]);
      setShowBlockModal(false);
      toast({ title: 'IP blocked', description: `${newBlockIP} has been blocked`, type: 'success' });
      setNewBlockIP('');
      setNewBlockReason('');
    }
  }, [newBlockIP, newBlockReason, toast]);

  const handleUnblockIP = useCallback((id: string) => {
    const ip = blockedIPs.find(i => i.id === id);
    setBlockedIPs(prev => prev.filter((i) => i.id !== id));
    toast({ title: 'IP unblocked', description: ip ? `${ip.ip} has been unblocked` : 'IP has been unblocked', type: 'success' });
  }, [blockedIPs, toast]);

  const handleConfigureSettings = useCallback(() => {
    toast({ title: 'Configure settings', description: 'Opening security settings...', type: 'info' });
  }, [toast]);

  const eventColumns: Column<SecurityEvent>[] = [
    {
      key: 'timestamp',
      header: 'Time',
      render: (t: string) => new Date(t).toLocaleString(),
    },
    {
      key: 'severity',
      header: 'Severity',
      render: (s: string) => (
        <span className={cn('rounded-full px-2 py-1 text-xs font-medium', severityColors[s])}>
          {s}
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Event',
      render: (t: string) => t.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    },
    { key: 'description', header: 'Description' },
    { key: 'user', header: 'User' },
    { key: 'ip', header: 'IP Address' },
  ];

  const ipColumns: Column<BlockedIP>[] = [
    { key: 'ip', header: 'IP Address', render: (ip: string) => <code className="text-sm">{ip}</code> },
    { key: 'reason', header: 'Reason' },
    { key: 'attempts', header: 'Attempts', render: (a: number) => <Badge variant="danger">{a}</Badge> },
    { key: 'blockedAt', header: 'Blocked', render: (d: string) => new Date(d).toLocaleString() },
  ];

  const criticalCount = events.filter((e) => e.severity === 'critical' || e.severity === 'high').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Center</h1>
            <p className="mt-1 text-sm text-gray-500">Monitor security events and manage access controls</p>
          </div>
          <Button onClick={() => setShowBlockModal(true)}>
            <Ban className="mr-2 h-4 w-4" />
            Block IP
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Security Score"
            value="94/100"
            subtitle="Excellent"
            icon={<Shield className="h-5 w-5" />}
            className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
          />
          <MetricCard
            title="Failed Logins (24h)"
            value="12"
            subtitle="3 unique users"
            icon={<Lock className="h-5 w-5" />}
          />
          <MetricCard
            title="High/Critical Events"
            value={criticalCount.toString()}
            subtitle="Requires attention"
            icon={<AlertTriangle className="h-5 w-5" />}
            className={criticalCount > 0 ? 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20' : ''}
          />
          <MetricCard
            title="Blocked IPs"
            value={blockedIPs.length.toString()}
            subtitle="Active blocks"
            icon={<UserX className="h-5 w-5" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-200 p-4 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Recent Security Events</h3>
            </div>
            <div className="p-4">
              <DataTable data={events} columns={eventColumns} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-semibold">Security Settings</h3>
              <div className="space-y-4">
                {[
                  { label: '2FA Required', enabled: true },
                  { label: 'Session Timeout (30m)', enabled: true },
                  { label: 'IP Whitelisting', enabled: false },
                  { label: 'Audit Logging', enabled: true },
                  { label: 'Rate Limiting', enabled: true },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <span className="text-sm">{setting.label}</span>
                    <Badge variant={setting.enabled ? 'success' : 'secondary'}>
                      {setting.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full" onClick={handleConfigureSettings}>Configure Settings</Button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-semibold">Compliance Status</h3>
              <div className="space-y-3">
                {[
                  { name: 'HIPAA', status: 'compliant' },
                  { name: 'SOC 2 Type II', status: 'compliant' },
                  { name: 'GDPR', status: 'compliant' },
                ].map((cert) => (
                  <div key={cert.name} className="flex items-center justify-between rounded-lg border p-3 dark:border-gray-700">
                    <span className="font-medium">{cert.name}</span>
                    <Badge variant="success">{cert.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-lg font-semibold">Blocked IP Addresses</h3>
            <Badge variant="secondary">{blockedIPs.length} blocked</Badge>
          </div>
          <div className="p-4">
            <DataTable
              data={blockedIPs}
              columns={ipColumns}
              actions={[
                {
                  label: 'Unblock',
                  icon: <Globe className="h-4 w-4" />,
                  onClick: (ip) => handleUnblockIP(ip.id),
                },
              ]}
            />
          </div>
        </div>

        <Modal isOpen={showBlockModal} onClose={() => setShowBlockModal(false)} title="Block IP Address" size="sm">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">IP Address</label>
              <Input value={newBlockIP} onChange={(e) => setNewBlockIP(e.target.value)} placeholder="e.g., 192.168.1.100" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Reason</label>
              <Input value={newBlockReason} onChange={(e) => setNewBlockReason(e.target.value)} placeholder="e.g., Brute force attack" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowBlockModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleBlockIP} disabled={!newBlockIP || !newBlockReason}>
                <Ban className="mr-2 h-4 w-4" />
                Block
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
