import { useState } from "react";
import { Calculator, Sparkles, TrendingUp, Bell, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { calculateNewRegimeTax, calculateOldRegimeTax } from "../utils/taxSlabs";
import { Page, display, mono } from "../types";

export interface TaxEstimatorWidgetProps {
  persona: "salaried" | "retailer" | "freelancer";
  setPersona: (p: "salaried" | "retailer" | "freelancer") => void;
  setPage: (p: Page) => void;
}

export function TaxEstimatorWidget({ persona, setPersona, setPage }: TaxEstimatorWidgetProps) {
  const [income, setIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);
  const [tdsPaid, setTdsPaid] = useState(80000);
  const [selectedRegime, setSelectedRegime] = useState<"new" | "old">("new");
  const [showExplain, setShowExplain] = useState(false);

  const isSalaried = persona === "salaried";
  const oldTax = calculateOldRegimeTax(income, deductions, isSalaried);
  const newTax = calculateNewRegimeTax(income, isSalaried);

  const bestRegime = newTax <= oldTax ? "new" : "old";
  const taxSavings = Math.abs(oldTax - newTax);

  const activeTax = selectedRegime === "new" ? newTax : oldTax;
  const netDueOrRefund = tdsPaid - activeTax;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-blue-100/50 shadow-2xl rounded-3xl p-6 lg:p-7 max-w-[480px] w-full mx-auto relative select-none z-20">
      <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-foreground text-base sm:text-lg flex items-center gap-2" style={display}>
            <Calculator className="w-5 h-5 text-primary" /> Tax &amp; Refund Estimator
          </h3>
          <p className="text-[10px] text-muted-foreground" style={mono}>FY 2025-26 · AY 2026-27</p>
        </div>
        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse" style={mono}>
          Live Calc
        </span>
      </div>

      {/* Persona Toggle */}
      <div className="mb-4">
        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1.5" style={mono}>Filing Persona</label>
        <div className="grid grid-cols-3 gap-1.5 bg-muted p-1 rounded-xl">
          {(["salaried", "retailer", "freelancer"] as const).map((p) => (
            <button
              key={p}
              type="button"
              id={`est-persona-${p}`}
              onClick={() => setPersona(p)}
              className={`py-1.5 text-[11px] font-bold rounded-lg transition-all capitalize cursor-pointer ${
                persona === p
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "salaried" ? "💼 Salaried" : p === "retailer" ? "🏪 Merchant" : "🚀 Freelancer"}
            </button>
          ))}
        </div>
      </div>

      {/* Income Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5" style={mono}>
            Gross Annual Income
          </label>
          <span className="text-xs font-bold text-primary" style={mono}>{formatCurrency(income)}</span>
        </div>
        <input
          type="range"
          id="est-income-slider"
          min={300000}
          max={5000000}
          step={50000}
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5" style={mono}>
          <span>₹3L</span>
          <span>₹25L</span>
          <span>₹50L</span>
        </div>
      </div>

      {/* Deductions Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5" style={mono}>
            Deductions <span className="text-[9px] text-blue-500 font-normal lowercase">(80C, 80D, standard etc.)</span>
          </label>
          <span className="text-xs font-bold text-foreground" style={mono}>{formatCurrency(deductions)}</span>
        </div>
        <input
          type="range"
          id="est-deductions-slider"
          min={0}
          max={250000}
          step={10000}
          value={deductions}
          onChange={(e) => setDeductions(Number(e.target.value))}
          className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5" style={mono}>
          <span>₹0</span>
          <span>₹1.25L</span>
          <span>₹2.5L</span>
        </div>
      </div>

      {/* TDS Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5" style={mono}>
            TDS / Tax Already Paid
          </label>
          <span className="text-xs font-bold text-foreground" style={mono}>{formatCurrency(tdsPaid)}</span>
        </div>
        <input
          type="range"
          id="est-tds-slider"
          min={0}
          max={1500000}
          step={5000}
          value={tdsPaid}
          onChange={(e) => setTdsPaid(Number(e.target.value))}
          className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5" style={mono}>
          <span>₹0</span>
          <span>₹7.5L</span>
          <span>₹15L</span>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          type="button"
          id="select-new-regime"
          onClick={() => setSelectedRegime("new")}
          className={`p-2.5 rounded-xl text-left transition-all border-2 flex flex-col justify-between cursor-pointer ${
            selectedRegime === "new"
              ? "border-primary bg-primary/5"
              : "border-gray-100 bg-white hover:border-gray-200"
          }`}
        >
          <div>
            <div className="text-[9px] font-bold text-muted-foreground uppercase" style={mono}>New Regime</div>
            <div className="text-sm font-extrabold text-foreground mt-0.5" style={display}>
              {formatCurrency(newTax)}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between w-full">
            <span className="text-[9px] text-muted-foreground">Tax Due</span>
            {bestRegime === "new" && (
              <span className="bg-green-100 text-green-700 text-[8px] font-bold px-1 py-0.2 rounded" style={mono}>
                Best
              </span>
            )}
          </div>
        </button>

        <button
          type="button"
          id="select-old-regime"
          onClick={() => setSelectedRegime("old")}
          className={`p-2.5 rounded-xl text-left transition-all border-2 flex flex-col justify-between cursor-pointer ${
            selectedRegime === "old"
              ? "border-primary bg-primary/5"
              : "border-gray-100 bg-white hover:border-gray-200"
          }`}
        >
          <div>
            <div className="text-[9px] font-bold text-muted-foreground uppercase" style={mono}>Old Regime</div>
            <div className="text-sm font-extrabold text-foreground mt-0.5" style={display}>
              {formatCurrency(oldTax)}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between w-full">
            <span className="text-[9px] text-muted-foreground">Tax Due</span>
            {bestRegime === "old" && (
              <span className="bg-green-100 text-green-700 text-[8px] font-bold px-1 py-0.2 rounded" style={mono}>
                Best
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Savings Notification */}
      {taxSavings > 0 && (
        <div className="mb-3 bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 animate-pulse" />
          <div className="leading-tight">
            You save <strong className="text-emerald-700">{formatCurrency(taxSavings)}</strong> under the{" "}
            <strong className="uppercase">{bestRegime === "new" ? "New" : "Old"}</strong> Regime!
          </div>
        </div>
      )}

      {/* Due / Refund */}
      <div className={`p-3 rounded-xl border mb-4 flex items-center gap-3 justify-between transition-all ${
        netDueOrRefund > 0
          ? "bg-green-50 border-green-100"
          : netDueOrRefund < 0
          ? "bg-amber-50 border-amber-100"
          : "bg-gray-50 border-gray-100"
      }`}>
        <div>
          <div className="text-[9px] text-muted-foreground uppercase" style={mono}>
            {netDueOrRefund > 0 ? "Estimated Refund" : netDueOrRefund < 0 ? "Balance Tax Payable" : "Balance Status"}
          </div>
          <div className={`text-base font-black mt-0.5 ${
            netDueOrRefund > 0 ? "text-green-600" : netDueOrRefund < 0 ? "text-amber-600" : "text-gray-600"
          }`} style={display}>
            {formatCurrency(Math.abs(netDueOrRefund))}
          </div>
        </div>
        <div className="flex-shrink-0">
          {netDueOrRefund > 0 ? (
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          ) : netDueOrRefund < 0 ? (
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 animate-bounce">
              <Bell className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <CheckCircle className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        id="est-file-btn"
        onClick={() => setPage("contact")}
        className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs cursor-pointer active:scale-98"
      >
        {netDueOrRefund > 0 ? "Claim Your Refund Now" : "File Your Return Now"}
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Explain calculations */}
      <div className="mt-3.5 border-t border-dashed border-gray-100 pt-3">
        <button
          type="button"
          onClick={() => setShowExplain(!showExplain)}
          className="w-full flex items-center justify-between text-[11px] font-bold text-primary hover:text-blue-600 transition-colors"
        >
          <span>🔍 How is my tax &amp; refund estimated?</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showExplain ? "rotate-180" : ""}`} />
        </button>
        {showExplain && (
          <div className="mt-2 text-[10px] text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-xl border border-border/40 space-y-1.5">
            <p><strong>1. Taxable Income:</strong> Standard deduction of {isSalaried ? "₹75,000" : "₹0"} is deducted from your gross income under the New regime (or {isSalaried ? "₹50,000" : "₹0"} plus your entered deductions under the Old regime).</p>
            <p><strong>2. New Tax Slabs:</strong> Nil up to ₹4L, 5% on ₹4L-8L, 10% on ₹8L-12L, 15% on ₹12L-16L, 20% on ₹16L-20L, 25% on ₹20L-24L, and 30% above ₹24L. Tax is calculated incrementally.</p>
            <p><strong>3. Section 87A Rebate:</strong> If your net taxable income is ₹12,00,000 or below under the New regime, the tax liability is fully rebated to ₹0.</p>
            <p><strong>4. Health &amp; Education Cess:</strong> A surcharge of 4% is added to the calculated tax liability.</p>
            <p><strong>5. Refund/Payable Calculation:</strong> <code>Refund = TDS Paid - Calculated Tax Liability</code>. If positive, you get a refund. If negative, it is a tax due.</p>
          </div>
        )}
      </div>
    </div>
  );
}
