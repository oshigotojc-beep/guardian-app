// src/data/payrollLogic.js
import { INSURANCE_RATES } from './initialData';

export const calculatePayroll = (staff, reports, targetMonth) => {
  // 1. データ抽出
  const monthlyReports = reports.filter(r => r.date.startsWith(targetMonth) && r.staffId === staff.id);

  // --- A. 支給額の計算 ---
  let grossPayment = 0; // 総支給額
  let totalDays = 0;
  let incentive = 0;

  if (staff.wageType === 'daily') {
    // 👷 パターン1: 日給制 (職人)
    monthlyReports.forEach(r => {
      const dayCount = r.workType === 'full' ? 1.0 : 0.5;
      totalDays += dayCount;
      // 残業代ロジック等はここに追記可能
    });
    grossPayment = Math.floor(totalDays * staff.unitPrice);

  } else if (staff.wageType === 'monthly') {
    // 👔 パターン2: 月給制 (営業・管理)
    // 基本給
    grossPayment += staff.baseSalary;

    // インセンティブ (粗利の5%)
    // ※今回は簡易的に、日報に「profit(粗利)」が記録されていると仮定して合算します
    let totalGrossProfit = 0;
    monthlyReports.forEach(r => {
      if (r.profit) totalGrossProfit += Number(r.profit);
    });
    
    incentive = Math.floor(totalGrossProfit * 0.05); // 粗利の5%
    grossPayment += incentive;
  }

  // --- B. 控除額の計算 (保険パターン) ---
  let deduction = 0; // 控除合計

  // 1. 所得税 (全員一律簡易計算)
  const tax = Math.floor(grossPayment * INSURANCE_RATES.income_tax);
  deduction += tax;

  // 2. 社会保険パターン分岐
  if (staff.insurance === 'social') {
    // パターンA: 社保加入 (雇用保険+厚生年金+健康保険)
    // 簡易的に総支給の15%で計算
    const socialIns = Math.floor(grossPayment * INSURANCE_RATES.social);
    deduction += socialIns;

  } else if (staff.insurance === 'union_national') {
    // パターンB: 建設組合 + 国民年金
    // 国保・国年は個人払いが多いため、ここでは「組合費」のみ引く場合が多い
    deduction += INSURANCE_RATES.union_fee;

  } else if (staff.insurance === 'union_pension') {
    // パターンC: 建設組合 + 厚生年金 (適用事業所の場合など)
    // 組合費 + 厚生年金分
    const pension = Math.floor(grossPayment * 0.09); // 厚年のみ約9%
    deduction += (INSURANCE_RATES.union_fee + pension);
  }

  // --- C. 手取り額 ---
  const netPayment = grossPayment - deduction;

  return {
    totalDays,
    grossPayment, // 総支給
    incentive,    // 歩合給
    deduction,    // 控除計
    netPayment    // 差引支給額 (手取り)
  };
};