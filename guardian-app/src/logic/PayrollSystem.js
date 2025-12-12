// src/logic/PayrollSystem.js

// --- SSSランク給与計算エンジン ---

// 社会保険料率 (建設業・令和5年度目安)
const RATES = {
  HEALTH_INSURANCE: 0.05, // 健康保険 (折半後 約5%)
  PENSION: 0.0915,        // 厚生年金 (折半後 9.15%)
  EMPLOYMENT: 0.006,      // 雇用保険 (建設業 0.6%)
};

/**
 * 給与計算のメイン関数
 * @param {Object} employee 従業員データ (給与形態、基本給など)
 * @param {Object} workData 勤怠データ (出勤日数、残業時間など)
 */
export const calculateSalary = (employee, workData) => {
  let baseSalary = 0;

  // 1. 基本給の計算 (混合仕様)
  if (employee.wageType === 'MONTHLY') {
    // A: 完全月給制
    baseSalary = employee.basePay;
  } else {
    // B: 日給月給制
    baseSalary = employee.dailyRate * workData.daysWorked;
  }

  // 2. 残業代 (1.25倍)
  const hourlyRate = employee.wageType === 'MONTHLY' 
    ? employee.basePay / 173 // 月平均労働時間
    : employee.dailyRate / 8;
  const overtimePay = Math.round(hourlyRate * 1.25 * workData.overtimeHours);

  // 3. インセンティブ (心理掌握ボーナス)
  let incentivePay = 0;
  // 皆勤手当
  if (workData.absences === 0 && workData.lates < 3) {
    incentivePay += (employee.bonuses.perfectAttendance || 0);
  }
  // 職長手当
  if (employee.isLeader) {
    incentivePay += (employee.bonuses.leader || 0);
  }
  // 完工ボーナス (利益還元)
  if (workData.completedProfit > 0) {
    incentivePay += Math.round(workData.completedProfit * 0.03); // 利益の3%
  }

  // --- 総支給額 ---
  const grossPay = baseSalary + overtimePay + incentivePay;

  // 4. 控除計算 (リアルタイム税金計算)
  // 社会保険料
  const healthIns = Math.round(grossPay * RATES.HEALTH_INSURANCE);
  const pension = Math.round(grossPay * RATES.PENSION);
  const employmentIns = Math.round(grossPay * RATES.EMPLOYMENT);
  const socialInsuranceTotal = healthIns + pension + employmentIns;

  // 所得税 (課税対象額から簡易計算)
  // ※本来は扶養人数等で複雑ですが、MVP用に簡易ロジック(約2.5%〜)で実装
  const taxableIncome = grossPay - socialInsuranceTotal;
  let incomeTax = 0;
  if (taxableIncome > 88000) { // 月8.8万超えで課税
    incomeTax = Math.round((taxableIncome - 88000) * 0.05); // 簡易税率
  }

  // --- 手取り額 ---
  const netPay = grossPay - socialInsuranceTotal - incomeTax;

  return {
    grossPay,      // 総支給
    netPay,        // 手取り
    deductions: {
      social: socialInsuranceTotal, // 社会保険計
      tax: incomeTax                // 所得税
    },
    breakdown: {
      base: baseSalary,
      overtime: overtimePay,
      incentive: incentivePay
    }
  };
};