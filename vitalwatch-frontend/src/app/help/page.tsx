"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/Button";
import {
  Search,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  BookOpen,
  ChevronDown,
  FileText,
  Video,
  Shield,
  Headphones,
  Clock,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Getting Started",
    description: "New to VytalWatch? Start here",
    icon: BookOpen,
    color: "bg-blue-500",
    articles: [
      "Platform Overview",
      "Creating Your Account",
      "Setting Up Your First Patient",
      "Understanding the Dashboard",
    ],
  },
  {
    title: "Devices & Monitoring",
    description: "Learn about device setup and usage",
    icon: FileText,
    color: "bg-emerald-500",
    articles: [
      "Supported Devices",
      "Pairing a New Device",
      "Taking Accurate Readings",
      "Troubleshooting Device Issues",
    ],
  },
  {
    title: "Alerts & Notifications",
    description: "Configure and manage alerts",
    icon: HelpCircle,
    color: "bg-amber-500",
    articles: [
      "Alert Types Explained",
      "Setting Custom Thresholds",
      "Notification Preferences",
      "Escalation Protocols",
    ],
  },
  {
    title: "Billing & CPT Codes",
    description: "RPM billing and reimbursement",
    icon: FileText,
    color: "bg-purple-500",
    articles: [
      "CPT Code Reference",
      "Documentation Requirements",
      "Billing Best Practices",
      "Insurance Verification",
    ],
  },
];

const faqs = [
  {
    question: "What devices are compatible with VytalWatch AI?",
    answer:
      "VytalWatch AI integrates with all Tenovi devices including blood pressure monitors, pulse oximeters, weight scales, and glucose meters. We also support select consumer wearables and can integrate with most FDA-cleared RPM devices through our API.",
  },
  {
    question: "How does AI-powered monitoring work?",
    answer:
      "Our AI continuously analyzes patient vital signs, looking for patterns and anomalies that might indicate health deterioration. When concerning trends are detected, the system automatically generates alerts and recommendations for your care team, enabling proactive intervention.",
  },
  {
    question: "Is VytalWatch HIPAA compliant?",
    answer:
      "Yes, VytalWatch AI is fully HIPAA compliant and SOC 2 Type II certified. We employ bank-grade encryption, maintain comprehensive audit logs, and sign Business Associate Agreements (BAAs) with all customers. Patient data security is our top priority.",
  },
  {
    question: "What CPT codes can I bill for RPM services?",
    answer:
      "VytalWatch supports billing for CPT codes 99453 (initial setup, $19), 99454 (device supply with 16+ days of readings, $64), 99457 (first 20 minutes of clinical review, $51), and 99458 (additional 20-minute increments, $41). Our platform automatically tracks eligibility and generates billing reports.",
  },
  {
    question: "How do I add patients to the platform?",
    answer:
      "Patients can be added manually through the dashboard, imported via CSV upload, or integrated directly from your EHR. Each patient receives device pairing instructions and can optionally download the VytalWatch mobile app for enhanced engagement.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer 24/7 technical support via phone, email, and live chat. Enterprise customers receive a dedicated customer success manager. We also provide comprehensive documentation, video tutorials, and regular training webinars.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-emerald-600 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Help Center
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Find answers, learn best practices, and get the support you need.
              </p>

              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  <strong>24/7</strong> Support Available
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  <strong>&lt;2 hour</strong> Response Time
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Headphones className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  <strong>98%</strong> Satisfaction Rate
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article}>
                        <Link
                          href={`/help/${article.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {article}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-slate-500 transition-transform shrink-0",
                        openFaq === index && "rotate-180"
                      )}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="border-t border-slate-200 dark:border-slate-700 p-6 pt-4">
                      <p className="text-slate-600 dark:text-slate-300">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {filteredFaqs.length === 0 && (
              <p className="text-center text-slate-500 py-8">
                No results found for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Need More Help?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  Live Chat
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Chat with our support team in real-time
                </p>
                <Button className="mt-6" variant="outline">
                  Start Chat
                </Button>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                  <Phone className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  Phone Support
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Available 24/7 for urgent issues
                </p>
                <p className="mt-4 text-xl font-bold text-blue-600 dark:text-blue-400">
                  1-800-VYTAL-AI
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                  <Mail className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  Email Support
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  We respond within 2 hours
                </p>
                <p className="mt-4 text-blue-600 dark:text-blue-400 font-medium">
                  support@vytalwatch.ai
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Banner */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border-2 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 text-red-600">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-red-800 dark:text-red-400">
                    Medical Emergency?
                  </h3>
                  <p className="mt-1 text-red-700 dark:text-red-300">
                    If you or a patient is experiencing a medical emergency, call{" "}
                    <strong className="text-red-900 dark:text-red-200">911</strong>{" "}
                    immediately. VytalWatch AI is not a substitute for emergency
                    medical services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tutorials CTA */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Video className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Prefer Video Tutorials?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Watch step-by-step video guides covering everything from initial
              setup to advanced features.
            </p>
            <Link
              href="/help/videos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Video Library
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
