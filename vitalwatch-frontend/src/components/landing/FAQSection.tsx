'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "How does VytalWatch's AI technology work?",
    answer: "Our AI analyzes patient vital signs in real-time, identifying patterns and anomalies that may indicate health deterioration. Using machine learning models trained on millions of data points, we can predict potential adverse events 24-72 hours before they become critical, giving providers time to intervene.",
  },
  {
    question: "What devices are compatible with VytalWatch?",
    answer: "VytalWatch works with all Tenovi cellular-connected devices, including blood pressure monitors, weight scales, pulse oximeters, glucose meters, and thermometers. All devices are FDA-approved and automatically transmit readings without requiring patient interaction with apps or Bluetooth pairing.",
  },
  {
    question: "How does billing and reimbursement work for RPM?",
    answer: "VytalWatch automatically tracks patient engagement and generates billing reports for CPT codes 99453, 99454, 99457, and 99458. Our system identifies which patients meet the 16-day reading requirement and tracks clinical review time, maximizing your reimbursement while ensuring compliance.",
  },
  {
    question: "Is VytalWatch HIPAA compliant?",
    answer: "Yes, absolutely. VytalWatch is fully HIPAA compliant with end-to-end encryption, role-based access controls, comprehensive audit logging, and BAA agreements. We undergo regular third-party security audits and maintain SOC 2 Type II certification.",
  },
  {
    question: "How long does implementation take?",
    answer: "Most practices are up and running within 2-3 weeks. This includes account setup, staff training, device provisioning, and EHR integration (if applicable). Our customer success team provides hands-on support throughout the process.",
  },
  {
    question: "Can I customize alert thresholds for individual patients?",
    answer: "Yes! While we provide evidence-based default thresholds, providers can customize alert parameters for each patient based on their specific conditions, medications, and baseline readings. The AI also learns individual patient patterns over time.",
  },
  {
    question: "What kind of support do you offer?",
    answer: "All plans include email support with 24-hour response times. Professional plans add live chat support, while Enterprise customers receive dedicated account managers, priority phone support, and quarterly business reviews.",
  },
  {
    question: "Can patients see their own data?",
    answer: "Yes, patients have access to a secure patient portal where they can view their readings, track trends, see medication reminders, and communicate with their care team. The portal is available via web browser and works on any device.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          {question}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-gray-500 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        )}
      >
        <p className="text-gray-600 dark:text-gray-400">{answer}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white dark:bg-gray-950" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about VytalWatch
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions?{' '}
            <a href="/contact" className="text-primary font-medium hover:underline">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
