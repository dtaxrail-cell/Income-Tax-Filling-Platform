export function calculateNewRegimeTax(grossIncome: number, isSalaried: boolean): number {
  const stdDed = isSalaried ? 75000 : 0;
  const taxable = Math.max(0, grossIncome - stdDed);
  if (taxable <= 1200000) {
    return 0; // Rebate u/s 87A covers up to 12L taxable income
  }
  let tax = 0;
  if (taxable <= 400000) {
    tax = 0;
  } else if (taxable <= 800000) {
    tax = (taxable - 400000) * 0.05;
  } else if (taxable <= 1200000) {
    tax = 20000 + (taxable - 800000) * 0.10;
  } else if (taxable <= 1600000) {
    tax = 60000 + (taxable - 1200000) * 0.15;
  } else if (taxable <= 2000000) {
    tax = 120000 + (taxable - 1600000) * 0.20;
  } else if (taxable <= 2400000) {
    tax = 200000 + (taxable - 2000000) * 0.25;
  } else {
    tax = 300000 + (taxable - 2400000) * 0.30;
  }
  return tax * 1.04; // Cess 4%
}

export function calculateOldRegimeTax(grossIncome: number, deductions: number, isSalaried: boolean): number {
  const stdDed = isSalaried ? 50000 : 0;
  const taxable = Math.max(0, grossIncome - stdDed - deductions);
  if (taxable <= 500000) {
    return 0; // Rebate u/s 87A
  }
  let tax = 0;
  if (taxable <= 250000) {
    tax = 0;
  } else if (taxable <= 500000) {
    tax = (taxable - 250000) * 0.05;
  } else if (taxable <= 1000000) {
    tax = 12500 + (taxable - 500000) * 0.20;
  } else {
    tax = 112500 + (taxable - 1000000) * 0.30;
  }
  return tax * 1.04; // Cess 4%
}
