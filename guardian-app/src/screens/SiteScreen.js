// src/screens/SiteScreen.js
import React from 'react';

export const SiteScreen = () => {
  const s = {
    container: { padding: '20px', paddingBottom: '100px' },
    header: { fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' },
    
    // サマリー (稼働中・要注意)
    summaryRow: { display: 'flex', gap: '10px', marginBottom: '20px' },
    summaryCard: { flex: 1, background: 'white', padding: '15px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
    sumLabel: { fontSize: '10px', color: '#64748b', marginBottom: '5px' },
    sumVal: { fontSize: '20px', fontWeight: 'bold', color: '#0f172a' },
    sumAlert: { fontSize: '20px', fontWeight: 'bold', color: '#ef4444' },

    // 現場カード (メイン)
    siteCard: { background: 'white', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', overflow: 'hidden' },
    liveBox: { 
      height: '150px', background: 'linear-gradient(to bottom, #334155, #0f172a)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative'
    },
    liveBadge: { position: 'absolute', top: '10px', left: '10px', background: '#ef4444', color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', display:'flex', alignItems:'center', gap:'5px' },
    siteInfo: { padding: '20px' },
    siteName: { fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' },
    siteLoc: { fontSize: '11px', color: '#64748b', marginBottom: '15px' },
    
    // 進捗バー
    progressLabel: { display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '5px', fontWeight: 'bold' },
    progressBg: { height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' },
    progressBar: (pct, color) => ({ width: `${pct}%`, height: '100%', background: color || '#3b82f6' }),

    // 現場データグリッド
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '15px' },
    dataItem: { textAlign: 'center' },
    dataLabel: { fontSize: '9px', color: '#94a3b8', marginBottom: '2px' },
    dataVal: { fontSize: '13px', fontWeight: 'bold', color: '#0f172a' },
    
    // 遅延カード
    delayCard: { background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #fee2e2', borderLeft: '5px solid #ef4444' },
    delayBadge: { background: '#fee2e2', color: '#ef4444', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', float: 'right' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <span style={{fontSize:'24px'}}>🏗️</span> 現場統括マネージャー
      </div>

      {/* サマリー */}
      <div style={s.summaryRow}>
        <div style={s.summaryCard}>
          <div style={s.sumLabel}>稼働中</div>
          <div style={s.sumVal}>8 <span style={{fontSize:'10px'}}>現場</span></div>
        </div>
        <div style={{...s.summaryCard, border:'1px solid #fee2e2'}}>
          <div style={s.sumLabel}>要注意(遅れ)</div>
          <div style={s.sumAlert}>1 <span style={{fontSize:'10px'}}>現場</span></div>
        </div>
        <div style={s.summaryCard}>
          <div style={s.sumLabel}>今月完工予</div>
          <div style={s.sumVal}>3 <span style={{fontSize:'10px'}}>現場</span></div>
        </div>
      </div>

      {/* 現場カード 1 (順調) */}
      <div style={s.siteCard}>
        <div style={s.liveBox}>
          <div style={s.liveBadge}>● LIVE</div>
          <span style={{fontSize:'12px', opacity:0.8}}>[ 現場ライブ映像 / 最新写真 ]</span>
          <div style={{position:'absolute', bottom:'10px', right:'10px', fontSize:'10px', opacity:0.7}}>最終更新: 10分前 (田中)</div>
        </div>
        <div style={s.siteInfo}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={s.siteName}>江上運送 鉄骨塗装工事</div>
            <span style={{fontSize:'11px', background:'#dcfce7', color:'#15803d', padding:'2px 8px', borderRadius:'10px', height:'fit-content'}}>順調</span>
          </div>
          <div style={s.siteLoc}>📍 佐賀県佐賀市 | 職長: 田中</div>

          <div style={s.progressLabel}>
            <span>進捗率 (工程通り)</span>
            <span>85%</span>
          </div>
          <div style={s.progressBg}>
            <div style={s.progressBar(85, '#3b82f6')}></div>
          </div>

          <div style={s.grid}>
            <div style={s.dataItem}>
              <div style={s.dataLabel}>予算消化</div>
              <div style={s.dataVal}>82%</div>
            </div>
            <div style={s.dataItem}>
              <div style={s.dataLabel}>現在の粗利</div>
              <div style={{...s.dataVal, color:'#10b981'}}>¥ 85万</div>
            </div>
            <div style={s.dataItem}>
              <div style={s.dataLabel}>完了予定</div>
              <div style={s.dataVal}>12/25</div>
            </div>
          </div>
        </div>
      </div>

      {/* 現場カード 2 (遅延) */}
      <div style={s.delayCard}>
        <span style={s.delayBadge}>2日遅れ</span>
        <div style={s.siteName}>小郡市 Y様邸 外壁塗装</div>
        <div style={s.siteLoc}>📍 福岡県小郡市 | 職長: 鈴木</div>

        <div style={{...s.progressLabel, color:'#ef4444'}}>
          <span>進捗率 (雨天遅延)</span>
          <span>20%</span>
        </div>
        <div style={s.progressBg}>
          <div style={s.progressBar(20, '#ef4444')}></div>
        </div>

        <div style={s.grid}>
          <div style={{...s.dataItem, color:'#ef4444'}}>
            <div style={s.dataLabel}>予算消化</div>
            <div style={{...s.dataVal, color:'#ef4444'}}>25%</div>
          </div>
          <div style={s.dataItem}>
            <div style={s.dataLabel}>赤字リスク</div>
            <div style={{...s.dataVal, color:'#b91c1c'}}>注意 ⚠️</div>
          </div>
          <div style={s.dataItem}>
            <div style={{fontSize:'11px', color:'#2563eb', fontWeight:'bold', textDecoration:'underline', cursor:'pointer'}}>
              リカバリー<br/>対策案 ＞
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};