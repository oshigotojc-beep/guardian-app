// src/screens/SettingsScreen.js
import React, { useState } from 'react';

export const SettingsScreen = () => {
  // 設定データ（本来はデータベースから読み込む値）
  const [bonus, setBonus] = useState(10000); // 皆勤手当
  const [closingDate, setClosingDate] = useState('end'); // 締め日
  
  const s = {
    container: { padding: '20px', paddingBottom: '100px' },
    header: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' },
    section: { background: 'white', padding: '20px', borderRadius: '16px', marginBottom: '15px', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    title: { fontSize: '14px', fontWeight: 'bold', marginBottom: '15px', color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    label: { fontSize: '13px', fontWeight: '500', color: '#475569' },
    input: { padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '80px', textAlign: 'right', fontSize: '14px' },
    select: { padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '13px' },
    saveBtn: { background: '#0f172a', color: 'white', width: '100%', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', marginTop: '10px', cursor: 'pointer' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>⚙️ 設定・規定 (Admin)</div>

      {/* 給与ルール設定 */}
      <div style={s.section}>
        <div style={s.title}>💰 給与・インセンティブ規定</div>
        
        <div style={s.row}>
          <div style={s.label}>給与締め日</div>
          <select style={s.select} value={closingDate} onChange={(e) => setClosingDate(e.target.value)}>
            <option value="20">毎月20日</option>
            <option value="25">毎月25日</option>
            <option value="end">毎月末日</option>
          </select>
        </div>

        <div style={s.row}>
          <div style={s.label}>皆勤手当 (月額)</div>
          <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
            <input type="number" style={s.input} value={bonus} onChange={(e) => setBonus(e.target.value)} />
            <span style={{fontSize:'12px'}}>円</span>
          </div>
        </div>

        <div style={s.row}>
          <div style={s.label}>職長手当 (月額)</div>
          <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
            <input type="number" style={s.input} defaultValue={20000} />
            <span style={{fontSize:'12px'}}>円</span>
          </div>
        </div>
      </div>

      {/* 従業員マスタ */}
      <div style={s.section}>
        <div style={s.title}>👥 従業員・権限管理</div>
        
        <div style={s.row}>
          <div>
            <div style={{fontWeight:'bold', fontSize:'14px'}}>田中 健一</div>
            <div style={{fontSize:'11px', color:'#64748b'}}>ID: 001 / 職長</div>
          </div>
          <div style={{fontSize:'12px', background:'#e2e8f0', padding:'4px 8px', borderRadius:'6px'}}>月給制</div>
        </div>

        <div style={s.row}>
          <div>
            <div style={{fontWeight:'bold', fontSize:'14px'}}>佐藤 次郎</div>
            <div style={{fontSize:'11px', color:'#64748b'}}>ID: 002 / 職人</div>
          </div>
          <div style={{fontSize:'12px', background:'#e2e8f0', padding:'4px 8px', borderRadius:'6px'}}>日給制</div>
        </div>

        <button style={{width:'100%', padding:'10px', border:'1px dashed #94a3b8', background:'transparent', color:'#64748b', borderRadius:'8px', cursor:'pointer'}}>
          ＋ 社員を追加する
        </button>
      </div>

      {/* システム情報 */}
      <div style={s.section}>
        <div style={s.title}>🛡️ システム稼働状況</div>
        <div style={s.row}>
          <div style={s.label}>Guardian OS Version</div>
          <div style={{fontWeight:'bold'}}>v1.0.4 (Platinum)</div>
        </div>
        <div style={s.row}>
          <div style={s.label}>Database Status</div>
          <div style={{color:'#10b981', fontWeight:'bold'}}>● Online (SSS)</div>
        </div>
      </div>

      <button style={s.saveBtn} onClick={() => alert("✅ 設定を保存し、全社員のアプリに反映しました。")}>
        設定を保存して更新
      </button>
    </div>
  );
};