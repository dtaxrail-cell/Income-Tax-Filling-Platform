import { useState } from "react";
import {
  Shield, Instagram, ArrowRight, Lock, CheckCircle, Zap,
  Smartphone, Star, ChevronRight
} from "lucide-react";
import { Page, display, mono } from "../types";
import { SectionParticles } from "../components/SectionParticles";
import { TaxEstimatorWidget } from "../components/TaxEstimatorWidget";

interface HomePageProps {
  setPage: (p: Page) => void;
}

export function HomePage({ setPage }: HomePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [persona, setPersona] = useState<"salaried" | "retailer" | "freelancer">("salaried");

  const steps = [
    { num: "01", title: "Login Securely", desc: "Create your account with Aadhaar-linked mobile OTP verification" },
    { num: "02", title: "Submit Documents", desc: "Share Form 16, 26AS, AIS, and income proof through our secure portal" },
    { num: "03", title: "Expert Review", desc: "CA-certified experts review and optimise your return for maximum refund" },
    { num: "04", title: "Return Filed", desc: "ITR filed, e-verified, and acknowledgement sent to your email" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      city: "Mumbai",
      role: "Software Engineer",
      quote: "D Tax Rail made filing my ITR incredibly simple. Got my ₹31,200 refund credited in just 8 days!",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      city: "Bengaluru",
      role: "Freelance Designer",
      quote: "Managing multiple income sources was always complicated. Not anymore. The expert guidance is outstanding.",
      rating: 5,
    },
    {
      name: "Anita Mehta",
      city: "New Delhi",
      role: "Small Business Owner",
      quote: "The compliance alerts saved me from an advance tax penalty. Their CAs truly understand business taxation.",
      rating: 5,
    },
  ];

  const faqs = [
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

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="pt-16">
      {/* ── Hero ── */}
      <section className="min-h-[92vh] grid lg:grid-cols-[53%_47%] relative overflow-hidden">
        <div className="bg-[#0C1B33] flex items-center px-6 sm:px-10 lg:px-14 xl:px-16 py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-600/10 opacity-50 animate-pulse" style={{ animationDuration: "8s" }} />
          <SectionParticles />
          <div className="max-w-xl relative z-10">
            <div
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6"
              style={mono}
            >
              <Shield className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-xs text-blue-200 tracking-wide">256-bit Encrypted · Secure Platform</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[3rem] xl:text-[3.4rem] font-extrabold text-white leading-[1.15] mb-4"
              style={display}
            >
              Simple,<br />
              Smart &amp;<br />
              <span className="text-blue-400">Secure</span><br />
              Tax Solutions
            </h1>

            <p className="text-blue-400/80 text-xs font-bold mb-4 tracking-wide uppercase" style={mono}>
              D Tax Rail · Fast ITR &amp; GST Compliance
            </p>

            <p className="text-blue-100/75 text-base leading-relaxed mb-8 max-w-md">
              Our mission is to provide simple, secure, and easy tax filing solutions that empower
              individuals and businesses to meet their compliance needs with confidence. Get audited by CAs.
            </p>

            <div className="flex flex-wrap gap-3.5 mb-10">
              <button
                onClick={() => setPage("contact")}
                className="bg-[#1A56DB] hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-900/40 cursor-pointer"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://www.instagram.com/dtr_dtaxrail?igsh=MWlueG9pd3JoNzR2Yw=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/8 border border-white/20 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Follow Us
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { icon: Lock, label: "256-bit SSL" },
                { icon: CheckCircle, label: "CA Verified Returns" },
                { icon: Zap, label: "24hr Filing Guarantee" },
                { icon: Smartphone, label: "Mobile Optimized" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span className="text-xs text-blue-200" style={mono}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="hero-estimator-section" className="bg-gradient-to-br from-blue-50 via-[#EEF3FF] to-white flex items-center justify-center px-6 sm:px-12 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-indigo-100/30 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="relative z-10 w-full max-w-[480px]">
            <TaxEstimatorWidget persona={persona} setPersona={setPersona} setPage={setPage} />
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="bg-white border-y border-border py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Lock, title: "Secure Data Protection", desc: "256-bit SSL Encryption", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
              { icon: CheckCircle, title: "Trusted Tax Experts", desc: "CA-assisted filing", iconBg: "bg-green-50", iconColor: "text-green-600" },
              { icon: Zap, title: "Fast Processing", desc: "Filed within 24 hours", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
              { icon: Smartphone, title: "Mobile Access", desc: "All devices supported", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
            ].map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-5 rounded-2xl border border-border hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${iconBg}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className="font-semibold text-foreground text-sm mb-0.5">{title}</div>
                <div className="text-xs text-muted-foreground" style={mono}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-[#0C1B33] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-blue-950/40 opacity-70 animate-pulse" style={{ animationDuration: "12s" }} />
        <SectionParticles />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-block bg-white/10 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={display}>
              File your ITR in 4 simple steps
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ num, title, desc }, idx) => (
              <div key={num} className="relative group">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors h-full">
                  <div className="font-bold text-blue-400/30 mb-4 text-5xl leading-none" style={mono}>{num}</div>
                  <h3 className="font-bold text-white mb-2" style={display}>{title}</h3>
                  <p className="text-sm text-blue-100/60 leading-relaxed">{desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              TESTIMONIALS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground" style={display}>
              Trusted by 10,000+ taxpayers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, city, role, quote, rating }) => (
              <div
                key={name}
                className="bg-muted border border-border rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6 italic text-sm">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm" style={display}>{name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground" style={mono}>{role} · {city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile App Promotion Section ── */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-950 via-[#0C1B33] to-indigo-950 text-white rounded-[2rem] overflow-hidden shadow-2xl relative border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-indigo-900/20 opacity-60 animate-pulse" style={{ animationDuration: "12s" }} />
            <SectionParticles />
            
            <div className="grid md:grid-cols-12 gap-10 items-center p-8 sm:p-12 lg:p-16 relative z-10">
              {/* Left Column: Copy & Badges */}
              <div className="md:col-span-7 space-y-6">
                <span className="bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase" style={mono}>
                  D Tax Rail Mobile App
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white" style={display}>
                  Get D Tax Rail on the Go
                </h2>
                <p className="text-blue-100/70 text-sm leading-relaxed max-w-lg">
                  File your ITR, link Aadhaar/PAN, chat with your expert CA, and track your refund status instantly from our high-performance mobile app.
                </p>

                <ul className="space-y-3.5 text-xs text-blue-100/80">
                  {[
                    "Guided mobile tax filing in under 10 minutes",
                    "Bank-grade 256-bit secure document uploads",
                    "Direct chat support with dedicated tax advisors (CA Durgaprasad)",
                    "Live refund tracking alerts and push notifications"
                  ].map((text) => (
                    <li key={text} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4 pt-4">
                  {/* Google Play Button */}
                  <a
                    href="https://wa.me/918187882772?text=I%20want%20to%20download%20the%20D%20Tax%20Rail%20Android%20app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-black hover:bg-slate-900 border border-white/10 text-white px-5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/25"
                  >
                    <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M5 3.5c-.3 0-.6.1-.8.4L13.7 13l2.8-2.8L5.2 3.8c-.1-.2-.2-.3-.2-.3zM3.5 4.9L12.3 13.7 3.9 22.1c-.2-.2-.4-.5-.4-.8V5.7c0-.3.1-.6.2-.8zM14.4 15.8L5.5 24.7c.1.1.2.2.3.2.1 0 .2 0 .3-.1l11.1-6.4-2.8-2.6zM17.8 13.9l4-2.3c.3-.2.4-.5.4-.8s-.1-.6-.4-.8l-4-2.3L15 11.1l2.8 2.8z" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground" style={mono}>Get it on</div>
                      <div className="text-xs font-bold font-sans">Google Play</div>
                    </div>
                  </a>

                  {/* App Store Button */}
                  <a
                    href="https://wa.me/918187882772?text=I%20want%20to%20download%20the%20D%20Tax%20Rail%20iOS%20app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-black hover:bg-slate-900 border border-white/10 text-white px-5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/25"
                  >
                    <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground" style={mono}>Download on the</div>
                      <div className="text-xs font-bold font-sans">App Store</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: CSS Phone Mockup */}
              <div className="md:col-span-5 flex justify-center">
                <div className="w-[240px] h-[480px] bg-slate-950 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800 relative overflow-hidden select-none" style={{ animation: "gentleBounce 4s ease-in-out infinite" }}>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-b-2xl z-30 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mr-2" />
                    <span className="w-10 h-1 bg-black/40 rounded-full" />
                  </div>
                  
                  {/* App Screen Content */}
                  <div className="w-full h-full bg-slate-900 rounded-[2rem] overflow-hidden flex flex-col justify-between pt-5 text-white relative text-[10px]">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-4 py-1 text-[8px] text-muted-foreground" style={mono}>
                      <span>9:41 AM</span>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2 bg-green-500 rounded-sm" />
                        <span className="w-3.5 h-2 bg-white/20 rounded-sm" />
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="px-4 py-2 border-b border-white/5 flex justify-between items-center bg-slate-950/40">
                      <div>
                        <div className="font-extrabold text-white text-xs flex items-center gap-1">
                          <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm flex items-center justify-center text-[7px] text-white">₹</span>
                          D Tax Rail
                        </div>
                        <div className="text-[7px] text-muted-foreground">Premium Tax Dashboard</div>
                      </div>
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center font-bold text-[8px]">RK</div>
                    </div>

                    {/* App Body */}
                    <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                      {/* Active Return Status */}
                      <div className="bg-slate-950/80 border border-white/5 p-2.5 rounded-xl space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[7px] text-muted-foreground uppercase" style={mono}>AY 2026-27</span>
                          <span className="bg-green-500/10 text-green-400 text-[6px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <span className="w-1 h-1 bg-green-500 rounded-full animate-ping" /> Audited
                          </span>
                        </div>
                        <div className="text-[9px] font-bold">ITR-1 / Salaried Profile</div>
                      </div>

                      {/* Refund Card */}
                      <div className="bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-500/20 p-2.5 rounded-xl">
                        <div className="text-[7px] text-emerald-400 uppercase font-bold" style={mono}>Estimated Refund</div>
                        <div className="text-sm font-extrabold text-green-400 mt-0.5">₹27,970</div>
                        <div className="text-[6px] text-emerald-300/80 mt-1">CPC status: Sent for E-Verification</div>
                      </div>

                      {/* Live Chat Notification */}
                      <div className="bg-slate-950/80 border border-white/5 p-2.5 rounded-xl space-y-2">
                        <div className="flex items-center gap-1.5 pb-1 border-b border-white/5">
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[7px] font-bold">DP</div>
                          <div>
                            <div className="font-bold text-[8px]">CA Durgaprasad</div>
                            <div className="text-[6px] text-primary" style={mono}>Online</div>
                          </div>
                        </div>
                        <div className="bg-slate-900 border border-white/5 p-1.5 rounded-lg text-[7px] text-muted-foreground leading-tight italic">
                          "I have added rent receipts to Section 10(13A). This increased your expected refund by ₹3,120."
                        </div>
                      </div>
                    </div>

                    {/* App Navigation */}
                    <div className="bg-slate-950 p-2 border-t border-white/5 flex justify-around text-[7px] text-muted-foreground" style={mono}>
                      <span className="text-blue-400 font-bold">Home</span>
                      <span>Documents</span>
                      <span>Advisor</span>
                      <span>Tracker</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[#0C1B33] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-blue-900/30 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
        <SectionParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={display}>
            Start your hassle-free tax filing today
          </h2>
          <p className="text-blue-100/70 mb-10 text-lg max-w-xl mx-auto">
            Join 10,000+ taxpayers across India who trust D Tax Rail for accurate, secure, and fast ITR filing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPage("contact")}
              className="bg-[#1A56DB] hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-900/40"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://www.instagram.com/dtr_dtaxrail?igsh=MWlueG9pd3JoNzR2Yw=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/8 border border-white/20 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              Follow Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
