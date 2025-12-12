// src/screens/PayrollScreen.js
import React from 'react';
import { THEME, INITIAL_STAFF_DATA } from '../data/initialData';
import { calculatePayroll } from '../data/payrollLogic';

// --- 部品: 給与カード ---
const SalaryCard = ({ staff, reports, targetMonth }) => {
  // ここで「ロジック」を呼び出して計算させる
  const result = calculatePayroll(staff, reports, targetMonth);

  return (
    <div style={{
      background: THEME.white, padding: '20px', borderRadius: '12px',
      marginBottom: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      borderLeft: `6px solid ${staff.role === 'sales' ? THEME.gold : THEME.accent}`
    }}>
      {/* ヘッダー: 名前と属性 */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px', borderBottom:`1px solid ${THEME.border}`, paddingBottom:'10px'}}>
        <div>
          <span style={{fontSize:'18px', fontWeight:'bold', color:THEME.text}}>{staff.name}</span>
          <span style={{fontSize:'12px', background:'#f3f4f6', padding:'2px 8px', borderRadius:'10px', marginLeft:'10px', color:THEME.subText}}>
            {staff.wageType === 'daily' ? '日給制' : '月給制'} / {staff.insurance === 'social' ? '社保' : '組合'}
          </span>
        </div>
        <div style={{fontSize:'14px', fontWeight:'bold'}}>
           {staff.wageType === 'daily' 
             ? `単価: ¥${staff.unitPrice.toLocaleString()}` 
             : `基本給: ¥${staff.baseSalary.toLocaleString()}`}
        </div>
      </div>

      {/* 詳細データ表示エリア */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px', fontSize:'14px'}}>
        
        {/* 左側: 勤怠・成果 */}
        <div>
          <div style={{color:THEME.subText, fontSize:'12px'}}>勤怠・成果</div>
          {staff.wageType === 'daily' ? (
            <div style={{marginTop:'5px'}}>出勤日数: <b>{result.totalDays}日</b></div>
          ) : (
            <div style={{marginTop:'5px'}}>
              歩合対象(粗利): <b style={{color:THEME.accent}}>計算対象あり</b>
            </div>
          )}
        </div>

        {/* 右側: 支給内訳 */}
        <div style={{textAlign:'right'}}>
          <div style={{color:THEME.subText, fontSize:'12px'}}>支給内訳</div>
          <div style={{marginTop:'5px'}}>総支給: ¥{result.grossPayment.toLocaleString()}</div>
          {result.incentive > 0 && (
            <div style={{color:THEME.gold, fontSize:'12px'}}>うち歩合: +¥{result.incentive.toLocaleString()}</div>
          )}
          <div style={{color:THEME.danger, fontSize:'12px'}}>控除(保険税金): -¥{result.deduction.toLocaleString()}</div>
        </div>
      </div>

      {/* 最終手取り額 */}
      <div style={{
        marginTop:'15px', paddingTop:'15px', borderTop:`1px dashed ${THEME.border}`,
        display:'flex', justifyContent:'space-between', alignItems:'center'
      }}>
        <div style={{fontSize:'12px', fontWeight:'bold', color:THEME.subText}}>差引支給額 (手取り)</div>
        <div style={{fontSize:'24px', fontWeight:'900', color:THEME.primary}}>
          ¥{result.netPayment.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

// --- 画面本体 ---
export default function PayrollScreen({ reports }) {
  // 今は仮に「2025-12」月を表示
  const targetMonth = "2025-12";

  return (
    <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <h2 style={{color: THEME.primary, borderBottom: `2px solid ${THEME.accent}`, paddingBottom: '10px'}}>
        💰 給与・賞与シミュレーション ({targetMonth})
      </h2>
      <p style={{fontSize:'12px', color:THEME.subText, marginBottom:'20px'}}>
        ※職人マスタの設定(社保・組合・インセンティブ)に基づいて自動計算しています。
      </p>

      {/* 職人全員分をループしてカードを表示 */}
      {INITIAL_STAFF_DATA.map(staff => (
        <SalaryCard 
          key={staff.id} 
          staff={staff} 
          reports={reports} 
          targetMonth={targetMonth} 
        />
      ))}
    </div>
  );
}