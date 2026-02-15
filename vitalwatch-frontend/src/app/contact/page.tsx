'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Building2 } from 'lucide-react';

const inquiryTypes = [
  { value: 'sales', label: 'Sales Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'billing', label: 'Billing Question' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'demo', label: 'Request a Demo' },
  { value: 'other', label: 'Other' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'sales',
    message: '',
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
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                Get in Touch
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
                  {isSubmitted ? (
                    <div className="py-12 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Send className="h-8 w-8" />
                      </div>
                      <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                        Message Sent!
                      </h2>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                      </p>
                      <Button className="mt-6" onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            First Name *
                          </label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Last Name *
                          </label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Organization
                          </label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="inquiryType" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Inquiry Type
                          </label>
                          <Select
                            options={inquiryTypes}
                            value={formData.inquiryType}
                            onChange={(v) => setFormData({ ...formData, inquiryType: v })}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="How can we help you?"
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                      <a href="mailto:hello@vVytalWatch.ai" className="text-primary hover:underline">
                        hello@vVytalWatch.ai
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                      <a href="tel:+18001234567" className="text-primary hover:underline">
                        1-800-VITAL-AI
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Hours</h3>
                      <p className="text-gray-600 dark:text-gray-400">Mon-Fri: 8am - 6pm EST</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        123 Healthcare Ave<br />
                        San Francisco, CA 94102
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-primary p-6 text-white">
                  <MessageSquare className="h-8 w-8 mb-3" />
                  <h3 className="font-semibold">Need immediate help?</h3>
                  <p className="mt-2 text-white/80 text-sm">
                    Chat with our support team for quick answers.
                  </p>
                  <Button className="mt-4 bg-white text-primary hover:bg-gray-100">
                    Start Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
