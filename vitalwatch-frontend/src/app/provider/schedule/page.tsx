'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Avatar } from '@/components/ui/Avatar';
import { Calendar, Plus, ChevronLeft, ChevronRight, Video, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  type: 'video' | 'phone' | 'in-person';
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
}

const mockAppointments: Record<string, Appointment[]> = {
  '2026-01-15': [
    { id: '1', patientName: 'John Doe', patientId: 'pat_123', type: 'video', time: '09:00', duration: 30, status: 'completed', reason: 'BP Review' },
    { id: '2', patientName: 'Maria Garcia', patientId: 'pat_456', type: 'phone', time: '10:00', duration: 15, status: 'completed', reason: 'Medication Check' },
    { id: '3', patientName: 'Robert Chen', patientId: 'pat_789', type: 'video', time: '11:30', duration: 30, status: 'scheduled', reason: 'Quarterly Review' },
    { id: '4', patientName: 'Sarah Johnson', patientId: 'pat_012', type: 'in-person', time: '14:00', duration: 45, status: 'scheduled', reason: 'New Patient' },
    { id: '5', patientName: 'Michael Brown', patientId: 'pat_345', type: 'video', time: '15:30', duration: 30, status: 'scheduled', reason: 'Follow-up' },
  ],
  '2026-01-16': [
    { id: '6', patientName: 'Emily Davis', patientId: 'pat_678', type: 'video', time: '09:30', duration: 30, status: 'scheduled', reason: 'Glucose Review' },
    { id: '7', patientName: 'James Wilson', patientId: 'pat_901', type: 'phone', time: '11:00', duration: 15, status: 'scheduled', reason: 'Lab Results' },
  ],
  '2026-01-17': [
    { id: '8', patientName: 'Patricia Martinez', patientId: 'pat_234', type: 'video', time: '10:00', duration: 30, status: 'scheduled', reason: 'Monthly Check' },
  ],
};

const typeIcons = {
  video: Video,
  phone: Phone,
  'in-person': MapPin,
};

const appointmentTypes = [
  { value: 'video', label: 'Video Call' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'in-person', label: 'In-Person' },
];

const durations = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '60 minutes' },
];

export default function ProviderSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date('2026-01-15'));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const dateKey = selectedDate.toISOString().split('T')[0];
  const appointments = mockAppointments[dateKey] || [];

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setSelectedDate(newDate);
  };

  const getWeekDays = () => {
    const days = [];
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay());
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Schedule</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your appointments</p>
          </div>
          <div className="flex gap-2">
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setViewMode('day')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium',
                  viewMode === 'day' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'
                )}
              >
                Day
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium',
                  viewMode === 'week' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'
                )}
              >
                Week
              </button>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
            <button onClick={() => navigateDate('prev')} className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <h2 className="text-lg font-semibold">
                {viewMode === 'day'
                  ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                  : `${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                }
              </h2>
              <p className="text-sm text-gray-500">{appointments.length} appointments</p>
            </div>
            <button onClick={() => navigateDate('next')} className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {viewMode === 'week' && (
            <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
              {weekDays.map((day) => {
                const dayKey = day.toISOString().split('T')[0];
                const dayAppointments = mockAppointments[dayKey] || [];
                const isToday = day.toDateString() === new Date('2026-01-15').toDateString();
                const isSelected = day.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={dayKey}
                    onClick={() => { setSelectedDate(day); setViewMode('day'); }}
                    className={cn(
                      'flex flex-col items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800',
                      isSelected && 'bg-primary/5'
                    )}
                  >
                    <span className="text-xs text-gray-500">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className={cn(
                      'mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                      isToday && 'bg-primary text-white',
                      isSelected && !isToday && 'border-2 border-primary'
                    )}>
                      {day.getDate()}
                    </span>
                    {dayAppointments.length > 0 && (
                      <span className="mt-1 text-xs text-gray-500">{dayAppointments.length} appts</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="p-4">
            {appointments.length === 0 ? (
              <div className="py-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-gray-500">No appointments scheduled for this day</p>
                <Button className="mt-4" onClick={() => setShowCreateModal(true)}>
                  Schedule Appointment
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt) => {
                  const Icon = typeIcons[apt.type];
                  return (
                    <div
                      key={apt.id}
                      className={cn(
                        'flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800',
                        apt.status === 'completed' && 'opacity-60',
                        apt.status === 'cancelled' && 'opacity-40 line-through'
                      )}
                    >
                      <div className="flex flex-col items-center text-center">
                        <span className="text-lg font-bold">{apt.time}</span>
                        <span className="text-xs text-gray-500">{apt.duration} min</span>
                      </div>
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg',
                        apt.type === 'video' && 'bg-blue-100 text-blue-600',
                        apt.type === 'phone' && 'bg-green-100 text-green-600',
                        apt.type === 'in-person' && 'bg-purple-100 text-purple-600'
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Avatar name={apt.patientName} size="sm" />
                          <div>
                            <p className="font-medium">{apt.patientName}</p>
                            <p className="text-sm text-gray-500">{apt.reason}</p>
                          </div>
                        </div>
                      </div>
                      <Badge variant={
                        apt.status === 'completed' ? 'success' :
                        apt.status === 'cancelled' ? 'danger' :
                        apt.status === 'no-show' ? 'warning' : 'info'
                      }>
                        {apt.status}
                      </Badge>
                      {apt.status === 'scheduled' && apt.type === 'video' && (
                        <Button size="sm">
                          <Video className="mr-1 h-4 w-4" />
                          Join
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Schedule Appointment" size="md">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Patient</label>
              <Input placeholder="Search patients..." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Date</label>
                <Input type="date" defaultValue="2026-01-15" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Time</label>
                <Input type="time" defaultValue="09:00" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Type</label>
                <Select options={appointmentTypes} value="video" onChange={() => {}} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Duration</label>
                <Select options={durations} value="30" onChange={() => {}} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Reason</label>
              <Input placeholder="e.g., Quarterly Review, Follow-up" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
