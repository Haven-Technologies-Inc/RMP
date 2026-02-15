'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Phone, Calendar } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Ready to Transform Your Patient Care?
          </h2>
          <p className="mt-6 text-xl text-white/80">
            Join hundreds of healthcare providers using VytalWatch to improve outcomes,
            reduce readmissions, and grow their RPM programs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>1-800-VITAL-AI</span>
            </div>
            <span className="hidden sm:block">•</span>
            <span>No credit card required</span>
            <span className="hidden sm:block">•</span>
            <span>14-day free trial</span>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-4xl font-bold text-white">500+</p>
            <p className="text-white/70">Healthcare Providers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white">50,000+</p>
            <p className="text-white/70">Patients Monitored</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white">10M+</p>
            <p className="text-white/70">Readings Processed</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white">99.9%</p>
            <p className="text-white/70">Uptime SLA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
