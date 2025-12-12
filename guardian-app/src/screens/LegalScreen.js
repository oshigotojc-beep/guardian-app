// src/screens/LegalScreen.js
import React from 'react';

export const LegalScreen = () => {
  const s = {
    container: { padding: '20px', paddingBottom: '100px' },
    header: { fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    icon: { fontSize: '24px' },
    
    // 許可証カード (メイン)
    licenseCard: {
      background: '#0f172a', color: 'white', padding: '25px', borderRadius: '20px',
      marginBottom: '25px', boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.4)',
      position: 'relative', overflow: 'hidden'
    },
    badge: { background: '#f59e0b', color: 'white', fontSize: '10px', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '10px', fontWeight: 'bold' },
    title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '5px', lineHeight: '1.4' },
    date: { fontSize: '11px', opacity: 0.8, marginBottom: '15px' },
    alert: { fontSize: '14px', fontWeight: 'bold', color: '#f59e0b' },
    bgDeco: { position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '100px', opacity: 0.1 },

    // アクションメニュー
    menuTitle: { fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '10px', letterSpacing: '1px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' },
    menuCard: { background: 'white', padding: '20px', borderRadius: '16px', textAlign: 'center', border: '1px solid #f1f5f9', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', cursor: 'pointer' },
    menuIcon: { fontSize: '24px', marginBottom: '10px', display: 'block' },
    menuText: { fontSize: '13px', fontWeight: 'bold', color: '#1e293b', marginBottom: '5px' },
    menuSub: { fontSize: '10px', color: '#64748b' },

    // 書類リスト
    docCard: { background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' },
    docIcon: { width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
    docInfo: { flex: 1, marginLeft: '15px' },
    docName: { fontSize: '14px', fontWeight: 'bold', color: '#1e293b' },
    docStatus: { fontSize: '10px', color: '#10b981', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px', fontWeight: 'bold' },
    createBtn: { background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>🏛️ 建設業許可マスター</div>
        <div style={s.icon}>📜</div>
      </div>

      {/* 許可証メインカード */}
      <div style={s.licenseCard}>
        <div style={s.badge}>現在の許可</div>
        <div style={s.title}>佐賀県知事 許可 (般-3) 第12345号</div>
        <div style={s.date}>有効期間: 令和3年4月1日 〜 令和8年3月31日</div>
        <div style={s.alert}>⚠️ 更新期限まで: あと 118日</div>
        <div style={s.bgDeco}>⚖️</div>
      </div>

      {/* アクションメニュー */}
      <div style={s.menuTitle}>ACTION MENU</div>
      <div style={s.grid}>
        <div style={s.menuCard}>
          <span style={s.menuIcon}>🆕</span>
          <div style={s.menuText}>新規・業種追加</div>
          <div style={s.menuSub}>「特定」への変更や「内装」等の追加</div>
        </div>
        <div style={s.menuCard}>
          <span style={s.menuIcon}>🔄</span>
          <div style={s.menuText}>許可更新 (5年)</div>
          <div style={s.menuSub}>データ自動流し込みで書類を即座に作成</div>
        </div>
        <div style={s.menuCard}>
          <span style={s.menuIcon}>📅</span>
          <div style={s.menuText}>決算変更届 (年1)</div>
          <div style={s.menuSub}>毎年の義務。経理データから自動生成</div>
        </div>
        <div style={s.menuCard}>
          <span style={s.menuIcon}>🤝</span>
          <div style={s.menuText}>専門家チェック</div>
          <div style={s.menuSub}>作成データを送って申請代行を依頼</div>
        </div>
      </div>

      {/* 作成可能書類 */}
      <div style={s.menuTitle}>READY TO GENERATE (作成可能書類)</div>
      
      <div style={s.docCard}>
        <div style={s.docIcon}>📄</div>
        <div style={s.docInfo}>
          <div style={s.docName}>様式第1号 工事経歴書</div>
          <div style={s.docStatus}>データ連携済: 100%</div>
        </div>
        <button style={s.createBtn} onClick={() => alert("工事台帳データから直近1年分を抽出し、PDFを作成しました。")}>作成</button>
      </div>

      <div style={s.docCard}>
        <div style={s.docIcon}>📊</div>
        <div style={s.docInfo}>
          <div style={s.docName}>財務諸表 (建設業様式)</div>
          <div style={s.docStatus}>データ連携済: 100%</div>
        </div>
        <button style={s.createBtn}>作成</button>
      </div>

    </div>
  );
};