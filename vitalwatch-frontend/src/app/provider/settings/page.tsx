'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  User, 
  Bell, 
  Shield, 
  Clock, 
  Globe, 
  Lock,
  Mail,
  Phone,
  Save,
  Camera,
  AlertTriangle,
  RefreshCw,
  Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/useToast';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'alerts', label: 'Alert Settings', icon: AlertTriangle },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'availability', label: 'Availability', icon: Clock },
  { id: 'preferences', label: 'Preferences', icon: Globe },
];

export default function ProviderSettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarah.smith@clinic.com',
    phone: '+1 (555) 234-5678',
    specialty: 'Cardiology',
    npi: '1234567890',
    organization: 'City Clinic',
    licenseState: 'CA',
    licenseNumber: 'MD12345',
  });

  const [alertSettings, setAlertSettings] = useState({
    criticalAlerts: true,
    warningAlerts: true,
    infoAlerts: false,
    afterHoursAlerts: true,
    escalationDelay: '15',
    criticalThresholds: {
      systolicHigh: '180',
      systolicLow: '90',
      glucoseHigh: '300',
      glucoseLow: '50',
      spo2Low: '88',
    },
  });

  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '09:00', end: '12:00' },
    sunday: { enabled: false, start: '', end: '' },
  });

  const handleSaveProfile = useCallback(async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: 'Profile saved', description: 'Your profile has been updated', type: 'success' });
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const handleSaveAlerts = useCallback(async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: 'Alert settings saved', description: 'Your alert preferences have been updated', type: 'success' });
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const handleSaveSchedule = useCallback(async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: 'Schedule saved', description: 'Your availability has been updated', type: 'success' });
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const handleUpdatePassword = useCallback(async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({ title: 'Password updated', description: 'Your password has been changed successfully', type: 'success' });
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const handleManage2FA = useCallback(() => {
    toast({ title: '2FA Management', description: 'Opening two-factor authentication settings', type: 'info' });
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Settings</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your profile, notifications, and practice settings
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Provider Profile</h2>
                
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-10 w-10" />
                    </div>
                    <button className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 shadow-md dark:bg-gray-800" aria-label="Change profile photo">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Dr. {profile.firstName} {profile.lastName}</p>
                    <p className="text-sm text-gray-500">{profile.specialty}</p>
                    <Badge variant="success" className="mt-1">Verified</Badge>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                    <Input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                    <Input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                    <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Specialty</label>
                    <Input value={profile.specialty} onChange={(e) => setProfile({ ...profile, specialty: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">NPI Number</label>
                    <Input value={profile.npi} onChange={(e) => setProfile({ ...profile, npi: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">License State</label>
                    <Input value={profile.licenseState} onChange={(e) => setProfile({ ...profile, licenseState: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">License Number</label>
                    <Input value={profile.licenseNumber} onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })} />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Alert Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'criticalAlerts', label: 'Critical Alerts', desc: 'Receive alerts for critical vital readings', color: 'red' },
                      { key: 'warningAlerts', label: 'Warning Alerts', desc: 'Receive alerts for concerning trends', color: 'yellow' },
                      { key: 'infoAlerts', label: 'Informational Alerts', desc: 'Receive general updates and reminders', color: 'blue' },
                      { key: 'afterHoursAlerts', label: 'After-Hours Alerts', desc: 'Receive critical alerts outside business hours', color: 'purple' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={alertSettings[item.key as keyof typeof alertSettings] as boolean}
                            onChange={(e) => setAlertSettings({ ...alertSettings, [item.key]: e.target.checked })}
                            className="peer sr-only"
                            aria-label={`Toggle ${item.label}`}
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Escalation Delay (minutes)
                    </label>
                    <Input
                      type="number"
                      value={alertSettings.escalationDelay}
                      onChange={(e) => setAlertSettings({ ...alertSettings, escalationDelay: e.target.value })}
                      className="w-32"
                    />
                    <p className="mt-1 text-sm text-gray-500">Time before unacknowledged alerts escalate</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Custom Alert Thresholds</h2>
                  <p className="mb-4 text-sm text-gray-500">Override default thresholds for your patients</p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Systolic BP High</label>
                      <Input
                        type="number"
                        value={alertSettings.criticalThresholds.systolicHigh}
                        onChange={(e) => setAlertSettings({
                          ...alertSettings,
                          criticalThresholds: { ...alertSettings.criticalThresholds, systolicHigh: e.target.value }
                        })}
                        placeholder="mmHg"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Systolic BP Low</label>
                      <Input
                        type="number"
                        value={alertSettings.criticalThresholds.systolicLow}
                        onChange={(e) => setAlertSettings({
                          ...alertSettings,
                          criticalThresholds: { ...alertSettings.criticalThresholds, systolicLow: e.target.value }
                        })}
                        placeholder="mmHg"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Glucose High</label>
                      <Input
                        type="number"
                        value={alertSettings.criticalThresholds.glucoseHigh}
                        onChange={(e) => setAlertSettings({
                          ...alertSettings,
                          criticalThresholds: { ...alertSettings.criticalThresholds, glucoseHigh: e.target.value }
                        })}
                        placeholder="mg/dL"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Glucose Low</label>
                      <Input
                        type="number"
                        value={alertSettings.criticalThresholds.glucoseLow}
                        onChange={(e) => setAlertSettings({
                          ...alertSettings,
                          criticalThresholds: { ...alertSettings.criticalThresholds, glucoseLow: e.target.value }
                        })}
                        placeholder="mg/dL"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">SpO2 Low</label>
                      <Input
                        type="number"
                        value={alertSettings.criticalThresholds.spo2Low}
                        onChange={(e) => setAlertSettings({
                          ...alertSettings,
                          criticalThresholds: { ...alertSettings.criticalThresholds, spo2Low: e.target.value }
                        })}
                        placeholder="%"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Working Hours</h2>
                <p className="mb-4 text-sm text-gray-500">Set your availability for patient communication and alerts</p>
                
                <div className="space-y-4">
                  {Object.entries(availability).map(([day, schedule]) => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-24">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={schedule.enabled}
                            onChange={(e) => setAvailability({
                              ...availability,
                              [day]: { ...schedule, enabled: e.target.checked }
                            })}
                            className="peer sr-only"
                            aria-label={`Toggle ${day} availability`}
                          />
                          <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700"></div>
                        </label>
                        <span className="ml-2 text-sm font-medium capitalize">{day}</span>
                      </div>
                      {schedule.enabled && (
                        <>
                          <Input
                            type="time"
                            value={schedule.start}
                            onChange={(e) => setAvailability({
                              ...availability,
                              [day]: { ...schedule, start: e.target.value }
                            })}
                            className="w-32"
                          />
                          <span className="text-gray-500">to</span>
                          <Input
                            type="time"
                            value={schedule.end}
                            onChange={(e) => setAvailability({
                              ...availability,
                              [day]: { ...schedule, end: e.target.value }
                            })}
                            className="w-32"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveSchedule} disabled={isSaving}>
                    {isSaving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {isSaving ? 'Saving...' : 'Save Schedule'}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', desc: 'Receive alerts via email', icon: Mail },
                    { label: 'SMS Notifications', desc: 'Receive alerts via text message', icon: Phone },
                    { label: 'Push Notifications', desc: 'Receive notifications on your device', icon: Bell },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" defaultChecked className="peer sr-only" aria-label={`Toggle ${item.label}`} />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Change Password</h2>
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                      <Input type="password" placeholder="Enter current password" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                    <Button onClick={handleUpdatePassword} disabled={isSaving}>
                      {isSaving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {isSaving ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h2>
                      <p className="mt-1 text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Badge variant="success">Enabled</Badge>
                  </div>
                  <Button variant="outline" className="mt-4" onClick={handleManage2FA}>
                    <Lock className="mr-2 h-4 w-4" />
                    Manage 2FA
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">App Preferences</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Moon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                        <p className="text-sm text-gray-500">Use dark theme</p>
                      </div>
                    </div>
                    {mounted && (
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input 
                          type="checkbox" 
                          className="peer sr-only" 
                          aria-label="Toggle dark mode"
                          checked={theme === 'dark'}
                          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
                      </label>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Dashboard Layout</p>
                      <p className="text-sm text-gray-500">Choose your preferred layout</p>
                    </div>
                    <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800" aria-label="Dashboard layout selection">
                      <option>Compact</option>
                      <option>Standard</option>
                      <option>Expanded</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
