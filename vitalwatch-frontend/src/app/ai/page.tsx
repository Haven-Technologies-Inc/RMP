import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import {
  Brain,
  Activity,
  TrendingUp,
  AlertTriangle,
  Zap,
  Target,
  BarChart3,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const aiCapabilities = [
  {
    icon: TrendingUp,
    title: "Predictive Risk Scoring",
    description: "Our AI analyzes patient vitals, history, and population data to generate real-time risk scores that predict deterioration 24-72 hours in advance.",
    stats: "85% accuracy in predicting adverse events",
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    description: "Machine learning algorithms identify subtle deviations from a patient's baseline that traditional threshold-based systems miss.",
    stats: "Catches 40% more concerning patterns",
  },
  {
    icon: Sparkles,
    title: "Pattern Recognition",
    description: "AI recognizes complex multi-vital patterns associated with conditions like CHF exacerbation, hypertensive crisis, and more.",
    stats: "Trained on 10M+ clinical encounters",
  },
  {
    icon: Target,
    title: "Personalized Baselines",
    description: "Instead of one-size-fits-all thresholds, our AI learns each patient's unique normal ranges and adjusts alerts accordingly.",
    stats: "Reduces alert fatigue by 60%",
  },
];

const useCases = [
  {
    condition: "Heart Failure",
    description: "AI monitors weight trends, blood pressure patterns, and heart rate variability to detect fluid retention and predict CHF exacerbations before symptoms worsen.",
    outcome: "42% reduction in HF readmissions",
  },
  {
    condition: "Hypertension",
    description: "Pattern analysis identifies blood pressure trends, medication non-adherence signals, and lifestyle factors affecting control.",
    outcome: "Average 15mmHg systolic improvement",
  },
  {
    condition: "Diabetes",
    description: "Glucose pattern analysis detects hypoglycemic risk, medication timing issues, and identifies optimal intervention windows.",
    outcome: "1.2% average A1C reduction",
  },
  {
    condition: "COPD",
    description: "SpO2 trend analysis combined with activity patterns predicts exacerbations and identifies patients needing intervention.",
    outcome: "35% fewer ER visits",
  },
];

const workflow = [
  {
    step: "1",
    title: "Data Collection",
    description: "Patient vitals flow in real-time from connected devices",
  },
  {
    step: "2",
    title: "AI Analysis",
    description: "ML models analyze data against patient baselines and population patterns",
  },
  {
    step: "3",
    title: "Risk Assessment",
    description: "AI generates risk scores and identifies concerning trends",
  },
  {
    step: "4",
    title: "Smart Alerts",
    description: "Clinically relevant alerts reach the right care team member",
  },
  {
    step: "5",
    title: "Recommendations",
    description: "AI suggests interventions based on evidence and outcomes data",
  },
];

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Brain className="h-4 w-4" />
                Powered by Advanced AI
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                AI That Predicts Problems<br />Before They Happen
              </h1>
              <p className="text-xl text-blue-200 mb-8">
                Our machine learning models analyze millions of data points to identify patients at risk, enabling intervention before emergencies occur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/register"
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Try AI Features Free
                </Link>
                <Link
                  href="/docs/ai-insights"
                  className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AI Capabilities */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                AI Capabilities
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Advanced machine learning that goes beyond simple threshold alerts
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {aiCapabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
                      <capability.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {capability.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        {capability.description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="h-4 w-4" />
                        {capability.stats}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                How Our AI Works
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                From data collection to actionable insights in real-time
              </p>
            </div>
            <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
              {workflow.map((item, index) => (
                <div key={item.step} className="flex-1 relative">
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                  {index < workflow.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <ArrowRight className="h-4 w-4 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Condition-Specific AI
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Specialized models trained for different chronic conditions
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase) => (
                <div
                  key={useCase.condition}
                  className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {useCase.condition}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {useCase.description}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <BarChart3 className="h-5 w-5" />
                    {useCase.outcome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Security */}
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  Responsible AI You Can Trust
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: Shield,
                      title: "Explainable Predictions",
                      text: "Every AI alert includes the reasoning behind it, so clinicians understand why a patient was flagged.",
                    },
                    {
                      icon: Activity,
                      title: "Clinician-in-the-Loop",
                      text: "AI augments clinical decision-making but never replaces human judgment. All recommendations require clinician review.",
                    },
                    {
                      icon: Zap,
                      title: "Continuous Learning",
                      text: "Our models improve over time based on outcomes data, while maintaining strict privacy protections.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                <Brain className="h-12 w-12 mb-6 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">AI Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/20 pb-3">
                    <span>Prediction Accuracy</span>
                    <span className="font-bold">85%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-3">
                    <span>False Positive Rate</span>
                    <span className="font-bold">&lt;5%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-3">
                    <span>Alert-to-Intervention Time</span>
                    <span className="font-bold">28 min avg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Model Training Data</span>
                    <span className="font-bold">10M+ encounters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Experience AI-Powered RPM
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              See how our AI can help you identify at-risk patients and intervene earlier.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
