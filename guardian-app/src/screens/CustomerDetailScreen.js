// src/screens/CustomerDetailScreen.js
import React from 'react';

export const CustomerDetailScreen = () => {
  const s = {
    container: { paddingBottom: '100px', background: '#f8fafc', minHeight: '100vh' },
    
    // ヘッダー (After Photo)
    header: {
      background: '#1e293b', color: 'white', padding: '40px 20px 20px', 
      borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px',
      textAlign: 'center', marginBottom: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    headerTitle: { fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' },
    clientName: { fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' },
    clientInfo: { fontSize: '12px', opacity: 0.8 },

    // コンテンツエリア
    content: { padding: '0 20px' },
    sectionTitle: { fontSize: '14px', fontWeight: 'bold', color: '#64748b', marginBottom: '10px', marginTop: '20px' },

    // 金の保証書カード
    goldCard: {
      background: 'white', borderRadius: '16px', padding: '5px',
      boxShadow: '0 10px 30px -5px rgba(245, 158, 11, 0.2)', border: '1px solid #fcd34d'
    },
    innerGold: {
      border: '2px solid #fcd34d', borderRadius: '12px', padding: '20px', textAlign: 'center',
      background: 'linear-gradient(to bottom, #fff, #fffbeb)'
    },
    goldBadge: { background: '#f59e0b', color: 'white', fontSize: '10px', padding: '4px 10px', borderRadius: '15px', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' },
    goldTitle: { fontSize: '18px', fontWeight: 'bold', color: '#92400e', marginBottom: '10px' },
    goldText: { fontSize: '11px', color: '#92400e', marginBottom: '5px' },
    dlBtn: {
      background: '#92400e', color: 'white', width: '100%', padding: '12px', marginTop: '15px',
      borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
    },

    // 書類リスト
    docItem: {
      background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '10px',
      display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #f1f5f9'
    },
    docIcon: { fontSize: '20px' },
    docInfo: { flex: 1 },
    docName: { fontSize: '13px', fontWeight: 'bold', color: '#1e293b' },
    docDate: { fontSize: '10px', color: '#94a3b8' },
    dlIcon: { color: '#3b82f6', fontSize: '18px', cursor: 'pointer' },

    // 写真グリッド
    photoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' },
    photo: { height: '80px', background: '#cbd5e1', borderRadius: '8px' },
    morePhoto: { height: '80px', background: '#475569', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' },

    // 連絡ボタン
    floatBtn: {
      position: 'fixed', bottom: '90px', right: '20px', background: '#0f172a', color: 'white',
      padding: '15px 25px', borderRadius: '30px', fontWeight: 'bold', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.4)',
      display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'
    }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={s.headerTitle}>After Photo</div>
        <div style={s.clientName}>田中 太郎 様邸</div>
        <div style={s.clientInfo}>外壁塗装・屋根補修工事 (2024.12 完工)</div>
      </div>

      <div style={s.content}>
        
        {/* 工事保証書 */}
        <div style={s.sectionTitle}>🏆 工事保証書</div>
        <div style={s.goldCard}>
          <div style={s.innerGold}>
            <div style={s.goldBadge}>デジタル原本</div>
            <div style={s.goldTitle}>工事品質 保証書</div>
            <div style={s.goldText}>保証期間: 10年間 (塗膜剥離・防水)</div>
            <div style={{fontSize:'10px', color:'#b45309', marginTop:'10px', display:'flex', justifyContent:'space-between'}}>
              <span>発行日: 2024/12/25</span>
              <span>期限: 2034/12/24</span>
            </div>
            <button style={s.dlBtn}>
              📥 保証書をダウンロード (PDF)
            </button>
          </div>
        </div>

        {/* 契約書類 */}
        <div style={s.sectionTitle}>📂 契約・書類アーカイブ</div>
        
        <div style={s.docItem}>
          <div style={s.docIcon}>📑</div>
          <div style={s.docInfo}>
            <div style={s.docName}>工事請負契約書 (電子署名済)</div>
            <div style={s.docDate}>2024/11/15</div>
          </div>
          <div style={s.dlIcon}>↓</div>
        </div>

        <div style={s.docItem}>
          <div style={s.docIcon}>💰</div>
          <div style={s.docInfo}>
            <div style={s.docName}>領収書 (全額受領済)</div>
            <div style={s.docDate}>2024/12/28</div>
          </div>
          <div style={s.dlIcon}>↓</div>
        </div>

        <div style={s.docItem}>
          <div style={s.docIcon}>📊</div>
          <div style={s.docInfo}>
            <div style={s.docName}>最終御見積書 (決定版)</div>
            <div style={s.docDate}>2024/11/10</div>
          </div>
          <div style={s.dlIcon}>↓</div>
        </div>

        {/* 施工写真 */}
        <div style={s.sectionTitle}>📸 施工記録アルバム</div>
        <div style={s.photoGrid}>
          <div style={s.photo}></div>
          <div style={s.photo}></div>
          <div style={s.morePhoto}>+24枚</div>
        </div>

      </div>

      <div style={s.floatBtn} onClick={() => alert("担当者(田中)に電話をかけます")}>
        💬 担当者に連絡する
      </div>
    </div>
  );
};