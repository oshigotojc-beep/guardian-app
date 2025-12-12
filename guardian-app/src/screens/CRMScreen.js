// src/screens/CRMScreen.js
import React from 'react';

// App.jsから onChangeScreen を受け取る
export const CRMScreen = ({ onChangeScreen }) => {
  const s = {
    container: { padding: '20px', paddingBottom: '100px' },
    header: { fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    
    // 台風アラート
    alertCard: {
      background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
      color: 'white', padding: '20px', borderRadius: '20px', marginBottom: '25px',
      boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.5)', position: 'relative', overflow: 'hidden'
    },
    alertTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' },
    alertDesc: { fontSize: '12px', opacity: 0.9, marginBottom: '15px', lineHeight: '1.5' },
    actionBtn: {
      background: 'white', color: '#b91c1c', border: 'none', padding: '12px', width: '100%',
      borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
    },
    tornadoIcon: { fontSize: '40px', position: 'absolute', right: '10px', top: '10px', opacity: 0.8 },

    // タイムライン
    sectionTitle: { fontSize: '14px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '15px' },
    timeline: { borderLeft: '2px solid #e2e8f0', marginLeft: '10px', paddingLeft: '20px', paddingBottom: '20px' },
    timelineItem: { marginBottom: '25px', position: 'relative' },
    dot: { width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%', position: 'absolute', left: '-27px', top: '0', border: '2px solid #fff', boxShadow: '0 0 0 2px #3b82f6' },
    time: { fontSize: '11px', color: '#64748b', marginBottom: '5px' },
    
    // 顧客カード（クリック可能にする）
    card: { background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', cursor: 'pointer' },
    name: { fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' },
    badge: { fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' },
    message: { fontSize: '12px', color: '#475569', lineHeight: '1.5', background: '#f8fafc', padding: '10px', borderRadius: '8px' },
    cost: { fontSize: '10px', color: '#94a3b8', marginTop: '5px', textAlign: 'right' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div>📠 自動追客ロボ (CRM)</div>
        <div style={{fontSize:'24px'}}>🤖</div>
      </div>

      <div style={s.alertCard}>
        <div style={s.tornadoIcon}>🌪️</div>
        <div style={s.alertTitle}>台風接近アラート</div>
        <div style={s.alertDesc}>
          大型台風12号が佐賀県に接近中。<br/>
          対象エリアの顧客: <strong>48件</strong>
        </div>
        <button style={s.actionBtn} onClick={() => alert("48件にLINEを一斉送信しました。\n予想売上効果: ¥1,200,000")}>
          📲 「大丈夫ですか？」を一斉送信
        </button>
      </div>

      <div style={s.sectionTitle}>本日の自動アクション (3件)</div>

      <div style={s.timeline}>
        {/* 1件目：クリックで詳細画面へ！ */}
        <div style={s.timelineItem}>
          <div style={s.dot}></div>
          <div style={s.time}>今日 10:00 配信予定</div>
          <div style={s.card} onClick={() => onChangeScreen('customer')}>
            <div style={s.name}>
              田中 太郎 様 (佐賀市)
              <span style={{...s.badge, background:'#dcfce7', color:'#15803d'}}>1年点検</span>
            </div>
            <div style={s.message}>
              「お世話になっております。外壁塗装から1年が経ちました...」
              <br/>
              <span style={{color:'#3b82f6', fontWeight:'bold'}}>👉 顧客詳細・保証書を見る</span>
            </div>
          </div>
        </div>

        {/* 2件目 */}
        <div style={s.timelineItem}>
          <div style={{...s.dot, background:'#cbd5e1', boxShadow:'none'}}></div>
          <div style={s.time}>今日 12:00 発送予定</div>
          <div style={s.card}>
            <div style={s.name}>
              鈴木 ウメ 様 (小郡市)
              <span style={{...s.badge, background:'#fce7f3', color:'#be185d'}}>ハガキDM</span>
            </div>
            <div style={{fontSize:'12px', color:'#64748b'}}>
              [暑中見舞いハガキ] を印刷・投函センターへ送信します。
            </div>
            <div style={s.cost}>コスト: ¥63/通</div>
          </div>
        </div>
      </div>
    </div>
  );
};