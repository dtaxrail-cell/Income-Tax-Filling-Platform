import { useState } from "react";
import { FileText, TrendingUp, Database, Bell, HelpCircle, Lock, Smartphone, Headphones, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { Page, display, mono } from "../types";
import { SectionParticles } from "../components/SectionParticles";

interface ServicesPageProps {
  setPage: (p: Page) => void;
}

export function ServicesPage({ setPage }: ServicesPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const keyFeatures = [
    {
      icon: FileText,
      title: "Easy ITR Filing",
      desc: "Step-by-step guided filing for all ITR forms. Suitable for salaried, freelancers, and businesses.",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Refund Tracking",
      desc: "Real-time refund status with expected credit dates and e-verification status updates.",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Database,
      title: "Smart Document Management",
      desc: "Form 16, AIS, 26AS and all tax documents — securely organised and always accessible in one place.",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      icon: Bell,
      title: "Compliance Alerts",
      desc: "Never miss a deadline with automated reminders for advance tax, TDS, and ITR due dates.",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  const faqs = [
    {
      q: "How do I start my filing?",
      a: "Install and login to our app and start filing.",
    },
    {
      q: "How long does the ITR filing process take?",
      a: "Most returns are filed within 24–48 hours after document submission. Our experts work swiftly to ensure accurate filing with real-time status updates throughout the process.",
    },
    {
      q: "Is my financial data secure on your platform?",
      a: "Absolutely. We use 256-bit SSL encryption for all data in transit, ISO-compliant cloud storage, and follow all IT Act 2000 data privacy standards. Your data is never shared with third parties.",
    },
    {
      q: "Can I track my refund status on the platform?",
      a: "Yes. Our real-time refund tracker pulls live data from the Income Tax Department's CPC portal, showing current processing status, expected credit date, and bank account validation status.",
    },
  ];

  const services = [
    {
      icon: FileText,
      title: "Income Tax Filing (ITR e-Filing)",
      iconBg: "bg-blue-50", iconColor: "text-blue-600",
      badge: "Most Popular", badgeColor: "bg-blue-100 text-blue-700",
      desc: "File your income tax returns quickly and easily with guided steps. Our platform ensures accuracy and compliance, making tax filing stress-free for individuals and businesses.",
      features: [
        "Guided step-by-step ITR filing workflow",
        "All forms: ITR-1 through ITR-7",
        "CA expert review before submission",
        "Individual & business returns",
        "Submission within 24 hours",
      ],
    },
    {
      icon: Database,
      title: "Tax Document Management",
      iconBg: "bg-violet-50", iconColor: "text-violet-600",
      badge: null, badgeColor: "",
      desc: "Securely store, access, and manage your tax documents — including Forms, past returns, and certificates — all in one place, anytime you need them.",
      features: [
        "Secure document storage & retrieval",
        "Form 16, 26AS, AIS upload support",
        "Previous year return access",
        "Cloud-based document cabinet",
        "Bulk upload & auto-classification",
      ],
    },
    {
      icon: Bell,
      title: "Compliance Alerts & Reminders",
      iconBg: "bg-amber-50", iconColor: "text-amber-600",
      badge: null, badgeColor: "",
      desc: "Stay ahead of deadlines with smart notifications. We'll remind you of important dates and filing requirements so you never miss a compliance obligation.",
      features: [
        "Due date push notifications",
        "Advance tax installment reminders",
        "TDS filing compliance tracking",
        "Automated penalty risk alerts",
        "Custom SMS & email reminders",
      ],
    },
    {
      icon: TrendingUp,
      title: "Refund Tracking",
      iconBg: "bg-green-50", iconColor: "text-green-600",
      badge: null, badgeColor: "",
      desc: "Track the status of your income tax refund in real time. Get updates directly through the app and know exactly when to expect your money.",
      features: [
        "Real-time refund status from CPC",
        "Acknowledgement download (ITR-V)",
        "E-verification status tracking",
        "Instant refund credit alerts",
        "Bank account validation support",
      ],
    },
    {
      icon: HelpCircle,
      title: "Tax Advisory Support",
      iconBg: "bg-teal-50", iconColor: "text-teal-600",
      badge: "Expert Service", badgeColor: "bg-teal-100 text-teal-700",
      desc: "Receive expert guidance on exemptions, deductions, and tax-saving strategies. Our advisory support helps you maximize your benefits while staying compliant.",
      features: [
        "Section 80C, 80D deduction guidance",
        "Old vs. New tax regime comparison",
        "Tax-saving investment advice",
        "HRA, LTA exemption consultation",
        "Capital gains & crypto tax planning",
      ],
    },
    {
      icon: Lock,
      title: "Data Security & Privacy",
      iconBg: "bg-rose-50", iconColor: "text-rose-600",
      badge: null, badgeColor: "",
      desc: "Your financial data is protected with end-to-end encryption and strict compliance. Trust and safety are at the core of our service.",
      features: [
        "256-bit SSL encrypted storage",
        "Secure document upload pipeline",
        "Privacy-first architecture",
        "Zero data-sharing policy",
        "DPDP Act 2023 compliant",
      ],
    },
    {
      icon: Smartphone,
      title: "Multi-Platform Access",
      iconBg: "bg-indigo-50", iconColor: "text-indigo-600",
      badge: null, badgeColor: "",
      desc: "Access D Tax Rail seamlessly across mobile. Your data stays synced, secure, and available wherever you work.",
      features: [
        "Mobile-responsive dashboard",
        "Cross-device data synchronization",
        "Progressive Web App (PWA) support",
        "Optimised for iOS & Android",
        "Low-bandwidth mode for slower connections",
      ],
    },
    {
      icon: Headphones,
      title: "Customer Support",
      iconBg: "bg-orange-50", iconColor: "text-orange-600",
      badge: "24/7", badgeColor: "bg-orange-100 text-orange-700",
      desc: "Get help when you need it. Our FAQ, live chat, and email support ensure that your tax filing journey is smooth and worry-free.",
      features: [
        "Comprehensive self-help FAQ library",
        "AI-powered chatbot assistant",
        "Callback scheduling (choose your slot)",
        "Email & phone support",
        "CA expert live chat sessions",
      ],
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0C1B33] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
        <SectionParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block bg-white/10 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
            OUR SERVICES
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={display}>
            Complete Tax Solutions
          </h1>
          <p className="text-blue-100/75 text-lg max-w-xl mx-auto">
            End-to-end income tax services for salaried individuals, freelancers, and businesses across India
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, iconBg, iconColor, badge, badgeColor, desc, features }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  {badge && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`} style={mono}>
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-foreground mb-2" style={display}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-2 mt-auto pt-2 border-t border-border">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground pt-2 first:pt-0">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              FEATURES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={display}>
              Everything you need to file taxes
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built for salaried employees, freelancers, and businesses across India
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyFeatures.map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-base" style={display}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 relative overflow-hidden">
        <SectionParticles />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-3" style={display}>Ready to get started?</h2>
          <p className="text-blue-100/75 mb-8">Our experts are ready to help you file accurately and on time.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPage("contact")}
              className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://wa.me/918187882772"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-green-950/40"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.895 14.11 1.87 11.83 1.872 6.394 1.875 1.968 6.29 1.965 11.737c-.001 1.706.46 3.376 1.332 4.836l-.991 3.618 3.751-.983zm11.566-6.175c-.247-.123-1.464-.722-1.692-.805-.226-.083-.393-.123-.559.123-.166.247-.643.805-.788.97-.145.166-.29.186-.537.063-.247-.123-1.042-.384-1.986-1.227-.735-.656-1.231-1.465-1.375-1.712-.145-.247-.015-.38.109-.502.112-.11.247-.29.37-.435.123-.145.166-.247.247-.413.083-.166.042-.31-.021-.435-.063-.123-.559-1.348-.766-1.848-.201-.484-.406-.418-.559-.426-.145-.008-.31-.01-.476-.01-.166 0-.435.063-.663.31-.228.247-.87.85-.87 2.07 0 1.22.885 2.4 1.01 2.565.125.165 1.74 2.657 4.215 3.727.59.254 1.05.405 1.41.519.59.188 1.13.16 1.55.097.47-.07 1.46-.597 1.67-1.175.207-.577.207-1.074.145-1.175-.062-.1-.227-.165-.474-.29z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3" style={display}>Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about D Tax Rail services</p>
          </div>

          <div className="space-y-3">
            {faqs.map(({ q, a }, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-foreground text-sm">{q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-4 text-sm text-muted-foreground leading-relaxed border-t border-border bg-muted/20">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
