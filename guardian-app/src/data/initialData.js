// src/data/initialData.js

// --- 🎨 デザインテーマ ---
export const THEME = {
  bg: "#f3f4f6", white: "#ffffff", primary: "#111827",
  accent: "#2563eb", danger: "#ef4444", text: "#1f2937", border: "#e5e7eb"
};

// --- 👥 職人・社員マスターデータ (詳細版) ---
export const INITIAL_STAFF_DATA = [
  { 
    id: 's1', 
    name: "田中 健一 (職長)", 
    role: "artisan",       // 職人
    wageType: "daily",     // 日給制
    unitPrice: 20000,      // 日当
    insurance: "social"    // 社保加入
  },
  { 
    id: 's2', 
    name: "佐藤 次郎 (中堅)", 
    role: "artisan", 
    wageType: "daily", 
    unitPrice: 18000, 
    insurance: "union_national" // 建設組合 + 国民年金
  },
  { 
    id: 's3', 
    name: "高橋 営業部長", 
    role: "sales",         // 営業・施工管理
    wageType: "monthly",   // 月給制
    baseSalary: 300000,    // 基本給
    insurance: "social"    // 社保加入
  },
];

// --- ⚙️ 保険料率・組合費の設定 ---
export const INSURANCE_RATES = {
  social: 0.15,         // 社会保険 (約15%と仮定)
  union_fee: 5000,      // 建設組合費 (固定)
  income_tax: 0.03      // 所得税 (仮に3%で計算)
};