'use client';

import { useState } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Calendar, CheckCircle2, Users, Clock, Play, Shield, Zap } from 'lucide-react';

const organizationSizes = [
  { value: '1-10', label: '1-10 patients' },
  { value: '11-50', label: '11-50 patients' },
  { value: '51-200', label: '51-200 patients' },
  { value: '201-500', label: '201-500 patients' },
  { value: '500+', label: '500+ patients' },
];

const roleOptions = [
  { value: 'physician', label: 'Physician' },
  { value: 'nurse', label: 'Nurse/Care Coordinator' },
  { value: 'admin', label: 'Practice Administrator' },
  { value: 'it', label: 'IT/Technical' },
  { value: 'executive', label: 'Executive' },
  { value: 'other', label: 'Other' },
];

const features = [
  { icon: Shield, title: 'HIPAA Compliant', desc: 'Enterprise-grade security' },
  { icon: Zap, title: 'AI-Powered', desc: 'Predictive analytics' },
  { icon: Users, title: '500+ Providers', desc: 'Trust VytalWatch' },
  { icon: Clock, title: '30 min', desc: 'Personalized demo' },
];

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: 'physician',
    size: '11-50',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                  See VytalWatch in Action
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Schedule a personalized demo with our team and discover how VytalWatch can transform your remote patient monitoring program.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{feature.title}</p>
                        <p className="text-sm text-gray-500">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-xl bg-primary/5 p-6 dark:bg-primary/10">
                  <h3 className="font-semibold text-gray-900 dark:text-white">What to expect:</h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      'Live walkthrough of the platform',
                      'Customized to your specialty and use case',
                      'Q&A with our clinical technology experts',
                      'ROI analysis for your practice',
                      'Implementation roadmap discussion',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                      <Play className="h-6 w-6 ml-1" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Watch a quick overview</p>
                      <p className="text-sm text-gray-500">2-minute product tour</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Calendar className="h-8 w-8" />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                      Demo Requested!
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      We&apos;ll reach out within 24 hours to schedule your personalized demo.
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                      Check your email at <strong>{formData.email}</strong> for confirmation.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 text-center">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Schedule Your Demo
                      </h2>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Fill out the form and we&apos;ll be in touch shortly.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium">First Name *</label>
                          <Input id="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium">Last Name *</label>
                          <Input id="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Work Email *</label>
                        <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                      </div>

                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Phone</label>
                        <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      </div>

                      <div>
                        <label htmlFor="organization" className="mb-1.5 block text-sm font-medium">Organization *</label>
                        <Input id="organization" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} required />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="role" className="mb-1.5 block text-sm font-medium">Your Role</label>
                          <Select options={roleOptions} value={formData.role} onChange={(v) => setFormData({ ...formData, role: v })} />
                        </div>
                        <div>
                          <label htmlFor="size" className="mb-1.5 block text-sm font-medium">Patient Volume</label>
                          <Select options={organizationSizes} value={formData.size} onChange={(v) => setFormData({ ...formData, size: v })} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">Anything else we should know?</label>
                        <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Request Demo'}
                      </Button>

                      <p className="text-center text-xs text-gray-500">
                        By submitting, you agree to our{' '}
                        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
