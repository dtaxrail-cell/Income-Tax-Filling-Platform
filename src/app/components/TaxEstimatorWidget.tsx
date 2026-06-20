import { useState, useMemo } from "react";
import { Calculator, ArrowRight, Zap } from "lucide-react";
import { Page } from "../types";

type FY = "2025-26" | "2026-27";
type PersonaType = "salaried" | "freelancer" | "merchant";
type AgeCategory = "general" | "senior" | "super_senior";

interface Props {
  persona: "salaried" | "retailer" | "freelancer";
  setPersona: (p: "salaried" | "retailer" | "freelancer") => void;
  setPage: (p: Page) => void;
}

function calcNewRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  const slabs = [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.10 },
    { limit: 1600000, rate: 0.15 },
    { limit: 2000000, rate: 0.20 },
    { limit: 2400000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 },
  ];
  let prev = 0;
  for (const { limit, rate } of slabs) {
    if (taxableIncome <= prev) break;
    tax += (Math.min(taxableIncome, limit) - prev) * rate;
    prev = limit;
  }
  if (taxableIncome <= 1200000) tax = 0;
  let surcharge = 0;
  if (taxableIncome > 5000000 && taxableIncome <= 10000000) surcharge = tax * 0.10;
  else if (taxableIncome > 10000000 && taxableIncome <= 20000000) surcharge = tax * 0.15;
  else if (taxableIncome > 20000000) surcharge = tax * 0.25;
  return Math.round((tax + surcharge) * 1.04);
}

function calcOldRegimeTax(taxableIncome: number, age: AgeCategory): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  const slabSets: Record<AgeCategory, { limit: number; rate: number }[]> = {
    general: [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ],
    senior: [
      { limit: 300000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ],
    super_senior: [
      { limit: 500000, rate: 0 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ],
  };
  let prev = 0;
  for (const { limit, rate } of slabSets[age]) {
    if (taxableIncome <= prev) break;
    tax += (Math.min(taxableIncome, limit) - prev) * rate;
    prev = limit;
  }
  if (taxableIncome <= 500000) tax = Math.max(0, tax - 12500);
  let surcharge = 0;
  if (taxableIncome > 5000000 && taxableIncome <= 10000000) surcharge = tax * 0.10;
  else if (taxableIncome > 10000000 && taxableIncome <= 20000000) surcharge = tax * 0.15;
  else if (taxableIncome > 20000000) surcharge = tax * 0.25;
  return Math.round((tax + surcharge) * 1.04);
}

function SliderInput({
  label, value, onChange, min, max, step = 10000,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  const [rawInput, setRawInput] = useState<string | null>(null);
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const fmtLabel = (v: number) =>
    v >= 100000
      ? `₹${(v / 100000).toLocaleString("en-IN", { maximumFractionDigits: 1 })}L`
      : `₹${v.toLocaleString("en-IN")}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setRawInput(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num)) onChange(num);
  };

  const handleInputBlur = () => {
    setRawInput(null);
    onChange(Math.min(max, Math.max(min, value)));
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setRawInput(String(value));
    const input = e.currentTarget;
    setTimeout(() => {
      input.select();
    }, 0);
  };

  const handleInputMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (input.selectionStart === 0 && input.selectionEnd === 0 && input.value.length > 0) {
      input.setSelectionRange(input.value.length, input.value.length);
    }
  };

  const displayValue = rawInput !== null ? rawInput : value.toLocaleString("en-IN");

  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white border border-border rounded-lg px-2 py-1.5 shadow-sm focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all flex-shrink-0 w-[118px]">
          <span className="text-xs font-bold text-muted-foreground mr-1 select-none">₹</span>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onMouseUp={handleInputMouseUp}
            className="w-full bg-transparent text-xs font-bold text-foreground focus:outline-none tabular-nums"
          />
        </div>
        <div className="flex-1">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => { setRawInput(null); onChange(Number(e.target.value)); }}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #1A56DB ${pct}%, #e5e7eb ${pct}%)` }}
          />
        </div>
      </div>
      <div className="flex justify-between text-[9px] text-muted-foreground pl-[122px]" style={{ fontFamily: "monospace" }}>
        <span>{fmtLabel(min)}</span>
        <span>{fmtLabel(max)}</span>
      </div>
    </div>
  );
}

export function TaxEstimatorWidget({ persona, setPersona, setPage }: Props) {
  const [fy, setFy] = useState<FY>("2025-26");
  const [internalPersona, setInternalPersona] = useState<PersonaType>("salaried");
  const [age, setAge] = useState<AgeCategory>("general");
  const [grossIncome, setGrossIncome] = useState(0);
  const [exemptions, setExemptions] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [nps, setNps] = useState(0);
  const [tdsPaid, setTdsPaid] = useState(0);

  const syncPersona = (p: PersonaType) => {
    setInternalPersona(p);
    if (p === "salaried") setPersona("salaried");
    else if (p === "freelancer") setPersona("freelancer");
    else setPersona("retailer");
  };

  const netIncomeNew = useMemo(() => {
    const stdDed = internalPersona === "salaried" ? 75000 : 0;
    const npsDed = internalPersona === "salaried" ? nps : 0;
    return Math.max(0, grossIncome - npsDed - stdDed);
  }, [grossIncome, nps, internalPersona]);

  const netIncomeOld = useMemo(() => {
    const stdDed = internalPersona === "salaried" ? 50000 : 0;
    return Math.max(0, grossIncome - exemptions - stdDed - deductions - nps);
  }, [grossIncome, exemptions, deductions, nps, internalPersona]);

  const taxNew            = useMemo(() => calcNewRegimeTax(netIncomeNew), [netIncomeNew]);
  const taxOldGeneral     = useMemo(() => calcOldRegimeTax(netIncomeOld, "general"), [netIncomeOld]);
  const taxOldSenior      = useMemo(() => calcOldRegimeTax(netIncomeOld, "senior"), [netIncomeOld]);
  const taxOldSuperSenior = useMemo(() => calcOldRegimeTax(netIncomeOld, "super_senior"), [netIncomeOld]);

  const taxOld =
    age === "senior" ? taxOldSenior :
    age === "super_senior" ? taxOldSuperSenior :
    taxOldGeneral;

  const refundNew   = tdsPaid - taxNew;
  const refundOld   = tdsPaid - taxOld;
  const newIsBetter = taxNew <= taxOld;
  const saving      = Math.abs(taxOld - taxNew);

  const fmt = (v: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);
  const fmtAbs = (v: number) => fmt(Math.abs(v));

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden w-full">

      {/* Header */}
      <div className="bg-[#0C1B33] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
            <Calculator className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white text-sm font-bold leading-none">Income Tax Calculator</div>
            <div className="text-blue-300 text-[9px] mt-0.5" style={{ fontFamily: "monospace" }}>Tax Estimator · Real-Time</div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white/10 border border-white/15 rounded-xl p-1">
          {(["2025-26", "2026-27"] as FY[]).map((f) => (
            <button key={f} type="button" onClick={() => setFy(f)}
              className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${fy === f ? "bg-blue-500 text-white" : "text-blue-300 hover:text-white"}`}
              style={{ fontFamily: "monospace" }}>
              FY {f}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-5">

        {/* Filing Profile */}
        <div>
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Filing Profile</div>
          <div className="grid grid-cols-3 gap-1.5 bg-muted p-1.5 rounded-xl">
            {([
              { val: "salaried", label: "💼 Salaried" },
              { val: "freelancer", label: "🚀 Freelancer" },
              { val: "merchant", label: "🏪 Business" },
            ] as { val: PersonaType; label: string }[]).map(({ val, label }) => (
              <button key={val} type="button" onClick={() => syncPersona(val)}
                className={`py-2 px-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer text-center ${
                  internalPersona === val
                    ? "bg-white text-primary shadow-sm border border-gray-100"
                    : "text-muted-foreground hover:text-foreground"
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Age Category */}
        <div>
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Age Category</div>
          <div className="grid grid-cols-3 gap-1.5">
            {([
              { val: "general", label: "General", sub: "< 60 yrs" },
              { val: "senior", label: "Senior", sub: "60–79 yrs" },
              { val: "super_senior", label: "Super Sr.", sub: "80+ yrs" },
            ] as { val: AgeCategory; label: string; sub: string }[]).map(({ val, label, sub }) => (
              <button key={val} type="button" onClick={() => setAge(val)}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  age === val
                    ? "border-primary bg-blue-50 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}>
                <div className="text-[10px] font-bold">{label}</div>
                <div className="text-[8px] mt-0.5" style={{ fontFamily: "monospace" }}>{sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders with Input Fields */}
        <div className="space-y-4">
          <SliderInput label="Gross Annual Income" value={grossIncome} onChange={setGrossIncome} min={0} max={5000000} step={25000} />
          <SliderInput label="Exempted Allowances (HRA, LTA, etc.)" value={exemptions} onChange={setExemptions} min={0} max={3000000} step={5000} />
          <SliderInput label="Deductions (80C, 80D, etc.) — excl. Std. & NPS" value={deductions} onChange={setDeductions} min={0} max={3000000} step={5000} />
          <SliderInput label="NPS Contribution (Sec 80CCD2)" value={nps} onChange={setNps} min={0} max={1000000} step={5000} />
          <SliderInput label="TDS / Tax Already Paid" value={tdsPaid} onChange={setTdsPaid} min={0} max={2500000} step={5000} />
        </div>

        {/* Net Income Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <div className="text-[9px] text-blue-500 font-bold uppercase mb-1" style={{ fontFamily: "monospace" }}>Net Income · New</div>
            <div className="text-base font-bold text-blue-700">{fmt(netIncomeNew)}</div>
            <div className="text-[8px] text-muted-foreground mt-0.5">
              {internalPersona === "salaried" ? "Std. deduction ₹75,000 applied" : "No standard deduction applied"}
            </div>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
            <div className="text-[9px] text-indigo-500 font-bold uppercase mb-1" style={{ fontFamily: "monospace" }}>Net Income · Old</div>
            <div className="text-base font-bold text-indigo-700">{fmt(netIncomeOld)}</div>
            <div className="text-[8px] text-muted-foreground mt-0.5">
              {internalPersona === "salaried" ? "Std. deduction ₹50,000 & deductions" : "Deductions applied"}
            </div>
          </div>
        </div>

        {/* Tax Comparison */}
        <div className="bg-muted/60 rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="p-4">
              <div className="flex items-center gap-1 mb-2 flex-wrap">
                <div className={`w-1.5 h-1.5 rounded-full ${newIsBetter ? "bg-green-500" : "bg-gray-300"}`} />
                <span className="text-[9px] font-bold text-muted-foreground uppercase" style={{ fontFamily: "monospace" }}>New Regime</span>
                {newIsBetter && <span className="ml-auto bg-green-100 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded-full">Better ✓</span>}
              </div>
              <div className="text-[9px] text-muted-foreground mb-1">Tax Liability</div>
              <div className={`text-xl font-bold ${newIsBetter ? "text-green-600" : "text-foreground"}`}>{fmt(taxNew)}</div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-2 flex-wrap">
                <div className={`w-1.5 h-1.5 rounded-full ${!newIsBetter ? "bg-green-500" : "bg-gray-300"}`} />
                <span className="text-[9px] font-bold text-muted-foreground uppercase" style={{ fontFamily: "monospace" }}>Old Regime</span>
                {!newIsBetter && <span className="ml-auto bg-green-100 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded-full">Better ✓</span>}
              </div>
              <div className="text-[9px] text-muted-foreground mb-1">
                Tax Liability
                {age === "senior" && <span className="ml-1 text-[8px] text-primary">(Senior)</span>}
                {age === "super_senior" && <span className="ml-1 text-[8px] text-primary">(Super Sr.)</span>}
              </div>
              <div className={`text-xl font-bold ${!newIsBetter ? "text-green-600" : "text-foreground"}`}>{fmt(taxOld)}</div>
              <div className="mt-2 space-y-0.5 border-t border-border pt-2">
                {age !== "general" && (
                  <div className="flex justify-between text-[8px] text-muted-foreground/50">
                    <span>General (&lt;60)</span><span>{fmt(taxOldGeneral)}</span>
                  </div>
                )}
                {age !== "senior" && (
                  <div className="flex justify-between text-[8px] text-muted-foreground/50">
                    <span>Senior (60-79)</span><span>{fmt(taxOldSenior)}</span>
                  </div>
                )}
                {age !== "super_senior" && (
                  <div className="flex justify-between text-[8px] text-muted-foreground/50">
                    <span>Super Sr. (80+)</span><span>{fmt(taxOldSuperSenior)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`px-4 py-2.5 border-t border-border flex items-center justify-between ${newIsBetter ? "bg-green-50" : "bg-amber-50"}`}>
            <span className="text-[10px] font-bold text-foreground">
              {newIsBetter ? "✓ New Regime saves you" : "✓ Old Regime saves you"}
            </span>
            <span className={`text-sm font-extrabold ${newIsBetter ? "text-green-600" : "text-amber-600"}`}>{fmt(saving)}</span>
          </div>
        </div>

        {/* Refund / Payment */}
        <div>
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Estimated Refund / (Payment Due)</div>
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl p-3 border ${refundNew >= 0 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
              <div className="text-[9px] font-bold uppercase mb-1" style={{ fontFamily: "monospace", color: refundNew >= 0 ? "#16a34a" : "#dc2626" }}>New Regime</div>
              <div className={`text-base font-bold ${refundNew >= 0 ? "text-green-600" : "text-red-600"}`}>
                {refundNew >= 0 ? `+${fmtAbs(refundNew)}` : `-${fmtAbs(refundNew)}`}
              </div>
              <div className="text-[8px] text-muted-foreground mt-0.5">{refundNew >= 0 ? "Refund Expected" : "Tax Due"}</div>
            </div>
            <div className={`rounded-xl p-3 border ${refundOld >= 0 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
              <div className="text-[9px] font-bold uppercase mb-1" style={{ fontFamily: "monospace", color: refundOld >= 0 ? "#16a34a" : "#dc2626" }}>Old Regime</div>
              <div className={`text-base font-bold ${refundOld >= 0 ? "text-green-600" : "text-red-600"}`}>
                {refundOld >= 0 ? `+${fmtAbs(refundOld)}` : `-${fmtAbs(refundOld)}`}
              </div>
              <div className="text-[8px] text-muted-foreground mt-0.5">{refundOld >= 0 ? "Refund Expected" : "Tax Due"}</div>
            </div>
          </div>
        </div>

        {/* Persona CTA */}
        <div className="pt-1">
          {internalPersona === "salaried" && (
            <button type="button" onClick={() => setPage("contact")}
              className="w-full bg-[#1A56DB] hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-200 cursor-pointer">
              Finalise Tax &amp; File ITR Now <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {internalPersona === "freelancer" && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <div className="text-amber-700 font-bold text-xs mb-1.5 flex items-center justify-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Since you're a freelancer, please reach out to our professionals for accurate tax filing
              </div>
              <button type="button" onClick={() => setPage("contact")}
                className="mt-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 mx-auto cursor-pointer">
                Talk to a CA Expert <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          {internalPersona === "merchant" && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
              <div className="text-indigo-700 font-bold text-xs mb-1.5 flex items-center justify-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Since you fall under sole proprietor / business profile, please reach out to us for accurate tax filing
              </div>
              <button type="button" onClick={() => setPage("contact")}
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 mx-auto cursor-pointer">
                Get Expert Help <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-[8px] text-muted-foreground text-center leading-relaxed">
          * Estimates based on FY {fy} IT Act slabs. Std. deduction ₹75,000 (New) / ₹50,000 (Old) auto-applied.
          Includes 4% cess + surcharge where applicable. Consult a CA for final filing.
        </p>

      </div>
    </div>
  );
}
