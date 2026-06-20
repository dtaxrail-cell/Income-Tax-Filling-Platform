import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Briefcase, 
  User, 
  Users, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  HelpCircle, 
  Info,
  Layers,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { Page, display, mono } from "../types";
import { SectionParticles } from "../components/SectionParticles";

interface ItrFilingPageProps {
  setPage: (p: Page) => void;
}

type ItrTab = "itr-1" | "itr-2" | "itr-3" | "itr-4" | "itr-5" | "itr-6" | "itr-7";

export function ItrFilingPage({ setPage }: ItrFilingPageProps) {
  const [activeTab, setActiveTab] = useState<ItrTab>("itr-1");

  const tabs = [
    { id: "itr-1", name: "ITR-1", label: "Salaried", desc: "Salaried individuals & Pensioners (< ₹50L)" },
    { id: "itr-2", name: "ITR-2", label: "Capital Gains", desc: "Capital gains, foreign assets, multiple houses" },
    { id: "itr-3", name: "ITR-3", nameLong: "ITR-3 (Business & Profession)", label: "Proprietorship & F&O", desc: "Business, professional income, F&O/Crypto" },
    { id: "itr-4", name: "ITR-4", label: "Presumptive", desc: "Presumptive business & profession (< ₹50L)" },
    { id: "itr-5", name: "ITR-5", label: "LLPs & Firms", desc: "Partnerships, LLPs, AOPs, BOIs" },
    { id: "itr-6", name: "ITR-6", label: "Companies", desc: "Corporates & Registered Companies" },
    { id: "itr-7", name: "ITR-7", label: "Trusts & Orgs", desc: "Charitable, political, educational trusts" },
  ];

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Hero / Header Section */}
      <section className="bg-[#0C1B33] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20 opacity-60 animate-pulse" style={{ animationDuration: "12s" }} />
        <SectionParticles />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block bg-white/10 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
            ELIGIBILITY &amp; GUIDELINES · FY 2025-26 (AY 2026-27)
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight" style={display}>
            Income Tax Return (ITR) Filing Guide
          </h1>
          <p className="text-blue-100/75 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Selecting the wrong ITR form can lead to defect notices (u/s 139(9)) and penalties. 
            Review the comprehensive rules verified by <strong className="text-white">our expert CA Team</strong> to ensure accurate, compliant, and timely filing.
          </p>
        </div>
      </section>

      {/* Interactive Helper Questionnaire */}
      <section className="py-12 bg-blue-50/50 border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-card border border-blue-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide" style={mono}>
                <HelpCircle className="w-4 h-4 text-blue-600" /> Need Help Choosing?
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground" style={display}>
                Unsure which ITR form applies to your income?
              </h3>
              <p className="text-sm text-muted-foreground max-w-xl">
                Different income combinations mandate different forms. Check our quick guide below or consult with our CA Team directly for professional classification.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
              <a
                href="https://wa.me/918187882772"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto text-center bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                Ask our CA Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabbed Layout */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3" style={display}>
              Choose an ITR Form
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Explore the detailed criteria, exemptions, exclusions, and limits for each specific form type.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 items-start">
            {/* Left Column: Tab Selectors */}
            <div className="lg:col-span-1 space-y-2 bg-card border border-border p-4 rounded-3xl lg:sticky lg:top-20 shadow-sm">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 pb-2 border-b border-border mb-2" style={mono}>
                ITR Form Types
              </div>
              {tabs.map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as ItrTab)}
                    className={`w-full flex flex-col items-start text-left p-3.5 rounded-2xl transition-all border cursor-pointer ${
                      isActive
                        ? "bg-[#0C1B33] border-[#0C1B33] text-white shadow-md"
                        : "bg-transparent border-transparent hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-sm" style={display}>{t.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isActive ? "bg-blue-500/20 text-blue-300" : "bg-muted text-muted-foreground"
                      }`} style={mono}>
                        {t.label}
                      </span>
                    </div>
                    <span className={`text-xs mt-1 leading-normal ${isActive ? "text-blue-200/80" : "text-muted-foreground"}`}>
                      {t.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Tab Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* ITR-1 */}
              {activeTab === "itr-1" && (
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full" style={mono}>Individual Resident</span>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full" style={mono}>Salaried</span>
                      </div>
                      <h3 className="text-3xl font-extrabold text-foreground mt-2" style={display}>ITR-1</h3>
                      <p className="text-sm text-muted-foreground mt-1">Simplest tax filing form for individuals with income up to ₹50 Lakhs.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 border border-border p-4 rounded-2xl text-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase block" style={mono}>Max Income Limit</span>
                      <strong className="text-xl font-extrabold text-primary block mt-0.5">₹50 Lakhs</strong>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Eligibility List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" /> Who Can File ITR-1?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Salaried individuals or pensioners receiving regular monthly pay.",
                          "Income from only one house property (excluding brought forward/carried forward losses).",
                          "Income from other sources (such as Bank Interest, FD, dividends, family pension).",
                          "Agricultural income up to a maximum of ₹5,000.",
                          "Long-Term Capital Gains (LTCG) u/s 112A up to ₹1.25 Lakhs."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-green-600 font-extrabold mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" /> Who Cannot File ITR-1?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Non-Residents (NRI) or Resident but Not Ordinarily Residents (RNOR).",
                          "Total annual income exceeding ₹50 Lakhs.",
                          "Income from business, trade, or professional practice.",
                          "Income from more than one house property.",
                          "Taxable Capital Gains (STCG, or LTCG exceeding ₹1.25L).",
                          "Individuals holding a directorship in a company.",
                          "Individuals holding unlisted equity shares at any time.",
                          "Possessing foreign assets or signing authority in foreign bank accounts."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-red-500 font-extrabold mt-0.5">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Summary / Documents */}
                  <div className="bg-slate-50 dark:bg-slate-900 border border-border p-5 rounded-2xl space-y-3">
                    <h5 className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5" style={mono}>
                      <Info className="w-4 h-4 text-blue-500" /> Essential Documents Checklist
                    </h5>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {["Form 16 (Part A & B)", "AIS & TIS Statement", "Form 26AS", "Bank Account Statement", "Interest Certificates (Post Office / Banks)"].map((doc) => (
                        <span key={doc} className="bg-card border border-border px-3 py-1.5 rounded-lg font-medium text-muted-foreground">{doc}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ITR-2 */}
              {activeTab === "itr-2" && (
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#0C1B33] text-white text-xs font-bold px-3 py-1 rounded-full" style={mono}>Individuals &amp; HUF</span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full" style={mono}>Capital Gains &amp; Foreign assets</span>
                      </div>
                      <h3 className="text-3xl font-extrabold text-foreground mt-2" style={display}>ITR-2</h3>
                      <p className="text-sm text-muted-foreground mt-1">For individuals and HUFs who have capital gains, foreign assets, or income exceeding ₹50L, but do not have business income.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 border border-border p-4 rounded-2xl text-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase block" style={mono}>Max Income Limit</span>
                      <strong className="text-xl font-extrabold text-primary block mt-0.5">No Limit</strong>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Eligibility List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" /> Who Can File ITR-2?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Individuals/HUFs with total income exceeding ₹50 Lakhs.",
                          "Capital gains from sale of shares, mutual funds, land, gold, or property.",
                          "Income from more than one house property.",
                          "Holding unlisted equity shares or holding a directorship in a company.",
                          "Having agricultural income exceeding ₹5,000.",
                          "Having foreign assets, foreign income, or signing authority in foreign accounts.",
                          "Non-residents (NRI) or RNOR receiving Indian income."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-green-600 font-extrabold mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" /> Who Cannot File ITR-2?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Any individual or HUF who earns income from a proprietary business, trade, or professional practice (e.g. CA, Doctor, Lawyer, shopkeepers).",
                          "Freelancers or consultants filing as sole proprietors with business turnover/receipts."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-red-500 font-extrabold mt-0.5">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Summary / Documents */}
                  <div className="bg-slate-50 dark:bg-slate-900 border border-border p-5 rounded-2xl space-y-3">
                    <h5 className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5" style={mono}>
                      <Info className="w-4 h-4 text-blue-500" /> Essential Documents Checklist
                    </h5>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {["Capital Gain Statements (Broker Reports)", "Property Sale Deed", "Foreign Bank/Asset Statements", "Form 16", "AIS / TIS", "Form 26AS"].map((doc) => (
                        <span key={doc} className="bg-card border border-border px-3 py-1.5 rounded-lg font-medium text-muted-foreground">{doc}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ITR-3 */}
              {activeTab === "itr-3" && (
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#0C1B33] text-white text-xs font-bold px-3 py-1 rounded-full" style={mono}>Business &amp; Profession</span>
                        <span className="bg-violet-100 text-violet-800 text-xs font-bold px-3 py-1 rounded-full" style={mono}>F&amp;O, Crypto, Audits</span>
                      </div>
                      <h3 className="text-3xl font-extrabold text-foreground mt-2" style={display}>ITR-3</h3>
                      <p className="text-sm text-muted-foreground mt-1">Most comprehensive form for individuals and HUFs carrying on a business, profession, or trading.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 border border-border p-4 rounded-2xl text-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase block" style={mono}>Max Income Limit</span>
                      <strong className="text-xl font-extrabold text-primary block mt-0.5">No Limit</strong>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Eligibility List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" /> Who Can File ITR-3?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Proprietors of businesses, retail shops, wholesale outlets, or manufacturing units.",
                          "Professionals such as Chartered Accountants, Doctors, Lawyers, Architects, or IT Consultants.",
                          "Freelancers and contractors who do not opt for Presumptive Taxation.",
                          "Intraday equity traders and Futures & Options (F&O) traders.",
                          "Individuals holding virtual digital assets (VDA/Crypto/NFTs).",
                          "Partners in a partnership firm receiving salary, bonus, interest, or profit share.",
                          "Individuals whose accounts require an audit under Section 44AB."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-green-600 font-extrabold mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" /> Who Cannot File ITR-3?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Partnership firms, LLPs, Companies, or Trusts (these use separate organizational forms).",
                          "Individuals and HUFs with NO income from business or profession (they should use ITR-1 or ITR-2)."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-red-500 font-extrabold mt-0.5">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Summary / Documents */}
                  <div className="bg-slate-50 dark:bg-slate-900 border border-border p-5 rounded-2xl space-y-3">
                    <h5 className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5" style={mono}>
                      <Info className="w-4 h-4 text-blue-500" /> Essential Documents Checklist
                    </h5>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {["Balance Sheet & P&L Statements", "F&O/Intraday Trading Ledger", "Crypto Transaction Reports", "Audit Report (if u/s 44AB)", "GST Return Filings", "Bank Statements (Current + Savings)"].map((doc) => (
                        <span key={doc} className="bg-card border border-border px-3 py-1.5 rounded-lg font-medium text-muted-foreground">{doc}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ITR-4 */}
              {activeTab === "itr-4" && (
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full" style={mono}>Presumptive Tax</span>
                      </div>
                      <h3 className="text-3xl font-extrabold text-foreground mt-2" style={display}>ITR-4</h3>
                      <p className="text-sm text-muted-foreground mt-1">Presumptive taxation scheme for quick and easy filing with no bookkeeping requirement.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 border border-border p-4 rounded-2xl text-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase block" style={mono}>Max Income Limit</span>
                      <strong className="text-xl font-extrabold text-primary block mt-0.5">₹50 Lakhs</strong>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Eligibility List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" /> Who Can File ITR-4?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Resident Individuals, HUFs, and Partnership Firms (excluding LLPs) with income up to ₹50 Lakhs.",
                          "Opted for Presumptive Taxation under Section 44AD (Business: declares profit >= 6% or 8% of turnover. Limit: Turnover up to ₹2 Crore or ₹3 Crore with >=95% digital collections).",
                          "Opted for Section 44ADA (Professional receipts up to ₹50 Lakhs or ₹75 Lakhs with >=95% digital receipts. Declares profit >= 50% of receipts).",
                          "Opted for Section 44AE (Transporters owning <= 10 goods carriages).",
                          "No need to maintain complex books of accounts or complete audits."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-green-600 font-extrabold mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" /> Who Cannot File ITR-4?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Non-residents (NRI) or Resident but Not Ordinarily Residents (RNOR).",
                          "Total income exceeds ₹50 Lakhs.",
                          "Partnership firms registered as LLPs (Limited Liability Partnerships).",
                          "Individuals holding a directorship in a company.",
                          "Holding unlisted equity shares at any time.",
                          "Income from more than one house property.",
                          "Having foreign assets/income or carried forward losses under any head.",
                          "Having capital gains (except LTCG u/s 112A up to ₹1.25L)."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-red-500 font-extrabold mt-0.5">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Summary / Documents */}
                  <div className="bg-slate-50 dark:bg-slate-900 border border-border p-5 rounded-2xl space-y-3">
                    <h5 className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5" style={mono}>
                      <Info className="w-4 h-4 text-blue-500" /> Essential Documents Checklist
                    </h5>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {["Gross Receipts / Sales Figures", "Bank Statements (Current + Savings)", "TDS Certificate (Form 16A)", "AIS & TIS Statement", "Form 26AS"].map((doc) => (
                        <span key={doc} className="bg-card border border-border px-3 py-1.5 rounded-lg font-medium text-muted-foreground">{doc}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ITR-5 */}
              {activeTab === "itr-5" && (
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#0C1B33] text-white text-xs font-bold px-3 py-1 rounded-full" style={mono}>Partnership &amp; LLP</span>
                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full" style={mono}>AOPs, BOIs</span>
                      </div>
                      <h3 className="text-3xl font-extrabold text-foreground mt-2" style={display}>ITR-5</h3>
                      <p className="text-sm text-muted-foreground mt-1">Tax return form for non-individual entities excluding registered companies.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 border border-border p-4 rounded-2xl text-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase block" style={mono}>Filing Mode</span>
                      <strong className="text-sm font-extrabold text-primary block mt-0.5">E-filed with DSC/EVC</strong>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Eligibility List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" /> Who Files ITR-5?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Partnership Firms (without LLP status) carrying on business or profession.",
                          "Limited Liability Partnerships (LLPs) registered under LLP Act.",
                          "Association of Persons (AOPs) and Body of Individuals (BOIs).",
                          "Co-operative Societies and Local Authorities.",
                          "Artificial Juridical Persons (AJP).",
                          "Estates of deceased or insolvent persons."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-green-600 font-extrabold mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" /> Who Cannot File ITR-5?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Individual taxpayers or Hindu Undivided Families (HUFs).",
                          "Joint stock companies or registered corporations (these must use ITR-6).",
                          "Charitable, educational, or political trusts claiming exemptions u/s 11 (these must use ITR-7)."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-red-500 font-extrabold mt-0.5">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ITR-6 */}
              {activeTab === "itr-6" && (
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full" style={mono}>Registered Companies</span>
                        <span className="bg-[#0C1B33] text-white text-xs font-bold px-3 py-1 rounded-full" style={mono}>Corporate Filing</span>
                      </div>
                      <h3 className="text-3xl font-extrabold text-foreground mt-2" style={display}>ITR-6</h3>
                      <p className="text-sm text-muted-foreground mt-1">For all registered companies in India that do not claim charitable/religious exemption under section 11.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 border border-border p-4 rounded-2xl text-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase block" style={mono}>Mandatory DSC</span>
                      <strong className="text-sm font-extrabold text-primary block mt-0.5">Required for Audit</strong>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Eligibility List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" /> Who Files ITR-6?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Private Limited Companies registered under Companies Act.",
                          "Public Limited Companies registered under Companies Act.",
                          "One Person Companies (OPC) or Producer Companies.",
                          "Foreign companies with operations or permanent establishments in India."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-green-600 font-extrabold mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" /> Who Cannot File ITR-6?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Companies that claim deduction/exemption under Section 11 (Charitable/religious trusts or institutions, which are required to file ITR-7)."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-red-500 font-extrabold mt-0.5">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ITR-7 */}
              {activeTab === "itr-7" && (
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-violet-100 text-violet-800 text-xs font-bold px-3 py-1 rounded-full" style={mono}>Trusts &amp; NGOs</span>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full" style={mono}>Exempt Organizations</span>
                      </div>
                      <h3 className="text-3xl font-extrabold text-foreground mt-2" style={display}>ITR-7</h3>
                      <p className="text-sm text-muted-foreground mt-1">Special tax filing form for entities claiming exemption as trust, political party, or non-profit institution.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 border border-border p-4 rounded-2xl text-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase block" style={mono}>Filing Mode</span>
                      <strong className="text-xs font-extrabold text-primary block mt-0.5">E-filed with DSC/EVC</strong>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Eligibility List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" /> Who Files ITR-7?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Charitable or Religious Trusts claiming exemptions under Section 139(4A).",
                          "Political parties filing under Section 139(4B).",
                          "Scientific Research Associations, News Agencies, and professional bodies under Section 139(4C).",
                          "Universities, schools, colleges, medical institutions, and hospitals under Section 139(4D).",
                          "Business Trusts (Section 139(4E)) and Investment Funds (Section 139(4F))."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-green-600 font-extrabold mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider" style={mono}>
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" /> Who Cannot File ITR-7?
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Any individual, HUF, firm, company, or entity NOT claiming exemption under the above-mentioned specific non-profit sections."
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-sm text-muted-foreground">
                            <span className="text-red-500 font-extrabold mt-0.5">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Direct Comparison Matrix Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#0C1B33] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              QUICK OVERVIEW
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3" style={display}>
              ITR Forms Comparison Matrix
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Compare primary source streams, limits, and eligible entities for all 7 ITR types at a glance.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0C1B33] text-white border-b border-slate-700">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider" style={mono}>Form</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider" style={mono}>Applicable To</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider" style={mono}>Core Income Sources</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider" style={mono}>Max Income Limit</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider" style={mono}>Key Exclusions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm text-muted-foreground">
                  {[
                    {
                      form: "ITR-1",
                      to: "Resident Individuals",
                      sources: "Salary, 1 House Property, Other Sources, Agri <= ₹5K",
                      limit: "₹50 Lakhs",
                      excl: "Business owners, company directors, foreign assets, unlisted equity"
                    },
                    {
                      form: "ITR-2",
                      to: "Individuals & HUF",
                      sources: "Salary, Capital Gains, Foreign Income/Assets, Multiple Properties",
                      limit: "No Limit",
                      excl: "Proprietary business or professional income"
                    },
                    {
                      form: "ITR-3",
                      to: "Individuals & HUF",
                      sources: "Proprietary Business, Profession, F&O/Crypto, Audit cases",
                      limit: "No Limit",
                      excl: "Partnership firms, LLPs, companies"
                    },
                    {
                      form: "ITR-4",
                      to: "Resident Ind/HUF/Firms",
                      sources: "Presumptive Tax (Sec 44AD/44ADA/44AE), Salary, 1 House Prop",
                      limit: "₹50 Lakhs",
                      excl: "LLPs, foreign assets, company directors, capital gains"
                    },
                    {
                      form: "ITR-5",
                      to: "Firms, LLPs, AOPs, BOIs",
                      sources: "Business, Profession, Capital Gains, House Property",
                      limit: "No Limit",
                      excl: "Individuals, HUFs, Registered Companies, Trusts"
                    },
                    {
                      form: "ITR-6",
                      to: "Companies",
                      sources: "Corporate income, business profits, capital gains",
                      limit: "No Limit",
                      excl: "Charitable/religious trusts claiming Sec 11 exemption"
                    },
                    {
                      form: "ITR-7",
                      to: "Trusts & NGO Orgs",
                      sources: "Trust incomes, scientific research, political funding",
                      limit: "No Limit",
                      excl: "Normal individuals, commercial businesses"
                    }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-bold text-foreground whitespace-nowrap" style={display}>{row.form}</td>
                      <td className="p-4 text-xs font-semibold text-slate-800 dark:text-slate-200">{row.to}</td>
                      <td className="p-4 text-xs leading-relaxed">{row.sources}</td>
                      <td className="p-4 text-xs font-bold text-primary whitespace-nowrap">{row.limit}</td>
                      <td className="p-4 text-xs leading-relaxed">{row.excl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CA Team Professional CTA Banner */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <SectionParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 text-xs font-bold px-4 py-1.5 rounded-full" style={mono}>
            <ShieldCheck className="w-4 h-4 text-blue-400" /> EXPERT CA FILING SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight" style={display}>
            Let our CA Team File Your Return Accurately
          </h2>
          <p className="text-blue-100/75 text-base sm:text-lg max-w-2xl mx-auto">
            Avoid errors, maximize deductions (Section 80C, 80D, 10(13A), etc.), and ensure a stress-free tax season. 
            File under the professional guidance of our CA Team.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto grid sm:grid-cols-2 gap-6 text-left items-center backdrop-blur-sm">
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <div className="font-extrabold text-white text-base" style={display}>CA Team</div>
                  <div className="text-xs text-blue-300 font-semibold" style={mono}>dtaxrail@gmail.com</div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-blue-200">
                <p>✓ Authorized e-Return filing support</p>
                <p>✓ Precision analysis of AIS/TIS data streams</p>
                <p>✓ Defect notices resolving u/s 139(9)</p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/918187882772"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-6 rounded-xl text-center block transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                Start Chat on WhatsApp
              </a>
              <a
                href="tel:8187882772"
                className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold py-3 px-6 rounded-xl text-center block transition-all text-sm"
              >
                Call: +91 8187882772
              </a>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setPage("home")}
              className="text-white hover:text-blue-200 text-sm font-semibold inline-flex items-center gap-2 underline underline-offset-4 cursor-pointer"
            >
              Back to Home <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
