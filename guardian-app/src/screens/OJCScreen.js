// src/screens/OJCScreen.js
import React from 'react';

export const OJCScreen = () => {
  const s = {
    container: { padding: '20px', paddingBottom: '100px' },
    header: { fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    badge: { fontSize: '10px', background: '#ef4444', color: 'white', padding: '5px 10px', borderRadius: '15px', fontWeight: 'bold' },

    // ヒーローエリア (あなたへの特別オファー)
    heroCard: {
      background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
      color: 'white', padding: '20px', borderRadius: '20px', marginBottom: '25px',
      boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.4)', position: 'relative'
    },
    fireIcon: { position: 'absolute', right: '15px', top: '15px', fontSize: '24px' },
    heroLabel: { fontSize: '11px', color: '#94a3b8', marginBottom: '5px', fontWeight: 'bold' },
    heroTitle: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', lineHeight: '1.4' },
    heroPrice: { fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '15px' },
    tags: { display: 'flex', gap: '5px', marginBottom: '15px' },
    tag: { fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' },
    entryBtn: {
      background: '#f59e0b', color: '#0f172a', width: '100%', padding: '12px',
      borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
    },

    // 案件リスト
    sectionTitle: { fontSize: '14px', fontWeight: 'bold', color: '#64748b', marginBottom: '15px', marginTop: '30px' },
    card: { background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
    cardTitle: { fontSize: '14px', fontWeight: 'bold', color: '#1e293b' },
    cardDate: { fontSize: '10px', color: '#94a3b8' },
    cardInfo: { fontSize: '12px', color: '#475569', marginBottom: '10px', lineHeight: '1.5' },
    cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px' },
    priceLabel: { fontSize: '10px', color: '#64748b' },
    priceVal: { fontSize: '16px', fontWeight: 'bold', color: '#0f172a' },
    applyBtn: { background: '#fff', border: '1px solid #3b82f6', color: '#3b82f6', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          🌏 案件センター (OJC)
        </div>
        <div style={s.badge}>新着オファー 2</div>
      </div>

      {/* 激熱オファー */}
      <div style={s.heroCard}>
        <div style={s.fireIcon}>🔥</div>
        <div style={s.heroLabel}>AIマッチング率 98%</div>
        <div style={s.heroTitle}>福岡県小郡市 Y様邸<br/>屋根・外壁塗装工事</div>
        <div style={s.heroPrice}>予算: ¥1,500,000</div>
        
        <div style={s.tags}>
          <div style={s.tag}>戸建て</div>
          <div style={s.tag}>築15年</div>
          <div style={s.tag}>自社施工のみ</div>
        </div>

        <button style={s.entryBtn} onClick={() => alert("施主に提案リクエストを送りました！\nマッチングしたら通知します。")}>
          ⚡ 今すぐエントリー (手数料¥0)
        </button>
      </div>

      {/* その他の案件 */}
      <div style={s.sectionTitle}>エリアの新着案件</div>

      {/* 案件1 */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <div style={s.cardTitle}>佐賀市 公共施設 改修塗装</div>
          <div style={s.cardDate}>募集中: 残り3日</div>
        </div>
        <div style={s.cardInfo}>
          市役所からの入札案件情報です。2級施工管理技士の配置が必須となります。
        </div>
        <div style={s.cardFooter}>
          <div>
            <div style={s.priceLabel}>予定価格</div>
            <div style={s.priceVal}>¥ 3,200,000</div>
          </div>
          <button style={s.applyBtn}>詳細を見る</button>
        </div>
      </div>

      {/* 案件2 */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <div style={s.cardTitle}>鳥栖市 アパート鉄骨階段</div>
          <div style={s.cardDate}>急募: 明後日から</div>
        </div>
        <div style={s.cardInfo}>
          オーナー様からの直接依頼。サビ止め・ウレタン仕上げ。工期3日以内で可能な方。
        </div>
        <div style={s.cardFooter}>
          <div>
            <div style={s.priceLabel}>予算</div>
            <div style={s.priceVal}>¥ 450,000</div>
          </div>
          <button style={s.applyBtn}>詳細を見る</button>
        </div>
      </div>

    </div>
  );
};