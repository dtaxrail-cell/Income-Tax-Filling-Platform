import { useState, useEffect } from "react";
import { 
  X, FileText, TrendingUp, Database, Bell, Calculator, 
  CheckCircle, ArrowRight, Sparkles, UploadCloud, Info, 
  AlertTriangle, ShieldCheck, Calendar, PhoneCall, HelpCircle
} from "lucide-react";
import { Page, display, mono } from "../types";
import { calculateNewRegimeTax, calculateOldRegimeTax } from "../utils/taxSlabs";
import confetti from "canvas-confetti";

interface PlatformModalProps {
  activeService: string | null;
  onClose: () => void;
  setPage: (p: Page) => void;
}

export function PlatformModal({ activeService, onClose, setPage }: PlatformModalProps) {
  const [tab, setTab] = useState<string>("");
  
  // States for ITR Filing Wizard
  const [itrIncomeSources, setItrIncomeSources] = useState<string[]>([]);
  const [itrMatchedForm, setItrMatchedForm] = useState<string | null>(null);

  // States for Refund Tracker
  const [refundPan, setRefundPan] = useState("ABCPK1234R");
  const [refundAy, setRefundAy] = useState("2026-27");
  const [refundStatus, setRefundStatus] = useState<"idle" | "loading" | "success">("idle");
  const [refundProgress, setRefundProgress] = useState(0);

  // States for Document Scanner
  const [scannedDoc, setScannedDoc] = useState<string | null>(null);
  const [scanningStatus, setScanningStatus] = useState<"idle" | "scanning" | "done">("idle");
  const [scanResult, setScanResult] = useState<{ salary: number; tds: number; deduction80c: number } | null>(null);

  // States for Tax Calculator
  const [calcIncome, setCalcIncome] = useState(1200000);
  const [calcDeductions, setCalcDeductions] = useState(150000);
  const [calcTdsPaid, setCalcTdsPaid] = useState(80000);
  const [calcRegime, setCalcRegime] = useState<"new" | "old">("new");

  // States for Compliance Alerts
  const [alertName, setAlertName] = useState("");
  const [alertPhone, setAlertPhone] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [alertTopics, setAlertTopics] = useState<string[]>(["ITR", "AdvanceTax"]);
  const [alertSubscribed, setAlertSubscribed] = useState(false);

  // Synced tab effect
  useEffect(() => {
    if (activeService) {
      if (activeService === "Platform" || activeService === "Overview") {
        setTab("Overview");
      } else {
        setTab(activeService);
      }
    }
  }, [activeService]);

  if (!activeService) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleItrCheckbox = (source: string) => {
    if (itrIncomeSources.includes(source)) {
      setItrIncomeSources(itrIncomeSources.filter(s => s !== source));
    } else {
      setItrIncomeSources([...itrIncomeSources, source]);
    }
  };

  const matchItrForm = () => {
    if (itrIncomeSources.length === 0) {
      setItrMatchedForm("No sources selected");
      return;
    }
    
    // Logic for ITR matching:
    // Business Income / Professional Receipts >= 75L or audited -> ITR-3
    // Presumptive Business/Professional (under 44AD/44ADA) -> ITR-4
    // Capital Gains (stocks, property sales) -> ITR-2
    // Foreign Income/Assets or Director in Co -> ITR-2
    // Only Salary + One House Property + Interest -> ITR-1
    if (itrIncomeSources.includes("Business") || itrIncomeSources.includes("Crypto")) {
      setItrMatchedForm("ITR-3");
    } else if (itrIncomeSources.includes("Freelance")) {
      setItrMatchedForm("ITR-4");
    } else if (itrIncomeSources.includes("CapitalGains") || itrIncomeSources.includes("ForeignIncome") || itrIncomeSources.includes("MultipleProperties")) {
      setItrMatchedForm("ITR-2");
    } else {
      setItrMatchedForm("ITR-1");
    }
    triggerConfetti();
  };

  const startRefundTracking = () => {
    if (!refundPan || refundPan.length < 10) return;
    setRefundStatus("loading");
    setRefundProgress(0);
    
    const interval = setInterval(() => {
      setRefundProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setRefundStatus("success");
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const handleDocumentScan = (docName: string) => {
    setScannedDoc(docName);
    setScanningStatus("scanning");
    setScanResult(null);
    
    setTimeout(() => {
      setScanningStatus("done");
      if (docName === "Form_16.pdf") {
        setScanResult({
          salary: 940000,
          tds: 56400,
          deduction80c: 150000
        });
      } else {
        setScanResult({
          salary: 125000, // dividend/interest/etc from AIS
          tds: 3120,
          deduction80c: 0
        });
      }
      triggerConfetti();
    }, 1500);
  };

  const handleSubscribeAlerts = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertPhone || !alertName) return;
    setAlertSubscribed(true);
    triggerConfetti();
  };

  // Math for Tax Calculator tab
  const oldTax = calculateOldRegimeTax(calcIncome, calcDeductions, true);
  const newTax = calculateNewRegimeTax(calcIncome, true);
  const bestRegime = newTax <= oldTax ? "new" : "old";
  const taxSavings = Math.abs(oldTax - newTax);
  const netDueOrRefund = calcTdsPaid - (calcRegime === "new" ? newTax : oldTax);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const tabsList = [
    { name: "Overview", label: "Hub Index" },
    { name: "ITR Filing", label: "ITR Filing" },
    { name: "Refund Tracking", label: "Refund Track" },
    { name: "Document Management", label: "Doc Cabinet" },
    { name: "Tax Calculator", label: "Calculator" },
    { name: "Compliance Alerts", label: "Tax Calendar" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-border shadow-2xl rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-[#0C1B33] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 border border-primary/40 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight" style={display}>D Tax Rail Platform Hub</h2>
              <p className="text-[10px] text-blue-300 font-medium uppercase tracking-wider" style={mono}>Smart Portal Services &amp; Tools</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Horizontal Navigation */}
        <div className="bg-muted border-b border-border flex items-center gap-1 overflow-x-auto p-1.5 scrollbar-none">
          {tabsList.map((t) => (
            <button
              key={t.name}
              onClick={() => setTab(t.name)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                tab === t.name 
                  ? "bg-white dark:bg-slate-800 text-primary shadow-sm border border-border" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Modal Main Body (Scrollable Content) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-background">
          {tab === "Overview" && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2" style={display}>India's Intelligent Tax Pipeline</h3>
                <p className="text-sm text-muted-foreground">
                  Our unified ecosystem streamlines e-filing, tracks tax refunds, organizes credentials, predicts calculations, and ensures compliant filing cycles.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    t: "ITR Filing",
                    d: "Custom return filing templates for salaries, freelancers, and businesses. Includes expert CA audit review.",
                    icon: FileText,
                    color: "text-blue-600 bg-blue-50"
                  },
                  {
                    t: "Refund Tracking",
                    d: "Direct status query linked to NSDL and CPC. Alerts you immediately upon refund authorization and bank disbursement.",
                    icon: TrendingUp,
                    color: "text-green-600 bg-green-50"
                  },
                  {
                    t: "Document Management",
                    d: "Store Form 16, AIS, and Form 26AS. Automatically reconciles records to match exactly and avoid IT department warning letters.",
                    icon: Database,
                    color: "text-violet-600 bg-violet-50"
                  },
                  {
                    t: "Tax Calculator",
                    d: "Side-by-side computation of Old and New regimes for FY 2025-26, including standard deduction and Section 87A deductions.",
                    icon: Calculator,
                    color: "text-rose-600 bg-rose-50"
                  },
                  {
                    t: "Compliance Alerts",
                    d: "SMS and WhatsApp reminder alerts for advance tax schedules, TDS submission windows, and quarterly filings.",
                    icon: Bell,
                    color: "text-amber-600 bg-amber-50"
                  }
                ].map((item) => (
                  <button
                    key={item.t}
                    onClick={() => setTab(item.t)}
                    className="text-left bg-card hover:bg-muted/40 border border-border hover:border-primary/40 rounded-2xl p-5 transition-all group flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-foreground mb-1 text-sm group-hover:text-primary transition-colors" style={display}>{item.t}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.d}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-[11px] text-primary font-bold">
                      Open Tool <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ITR FILING TAB */}
          {tab === "ITR Filing" && (
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Explanation Column */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase" style={mono}>
                  Platform Service
                </div>
                <h3 className="text-2xl font-bold text-foreground" style={display}>Income Tax Return Filing</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Filing an Income Tax Return (ITR) is a legal declaration of your income, tax liability, and taxes paid to the Government of India. 
                </p>
                <div className="space-y-3.5 bg-muted/50 p-4 rounded-2xl border border-border">
                  <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-500" /> Why do we need it?
                  </div>
                  <ul className="space-y-2.5 text-xs text-muted-foreground list-disc pl-4">
                    <li><strong>Legal Mandate:</strong> Compulsory if gross total income exceeds basic exemption threshold (₹2.5L Old / ₹7L New regime).</li>
                    <li><strong>Claim TDS Refunds:</strong> The only way to claim back excess tax deducted at source (TDS) by employers, banks, or clients.</li>
                    <li><strong>Loan Eligibility:</strong> Banks require the last 3 years of ITR receipts as financial proof for Home, Business, or Car loans.</li>
                    <li><strong>Loss Carry-Forward:</strong> Allows carrying forward capital losses or business losses to offset against future profits.</li>
                    <li><strong>Visa Processing:</strong> Consulates require past ITR filings to verify financial standing before approving travel visas.</li>
                  </ul>
                </div>
              </div>

              {/* Interactive Tool Column */}
              <div className="lg:col-span-7 bg-muted/20 border border-border rounded-3xl p-5 md:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-bold text-foreground">ITR Form Wizard</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    Check which ITR form fits your profile by choosing your sources of income:
                  </p>

                  <div className="space-y-2.5">
                    {[
                      { id: "Salary", label: "💼 Salary or Pension income" },
                      { id: "OneHouse", label: "🏠 Single House Property income/loss" },
                      { id: "MultipleProperties", label: "🏢 Multiple properties or rental losses" },
                      { id: "Freelance", label: "🚀 Freelance, CA, Doctor or Consulting receipts (under ₹75L)" },
                      { id: "Business", label: "🏪 Retail business, manufacturing or wholesale turnover" },
                      { id: "CapitalGains", label: "📈 Capital gains (Stocks, mutual funds, gold, or property sale)" },
                      { id: "Crypto", label: "🪙 Virtual Digital Assets / Crypto trading" },
                      { id: "ForeignIncome", label: "🌍 Foreign assets, foreign bank accounts or foreign source income" }
                    ].map((item) => (
                      <label key={item.id} className="flex items-center gap-3 p-2 bg-card hover:bg-muted border border-border rounded-xl cursor-pointer transition-colors select-none">
                        <input 
                          type="checkbox"
                          checked={itrIncomeSources.includes(item.id)}
                          onChange={() => handleItrCheckbox(item.id)}
                          className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer" 
                        />
                        <span className="text-xs text-foreground font-medium">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <button
                    onClick={matchItrForm}
                    className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Match ITR Form &amp; Check Details
                  </button>

                  {itrMatchedForm && (
                    <div className="mt-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 animate-in slide-in-from-top-4 duration-200">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700" style={mono}>Matched Form</span>
                        <span className="bg-blue-600 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full">{itrMatchedForm}</span>
                      </div>
                      
                      <div className="text-xs font-bold mb-1">
                        {itrMatchedForm === "ITR-1" && "ITR-1 (Sahaj) — For Salaried Individuals"}
                        {itrMatchedForm === "ITR-2" && "ITR-2 — For Capital Gains & Foreign Assets"}
                        {itrMatchedForm === "ITR-3" && "ITR-3 — For Business Owners & Audited Professionals"}
                        {itrMatchedForm === "ITR-4" && "ITR-4 (Sugam) — For Presumptive Taxpayers"}
                        {itrMatchedForm === "No sources selected" && "Please select at least one income source."}
                      </div>

                      {itrMatchedForm !== "No sources selected" && (
                        <>
                          <p className="text-[10px] text-blue-800 leading-normal mb-3">
                            {itrMatchedForm === "ITR-1" && "Applicable for residents with total income up to ₹50 Lakhs from Salary, 1 House Property, and other interest/dividend sources."}
                            {itrMatchedForm === "ITR-2" && "For individuals/HUFs not having income from business/profession. Fits stock investors, home sellers, and NRI citizens."}
                            {itrMatchedForm === "ITR-3" && "For individuals/HUFs having income from proprietary business or profession. Necessary for stock traders carrying forward intraday/F&O losses."}
                            {itrMatchedForm === "ITR-4" && "For residents having presumptive business income under Sec 44AD (retailers) or professional income under Sec 44ADA (freelancers)."}
                          </p>
                          <div className="flex gap-2 justify-end">
                            <button 
                              onClick={() => { onClose(); setPage("contact"); }}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              File Your {itrMatchedForm} Return <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* REFUND TRACKING TAB */}
          {tab === "Refund Tracking" && (
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Explanation Column */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-block bg-green-100 text-green-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase" style={mono}>
                  Platform Service
                </div>
                <h3 className="text-2xl font-bold text-foreground" style={display}>Income Tax Refund Tracking</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  After filing your ITR, if the tax calculated is less than the tax already paid through TDS, TCS, or Advance Tax, you are eligible for an Income Tax Refund.
                </p>
                <div className="space-y-3.5 bg-muted/50 p-4 rounded-2xl border border-border">
                  <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-green-600" /> Why do we need it?
                  </div>
                  <ul className="space-y-2.5 text-xs text-muted-foreground list-disc pl-4">
                    <li><strong>Track Status:</strong> Keep tabs on whether the refund claim has been approved by the Centralized Processing Center (CPC) at Bengaluru.</li>
                    <li><strong>Solve Failures:</strong> Detect issues like bank account name mismatch or invalid IFSC code early, preventing failed refund disbursements.</li>
                    <li><strong>Monitor Interest:</strong> Under Section 244A, you are entitled to 0.5% interest per month on the refund amount. Tracking verifies this interest computation.</li>
                    <li><strong>Handle Discrepancies:</strong> Catch notice/demand orders before they incur interest fees, allowing timely filing of rectification requests.</li>
                  </ul>
                </div>
              </div>

              {/* Interactive Tool Column */}
              <div className="lg:col-span-7 bg-muted/20 border border-border rounded-3xl p-5 md:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-foreground">Refund Status Checker (CPC Simulator)</span>
                  </div>

                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1.5" style={mono}>PAN Card Number</label>
                      <input
                        type="text"
                        value={refundPan}
                        onChange={(e) => setRefundPan(e.target.value.toUpperCase())}
                        placeholder="e.g. ABCPK1234R"
                        maxLength={10}
                        className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                        style={mono}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1.5" style={mono}>Assessment Year</label>
                      <select
                        value={refundAy}
                        onChange={(e) => setRefundAy(e.target.value)}
                        className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                        style={mono}
                      >
                        <option value="2026-27">AY 2026-27 (FY 2025-26)</option>
                        <option value="2025-26">AY 2025-26 (FY 2024-25)</option>
                        <option value="2024-25">AY 2024-25 (FY 2023-24)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <button
                    onClick={startRefundTracking}
                    disabled={refundPan.length < 10 || refundStatus === "loading"}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    {refundStatus === "loading" ? "Retrieving NSDL Portal..." : "Query Refund Status"}
                  </button>

                  {refundStatus === "loading" && (
                    <div className="mt-4 space-y-2 bg-card border border-border p-4 rounded-2xl animate-pulse">
                      <div className="flex justify-between text-xs font-bold text-foreground" style={mono}>
                        <span>Querying TIN-NSDL Database...</span>
                        <span>{refundProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-green-600 h-1.5 transition-all duration-300" style={{ width: `${refundProgress}%` }} />
                      </div>
                    </div>
                  )}

                  {refundStatus === "success" && (
                    <div className="mt-4 p-4 rounded-2xl bg-green-50 border border-green-100 text-green-900 animate-in slide-in-from-top-4 duration-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-700" style={mono}>CPC Status Report</span>
                        <span className="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">Refund Issued</span>
                      </div>
                      
                      <div className="space-y-3.5 text-xs">
                        <div className="flex justify-between pb-1.5 border-b border-green-200/50">
                          <span className="text-green-800">Refund Amount:</span>
                          <strong className="text-green-950">₹18,450</strong>
                        </div>
                        <div className="flex justify-between pb-1.5 border-b border-green-200/50">
                          <span className="text-green-800">Payment Mode:</span>
                          <span className="text-green-950 font-medium">Direct Bank Credit (ECS)</span>
                        </div>
                        <div className="flex justify-between pb-1.5 border-b border-green-200/50">
                          <span className="text-green-800">Target Bank Account:</span>
                          <span className="text-green-950 font-semibold" style={mono}>State Bank of India (Ending: *8792)</span>
                        </div>
                        <div className="flex justify-between pb-1.5 border-b border-green-200/50">
                          <span className="text-green-800">Disbursement Date:</span>
                          <span className="text-green-950 font-semibold" style={mono}>May 18, 2026</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-800">Remarks:</span>
                          <span className="text-green-950 italic text-[11px] leading-tight text-right max-w-[200px]">Refund has been successfully credited. Please check your bank statement.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENT MANAGEMENT TAB */}
          {tab === "Document Management" && (
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Explanation Column */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-block bg-violet-100 text-violet-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase" style={mono}>
                  Platform Service
                </div>
                <h3 className="text-2xl font-bold text-foreground" style={display}>Smart Document Management</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tax filing in India requires coordinating multiple compliance sheets issued by employers, financial institutions, and the Income Tax Department.
                </p>
                <div className="space-y-3.5 bg-muted/50 p-4 rounded-2xl border border-border">
                  <div className="text-xs font-bold text-foreground flex-shrink-0 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-violet-600" /> Why do we need it?
                  </div>
                  <ul className="space-y-2.5 text-xs text-muted-foreground list-disc pl-4">
                    <li><strong>Form 16 Reconciliation:</strong> Employers break down salary components and tax deducted in Form 16, which is crucial for filling out income returns accurately.</li>
                    <li><strong>Avoid AIS/26AS Notice Risks:</strong> The department issues AIS (Annual Information Statement) tracking all dividends, stock sales, and interest. Any mismatch between your ITR and AIS triggers automated notice audits.</li>
                    <li><strong>Secure Central Access:</strong> Keeps past filings, tax-saving investment proofs, and interest certificates sorted in one secure locker, vital for future visa audits and home loan documentation.</li>
                  </ul>
                </div>
              </div>

              {/* Interactive Tool Column */}
              <div className="lg:col-span-7 bg-muted/20 border border-border rounded-3xl p-5 md:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                    <Database className="w-5 h-5 text-violet-600" />
                    <span className="text-sm font-bold text-foreground">Secure Tax Document Scanner</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-4">
                    Simulate upload and automatic OCR classification of tax files. Click on a document to scan:
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => handleDocumentScan("Form_16.pdf")}
                      disabled={scanningStatus === "scanning"}
                      className="p-4 bg-card border-2 border-dashed border-border hover:border-violet-400 hover:bg-violet-50/20 rounded-2xl text-center transition-all cursor-pointer group"
                    >
                      <UploadCloud className="w-8 h-8 text-violet-500 mx-auto mb-2 group-hover:scale-105 transition-transform" />
                      <span className="block text-xs font-bold text-foreground">Form_16.pdf</span>
                      <span className="text-[10px] text-muted-foreground">Salary Tax Certificate</span>
                    </button>

                    <button
                      onClick={() => handleDocumentScan("AIS_Statement.pdf")}
                      disabled={scanningStatus === "scanning"}
                      className="p-4 bg-card border-2 border-dashed border-border hover:border-violet-400 hover:bg-violet-50/20 rounded-2xl text-center transition-all cursor-pointer group"
                    >
                      <UploadCloud className="w-8 h-8 text-violet-500 mx-auto mb-2 group-hover:scale-105 transition-transform" />
                      <span className="block text-xs font-bold text-foreground">AIS_Statement.pdf</span>
                      <span className="text-[10px] text-muted-foreground">Annual Info Sheet</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  {scanningStatus === "scanning" && (
                    <div className="space-y-2 bg-card border border-border p-4 rounded-2xl animate-pulse">
                      <div className="flex justify-between text-xs font-bold text-foreground" style={mono}>
                        <span>Running AI OCR Parser on {scannedDoc}...</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-violet-600 h-1.5 animate-infinite-loading" style={{ animationDuration: "1.5s" }} />
                      </div>
                    </div>
                  )}

                  {scanningStatus === "done" && scanResult && (
                    <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 text-violet-900 animate-in slide-in-from-top-4 duration-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700" style={mono}>OCR Classification success</span>
                        <span className="bg-violet-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">Processed</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between border-b border-violet-200/50 pb-1.5">
                          <span>Extracted Gross Income:</span>
                          <strong className="text-violet-950">{formatCurrency(scanResult.salary)}</strong>
                        </div>
                        <div className="flex justify-between border-b border-violet-200/50 pb-1.5">
                          <span>Extracted TDS Deductions:</span>
                          <strong className="text-violet-950">{formatCurrency(scanResult.tds)}</strong>
                        </div>
                        <div className="flex justify-between border-b border-violet-200/50 pb-1.5">
                          <span>Section 80C Investment:</span>
                          <strong className="text-violet-950">{formatCurrency(scanResult.deduction80c)}</strong>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-white border border-violet-100 rounded-xl flex gap-2.5 text-[10px] text-muted-foreground leading-normal">
                        <ShieldCheck className="w-5 h-5 text-violet-600 flex-shrink-0" />
                        <div>
                          <strong>Verification complete:</strong> The data has been parsed and pre-filled in your portal profile draft return. Ready to file without mismatches.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAX CALCULATOR TAB */}
          {tab === "Tax Calculator" && (
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Explanation Column */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-block bg-rose-100 text-rose-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase" style={mono}>
                  Platform Tool
                </div>
                <h3 className="text-2xl font-bold text-foreground" style={display}>Income Tax &amp; Regime Calculator</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Budget revisions in India regularly change standard deductions, tax slab brackets, and rebate caps, making proactive planning essential.
                </p>
                <div className="space-y-3.5 bg-muted/50 p-4 rounded-2xl border border-border">
                  <div className="text-xs font-bold text-foreground flex-shrink-0 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-rose-600" /> Why do we need it?
                  </div>
                  <ul className="space-y-2.5 text-xs text-muted-foreground list-disc pl-4">
                    <li><strong>Regime Comparison:</strong> Direct side-by-side computation of Old vs New regime is necessary since deductions (80C, 80D, HRA) apply only to Old regime.</li>
                    <li><strong>Advance Tax Audits:</strong> If your net tax due exceeds ₹10,000 in a year, you must pay Advance Tax in quarterly tranches to avoid penal interest under Sec 234B/C.</li>
                    <li><strong>Maximize Deductions:</strong> Helps you calculate exactly how much standard deduction or 80C insurance savings you need to reduce tax liability.</li>
                  </ul>
                </div>
              </div>

              {/* Interactive Tool Column */}
              <div className="lg:col-span-7 bg-muted/20 border border-border rounded-3xl p-5 md:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                    <Calculator className="w-5 h-5 text-rose-600" />
                    <span className="text-sm font-bold text-foreground">Side-by-Side Regime Estimator</span>
                  </div>

                  <div className="space-y-4">
                    {/* Income Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase" style={mono}>Gross Annual Income</label>
                        <span className="text-xs font-bold text-primary" style={mono}>{formatCurrency(calcIncome)}</span>
                      </div>
                      <input
                        type="range"
                        min={300000}
                        max={3000000}
                        step={50000}
                        value={calcIncome}
                        onChange={(e) => setCalcIncome(Number(e.target.value))}
                        className="w-full h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                      />
                    </div>

                    {/* Deductions Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase" style={mono}>Deductions (For Old Regime)</label>
                        <span className="text-xs font-bold text-foreground" style={mono}>{formatCurrency(calcDeductions)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={250000}
                        step={10000}
                        value={calcDeductions}
                        onChange={(e) => setCalcDeductions(Number(e.target.value))}
                        className="w-full h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                      />
                    </div>

                    {/* TDS Paid */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase" style={mono}>TDS / Taxes Already Paid</label>
                        <span className="text-xs font-bold text-foreground" style={mono}>{formatCurrency(calcTdsPaid)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={500000}
                        step={5000}
                        value={calcTdsPaid}
                        onChange={(e) => setCalcTdsPaid(Number(e.target.value))}
                        className="w-full h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                      />
                    </div>
                  </div>

                  {/* Comparisons */}
                  <div className="grid grid-cols-2 gap-2.5 mt-5">
                    <button
                      onClick={() => setCalcRegime("new")}
                      className={`p-3 rounded-2xl text-left border-2 cursor-pointer transition-all ${
                        calcRegime === "new" ? "border-rose-600 bg-rose-500/5" : "border-border bg-card hover:border-gray-200"
                      }`}
                    >
                      <div className="text-[9px] font-bold text-muted-foreground uppercase" style={mono}>New Regime</div>
                      <div className="text-sm font-extrabold text-foreground mt-0.5" style={display}>{formatCurrency(newTax)}</div>
                      {bestRegime === "new" && <span className="inline-block mt-2 bg-green-100 text-green-700 text-[8px] font-bold px-1.5 py-0.2 rounded" style={mono}>Best Option</span>}
                    </button>

                    <button
                      onClick={() => setCalcRegime("old")}
                      className={`p-3 rounded-2xl text-left border-2 cursor-pointer transition-all ${
                        calcRegime === "old" ? "border-rose-600 bg-rose-500/5" : "border-border bg-card hover:border-gray-200"
                      }`}
                    >
                      <div className="text-[9px] font-bold text-muted-foreground uppercase" style={mono}>Old Regime</div>
                      <div className="text-sm font-extrabold text-foreground mt-0.5" style={display}>{formatCurrency(oldTax)}</div>
                      {bestRegime === "old" && <span className="inline-block mt-2 bg-green-100 text-green-700 text-[8px] font-bold px-1.5 py-0.2 rounded" style={mono}>Best Option</span>}
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  {taxSavings > 0 && (
                    <div className="mb-4 bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-emerald-800">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 animate-pulse" />
                      <div>
                        Tax savings of <strong>{formatCurrency(taxSavings)}</strong> under the <strong>{bestRegime.toUpperCase()}</strong> Regime!
                      </div>
                    </div>
                  )}

                  <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                    netDueOrRefund > 0 ? "bg-green-50 border-green-100 text-green-900" : "bg-amber-50 border-amber-100 text-amber-900"
                  }`}>
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-wide" style={mono}>
                        {netDueOrRefund > 0 ? "Estimated Refund Claim" : "Balance Tax Payable"}
                      </div>
                      <div className="text-xl font-extrabold mt-0.5" style={display}>
                        {formatCurrency(Math.abs(netDueOrRefund))}
                      </div>
                    </div>
                    <button 
                      onClick={() => { onClose(); setPage("contact"); }}
                      className={`text-xs font-bold px-4 py-2.5 rounded-xl text-white transition-colors cursor-pointer ${
                        netDueOrRefund > 0 ? "bg-green-600 hover:bg-green-700" : "bg-amber-600 hover:bg-amber-700"
                      }`}
                    >
                      {netDueOrRefund > 0 ? "Claim Refund" : "Pay & File Return"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COMPLIANCE ALERTS TAB */}
          {tab === "Compliance Alerts" && (
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Explanation Column */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase" style={mono}>
                  Platform Service
                </div>
                <h3 className="text-2xl font-bold text-foreground" style={display}>Compliance &amp; Due Date Alerts</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tax administration runs on strict deadlines. Missing due dates triggers penalties and forfeits your right to carry forward capital losses.
                </p>
                <div className="space-y-3.5 bg-muted/50 p-4 rounded-2xl border border-border">
                  <div className="text-xs font-bold text-foreground flex-shrink-0 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-600" /> Why do we need it?
                  </div>
                  <ul className="space-y-2.5 text-xs text-muted-foreground list-disc pl-4">
                    <li><strong>Section 234F Penalties:</strong> Filing ITR after the July 31 deadline triggers an immediate late fee penalty up to ₹5,000.</li>
                    <li><strong>Avoid Interest charges:</strong> Delayed payment of advance tax installments triggers interest charges at 1% per month under sections 234B and 234C.</li>
                    <li><strong>Audit Deadlines:</strong> Businesses requiring audits must file tax reports before September 30, and returns before October 31 to avoid hefty compliance fines.</li>
                  </ul>
                </div>
              </div>

              {/* Interactive Tool Column */}
              <div className="lg:col-span-7 bg-muted/20 border border-border rounded-3xl p-5 md:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-bold text-foreground">Tax Calendar &amp; Alerts Setup</span>
                  </div>

                  {!alertSubscribed ? (
                    <form onSubmit={handleSubscribeAlerts} className="space-y-3">
                      <p className="text-xs text-muted-foreground mb-1">Subscribe for WhatsApp and SMS alerts for upcoming tax deadlines:</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-muted-foreground uppercase mb-1" style={mono}>Name</label>
                          <input
                            type="text"
                            required
                            value={alertName}
                            onChange={(e) => setAlertName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs font-semibold text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-muted-foreground uppercase mb-1" style={mono}>Phone / WhatsApp</label>
                          <input
                            type="tel"
                            required
                            value={alertPhone}
                            onChange={(e) => setAlertPhone(e.target.value)}
                            placeholder="10-digit Mobile"
                            className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs font-semibold text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-muted-foreground uppercase mb-1" style={mono}>Email</label>
                        <input
                          type="email"
                          required
                          value={alertEmail}
                          onChange={(e) => setAlertEmail(e.target.value)}
                          placeholder="e.g. name@domain.com"
                          className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs font-semibold text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-muted-foreground uppercase mb-1" style={mono}>Alert Preferences</label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          {[
                            { id: "ITR", label: "ITR Filing Deadlines" },
                            { id: "AdvanceTax", label: "Advance Tax tranches" },
                            { id: "GST", label: "GST Returns (Monthly/Quarterly)" },
                            { id: "TDS", label: "TDS Filing Reminders" }
                          ].map((topic) => (
                            <label key={topic.id} className="flex items-center gap-2 p-1.5 bg-card border border-border rounded-lg cursor-pointer">
                              <input
                                type="checkbox"
                                checked={alertTopics.includes(topic.id)}
                                onChange={() => {
                                  if (alertTopics.includes(topic.id)) {
                                    setAlertTopics(alertTopics.filter(t => t !== topic.id));
                                  } else {
                                    setAlertTopics([...alertTopics, topic.id]);
                                  }
                                }}
                                className="rounded text-primary w-3.5 h-3.5 cursor-pointer"
                              />
                              <span className="text-[10px] text-foreground font-medium">{topic.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer mt-3 transition-colors"
                      >
                        Subscribe for WhatsApp Notifications
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-900 animate-in zoom-in-95 duration-200">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-800">
                        <CheckCircle className="w-5 h-5 text-amber-600" />
                        <span>Alert Subscription Activated!</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-normal mb-3">
                        Thank you, <strong>{alertName}</strong>. We have registered <strong>{alertPhone}</strong> for priority tax alerts. You will receive WhatsApp notifications before upcoming deadlines.
                      </p>
                      <button
                        onClick={() => setAlertSubscribed(false)}
                        className="text-[10px] font-bold text-amber-700 underline cursor-pointer hover:text-amber-800"
                      >
                        Modify details / Subscribe another number
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5" style={mono}>Upcoming Tax Due Dates Calendar</h4>
                  <div className="space-y-2">
                    {[
                      { date: "June 15, 2026", event: "1st Installment of Advance Tax (15% due)", type: "Advance Tax" },
                      { date: "July 31, 2026", event: "ITR Filing Deadline for FY 2025-26 (Non-Audit)", type: "ITR Filing" },
                      { date: "Sept 15, 2026", event: "2nd Installment of Advance Tax (45% due)", type: "Advance Tax" },
                      { date: "Oct 31, 2026", event: "ITR Filing Deadline for accounts requiring audit", type: "ITR Filing" }
                    ].map((item) => (
                      <div key={item.date} className="flex justify-between items-center text-xs bg-card p-2 border border-border rounded-xl">
                        <span className="font-semibold text-foreground text-[11px]" style={mono}>{item.date}</span>
                        <div className="text-right">
                          <div className="font-bold text-foreground text-[11px]">{item.event}</div>
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.1 rounded font-bold uppercase">{item.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Secure 256-bit SSL Data Encryption</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-border hover:bg-muted text-foreground font-semibold rounded-xl text-xs cursor-pointer transition-colors"
            >
              Close Hub
            </button>
            <button 
              onClick={() => { onClose(); setPage("contact"); }}
              className="bg-primary hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              Connect with a CA <PhoneCall className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
