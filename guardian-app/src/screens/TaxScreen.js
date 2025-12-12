// src/screens/TaxScreen.js
import React from 'react';

export const TaxScreen = () => {
  const s = {
    container: { padding: '20px', paddingBottom: '100px' },
    header: { fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    
    // 納税予測カード
    taxCard: {
      background: 'white', padding: '25px', borderRadius: '20px', marginBottom: '25px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderTop: '5px solid #3b82f6'
    },
    cardTitle: { fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '10px' },
    taxRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' },
    taxLabel: { fontSize: '14px', fontWeight: 'bold', color: '#1e293b' },
    taxVal: { fontSize: '20px', fontWeight: 'bold', color: '#0f172a' },
    
    // カウントダウン
    countBox: { background: '#eff6ff', color: '#1d4ed8', padding: '15px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' },

    // AIアドバイス
    aiTitle: { fontSize: '14px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '15px', marginTop: '20px' },
    aiCard: { background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', gap: '15px', marginBottom: '15px' },
    aiIcon: { fontSize: '24px' },
    aiContent: { flex: 1 },
    aiHead: { fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' },
    aiText: { fontSize: '12px', color: '#475569', lineHeight: '1.5' },
    aiBtn: { marginTop: '10px', background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>🛡️ 税務・申告</div>
      </div>

      {/* 納税予測 */}
      <div style={s.taxCard}>
        <div style={s.cardTitle}>今期の推定納税額 (AI予測)</div>
        
        <div style={s.taxRow}>
          <div style={s.taxLabel}>法人税等</div>
          <div style={s.taxVal}>¥ 1,240,000</div>
        </div>
        <div style={s.taxRow}>
          <div style={s.taxLabel}>消費税 (10%)</div>
          <div style={s.taxVal}>¥ 850,000</div>
        </div>
        
        <div style={s.countBox}>
          決算月(3月)まで：あと 118日
        </div>
      </div>

      {/* AI節税アドバイス */}
      <div style={s.aiTitle}>🤖 AI税務参謀のアドバイス</div>

      <div style={s.aiCard}>
        <div style={s.aiIcon}>💡</div>
        <div style={s.aiContent}>
          <div style={s.aiHead}>短期前払費用の活用</div>
          <div style={s.aiText}>
            今期の利益が予想を上回っています。来年分の家賃や保険料を年内に支払うことで、約30万円の経費計上が可能です。
          </div>
          <button style={s.aiBtn}>シミュレーションする</button>
        </div>
      </div>

      <div style={s.aiCard}>
        <div style={s.aiIcon}>📉</div>
        <div style={s.aiContent}>
          <div style={s.aiHead}>30万円未満の資産購入</div>
          <div style={s.aiText}>
            古くなったPCや工具の買い替えは済みましたか？ 少額減価償却資産の特例を使えば、即時償却できます。
          </div>
        </div>
      </div>

    </div>
  );
};