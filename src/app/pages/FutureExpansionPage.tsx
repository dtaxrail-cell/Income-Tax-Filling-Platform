import { useState } from "react";
import { TrendingUp, FileText, Scale, Building2, BarChart3, Globe, Shield, Briefcase, MapPin, Rocket, ChevronDown, CheckCircle, Instagram, ArrowRight } from "lucide-react";
import { Page, display, mono } from "../types";
import { SectionParticles } from "../components/SectionParticles";

interface FutureExpansionPageProps {
  setPage: (p: Page) => void;
}

export function FutureExpansionPage({ setPage }: FutureExpansionPageProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const categories = [
    {
      num: "01",
      icon: TrendingUp,
      title: "Tax Planning",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      accentColor: "border-blue-400",
      badgeColor: "bg-blue-100 text-blue-700",
      domestic: [
        "Tax Structuring & Planning",
        "Expert Opinions on intricate tax issues",
        "TDS Health Check",
      ],
      international: [
        "Tax Structuring & Planning for cross-border transactions",
        "Tax Planning based on Double Taxation Avoidance Agreements (DTAA)",
        "Global Income Tax advisory",
      ],
    },
    {
      num: "02",
      icon: FileText,
      title: "Tax Compliance",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      accentColor: "border-violet-400",
      badgeColor: "bg-violet-100 text-violet-700",
      domestic: [
        "Preparation & Filing of Quarterly TDS/TCS Returns",
        "Advance Tax Calculations",
        "Form 15CA & 15CB for Non-Resident Remittances",
        "Form 29B (MAT Computation)",
        "Form 29C (AMT Computation)",
      ],
      international: [
        "PAN Assistance",
        "Return Filing Support",
        "FRRO (Foreign Regional Registration Office) compliance",
        "Tax Computation for expatriates",
        "Repatriation of money with 15CB certification",
      ],
    },
    {
      num: "03",
      icon: Scale,
      title: "Tax Policy & Controversy",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      accentColor: "border-rose-400",
      badgeColor: "bg-rose-100 text-rose-700",
      domestic: [
        "Representation before Income Tax Officer",
        "Representation before Commissioner & ITAT (Income Tax Appellate Tribunal)",
        "Handling Income Tax Assessment Orders",
      ],
      international: [
        "Representation before tax authorities abroad",
        "Assistance in Income Tax Refunds",
        "Advisory on cross-border disputes",
      ],
    },
    {
      num: "04",
      icon: Building2,
      title: "Business Setup & Private Tax Services",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      accentColor: "border-amber-400",
      badgeColor: "bg-amber-100 text-amber-700",
      domestic: [
        "Business Setup & Entry Strategy",
        "Location Study & Project Management",
        "Regulatory Approvals & Startup Support",
        "Secretarial Support",
        "Lower Withholding Tax (WHT) Certificate assistance",
        "TDS Certificate & Exemption Certificates (12AB, Form 10F)",
        "Tax Residency Certificate support",
        "LLP Setup & Conversion Strategies",
      ],
      international: [
        "POEM (Place of Effective Management) analysis for foreign companies",
        "BEPS (Base Erosion & Profit Shifting) impact review",
        "Permanent Establishment (PE) exposure guidance",
        "Repatriation strategies",
        "Tax credits for foreign nationals (Form 67)",
        "Treaty impact analysis under MLI (Multilateral Instrument)",
      ],
    },
    {
      num: "05",
      icon: BarChart3,
      title: "Transfer Pricing",
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      accentColor: "border-teal-400",
      badgeColor: "bg-teal-100 text-teal-700",
      domestic: [
        "Strategies for global tax efficiency",
        "Compliance with Indian & international regulations",
        "Policy development and controversy management",
      ],
      international: [
        "Cross-border transaction pricing advisory",
        "Benchmarking studies and documentation",
        "Advance Pricing Agreements (APA) support",
      ],
    },
  ];

  const highlights = [
    { icon: Globe, label: "Cross-Border Expertise", desc: "DTAA-informed advisory across 90+ treaty jurisdictions" },
    { icon: Shield, label: "Dispute Resolution", desc: "Representation from ITO level through ITAT appeals" },
    { icon: Briefcase, label: "Business Structuring", desc: "Entry strategies and regulatory approvals for new ventures" },
    { icon: MapPin, label: "Expat Tax Services", desc: "FRRO compliance, Form 67, and repatriation support" },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0C1B33] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
        <SectionParticles />
        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
            <Rocket className="w-3.5 h-3.5" />
            FUTURE EXPANSION SERVICES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.1]" style={display}>
            Premium Tax Services<br />
            <span className="text-blue-400">Coming Soon</span>
          </h1>
          <p className="text-blue-100/75 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            D Tax Rail is expanding into advanced domestic and international tax advisory — from Transfer Pricing and BEPS to DTAA-driven planning and cross-border dispute resolution.
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 text-amber-300 text-sm font-medium px-5 py-2.5 rounded-full" style={mono}>
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse inline-block" />
            These services are in active development — stay tuned
          </div>
        </div>
      </section>

      {/* Highlights row */}
      <section className="bg-white border-b border-border py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-muted transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm mb-0.5" style={display}>{label}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service categories */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              5 SERVICE DOMAINS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={display}>
              Comprehensive tax coverage, globally
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each domain covers both domestic Indian tax obligations and cross-border international requirements — managed by specialist CAs and tax advisors.
            </p>
          </div>

          <div className="space-y-5">
            {categories.map(({ num, icon: Icon, title, iconBg, iconColor, accentColor, badgeColor, domestic, international }, idx) => {
              const isOpen = expanded === idx;
              return (
                <div
                  key={num}
                  className={`bg-card border-2 rounded-3xl overflow-hidden transition-all duration-300 ${isOpen ? accentColor : "border-border"}`}
                >
                  {/* Card header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between px-7 py-6 text-left hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center gap-5">
                      <div className="font-extrabold text-3xl text-muted-foreground/20 leading-none w-10 text-right flex-shrink-0" style={mono}>{num}</div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-bold text-foreground text-lg" style={display}>{title}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`} style={mono}>Coming Soon</span>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180 bg-muted" : ""}`}>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </button>

                  {/* Expanded body */}
                  {isOpen && (
                    <div className="border-t border-border px-7 py-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Domestic */}
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="font-semibold text-blue-800 text-sm" style={display}>Domestic</span>
                          </div>
                          <ul className="space-y-2.5">
                            {domestic.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-sm text-blue-900/80">
                                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* International */}
                        <div className="bg-[#0C1B33] rounded-2xl p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span className="font-semibold text-blue-200 text-sm" style={display}>International</span>
                          </div>
                          <ul className="space-y-2.5">
                            {international.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-sm text-blue-100/75">
                                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why it matters section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
                WHY THESE SERVICES MATTER
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6" style={display}>
                Tax complexity demands specialist expertise
              </h2>
              <div className="space-y-5">
                {[
                  { title: "DTAA & Cross-border Planning", desc: "India has treaties with 90+ countries. Strategic use of DTAAs can significantly reduce effective tax rates on global income." },
                  { title: "BEPS & Compliance Risk", desc: "Multinational businesses face increasing scrutiny under BEPS Action Plans. Proactive compliance protects against costly adjustments." },
                  { title: "Transfer Pricing Disputes", desc: "India is among the top jurisdictions globally for TP audits. Expert benchmarking and documentation reduces litigation risk." },
                  { title: "Expat & NRI Tax Management", desc: "Foreign nationals and NRIs face unique compliance obligations — FRRO, Form 67, POEM, and repatriation all require specialist navigation." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm mb-0.5">{title}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0C1B33] to-[#1A2E50] rounded-3xl p-8">
              <div className="text-center mb-8">
                <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-white text-xl mb-2" style={display}>Launching Soon</h3>
                <p className="text-blue-100/65 text-sm leading-relaxed">
                  Be among the first to access our advanced tax services when they launch
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Service Domains", value: "5" },
                  { label: "Countries Covered", value: "90+" },
                  { label: "Specialist CAs", value: "15+" },
                  { label: "Treaty Networks", value: "DTAA" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/8 border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-white mb-0.5" style={display}>{value}</div>
                    <div className="text-xs text-blue-300" style={mono}>{label}</div>
                  </div>
                ))}
              </div>
              <a
                href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1A56DB] text-white font-semibold py-3.5 rounded-xl hover:bg-blue-500 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Follow for Launch Updates
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-3" style={display}>Interested in these services?</h2>
          <p className="text-blue-100/75 mb-8">
            Reach out via Instagram to register your interest and get early access when we launch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              DM us on Instagram
            </a>
            <button
              onClick={() => setPage("contact")}
              className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
