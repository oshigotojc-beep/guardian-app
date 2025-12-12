// src/screens/AccountingScreen.js
import React from 'react';

export const AccountingScreen = () => {
  const s = {
    container: { padding: '20px', paddingBottom: '100px' },
    header: { fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    badge: { fontSize: '10px', background: '#dcfce7', color: '#15803d', padding: '5px 10px', borderRadius: '15px', fontWeight: 'bold' },

    // カメラエリア
    cameraBox: {
      background: 'white', borderRadius: '20px', padding: '30px', textAlign: 'center',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)', marginBottom: '25px', position: 'relative', overflow: 'hidden'
    },
    cameraCircle: {
      width: '80px', height: '80px', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
      borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 10px 20px rgba(15, 23, 42, 0.3)', cursor: 'pointer'
    },
    cameraIcon: { fontSize: '30px' },
    cameraText: { fontSize: '14px', fontWeight: 'bold', color: '#475569' },
    
    // AIログ
    logBox: { background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '20px', textAlign: 'left' },
    logTitle: { fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' },
    barBg: { height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' },
    barVal: { height: '100%', width: '60%', background: '#f59e0b' },
    logDesc: { fontSize: '10px', color: '#64748b', lineHeight: '1.5' },

    // 仕訳リスト
    sectionTitle: { fontSize: '14px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '15px', marginTop: '10px' },
    list: { display: 'flex', flexDirection: 'column', gap: '10px' },
    card: { background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' },
    iconBox: (color) => ({ width: '40px', height: '40px', background: color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }),
    info: { flex: 1 },
    storeName: { fontSize: '14px', fontWeight: 'bold', color: '#1e293b' },
    category: { fontSize: '10px', color: '#94a3b8' },
    amount: { fontSize: '16px', fontWeight: 'bold', color: '#0f172a' },
    tag: { fontSize: '9px', padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#64748b', marginLeft: 'auto', alignSelf: 'start', fontWeight: 'bold' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          🤖 自動経理ロボ
        </div>
        <div style={s.badge}>AUTO-PILOT ON</div>
      </div>

      {/* レシート撮影エリア */}
      <div style={s.cameraBox}>
        <div style={s.cameraCircle} onClick={() => alert("カメラを起動します（デモ）")}>
          <div style={s.cameraIcon}>📷</div>
        </div>
        <div style={s.cameraText}>レシートを撮るだけで完了</div>
        
        {/* AI分析ログ */}
        <div style={s.logBox}>
          <div style={s.logTitle}>🏗️ 人工・経費の自動配賦 (今月)</div>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'11px', fontWeight:'bold', marginBottom:'5px'}}>
            <span>経費総額</span>
            <span>¥2,400,000</span>
          </div>
          <div style={s.barBg}>
            <div style={s.barVal}></div>
          </div>
          <div style={{fontSize:'9px', color:'#64748b', marginBottom:'10px'}}>
            ● 江上運送 (60%) ● 小郡Y邸 (30%) ● その他 (10%)
          </div>
          <div style={s.logDesc}>
            🤖 <strong>AIログ:</strong> 田中職人のGPSデータに基づき、給与の60%を「江上運送」の原価に計上しました。
          </div>
        </div>
      </div>

      {/* リアルタイム仕訳ログ */}
      <div style={s.sectionTitle}>📥 リアルタイム仕訳ログ</div>
      
      <div style={s.list}>
        {/* 1件目 */}
        <div style={s.card}>
          <div style={s.iconBox('#dbeafe')}>🛒</div>
          <div style={s.info}>
            <div style={s.storeName}>日本ペイント</div>
            <div style={s.category}>材料費 / 買掛金</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={s.tag}>建材連携</div>
            <div style={s.amount}>-¥125,000</div>
          </div>
        </div>

        {/* 2件目 */}
        <div style={s.card}>
          <div style={s.iconBox('#fef3c7')}>⛽</div>
          <div style={s.info}>
            <div style={s.storeName}>ENEOS 佐賀SS</div>
            <div style={s.category}>車両費 / 現金</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={s.tag}>AI読取</div>
            <div style={s.amount}>-¥5,400</div>
          </div>
        </div>

        {/* 3件目 */}
        <div style={s.card}>
          <div style={s.iconBox('#dcfce7')}>👷</div>
          <div style={s.info}>
            <div style={s.storeName}>外注費計上 (佐藤)</div>
            <div style={s.category}>未成工事支出金 / 未払金</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={s.tag}>GPS自動</div>
            <div style={s.amount}>-¥18,000</div>
          </div>
        </div>
      </div>

    </div>
  );
};