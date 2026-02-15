'use client';

import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/useToast';
import { DataTable, Column } from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Key, Plus, Copy, Eye, EyeOff, Trash2, RefreshCw, Shield } from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed: string | null;
  createdAt: string;
  expiresAt: string | null;
  status: 'active' | 'expired' | 'revoked';
}

const mockKeys: APIKey[] = [
  { id: '1', name: 'Production API', key: 'vw_live_sk_1a2b3c4d5e6f7g8h9i0j', permissions: ['read', 'write'], lastUsed: '2026-01-15T10:30:00Z', createdAt: '2025-06-01T00:00:00Z', expiresAt: null, status: 'active' },
  { id: '2', name: 'Development API', key: 'vw_test_sk_9z8y7x6w5v4u3t2s1r0q', permissions: ['read', 'write'], lastUsed: '2026-01-14T15:45:00Z', createdAt: '2025-09-15T00:00:00Z', expiresAt: null, status: 'active' },
  { id: '3', name: 'Webhook Integration', key: 'vw_live_wh_abcdef123456789', permissions: ['webhook'], lastUsed: '2026-01-15T09:00:00Z', createdAt: '2025-11-01T00:00:00Z', expiresAt: '2026-11-01T00:00:00Z', status: 'active' },
  { id: '4', name: 'Legacy API (deprecated)', key: 'vw_live_sk_oldkey123456', permissions: ['read'], lastUsed: '2025-12-01T00:00:00Z', createdAt: '2024-01-01T00:00:00Z', expiresAt: '2025-12-31T00:00:00Z', status: 'expired' },
];

const permissionOptions = [
  { value: 'read', label: 'Read' },
  { value: 'write', label: 'Write' },
  { value: 'delete', label: 'Delete' },
  { value: 'webhook', label: 'Webhook' },
  { value: 'admin', label: 'Admin' },
];

export default function AdminAPIKeysPage() {
  const { toast } = useToast();
  const [keys, setKeys] = useState<APIKey[]>(mockKeys);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>(['read']);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = useCallback(async (key: string, keyId: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(keyId);
    toast({ title: 'Copied', description: 'API key copied to clipboard', type: 'success' });
    setTimeout(() => setCopiedKey(null), 2000);
  }, [toast]);

  const handleCreateKey = useCallback(() => {
    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `vw_live_sk_${Math.random().toString(36).slice(2)}`,
      permissions: newKeyPermissions,
      lastUsed: null,
      createdAt: new Date().toISOString(),
      expiresAt: null,
      status: 'active',
    };
    setKeys(prev => [newKey, ...prev]);
    setShowCreateModal(false);
    setNewKeyName('');
    setNewKeyPermissions(['read']);
    toast({ title: 'API key created', description: `${newKeyName} is now active`, type: 'success' });
  }, [newKeyName, newKeyPermissions, toast]);

  const handleDeleteKey = useCallback(() => {
    if (selectedKey) {
      setKeys(prev => prev.filter((k) => k.id !== selectedKey.id));
      setShowDeleteDialog(false);
      toast({ title: 'API key deleted', description: `${selectedKey.name} has been revoked`, type: 'success' });
      setSelectedKey(null);
    }
  }, [selectedKey, toast]);

  const handleRegenerateKey = useCallback((key: APIKey) => {
    const newKeyValue = `vw_live_sk_${Math.random().toString(36).slice(2)}`;
    setKeys(prev => prev.map(k => k.id === key.id ? { ...k, key: newKeyValue, lastUsed: null } : k));
    toast({ title: 'API key regenerated', description: `${key.name} has a new key value`, type: 'success' });
  }, [toast]);

  const columns: Column<APIKey>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (_, k) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{k.name}</p>
          <p className="text-xs text-gray-500">Created {new Date(k.createdAt).toLocaleDateString()}</p>
        </div>
      ),
    },
    {
      key: 'key',
      header: 'API Key',
      render: (key: string, k) => (
        <div className="flex items-center gap-2">
          <code className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
            {visibleKeys.has(k.id) ? key : `${key.slice(0, 12)}${'•'.repeat(16)}`}
          </code>
          <button onClick={() => toggleKeyVisibility(k.id)} className="text-gray-400 hover:text-gray-600" title={visibleKeys.has(k.id) ? 'Hide key' : 'Show key'}>
            {visibleKeys.has(k.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button onClick={() => copyToClipboard(key, k.id)} className="text-gray-400 hover:text-gray-600" title="Copy key">
            <Copy className="h-4 w-4" />
          </button>
          {copiedKey === k.id && <span className="text-xs text-green-600">Copied!</span>}
        </div>
      ),
    },
    {
      key: 'permissions',
      header: 'Permissions',
      render: (perms: string[]) => (
        <div className="flex flex-wrap gap-1">
          {perms.map((p) => (
            <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'lastUsed',
      header: 'Last Used',
      render: (d: string | null) => d ? new Date(d).toLocaleDateString() : 'Never',
    },
    {
      key: 'status',
      header: 'Status',
      render: (s: string) => (
        <Badge variant={s === 'active' ? 'success' : s === 'expired' ? 'warning' : 'danger'}>{s}</Badge>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">API Keys</h1>
            <p className="mt-1 text-sm text-gray-500">Manage API keys for external integrations</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create API Key
          </Button>
        </div>

        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/20">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800 dark:text-yellow-400">Security Notice</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-500">
                API keys grant access to your VytalWatch data. Never share keys publicly or commit them to version control. 
                Rotate keys regularly and revoke unused keys.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <h3 className="text-lg font-semibold">Active Keys ({keys.filter((k) => k.status === 'active').length})</h3>
          </div>
          <div className="p-4">
            <DataTable
              data={keys}
              columns={columns}
              actions={[
                { label: 'Regenerate', icon: <RefreshCw className="h-4 w-4" />, onClick: (k) => handleRegenerateKey(k) },
                {
                  label: 'Delete',
                  icon: <Trash2 className="h-4 w-4" />,
                  onClick: (k) => { setSelectedKey(k); setShowDeleteDialog(true); },
                  variant: 'danger',
                },
              ]}
            />
          </div>
        </div>

        <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create API Key" size="md">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Key Name</label>
              <Input value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="e.g., Production API" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Permissions</label>
              <div className="flex flex-wrap gap-2">
                {permissionOptions.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newKeyPermissions.includes(opt.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewKeyPermissions([...newKeyPermissions, opt.value]);
                        } else {
                          setNewKeyPermissions(newKeyPermissions.filter((p) => p !== opt.value));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleCreateKey} disabled={!newKeyName.trim()}>
                <Key className="mr-2 h-4 w-4" />
                Create Key
              </Button>
            </div>
          </div>
        </Modal>

        <ConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={handleDeleteKey}
          title="Delete API Key"
          message={`Are you sure you want to delete "${selectedKey?.name}"? This action cannot be undone and will immediately revoke access.`}
          confirmText="Delete Key"
          variant="danger"
        />
      </div>
    </DashboardLayout>
  );
}
