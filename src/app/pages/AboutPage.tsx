import { Target, TrendingUp, UserCheck, Lock, Zap, Eye, Globe, Award, CheckCircle, Shield, Database, Headphones } from "lucide-react";
import { Page, display, mono } from "../types";
import { SectionParticles } from "../components/SectionParticles";

interface AboutPageProps {
  setPage: (p: Page) => void;
}

export function AboutPage({ setPage }: AboutPageProps) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0C1B33] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
        <SectionParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block bg-white/10 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
            ABOUT D TAX RAIL
          </div>
          <p className="text-blue-400/80 text-xs font-semibold tracking-widest uppercase mb-3" style={mono}>
            Simple · Smart · Secure Tax Solutions
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5" style={display}>
            India's Modern Tax Filing Platform
          </h1>
          <p className="text-blue-100/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Our mission is to provide simple, secure, and easy tax filing solutions that empower individuals and businesses
            to meet their compliance needs with confidence and convenience — backed by expert CA guidance and intuitive technology.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-3xl p-10 border border-blue-100">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4" style={display}>Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to provide <strong className="text-foreground">simple, secure, and easy tax filing solutions</strong> that
                empower individuals and businesses to meet their compliance needs with confidence and convenience.
              </p>
            </div>
            <div className="bg-[#0C1B33] rounded-3xl p-10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4" style={display}>Our Vision</h2>
              <p className="text-blue-100/75 leading-relaxed">
                Our vision is to make D Tax Rail{" "}
                <strong className="text-white">India's most trusted digital tax partner</strong> — simplifying the way income
                tax is filed and managed across the country, while helping every citizen feel confident, secure, and
                empowered in their financial journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl font-bold text-foreground" style={display}>Why D Tax Rail stands apart</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: UserCheck, title: "Expert Tax Guidance", desc: "CA-certified professionals review every return for accuracy and maximum deductions.", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
              { icon: Lock, title: "Secure Data Handling", desc: "Bank-grade 256-bit encryption protects your financial data at every stage.", iconBg: "bg-green-50", iconColor: "text-green-600" },
              { icon: Zap, title: "Fast Filing Process", desc: "Most returns are processed and filed within 24 hours of document submission.", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
              { icon: Eye, title: "Transparent Tracking", desc: "Real-time updates on every step of your filing, verification, and refund journey.", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
              { icon: Globe, title: "Multilingual Support", desc: "Assistance in Hindi, Tamil, Telugu, Marathi, Kannada, and other regional languages.", iconBg: "bg-rose-50", iconColor: "text-rose-600" },
              { icon: Award, title: "98% Satisfaction Rate", desc: "Trusted by over 10,000 taxpayers with near-perfect customer satisfaction scores.", iconBg: "bg-teal-50", iconColor: "text-teal-600" },
            ].map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2" style={display}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
                SECURITY &amp; PRIVACY
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6" style={display}>
                Your data is our highest priority
              </h2>
              <div className="space-y-5">
                {[
                  { title: "256-bit SSL Encryption", desc: "All data in transit is encrypted using bank-grade TLS 1.3 protocols." },
                  { title: "Secure Cloud Storage", desc: "Documents stored in isolated, access-controlled cloud environments with zero-trust architecture." },
                  { title: "Privacy-First Architecture", desc: "Your data is never sold, shared, or used for advertising purposes. Period." },
                  { title: "IT Act & DPDP Compliance", desc: "Fully compliant with Indian IT Act 2000 and Digital Personal Data Protection Act 2023." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm mb-0.5">{title}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0C1B33] rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "256-bit SSL", sub: "All data encrypted" },
                  { icon: Database, label: "Cloud Storage", sub: "Zero-trust secured" },
                  { icon: Lock, label: "Zero Breach", sub: "Perfect record" },
                  { icon: CheckCircle, label: "DPDP Compliant", sub: "2023 Act ready" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                    <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="font-bold text-white text-sm" style={display}>{label}</div>
                    <div className="text-xs text-blue-300 mt-0.5" style={mono}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <SectionParticles />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Returns Filed" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "24/7", label: "Expert Support" },
              { value: "15 Days", label: "Avg. Refund Time" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-extrabold text-white mb-2" style={display}>{value}</div>
                <div className="text-blue-200 text-sm" style={mono}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team mention */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4" style={display}>Backed by Professionals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Our platform is supported by a team of Chartered Accountants, tax compliance specialists, cybersecurity
            professionals, and dedicated customer support executives — all working to make your filing experience seamless.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: UserCheck, label: "Chartered Accountants", count: "15+" },
              { icon: Shield, label: "Security Experts", count: "15+" },
              { icon: Headphones, label: "Support Executives", count: "100+" },
            ].map(({ icon: Icon, label, count }) => (
              <div key={label} className="bg-card border border-border rounded-2xl p-6 text-center">
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1" style={display}>{count}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
