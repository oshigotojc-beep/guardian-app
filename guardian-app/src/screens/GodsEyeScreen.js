// src/screens/GodsEyeScreen.js
import React, { useState } from 'react';

export const GodsEyeScreen = () => {
  // --- 状態（State）の管理 ---
  const [reportText, setReportText] = useState(''); // 日報の文字
  const [isLocked, setIsLocked] = useState(true);   // ロックされているか？ (最初はtrue)
  const [status, setStatus] = useState('working');  // 現在の状態: working(就業中) -> left(退勤済)

  // 日報送信ボタンを押したときの処理
  const handleSubmitReport = () => {
    if (reportText.length < 5) {
      alert("⚠️ 日報が短すぎます。「作業内容」を具体的に書いてください。");
      return;
    }
    // ロック解除！
    setIsLocked(false);
    alert("✅ 日報を受信しました。退勤ロックを解除します。");
  };

  // 退勤ボタンを押したときの処理
  const handleLeaveWork = () => {
    if (isLocked) return; // ロック中は何も起きない
    setStatus('left');
    alert("お疲れ様でした！GPS通信を終了します。");
  };

  const s = {
    container: { padding: '20px', paddingBottom: '100px' },
    header: { fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' },
    
    // 自分のステータス箱
    myStatusBox: {
      background: '#fff', padding: '20px', borderRadius: '16px',
      border: status === 'working' ? '2px solid #3b82f6' : '2px solid #cbd5e1',
      marginBottom: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
    },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
    label: { fontWeight: 'bold', fontSize: '14px', color: '#1e293b' },
    
    // ステータスバッジ (変化する)
    badge: { 
      background: status === 'working' ? '#dcfce7' : '#f1f5f9', 
      color: status === 'working' ? '#10b981' : '#64748b', 
      padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' 
    },
    
    // 退勤ボタン (ロック状態で色が変化)
    lockBtn: {
      background: isLocked ? '#f1f5f9' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', // 解除後はオレンジ
      color: isLocked ? '#94a3b8' : 'white', 
      width: '100%', padding: '15px',
      borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px',
      marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
      cursor: isLocked ? 'not-allowed' : 'pointer',
      transition: '0.3s'
    },
    
    // 警告メッセージ (ロック解除で消える)
    alertBox: {
      display: isLocked ? 'block' : 'none',
      background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444',
      padding: '10px', borderRadius: '8px', fontSize: '11px', marginBottom: '10px'
    },
    
    // 日報入力エリア (退勤後は消える)
    reportArea: { display: status === 'working' ? 'block' : 'none' },
    input: {
      width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1',
      fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box', fontFamily: 'inherit'
    },
    submitBtn: {
      background: isLocked ? '#0f172a' : '#10b981', // ロック解除済なら緑になる
      color: 'white', width: '100%', padding: '12px',
      borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
      opacity: isLocked ? 1 : 0.5 // 解除済なら薄くする
    },

    // チーム稼働状況
    sectionTitle: { fontSize: '13px', fontWeight: 'bold', color: '#475569', margin: '20px 0 10px' },
    workerCard: {
      background: '#fff', padding: '15px', borderRadius: '12px', marginBottom: '10px',
      border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    },
    statusAlert: { fontSize: '10px', background: '#fee2e2', color: '#ef4444', padding: '3px 8px', borderRadius: '10px', fontWeight: 'bold' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>👁️ GOD'S EYE (統括監視)</div>

      <div style={s.myStatusBox}>
        <div style={s.row}>
          <div style={s.label}>自分のステータス</div>
          <div style={s.badge}>
            {status === 'working' ? '● 就業中 (GPS ON)' : '● 退勤済 (GPS OFF)'}
          </div>
        </div>

        {/* 退勤ボタン */}
        <button style={s.lockBtn} onClick={handleLeaveWork}>
          {isLocked ? '🔒 退勤する (ロック中)' : '🌙 退勤して帰る'}
        </button>

        {/* 日報エリア */}
        <div style={s.reportArea}>
          <div style={s.alertBox}>⚠️ 日報が未提出のため、退勤できません。</div>
          
          <textarea 
            style={s.input} 
            rows="3" 
            placeholder="ここに作業内容を入力してください..."
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            disabled={!isLocked} // ロック解除後は入力不可
          />
          
          <button style={s.submitBtn} onClick={handleSubmitReport} disabled={!isLocked}>
            {isLocked ? '📝 日報を送信してロック解除' : '✅ 送信済み'}
          </button>
        </div>
      </div>

      {/* 以下、チームリスト */}
      <div style={s.sectionTitle}>👥 チーム稼働状況</div>
      <div style={s.workerCard}>
        <div>
          <div style={{fontWeight:'bold', fontSize:'14px'}}>田中 健一 (職長)</div>
          <div style={{fontSize:'11px', color:'#64748b'}}>📍 江上運送 (滞在: 4h)</div>
        </div>
        <div style={{fontSize:'10px', background:'#dcfce7', color:'#10b981', padding:'3px 8px', borderRadius:'10px', fontWeight:'bold'}}>● 稼働中</div>
      </div>
      <div style={s.workerCard}>
        <div>
          <div style={{fontWeight:'bold', fontSize:'14px', color:'#ef4444'}}>佐藤 次郎 (職人)</div>
          <div style={{fontSize:'11px', color:'#ef4444'}}>📍 パチンコ店エリア</div>
        </div>
        <div style={s.statusAlert}>⚠️ 警告</div>
      </div>
    </div>
  );
};