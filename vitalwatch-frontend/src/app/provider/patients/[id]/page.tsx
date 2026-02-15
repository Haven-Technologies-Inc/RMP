'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VitalSignCard } from '@/components/dashboard/VitalSignCard';
import { TrendChart, MultiLineChart, RiskScoreGauge } from '@/components/dashboard/Charts';
import { AIInsightsPanel } from '@/components/dashboard/AIInsightCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { patientsApi, tenoviApi } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import type { TenoviHwiDevice } from '@/types';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  MessageSquare,
  FileText,
  Pill,
  Activity,
  AlertTriangle,
  ChevronLeft,
  Smartphone,
  Wifi,
  WifiOff,
  RefreshCw,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'vitals', label: 'Vitals History', icon: Activity },
  { id: 'devices', label: 'Devices', icon: Smartphone },
  { id: 'insights', label: 'AI Insights', icon: Activity },
  { id: 'care-plan', label: 'Care Plan', icon: FileText },
  { id: 'medications', label: 'Medications', icon: Pill },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
];

const sensorCodeToType: Record<string, { name: string; icon: string }> = {
  'BP': { name: 'Blood Pressure Monitor', icon: '🩺' },
  'WS': { name: 'Weight Scale', icon: '⚖️' },
  'PO': { name: 'Pulse Oximeter', icon: '💓' },
  'GM': { name: 'Glucose Meter', icon: '🩸' },
  'TH': { name: 'Thermometer', icon: '🌡️' },
};

const mockPatient = {
  id: '1',
  firstName: 'Maria',
  lastName: 'Garcia',
  age: 67,
  dateOfBirth: '1958-03-15',
  email: 'maria.garcia@email.com',
  phone: '+1 (555) 234-5678',
  address: '456 Oak Street, City, State 12345',
  conditions: ['Hypertension', 'CHF'],
  riskScore: 78,
  enrolledDate: '2025-10-01',
  primaryProvider: 'Dr. Sarah Smith',
  emergencyContact: {
    name: 'Carlos Garcia',
    phone: '+1 (555) 345-6789',
    relation: 'Spouse',
  },
  insurance: {
    provider: 'Medicare',
    policyNumber: 'MED-123456789',
  },
};

const mockVitals = [
  { type: 'bp' as const, value: '158/95', unit: 'mmHg', status: 'warning' as const, timestamp: new Date(), trend: 'up' as const },
  { type: 'heart_rate' as const, value: '82', unit: 'bpm', status: 'normal' as const, timestamp: new Date(), trend: 'stable' as const },
  { type: 'spo2' as const, value: '94', unit: '%', status: 'warning' as const, timestamp: new Date(), trend: 'down' as const },
  { type: 'weight' as const, value: '172', unit: 'lbs', status: 'warning' as const, timestamp: new Date(), trend: 'up' as const, secondaryValue: '+3 lbs in 2 days' },
];

const mockTrendData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  systolic: 140 + Math.floor(Math.random() * 30),
  diastolic: 85 + Math.floor(Math.random() * 15),
  weight: 168 + Math.floor(Math.random() * 6),
}));

const mockInsights = [
  {
    type: 'prediction' as const,
    title: 'CHF Exacerbation Risk',
    description: 'Based on recent weight gain and elevated BP, there is a 73% risk of CHF exacerbation within 5 days.',
    confidence: 0.73,
    actionLabel: 'View Details',
  },
  {
    type: 'recommendation' as const,
    title: 'Medication Adjustment',
    description: 'Consider increasing furosemide from 40mg to 60mg based on fluid retention patterns.',
    confidence: 0.81,
    actionLabel: 'Review',
  },
  {
    type: 'trend' as const,
    title: 'BP Trending Upward',
    description: 'Blood pressure has increased by 12% over the past 7 days.',
    confidence: 0.91,
  },
];

const mockDevices: TenoviHwiDevice[] = [
  {
    id: 'dev_demo_001',
    hwiDeviceId: 'hwi_demo_001',
    sensorCode: 'BP',
    status: 'active',
    lastMeasurement: new Date().toISOString(),
    deviceName: 'Blood Pressure Monitor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dev_demo_002',
    hwiDeviceId: 'hwi_demo_002',
    sensorCode: 'WS',
    status: 'active',
    lastMeasurement: new Date(Date.now() - 3600000).toISOString(),
    deviceName: 'Weight Scale',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dev_demo_003',
    hwiDeviceId: 'hwi_demo_003',
    sensorCode: 'PO',
    status: 'disconnected',
    lastMeasurement: new Date(Date.now() - 86400000).toISOString(),
    deviceName: 'Pulse Oximeter',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id as string;
  const [activeTab, setActiveTab] = useState('overview');
  const [devices, setDevices] = useState<TenoviHwiDevice[]>([]);
  const [devicesLoading, setDevicesLoading] = useState(false);
  const [syncingDevice, setSyncingDevice] = useState<string | null>(null);
  const { useDemoMode } = useAuthStore();

  const fetchDevices = useCallback(async () => {
    if (!patientId) return;
    try {
      setDevicesLoading(true);
      
      // Use mock data in demo mode to avoid 401 errors
      if (useDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        setDevices(mockDevices);
        return;
      }
      
      const response = await patientsApi.getDevices(patientId);
      if (response.data?.tenoviDevices) {
        setDevices(response.data.tenoviDevices);
      }
    } catch (err) {
      console.error('Error fetching devices:', err);
    } finally {
      setDevicesLoading(false);
    }
  }, [patientId, useDemoMode]);

  useEffect(() => {
    if (activeTab === 'devices') {
      fetchDevices();
    }
  }, [activeTab, fetchDevices]);

  const handleSyncDevice = async (deviceId: string) => {
    try {
      setSyncingDevice(deviceId);
      
      // Simulate sync in demo mode
      if (useDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        await tenoviApi.syncDevice(deviceId);
      }
      
      await fetchDevices();
    } catch (err) {
      console.error('Sync error:', err);
    } finally {
      setSyncingDevice(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/provider/patients">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Patients
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-80">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-10 w-10" />
                </div>
                <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                  {mockPatient.firstName} {mockPatient.lastName}
                </h1>
                <p className="text-gray-500">{mockPatient.age} years old</p>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {mockPatient.conditions.map((c) => (
                    <Badge key={c} variant="secondary">{c}</Badge>
                  ))}
                </div>
              </div>

              <div className="my-6 flex justify-center">
                <RiskScoreGauge score={mockPatient.riskScore} size={150} />
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{mockPatient.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{mockPatient.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{mockPatient.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Enrolled: {new Date(mockPatient.enrolledDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button className="flex-1" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex gap-2 overflow-x-auto border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-400">2 Active Alerts</p>
                      <p className="text-sm text-red-600 dark:text-red-500">
                        Weight gain of 3 lbs in 2 days • Elevated blood pressure
                      </p>
                    </div>
                    <Button size="sm" className="ml-auto bg-red-600 hover:bg-red-700">
                      Review Alerts
                    </Button>
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Latest Readings</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {mockVitals.map((vital) => (
                      <VitalSignCard key={vital.type} {...vital} />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">30-Day BP Trend</h2>
                  <MultiLineChart
                    data={mockTrendData}
                    xKey="date"
                    lines={[
                      { key: 'systolic', label: 'Systolic', color: '#EF4444' },
                      { key: 'diastolic', label: 'Diastolic', color: '#3B82F6' },
                    ]}
                    height={250}
                  />
                </div>

                <AIInsightsPanel insights={mockInsights} />
              </div>
            )}

            {activeTab === 'vitals' && (
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h2 className="mb-4 text-lg font-semibold">Blood Pressure History</h2>
                  <TrendChart
                    data={mockTrendData}
                    xKey="date"
                    yKey="systolic"
                    height={300}
                    normalRange={{ min: 90, max: 140 }}
                  />
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h2 className="mb-4 text-lg font-semibold">Weight History</h2>
                  <TrendChart
                    data={mockTrendData}
                    xKey="date"
                    yKey="weight"
                    height={300}
                    color="#10B981"
                  />
                </div>
              </div>
            )}

            {activeTab === 'devices' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Patient Devices</h2>
                  <Button variant="outline" size="sm" onClick={fetchDevices} disabled={devicesLoading}>
                    <RefreshCw className={cn('mr-2 h-4 w-4', devicesLoading && 'animate-spin')} />
                    Refresh
                  </Button>
                </div>

                {devicesLoading ? (
                  <div className="flex h-48 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading devices...</span>
                  </div>
                ) : devices.length === 0 ? (
                  <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
                    <Smartphone className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No devices assigned</h3>
                    <p className="mt-2 text-gray-500">This patient has no Tenovi devices assigned.</p>
                    <Button className="mt-4">Assign Device</Button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {devices.map((device) => {
                      const deviceInfo = sensorCodeToType[device.sensorCode || ''] || { name: device.deviceName || 'Device', icon: '📱' };
                      const isConnected = device.status === 'connected' || device.status === 'active';
                      const isSyncing = syncingDevice === device.hwiDeviceId;

                      return (
                        <div
                          key={device.id}
                          className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{deviceInfo.icon}</span>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{deviceInfo.name}</h3>
                                <p className="text-sm text-gray-500">{device.modelNumber || device.hwiDeviceId}</p>
                              </div>
                            </div>
                            <Badge variant={isConnected ? 'success' : 'secondary'}>
                              {isConnected ? <><Wifi className="mr-1 h-3 w-3" />Active</> : <><WifiOff className="mr-1 h-3 w-3" />Offline</>}
                            </Badge>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-500">Last Reading</p>
                              <p className="font-medium">{device.lastMeasurement ? new Date(device.lastMeasurement).toLocaleString() : 'Never'}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Status</p>
                              <p className="font-medium capitalize">{device.status}</p>
                            </div>
                            {device.shippingStatus && (
                              <div className="col-span-2">
                                <p className="text-gray-500">Shipping</p>
                                <p className="font-medium">{device.shippingStatus === 'DE' ? 'Delivered' : device.shippingStatus}</p>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleSyncDevice(device.hwiDeviceId)} disabled={isSyncing}>
                              <RefreshCw className={cn('mr-1 h-3 w-3', isSyncing && 'animate-spin')} />
                              {isSyncing ? 'Syncing...' : 'Sync'}
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">Unassign</Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'insights' && (
              <AIInsightsPanel insights={mockInsights} className="border-0 bg-transparent" />
            )}

            {activeTab === 'care-plan' && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-4 text-lg font-semibold">Care Plan</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Goals</h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Maintain blood pressure below 140/90 mmHg</li>
                      <li>Reduce weight by 5 lbs over 3 months</li>
                      <li>Achieve 90%+ medication adherence</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Monitoring Frequency</h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-gray-600 dark:text-gray-400">
                      <li>Blood pressure: 2x daily</li>
                      <li>Weight: Daily</li>
                      <li>SpO2: Daily</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Notes</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Patient has history of non-adherence. Recommend weekly check-in calls.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medications' && (
              <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                  <h2 className="text-lg font-semibold">Current Medications</h2>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    { name: 'Lisinopril', dosage: '20mg', frequency: 'Once daily', purpose: 'Blood pressure' },
                    { name: 'Furosemide', dosage: '40mg', frequency: 'Once daily', purpose: 'CHF/Fluid retention' },
                    { name: 'Carvedilol', dosage: '12.5mg', frequency: 'Twice daily', purpose: 'Heart rate/BP' },
                    { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', purpose: 'Blood thinner' },
                  ].map((med) => (
                    <div key={med.name} className="flex items-center justify-between px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          <Pill className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{med.name}</p>
                          <p className="text-sm text-gray-500">{med.dosage} • {med.frequency}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{med.purpose}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'communication' && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-4 text-lg font-semibold">Communication History</h2>
                <div className="space-y-4">
                  {[
                    { type: 'message', date: '2026-01-14', content: 'Reminded patient to weigh daily and report any sudden increases.' },
                    { type: 'call', date: '2026-01-10', content: 'Discussed BP medication timing. Patient will take in morning.' },
                    { type: 'alert', date: '2026-01-08', content: 'Sent critical BP alert notification to patient.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <div className={cn(
                        'rounded-full p-2',
                        item.type === 'message' && 'bg-blue-100 text-blue-600',
                        item.type === 'call' && 'bg-green-100 text-green-600',
                        item.type === 'alert' && 'bg-red-100 text-red-600',
                      )}>
                        {item.type === 'message' && <MessageSquare className="h-4 w-4" />}
                        {item.type === 'call' && <Phone className="h-4 w-4" />}
                        {item.type === 'alert' && <AlertTriangle className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                        <p className="text-gray-900 dark:text-white">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
