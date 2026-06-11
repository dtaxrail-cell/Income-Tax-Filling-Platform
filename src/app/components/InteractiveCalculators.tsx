import { useState } from "react";
import { Calculator, Info, Sparkles } from "lucide-react";
import { display, mono } from "../types";

function CalcSliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = ""
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}) {
  const [raw, setRaw] = useState<string | null>(null);
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const displayVal = raw !== null ? raw : Math.round(value).toLocaleString("en-IN");

  const handleBlur = () => {
    setRaw(null);
    onChange(Math.min(max, Math.max(min, value)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/[^0-9.]/g, "");
    setRaw(rawDigits);
    const parsed = parseFloat(rawDigits);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center gap-4">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
          {label}
        </label>
        <div className="flex items-center bg-white dark:bg-slate-800 border border-border rounded-lg px-2 py-1 shadow-sm w-[130px] focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
          <input
            type="text"
            value={displayVal}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={() => setRaw(String(value))}
            className="w-full bg-transparent text-right text-xs font-bold text-foreground focus:outline-none tabular-nums"
          />
          {suffix && <span className="text-[10px] font-bold text-muted-foreground ml-1 select-none">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          setRaw(null);
          onChange(Number(e.target.value));
        }}
        className="w-full h-1.5 bg-blue-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
        style={{
          background: `linear-gradient(to right, #1A56DB ${pct}%, #e5e7eb ${pct}%)`
        }}
      />
    </div>
  );
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(val);
};

export function HraCalculatorDirect() {
  const [hraBasicSalary, setHraBasicSalary] = useState(0);
  const [hraDa, setHraDa] = useState(0);
  const [hraReceived, setHraReceived] = useState(0);
  const [hraRentPaid, setHraRentPaid] = useState(0);
  const [hraIsMetro, setHraIsMetro] = useState(true);

  const actHra = hraReceived;
  const totalSalary = hraBasicSalary + hraDa;
  const rentExcess = Math.max(0, hraRentPaid - 0.1 * totalSalary);
  const basicPct = (hraIsMetro ? 0.5 : 0.4) * totalSalary;
  const hraExemption = Math.min(actHra, rentExcess, basicPct);
  const taxableHra = Math.max(0, hraReceived - hraExemption);

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-border">
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-bold text-foreground">HRA Exemption Estimator</span>
        </div>

        <CalcSliderInput
          label="Basic salary received"
          value={hraBasicSalary}
          onChange={setHraBasicSalary}
          min={0}
          max={5000000}
          step={10000}
          suffix="₹"
        />

        <CalcSliderInput
          label="Dearness Allowance (DA) received"
          value={hraDa}
          onChange={setHraDa}
          min={0}
          max={2000000}
          step={5000}
          suffix="₹"
        />

        <CalcSliderInput
          label="HRA received"
          value={hraReceived}
          onChange={setHraReceived}
          min={0}
          max={2000000}
          step={5000}
          suffix="₹"
        />

        <CalcSliderInput
          label="Total Rent paid"
          value={hraRentPaid}
          onChange={setHraRentPaid}
          min={0}
          max={2500000}
          step={5000}
          suffix="₹"
        />

        <div className="space-y-2 pt-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
            Do you live in Metro*?
          </label>
          <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-xl w-[200px]">
            <button
              type="button"
              onClick={() => setHraIsMetro(true)}
              className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                hraIsMetro ? "bg-white text-primary shadow-sm" : "text-muted-foreground"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setHraIsMetro(false)}
              className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !hraIsMetro ? "bg-white text-primary shadow-sm" : "text-muted-foreground"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between space-y-6">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-green-50/70 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50 rounded-2xl p-4 text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400" style={mono}>Exempted HRA (Tax-Free)</span>
            <div className="text-xl font-extrabold text-green-600 dark:text-green-400 mt-1">{formatCurrency(hraExemption)}</div>
            <span className="text-[8px] text-muted-foreground block mt-0.5">Deduction under Section 10(13A)</span>
          </div>

          <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 rounded-2xl p-4 text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400" style={mono}>Taxable HRA</span>
            <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{formatCurrency(taxableHra)}</div>
            <span className="text-[8px] text-muted-foreground block mt-0.5">Added to gross taxable income</span>
          </div>
        </div>

        <div className="space-y-3.5 bg-muted/40 p-4 rounded-xl border border-border">
          <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-500" /> Exemption Limit Summary
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            HRA exemption is always the **lowest** of: (1) Actual HRA received ({formatCurrency(actHra)}), (2) Rent paid excess of 10% of salary ({formatCurrency(rentExcess)}), or (3) 50%/40% of basic salary ({formatCurrency(basicPct)}).
          </p>
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] text-muted-foreground">
              <span>Exemption Percentage</span>
              <span>{Math.round((hraExemption / Math.max(1, hraReceived)) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden flex">
              <div className="bg-green-500 h-1.5" style={{ width: `${(hraExemption / Math.max(1, hraReceived)) * 100}%` }} />
              <div className="bg-amber-500 h-1.5 flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmiCalculatorDirect() {
  const [emiPrincipal, setEmiPrincipal] = useState(0);
  const [emiRate, setEmiRate] = useState(0);
  const [emiTenure, setEmiTenure] = useState(0);

  const emiMonthlyRate = emiRate / (12 * 100);
  const emiMonths = emiTenure * 12;
  const emiVal = emiMonths > 0
    ? (emiMonthlyRate > 0 
        ? (emiPrincipal * emiMonthlyRate * Math.pow(1 + emiMonthlyRate, emiMonths)) / (Math.pow(1 + emiMonthlyRate, emiMonths) - 1)
        : emiPrincipal / emiMonths)
    : 0;

  const emiTotalPayable = emiVal * emiMonths;
  const emiTotalInterest = Math.max(0, emiTotalPayable - emiPrincipal);

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-border">
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Calculator className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-bold text-foreground">Loan EMI Estimator</span>
        </div>

        <CalcSliderInput
          label="Loan Principal Amount"
          value={emiPrincipal}
          onChange={setEmiPrincipal}
          min={0}
          max={15000000}
          step={50000}
          suffix="₹"
        />

        <CalcSliderInput
          label="Interest Rate (Annual %)"
          value={emiRate}
          onChange={setEmiRate}
          min={0}
          max={20}
          step={0.1}
          suffix="%"
        />

        <CalcSliderInput
          label="Loan Tenure (Years)"
          value={emiTenure}
          onChange={setEmiTenure}
          min={0}
          max={30}
          step={1}
          suffix="Y"
        />
      </div>

      <div className="flex flex-col justify-between space-y-6">
        <div className="bg-[#0C1B33] text-white rounded-2xl p-4 text-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300" style={mono}>Monthly EMI Payment</span>
          <div className="text-2xl font-extrabold text-white mt-1">{formatCurrency(emiVal)}</div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <span className="text-[8px] text-muted-foreground block font-semibold uppercase">Principal Loan</span>
            <strong className="text-xs font-bold text-foreground block mt-1">{formatCurrency(emiPrincipal)}</strong>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <span className="text-[8px] text-muted-foreground block font-semibold uppercase">Total Interest</span>
            <strong className="text-xs font-bold text-foreground block mt-1">{formatCurrency(emiTotalInterest)}</strong>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <span className="text-[8px] text-muted-foreground block font-semibold uppercase">Total Amount</span>
            <strong className="text-xs font-bold text-foreground block mt-1">{formatCurrency(emiTotalPayable)}</strong>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Interest: {Math.round((emiTotalInterest / Math.max(1, emiTotalPayable)) * 100)}%</span>
            <span>Principal: {Math.round((emiPrincipal / Math.max(1, emiTotalPayable)) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden flex">
            <div className="bg-red-400 h-1.5" style={{ width: `${(emiTotalInterest / Math.max(1, emiTotalPayable)) * 100}%` }} />
            <div className="bg-blue-500 h-1.5 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SipCalculatorDirect() {
  const [sipMonthly, setSipMonthly] = useState(0);
  const [sipRate, setSipRate] = useState(0);
  const [sipTenure, setSipTenure] = useState(0);

  const sipMonthlyRate = sipRate / (12 * 100);
  const sipMonths = sipTenure * 12;
  const sipFV = sipMonthlyRate > 0
    ? sipMonthly * ((Math.pow(1 + sipMonthlyRate, sipMonths) - 1) / sipMonthlyRate) * (1 + sipMonthlyRate)
    : sipMonthly * sipMonths;

  const sipTotalInvested = sipMonthly * sipMonths;
  const sipReturns = Math.max(0, sipFV - sipTotalInvested);

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-border">
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Calculator className="w-5 h-5 text-green-600" />
          <span className="text-sm font-bold text-foreground">SIP Wealth Estimator</span>
        </div>

        <CalcSliderInput
          label="Monthly Investment Amount"
          value={sipMonthly}
          onChange={setSipMonthly}
          min={0}
          max={500000}
          step={500}
          suffix="₹"
        />

        <CalcSliderInput
          label="Expected Return Rate (Annual %)"
          value={sipRate}
          onChange={setSipRate}
          min={0}
          max={30}
          step={0.5}
          suffix="%"
        />

        <CalcSliderInput
          label="Investment Duration (Years)"
          value={sipTenure}
          onChange={setSipTenure}
          min={0}
          max={40}
          step={1}
          suffix="Y"
        />
      </div>

      <div className="flex flex-col justify-between space-y-6">
        <div className="bg-[#0C1B33] text-white rounded-2xl p-4 text-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-green-300" style={mono}>Estimated Future Value (Wealth)</span>
          <div className="text-2xl font-extrabold text-white mt-1">{formatCurrency(sipFV)}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <span className="text-[8px] text-muted-foreground block font-semibold uppercase">Invested Amount</span>
            <strong className="text-sm font-extrabold text-foreground block mt-1">{formatCurrency(sipTotalInvested)}</strong>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <span className="text-[8px] text-muted-foreground block font-semibold uppercase">Est. Returns Gained</span>
            <strong className="text-sm font-extrabold text-green-600 block mt-1">{formatCurrency(sipReturns)}</strong>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Invested: {Math.round((sipTotalInvested / Math.max(1, sipFV)) * 100)}%</span>
            <span>Returns: {Math.round((sipReturns / Math.max(1, sipFV)) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden flex">
            <div className="bg-blue-400 h-1.5" style={{ width: `${(sipTotalInvested / Math.max(1, sipFV)) * 100}%` }} />
            <div className="bg-green-500 h-1.5 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PvFvCalculatorDirect() {
  const [pvMode, setPvMode] = useState<"PV" | "FV">("PV");
  const [pvAmount, setPvAmount] = useState(0);
  const [pvRate, setPvRate] = useState(0);
  const [pvTenure, setPvTenure] = useState(0);

  const pvDiscountRate = pvRate / 100;
  const pvResult = pvMode === "PV"
    ? pvAmount / Math.pow(1 + pvDiscountRate, pvTenure)
    : pvAmount * Math.pow(1 + pvDiscountRate, pvTenure);

  const pvDifference = Math.abs(pvAmount - pvResult);

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-border">
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Calculator className="w-5 h-5 text-rose-600" />
          <span className="text-sm font-bold text-foreground">Time Value of Money Estimator</span>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
            Select Calculation Mode
          </label>
          <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setPvMode("PV")}
              className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                pvMode === "PV" ? "bg-white text-primary shadow-sm" : "text-muted-foreground"
              }`}
            >
              Present Value (from Future Sum)
            </button>
            <button
              type="button"
              onClick={() => setPvMode("FV")}
              className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                pvMode === "FV" ? "bg-white text-primary shadow-sm" : "text-muted-foreground"
              }`}
            >
              Future Value (from Present Sum)
            </button>
          </div>
        </div>

        <CalcSliderInput
          label={pvMode === "PV" ? "Future Target Value (FV)" : "Present Amount (PV)"}
          value={pvAmount}
          onChange={setPvAmount}
          min={0}
          max={15000000}
          step={10000}
          suffix="₹"
        />

        <CalcSliderInput
          label="Annual Discount / Inflation / Growth Rate (%)"
          value={pvRate}
          onChange={setPvRate}
          min={0}
          max={25}
          step={0.5}
          suffix="%"
        />

        <CalcSliderInput
          label="Time Duration (Years)"
          value={pvTenure}
          onChange={setPvTenure}
          min={0}
          max={40}
          step={1}
          suffix="Y"
        />
      </div>

      <div className="flex flex-col justify-between space-y-6">
        <div className="bg-[#0C1B33] text-white rounded-2xl p-4 text-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-rose-300" style={mono}>
            {pvMode === "PV" ? "Calculated Present Value (Worth Today)" : "Calculated Future Value"}
          </span>
          <div className="text-2xl font-extrabold text-white mt-1">{formatCurrency(pvResult)}</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center text-xs">
          <div>
            <div className="text-[9px] font-bold uppercase text-muted-foreground tracking-wide" style={mono}>
              {pvMode === "PV" ? "Erosion in Purchasing Power (Inflation Loss)" : "Compound Growth Gained"}
            </div>
            <div className="text-base font-extrabold mt-1 text-rose-600">
              {formatCurrency(pvDifference)}
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground italic text-right max-w-[200px]">
            {pvMode === "PV" 
              ? `A sum of ${formatCurrency(pvAmount)} in ${pvTenure} years is equivalent to spending ${formatCurrency(pvResult)} today at ${pvRate}% inflation.`
              : `A sum of ${formatCurrency(pvAmount)} saved today will grow to ${formatCurrency(pvResult)} in ${pvTenure} years at ${pvRate}% compound interest.`}
          </div>
        </div>
      </div>
    </div>
  );
}
