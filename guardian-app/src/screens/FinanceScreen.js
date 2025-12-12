import React, { useState, useEffect } from 'react';

export const FinanceScreen = () => {
  // 日報データの箱
  const [reports, setReports] = useState([]);
  // 日当の設定（職人1人あたりの単価）
  const [dailyRate, setDailyRate] = useState(18000); 

  // 画面が開いたとき、保存された日報を読み込む
  useEffect(() => {
    const savedData = localStorage.getItem('guardian_reports');
    if (savedData) {
      setReports(JSON.parse(savedData));
    }
  }, []);

  // --- 自動計算ロジック ---
  // 1. 今月の稼働日数を数える
  const totalDays = reports.length;
  
  // 2. 推定人件費を計算 (日数 × 単価)
  const totalCost = totalDays * dailyRate;

  // 3. 現場ごとの日数を集計する魔法
  const siteSummary = {};
  reports.forEach(r => {
    // もしその現場がまだリストになければ0で初期化
    if (!siteSummary[r.site]) siteSummary[r.site] = 0;
    // 日数を+1する
    siteSummary[r.site]++;
  });

  // --- デザイン (CSS) ---
  const s = {
    container: { padding: '20px', background: '#f8fafc', minHeight: '100%' },
    header: { marginBottom: '20px' },
    title: { fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: 0 },
    
    // 金額を表示するデカいカード
    bigCard: { background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '25px', borderRadius: '16px', color: 'white', marginBottom: '25px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' },
    moneyLabel: { fontSize: '12px', color: '#94a3b8', marginBottom: '5px' },
    moneyValue: { fontSize: '32px', fontWeight: 'bold', letterSpacing: '1px' },
    subInfo: { fontSize: '14px', color: '#cbd5e1', marginTop: '10px' },

    // 設定エリア
    settingArea: { background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' },
    input: { padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100px', fontSize: '16px', marginLeft: '10px' },

    // 現場別リスト
    listTitle: { fontSize: '14px', fontWeight: 'bold', color: '#64748b', marginBottom: '10px' },
    listItem: { background: 'white', padding: '15px', borderRadius: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #10b981', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' },
    siteName: { fontWeight: 'bold', color: '#334155' },
    siteCount: { fontWeight: 'bold', color: '#0f172a' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h2 style={s.title}>💰 人工・給与計算</h2>
      </div>

      {/* メイン：金額表示 */}
      <div style={s.bigCard}>
        <div style={s.moneyLabel}>今月の推定人件費</div>
        <div style={s.moneyValue}>¥ {totalCost.toLocaleString()}</div>
        <div style={s.subInfo}>
          稼働合計: {totalDays} 人工
        </div>
      </div>

      {/* 設定：単価変更 */}
      <div style={s.settingArea}>
        <label style={{fontSize:'14px', fontWeight:'bold'}}>🔧 平均日当設定:</label>
        <input 
          type="number" 
          style={s.input} 
          value={dailyRate} 
          onChange={(e) => setDailyRate(Number(e.target.value))} 
        />
        <span style={{fontSize:'12px', color:'#64748b', marginLeft:'5px'}}>円 / 日</span>
      </div>

      {/* 現場別の集計リスト */}
      <div>
        <div style={s.listTitle}>📍 現場別コスト内訳</div>
        {Object.keys(siteSummary).map(site => (
          <div key={site} style={s.listItem}>
            <div style={s.siteName}>{site}</div>
            <div>
              <span style={s.siteCount}>{siteSummary[site]}日</span>
              <span style={{fontSize:'12px', color:'#94a3b8', marginLeft:'10px'}}>
                 (¥ {(siteSummary[site] * dailyRate).toLocaleString()})
              </span>
            </div>
          </div>
        ))}
        {totalDays === 0 && <div style={{color:'#94a3b8', textAlign:'center'}}>データがありません</div>}
      </div>
    </div>
  );
};