// src/screens/GodsEyeScreen.js
import React from 'react';

// 画像(2514.jpg)のデザインを再現したGod's Eye画面
export const GodsEyeScreen = () => {
  const s = {
    container: { padding: '20px' },
    // 自分のステータス箱
    myStatusBox: {
      background: '#fff', padding: '20px', borderRadius: '16px',
      border: '2px solid #3b82f6', // 青い枠線
      marginBottom: '20px', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.1)'
    },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
    label: { fontWeight: 'bold', fontSize: '14px', color: '#1e293b' },
    badge: { background: '#dcfce7', color: '#10b981', padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display:'flex', alignItems:'center', gap:'5px' },
    
    // 退勤ボタン（ロック中）
    lockBtn: {
      background: '#f1f5f9', color: '#94a3b8', width: '100%', padding: '15px',
      borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '14px',
      marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
    },
    // 警告メッセージ
    alertBox: {
      background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444',
      padding: '10px', borderRadius: '8px', fontSize: '11px', marginBottom: '10px'
    },
    // 日報入力エリア
    input: {
      width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1',
      fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box', fontFamily: 'inherit'
    },
    submitBtn: {
      background: '#be123c', color: 'white', width: '100%', padding: '12px',
      borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(190, 18, 60, 0.3)'
    },

    // チーム稼働状況
    sectionTitle: { fontSize: '13px', fontWeight: 'bold', color: '#475569', margin: '20px 0 10px', display:'flex', alignItems:'center', gap:'5px' },
    mapPlaceholder: {
      background: '#e2e8f0', height: '180px', borderRadius: '16px', marginBottom: '15px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 'bold',
      border: '1px dashed #94a3b8'
    },
    // 職人リスト
    workerCard: {
      background: '#fff', padding: '15px', borderRadius: '12px', marginBottom: '10px',
      border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    },
    workerName: { fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' },
    workerLoc: { fontSize: '11px', color: '#64748b' },
    statusLive: { fontSize: '10px', background: '#dcfce7', color: '#10b981', padding: '3px 8px', borderRadius: '10px', fontWeight: 'bold' },
    statusAlert: { fontSize: '10px', background: '#fee2e2', color: '#ef4444', padding: '3px 8px', borderRadius: '10px', fontWeight: 'bold' }
  };

  return (
    <div style={s.container}>
      <div style={{fontSize:'18px', fontWeight:'bold', marginBottom:'15px', display:'flex', alignItems:'center', gap:'10px'}}>
        👁️ GOD'S EYE (統括監視)
      </div>

      {/* 自分のステータス */}
      <div style={s.myStatusBox}>
        <div style={s.row}>
          <div style={s.label}>自分のステータス</div>
          <div style={s.badge}>● 就業中 (GPS ON)</div>
        </div>
        
        <div style={s.lockBtn}>🌙 退勤する (ロック中)</div>
        
        <div style={s.alertBox}>
          ⚠️ 日報が未提出のため、退勤できません。
        </div>

        <textarea style={s.input} rows="3" placeholder="例: 江上運送 鉄骨塗装 下塗り完了。明日は上塗り予定。" />
        
        <button style={s.submitBtn}>
          📝 日報を送信してロック解除
        </button>
      </div>

      {/* チーム稼働状況 */}
      <div style={s.sectionTitle}>👥 チーム稼働状況</div>
      
      {/* 地図（今はプレースホルダー） */}
      <div style={s.mapPlaceholder}>
        [ 🗺️ ここにGoogleマップが表示されます ]
      </div>

      {/* 職人リスト */}
      <div style={s.workerCard}>
        <div>
          <div style={s.workerName}>田中 健一 (職長)</div>
          <div style={s.workerLoc}>📍 江上運送 (滞在: 4h)</div>
        </div>
        <div style={s.statusLive}>● 現場稼働中</div>
      </div>

      <div style={s.workerCard}>
        <div>
          <div style={{...s.workerName, color:'#ef4444'}}>佐藤 次郎 (職人)</div>
          <div style={{...s.workerLoc, color:'#ef4444'}}>📍 パチンコ店エリア (滞在: 50分)</div>
        </div>
        <button style={{background:'#fee2e2', border:'none', color:'#ef4444', padding:'5px 10px', borderRadius:'6px', fontSize:'10px', fontWeight:'bold', cursor:'pointer'}}>
          ⚡ 警告を送る
        </button>
      </div>

    </div>
  );
};