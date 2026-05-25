import { useState } from "react";
import { useSearchParams } from "react-router";
import {
  Shield, Instagram, ArrowRight, Lock, CheckCircle, Zap,
  Smartphone, Calculator, ScanLine, UserCheck, FileText, Star, ChevronRight,
  Database
} from "lucide-react";
import { Page, display, mono } from "../types";
import { calculateNewRegimeTax } from "../utils/taxSlabs";
import { SectionParticles } from "../components/SectionParticles";
import { TaxEstimatorWidget } from "../components/TaxEstimatorWidget";

interface HomePageProps {
  setPage: (p: Page) => void;
}

export function HomePage({ setPage }: HomePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [persona, setPersona] = useState<"salaried" | "retailer" | "freelancer">("salaried");

  // Progress Simulator States
  const [searchParams, setSearchParams] = useSearchParams();
  const stepParam = searchParams.get("step");
  const simStep = stepParam ? parseInt(stepParam, 10) : 0;
  const setSimStep = (step: number) => {
    setSearchParams((prev) => {
      prev.set("step", step.toString());
      return prev;
    }, { replace: false });
  };

  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [simAadhaar, setSimAadhaar] = useState<string>("5123 4567 8901");
  const [simProgress, setSimProgress] = useState<number>(0);
  const [simProgressText, setSimProgressText] = useState<string>("");
  const [simChatText, setSimChatText] = useState<string>("");
  const [simChatMessages, setSimChatMessages] = useState<Array<{ sender: "ca" | "user"; text: string }>>([
    { sender: "ca", text: "Hello! I am CA Durgaprasad. I've completed the preliminary review of your auto-fetched Form 16 and AIS." },
    { sender: "ca", text: "I noticed you didn't claim HRA rent relief of ₹15,000. I can add this deduction to increase your expected refund by ₹3,120. Should I go ahead?" }
  ]);

  const [simPan, setSimPan] = useState<string>("ABCPK1234R");
  const [simItrDraft, setSimItrDraft] = useState<string>("ITR-1 Draft");
  const [simTotalIncome, setSimTotalIncome] = useState<number>(840000);
  const [simTdsDeducted, setSimTdsDeducted] = useState<number>(52400);

  // Compute values dynamically
  const simTax = calculateNewRegimeTax(simTotalIncome, true);
  const simRefundOrDue = simTdsDeducted - simTax;

  const handleSendChatMessage = () => {
    if (!simChatText.trim()) return;
    const userMsg = simChatText;
    setSimChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setSimChatText("");

    setTimeout(() => {
      let caText = "Certainly. I have applied the change and verified it. Your updated expected refund is ₹27,970.";
      if (userMsg.toLowerCase().includes("how") || userMsg.toLowerCase().includes("what")) {
        caText = "This deduction is governed under Section 10(13A) for HRA HRA exemption calculations. Everything is fully compliant and verified against your rent receipts.";
      } else if (userMsg.toLowerCase().includes("safe") || userMsg.toLowerCase().includes("secure")) {
        caText = "D Tax Rail uses bank-grade 256-bit encryption. All tax data shared here is completely private and only accessible to authorized CAs.";
      }
      setSimChatMessages(prev => [...prev, { sender: "ca", text: caText }]);
    }, 600);
  };

  const startAutoFetch = () => {
    setSimProgress(1);
    setSimProgressText("Initializing CPC API Sync...");
    
    const intervals = [
      { p: 25, t: "Syncing Form 16 (Employer Salary)..." },
      { p: 50, t: "Syncing AIS Statement (Mutual Funds & Interest)..." },
      { p: 75, t: "Syncing Form 26AS (Tax Deducted)..." },
      { p: 100, t: "Consolidating tax credit profiles..." }
    ];

    intervals.forEach((step, idx) => {
      setTimeout(() => {
        setSimProgress(step.p);
        setSimProgressText(step.t);
        if (step.p === 100) {
          setTimeout(() => {
            setSimStep(2);
          }, 800);
        }
      }, (idx + 1) * 850);
    });
  };

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
                href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
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

      {/* ── Quick Tools Navigation ── */}
      <section className="py-12 bg-muted/20 border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2" style={mono}>Quick Links</h3>
            <h4 className="text-xl font-bold text-foreground" style={display}>Jump Directly to Estimator &amp; Comparison</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              {
                title: "Income Tax Calculator (FY 2025-26)",
                desc: "Estimate your tax liability under the new regime slabs in seconds.",
                label: "Open Calculator"
              },
              {
                title: "Regime Comparison",
                desc: "Side-by-side comparison of old vs. new tax regimes to find the best savings.",
                label: "Compare Regimes"
              }
            ].map(({ title, desc, label }) => (
              <div key={title} className="bg-white border border-border rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-foreground text-sm mb-1.5" style={display}>{title}</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("hero-estimator-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full bg-secondary hover:bg-primary/10 text-primary font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  {label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Choose Your Journey / Persona Selector ── */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/20 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              CHOOSE YOUR JOURNEY
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={display}>
              Who Are You Filing For?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select your profile to unlock custom deduction checklists, expert CA advice, and filing speeds tailored to your domain.
            </p>
          </div>

          {/* Tab tabs */}
          <div className="flex justify-center gap-3 mb-10 max-w-lg mx-auto bg-muted p-1.5 rounded-2xl">
            {(["salaried", "retailer", "freelancer"] as const).map((p) => (
              <button
                key={p}
                type="button"
                id={`journey-persona-${p}`}
                onClick={() => setPersona(p)}
                className={`flex-1 py-3 px-2 text-sm font-bold rounded-xl transition-all capitalize flex items-center justify-center gap-2 cursor-pointer ${
                  persona === p
                    ? "bg-white text-primary shadow-md border border-gray-100"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p === "salaried" ? "💼 Salaried" : p === "retailer" ? "🏪 Retailer" : "🚀 Freelancer"}
              </button>
            ))}
          </div>

          {/* Persona details panel */}
          <div className="grid md:grid-cols-5 gap-8 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl">
            {/* Left side: checklist */}
            <div className="md:col-span-3">
              <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2" style={display}>
                {persona === "salaried" && "Salaried Employee Tax Checklist"}
                {persona === "retailer" && "Retailer & Merchant Tax Checklist"}
                {persona === "freelancer" && "Freelancer & Contractor Tax Checklist"}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {persona === "salaried" && "Maximize your tax savings under Old or New regime by tracking your common allowances."}
                {persona === "retailer" && "Optimize your business taxes by claiming input credit, depreciation, and business expense deductions."}
                {persona === "freelancer" && "Claim professional expenses or file under presumptive taxation schemes to maximize your take-home pay."}
              </p>

              {/* Checklist items */}
              <div className="grid sm:grid-cols-2 gap-3.5 mb-6">
                {persona === "salaried" && [
                  { id: "s1", label: "Standard Deduction (₹75,000)", tooltip: "Flat deduction for salaried employees under New Regime (₹50,000 under Old)" },
                  { id: "s2", label: "House Rent Allowance (HRA)", tooltip: "Claim exemption on rent paid to landlord" },
                  { id: "s3", label: "Section 80C Deductions", tooltip: "PPF, EPF, ELSS, Insurance premium up to ₹1.5 Lakhs" },
                  { id: "s4", label: "Section 80D Medical Insurance", tooltip: "Claim premiums paid for self, spouse, children & parents" },
                  { id: "s5", label: "Home Loan Interest (Sec 24)", tooltip: "Up to ₹2 Lakhs deduction on interest paid for self-occupied home" },
                  { id: "s6", label: "LTA & Meal Coupons", tooltip: "Exemptions on domestic travel tickets and Sodexo meal allowances" },
                ].map((item) => (
                  <label key={item.id} className="flex items-start gap-3 p-3 bg-muted/50 hover:bg-muted border border-border rounded-xl cursor-pointer transition-colors group select-none">
                    <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                    <div>
                      <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.tooltip}</div>
                    </div>
                  </label>
                ))}

                {persona === "retailer" && [
                  { id: "r1", label: "Section 44AD Presumptive Tax", tooltip: "Declare flat 6% of digital turnover (8% cash) as profits, no auditing required" },
                  { id: "r2", label: "GST Input Tax Credit (ITC)", tooltip: "Offset GST paid on raw goods/purchases against sales GST" },
                  { id: "r3", label: "Shop Rent & Electricity", tooltip: "Fully deduct monthly shop rent and utility expenses" },
                  { id: "r4", label: "Employee Salaries & Bonus", tooltip: "Wages paid to shop assistants or workers are business deductions" },
                  { id: "r5", label: "Asset Depreciation", tooltip: "Claim depreciation on shop counters, display units, billing computers" },
                  { id: "r6", label: "Business Loan Interest", tooltip: "Interest paid on commercial shop loans is 100% tax deductible" },
                ].map((item) => (
                  <label key={item.id} className="flex items-start gap-3 p-3 bg-muted/50 hover:bg-muted border border-border rounded-xl cursor-pointer transition-colors group select-none">
                    <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                    <div>
                      <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.tooltip}</div>
                    </div>
                  </label>
                ))}

                {persona === "freelancer" && [
                  { id: "f1", label: "Section 44ADA (Presumptive)", tooltip: "Declare only 50% of gross receipts as taxable income under ₹75L" },
                  { id: "f2", label: "Laptop & Gadgets Depreciation", tooltip: "Depreciate up to 40% per year for computers, cameras, and editing systems" },
                  { id: "f3", label: "Home Office Rent Portion", tooltip: "Deduct a portion of home rent/electricity used for work space" },
                  { id: "f4", label: "Software & Subscriptions", tooltip: "Adobe CC, GitHub, AWS, ChatGPT, Notion etc. are 100% business expenses" },
                  { id: "f5", label: "Co-working Space Fees", tooltip: "Deduct membership fees paid for co-working or desk rentals" },
                  { id: "f6", label: "Travel & Client Dinner Costs", tooltip: "Deduct cab rides, flights, and meals paid while meeting clients" },
                ].map((item) => (
                  <label key={item.id} className="flex items-start gap-3 p-3 bg-muted/50 hover:bg-muted border border-border rounded-xl cursor-pointer transition-colors group select-none">
                    <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                    <div>
                      <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.tooltip}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Right side: Expert Card & stats */}
            <div className="md:col-span-2 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-6">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm" style={display}>DP</div>
                  <div>
                    <div className="font-semibold text-foreground text-xs">CA Durgaprasad</div>
                    <div className="text-[10px] text-primary" style={mono}>Senior Tax Advisor</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed italic">
                  {persona === "salaried" && `"Salaried professionals often miss claiming HRA or Section 80D details that aren't in their Form 16. Our platform checks all sources to ensure you get every rupee back."`}
                  {persona === "retailer" && `"Filing Section 44AD presumptive taxes is much cheaper and simpler. Ensure digital sales are highlighted since they get a reduced tax rate of 6% instead of 8%."`}
                  {persona === "freelancer" && `"Under Section 44ADA, you do not need to keep receipts for every single cup of coffee or subscription, as you get a flat 50% deduction. It is a massive tax saver!"`}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-100">
                  <span className="text-muted-foreground">Estimated Speed:</span>
                  <span className="font-bold text-green-600" style={mono}>
                    {persona === "salaried" ? "15 Mins" : persona === "retailer" ? "24 Hours" : "12 Hours"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-100">
                  <span className="text-muted-foreground">Filing Type:</span>
                  <span className="font-bold text-foreground" style={mono}>
                    {persona === "salaried" ? "ITR-1 / ITR-2" : persona === "retailer" ? "ITR-3 / Presumptive 44AD" : "ITR-4 / Presumptive 44ADA"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">CA Review Included:</span>
                  <span className="font-bold text-primary" style={mono}>Yes, 100% Expert Verified</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPage("contact")}
                className="w-full bg-[#0C1B33] hover:bg-blue-950 text-white font-semibold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 mt-6 cursor-pointer"
              >
                Start Your {persona === "salaried" ? "Salaried" : persona === "retailer" ? "Merchant" : "Freelance"} Return
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dashboard Preview (Interactive Simulator) ── */}
      <section className="py-24 bg-gradient-to-b from-blue-50/60 to-background border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              INTERACTIVE FILING PREVIEW
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={display}>
              Experience Our Digital Portal
            </h2>
            <p className="text-muted-foreground">Simulate the step-by-step digital process of linking KYC, fetching returns and CA auditing.</p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 lg:p-8 shadow-xl">
            {/* Simulator Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
              <div>
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2" style={display}>
                  Welcome back, {simStep === 0 ? "Guest User" : "Rajesh Kumar"}
                  {simStep > 0 && <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse" />}
                </h3>
                <p className="text-xs text-muted-foreground" style={mono}>
                  Assessment Year 2026–27 · PAN: {simStep > 0 ? simPan : "Unverified"}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                {simStep === 3 ? (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-700 transition-all" style={mono}>
                    ✓ E-Filed &amp; E-Verified
                  </span>
                ) : (
                  <select
                    value={simItrDraft}
                    onChange={(e) => setSimItrDraft(e.target.value)}
                    className="bg-white border border-border text-foreground text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                    style={mono}
                  >
                    <option value="ITR-1 Draft">ITR-1 Draft</option>
                    <option value="ITR-2 Draft">ITR-2 Draft</option>
                    <option value="ITR-3 Draft">ITR-3 Draft</option>
                    <option value="ITR-4 Draft">ITR-4 Draft</option>
                  </select>
                )}
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full" style={mono}>
                  AY 2026-27
                </span>
              </div>
            </div>

            {/* Dashboard Stat Cards Row (Updates dynamically!) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { 
                  label: "Total Income", 
                  isEditable: true,
                  value: simTotalIncome,
                  onChange: (v: number) => setSimTotalIncome(v),
                  sub: "FY 2025-26", 
                  textColor: "text-foreground" 
                },
                { 
                  label: "TDS Deducted", 
                  isEditable: true,
                  value: simTdsDeducted,
                  onChange: (v: number) => setSimTdsDeducted(v),
                  sub: "Employer logs", 
                  textColor: "text-foreground" 
                },
                { 
                  label: "Tax Liability", 
                  isEditable: false,
                  value: simStep >= 2 ? formatCurrency(simTax) : "₹0", 
                  sub: simStep === 3 ? "After CA Optimization" : "Initial calculation", 
                  textColor: simStep >= 2 ? "text-amber-600" : "text-gray-400" 
                },
                { 
                  label: simRefundOrDue >= 0 ? "Expected Refund" : "Balance Payable", 
                  isEditable: false,
                  value: simStep >= 2 ? formatCurrency(Math.abs(simRefundOrDue)) : "₹0", 
                  sub: simStep === 3 ? (simRefundOrDue >= 0 ? "CA optimized refund!" : "Tax Due") : (simRefundOrDue >= 0 ? "Expected" : "Tax Due"), 
                  textColor: simStep >= 2 ? (simRefundOrDue >= 0 ? "text-green-600" : "text-amber-600") : "text-gray-400" 
                },
              ].map(({ label, isEditable, value, onChange, sub, textColor }) => (
                <div key={label} className="bg-muted/80 rounded-2xl p-4 transition-all hover:bg-muted duration-200">
                  <div className="text-xs text-muted-foreground mb-1" style={mono}>{label}</div>
                  {isEditable ? (
                    <div className="mt-1 flex items-center bg-white border border-border rounded-xl px-2.5 py-1 shadow-sm">
                      <span className="text-xs font-bold text-muted-foreground mr-1">₹</span>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => onChange && onChange(Number(e.target.value))}
                        className="w-full bg-transparent border-none text-sm font-bold text-foreground focus:outline-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  ) : (
                    <div className={`text-xl font-bold transition-all ${textColor}`} style={display}>{value}</div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1.5">{sub}</div>
                </div>
              ))}
            </div>

            {/* Simulator Split Screen */}
            <div className="grid md:grid-cols-12 gap-6">
              {/* Left Column: Interactive Simulation Control panel */}
              <div className="md:col-span-7 bg-muted/40 border border-border rounded-2xl p-5 flex flex-col justify-between min-h-[340px]">
                
                {simStep === 0 && (
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={mono}>
                        Step 1 of 4
                      </span>
                      <h4 className="font-bold text-foreground text-base mt-2 mb-2" style={display}>Verify KYC via Aadhaar OTP</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        To fetch standard deductions and TDS from the Income Tax department, secure your identity by completing Aadhaar OTP linking.
                      </p>
                      
                      <div className="space-y-3 max-w-sm">
                        <div>
                          <label className="block text-[10px] text-muted-foreground uppercase font-bold mb-1" style={mono}>PAN Card Number</label>
                          <input
                            type="text"
                            value={simPan}
                            onChange={(e) => setSimPan(e.target.value.toUpperCase())}
                            className="w-full bg-white border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                            style={mono}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-muted-foreground uppercase font-bold mb-1" style={mono}>Aadhaar Number</label>
                          <input
                            type="text"
                            id="sim-aadhaar"
                            placeholder="Enter 12-digit Aadhaar"
                            value={simAadhaar}
                            onChange={(e) => setSimAadhaar(e.target.value)}
                            className="w-full bg-white border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                            style={mono}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      id="sim-verify-aadhaar-btn"
                      onClick={() => {
                        setIsOtpSent(true);
                        setSimStep(1); // Auto progress to step 1 for simple visual linking
                      }}
                      disabled={simAadhaar.replace(/\s/g, "").length < 12}
                      className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      Link Aadhaar &amp; Continue <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {simStep === 1 && (
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={mono}>
                        Step 2 of 4
                      </span>
                      <h4 className="font-bold text-foreground text-base mt-2 mb-2" style={display}>Auto-Fetch Tax Documents</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                        D Tax Rail is securely linked to your PAN. Fetch Form 16, AIS tax statements, and Form 26AS directly from CPC portals.
                      </p>

                      {simProgress > 0 && (
                        <div className="space-y-2 mb-4 bg-white border border-border p-4 rounded-xl">
                          <div className="flex justify-between text-xs font-bold text-foreground" style={mono}>
                            <span>Syncing Database...</span>
                            <span>{simProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-1.5 transition-all duration-305" style={{ width: `${simProgress}%` }} />
                          </div>
                          <div className="text-[10px] text-muted-foreground italic flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                            {simProgressText}
                          </div>
                        </div>
                      )}
                    </div>

                    {simProgress === 0 ? (
                      <div className="flex gap-3 mt-4">
                        <button
                          type="button"
                          onClick={() => setSimStep(0)}
                          className="px-4 py-2.5 border border-border text-muted-foreground hover:text-foreground font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          id="sim-fetch-docs-btn"
                          onClick={startAutoFetch}
                          className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ScanLine className="w-4 h-4" /> Auto-Fetch From CPC Portal
                        </button>
                      </div>
                    ) : (
                      <button disabled className="bg-gray-200 text-gray-500 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 w-full">
                        Syncing...
                      </button>
                    )}
                  </div>
                )}

                {simStep === 2 && (
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={mono}>
                          Step 3 of 4 · CA Audit
                        </span>
                        <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                          <span className="w-1 h-1 bg-green-500 rounded-full animate-ping" /> Online
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground text-xs mt-1.5 mb-2 border-b border-gray-100 pb-2 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-primary" /> Live Chat with Advisor
                      </h4>
                      
                      {/* Chat interface */}
                      <div className="bg-white border border-border rounded-xl p-3 h-40 overflow-y-auto space-y-2.5 text-[11px] mb-3">
                        {simChatMessages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[85%] rounded-xl px-3 py-2 ${
                              msg.sender === "user" 
                                ? "bg-primary text-white" 
                                : "bg-muted text-foreground"
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="sim-chat-input"
                          placeholder="Ask Durgaprasad a question..."
                          value={simChatText}
                          onChange={(e) => setSimChatText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                          className="flex-1 bg-white border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                        <button
                          type="button"
                          id="sim-chat-send"
                          onClick={handleSendChatMessage}
                          className="bg-primary hover:bg-blue-600 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs cursor-pointer"
                        >
                          Send
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2.5 mt-4 pt-3 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setSimStep(1)}
                        className="px-4 py-2.5 border border-border text-muted-foreground hover:text-foreground font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        id="sim-approve-itr-btn"
                        onClick={() => setSimStep(3)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-150"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Approve &amp; E-File Return
                      </button>
                    </div>
                  </div>
                )}

                {simStep === 3 && (
                  <div className="flex flex-col h-full justify-between text-center py-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-foreground text-base mb-1.5" style={display}>ITR Filed Successfully!</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                        Your {simItrDraft.replace(" Draft", "")} return for AY 2026-27 has been e-verified. {simRefundOrDue >= 0 ? (
                          <>The Income Tax Department will credit your refund of <strong>{formatCurrency(simRefundOrDue)}</strong> to your linked bank account.</>
                        ) : (
                          <>Please pay your balance tax due of <strong>{formatCurrency(Math.abs(simRefundOrDue))}</strong> to complete your filing.</>
                        )}
                      </p>

                      <div className="bg-white border border-green-100 p-3 rounded-xl mt-4 w-full max-w-xs text-left flex items-start gap-2.5">
                        <FileText className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-bold text-foreground">ITR-V Acknowledgement</div>
                          <div className="text-[9px] text-muted-foreground">Sent to rajesh.kumar@gmail.com</div>
                          <div className="text-[9px] text-primary mt-1 font-bold hover:underline cursor-pointer">Download Mock Receipt PDF</div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      id="sim-reset-btn"
                      onClick={() => {
                        setSimStep(0);
                        setSimProgress(0);
                        setSimProgressText("");
                        setIsOtpSent(false);
                        setSimPan("ABCPK1234R");
                        setSimItrDraft("ITR-1 Draft");
                        setSimTotalIncome(840000);
                        setSimTdsDeducted(52400);
                        setSimChatMessages([
                          { sender: "ca", text: "Hello! I am CA Durgaprasad. I've completed the preliminary review of your auto-fetched Form 16 and AIS." },
                          { sender: "ca", text: "I noticed you didn't claim HRA rent relief of ₹15,000. I can add this deduction to increase your expected refund by ₹3,120. Should I go ahead?" }
                        ]);
                      }}
                      className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-4 self-center"
                    >
                      Reset Simulator &amp; Try Again
                    </button>
                  </div>
                )}

              </div>

              {/* Right Column: Document cabinet status */}
              <div className="md:col-span-5 bg-muted/30 border border-border rounded-2xl p-5 min-h-[340px] flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-foreground text-xs mb-3 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-muted-foreground" /> Document Cabinet Status
                  </h4>
                  <div className="space-y-3">
                    {[
                      { 
                        doc: "Form 16 Sync", 
                        status: simStep === 0 ? "Not Connected" : simStep === 1 ? "Awaiting Link" : "Verified & Sync", 
                        color: simStep === 0 ? "bg-gray-100 text-gray-500" : simStep === 1 ? "bg-amber-100 text-amber-700 animate-pulse" : "bg-green-100 text-green-700" 
                      },
                      { 
                        doc: "AIS Tax Statement", 
                        status: simStep === 0 ? "Not Connected" : simStep === 1 ? "Awaiting Link" : "Verified & Sync", 
                        color: simStep === 0 ? "bg-gray-100 text-gray-500" : simStep === 1 ? "bg-amber-100 text-amber-700 animate-pulse" : "bg-green-100 text-green-700" 
                      },
                      { 
                        doc: "Form 26AS Credits", 
                        status: simStep === 0 ? "Not Connected" : simStep === 1 ? "Awaiting Link" : "Verified & Sync", 
                        color: simStep === 0 ? "bg-gray-100 text-gray-500" : simStep === 1 ? "bg-amber-100 text-amber-700 animate-pulse" : "bg-green-100 text-green-700" 
                      },
                      { 
                        doc: "Section 80D Deductions", 
                        status: simStep < 2 ? "No Info" : simStep === 2 ? "Awaiting Audit" : "CA Approved (+₹15k)", 
                        color: simStep < 2 ? "bg-gray-100 text-gray-500" : simStep === 2 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700" 
                      },
                    ].map(({ doc, status, color }) => (
                      <div key={doc} className="flex items-center justify-between gap-2 transition-all duration-300">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-xs text-foreground truncate">{doc}</span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 transition-colors ${color}`} style={mono}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-primary animate-pulse" style={mono}>LIVE PLATFORM PREVIEW</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">Secure document integrations — live on D Tax Rail</div>
                  </div>
                </div>
              </div>
            </div>

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
                <div className="w-[240px] h-[480px] bg-slate-950 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800 relative overflow-hidden select-none animate-bounce" style={{ animationDuration: "3s" }}>
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
              href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
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
