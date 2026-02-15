'use client';

import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { FileUpload } from '@/components/ui/FileUpload';
import { User, Mail, Phone, MapPin, Calendar, Heart, Shield, Edit2, Save, X, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

interface PatientProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContact: string;
  emergencyPhone: string;
  conditions: string[];
  allergies: string[];
  bloodType: string;
  primaryProvider: string;
}

const mockProfile: PatientProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1958-03-15',
  gender: 'Male',
  address: '123 Main Street',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94102',
  emergencyContact: 'Jane Doe (Wife)',
  emergencyPhone: '(555) 987-6543',
  conditions: ['Hypertension', 'Type 2 Diabetes', 'Atrial Fibrillation'],
  allergies: ['Penicillin', 'Sulfa drugs'],
  bloodType: 'O+',
  primaryProvider: 'Dr. Sarah Chen',
};

export default function PatientProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<PatientProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<PatientProfile>(mockProfile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(editedProfile);
      setIsEditing(false);
      toast({ title: 'Profile saved', description: 'Your profile has been updated', type: 'success' });
    } finally {
      setIsSaving(false);
    }
  }, [editedProfile, toast]);

  const handleCancel = useCallback(() => {
    setEditedProfile(profile);
    setIsEditing(false);
  }, [profile]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your personal information</p>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="mr-2 h-4 w-4" />Edit Profile
            </Button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-col items-center text-center">
              <Avatar
                name={`${profile.firstName} ${profile.lastName}`}
                size="xl"
                className="mb-4"
              />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-500">Patient ID: PAT-2024-001234</p>
              <Badge variant="success" className="mt-2">Active</Badge>

              {isEditing && (
                <div className="mt-4 w-full">
                  <FileUpload
                    accept="image/*"
                    maxSize={5}
                    label="Update Photo"
                    helperText="JPG, PNG up to 5MB"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{profile.city}, {profile.state}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />Personal Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">First Name</label>
                  <Input
                    value={isEditing ? editedProfile.firstName : profile.firstName}
                    onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Last Name</label>
                  <Input
                    value={isEditing ? editedProfile.lastName : profile.lastName}
                    onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <Input value={profile.email} disabled />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Phone</label>
                  <Input
                    value={isEditing ? editedProfile.phone : profile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Date of Birth</label>
                  <Input value={profile.dateOfBirth} disabled />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Gender</label>
                  <Input value={profile.gender} disabled />
                </div>
              </div>

              <h4 className="mt-6 mb-4 font-medium">Address</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">Street Address</label>
                  <Input
                    value={isEditing ? editedProfile.address : profile.address}
                    onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">City</label>
                  <Input
                    value={isEditing ? editedProfile.city : profile.city}
                    onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">State</label>
                    <Input
                      value={isEditing ? editedProfile.state : profile.state}
                      onChange={(e) => setEditedProfile({ ...editedProfile, state: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">ZIP</label>
                    <Input
                      value={isEditing ? editedProfile.zipCode : profile.zipCode}
                      onChange={(e) => setEditedProfile({ ...editedProfile, zipCode: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />Medical Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Blood Type</label>
                  <Input value={profile.bloodType} disabled />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Primary Provider</label>
                  <Input value={profile.primaryProvider} disabled />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium">Medical Conditions</label>
                <div className="flex flex-wrap gap-2">
                  {profile.conditions.map((condition) => (
                    <Badge key={condition} variant="info">{condition}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium">Allergies</label>
                <div className="flex flex-wrap gap-2">
                  {profile.allergies.map((allergy) => (
                    <Badge key={allergy} variant="danger">{allergy}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />Emergency Contact
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Contact Name</label>
                  <Input
                    value={isEditing ? editedProfile.emergencyContact : profile.emergencyContact}
                    onChange={(e) => setEditedProfile({ ...editedProfile, emergencyContact: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Contact Phone</label>
                  <Input
                    value={isEditing ? editedProfile.emergencyPhone : profile.emergencyPhone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, emergencyPhone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
