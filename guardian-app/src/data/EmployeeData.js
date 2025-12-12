// src/data/EmployeeData.js

// 従業員マスタ (設定画面で変更されるデータ)
export const employees = [
  {
    id: 1,
    name: "田中 健一",
    role: "職長",
    wageType: "MONTHLY", // A: 月給制
    basePay: 350000,     // 月額
    dailyRate: 0,
    isLeader: true,
    bonuses: {
      perfectAttendance: 10000, // 皆勤手当
      leader: 20000             // 職長手当
    }
  },
  {
    id: 2,
    name: "佐藤 次郎",
    role: "職人",
    wageType: "DAILY",   // B: 日給月給制
    basePay: 0,
    dailyRate: 1000000,    // 日当
    isLeader: false,
    bonuses: {
      perfectAttendance: 10000,
      leader: 0
    }
  }
];

// 今月の勤怠データ (本来はGPS/日報から自動集計される値)
// ※今はシミュレーション用に仮置き
export const currentWorkData = {
  1: { daysWorked: 20, overtimeHours: 10, absences: 0, lates: 0, completedProfit: 500000 }, // 田中
  2: { daysWorked: 18, overtimeHours: 2, absences: 1, lates: 0, completedProfit: 0 }        // 佐藤
};