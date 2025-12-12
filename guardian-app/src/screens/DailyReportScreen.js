import React, { useState, useEffect } from 'react';

// 日報画面コンポーネント
export const DailyReportScreen = () => {
  // 入力データを管理する箱（最初は空っぽ）
  const [date, setDate] = useState('');
  const [siteName, setSiteName] = useState('');
  const [content, setContent] = useState('');
  
  // 保存された日報リスト
  const [reports, setReports] = useState([]);

  // 画面が開いた瞬間、保存されているデータを読み込む
  useEffect(() => {
    const savedReports = localStorage.getItem('guardian_reports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
    // 今日の日付を初期セット
    const today = new Date().toISOString().slice(0, 10);
    setDate(today);
  }, []);

  // 「保存」ボタンが押されたときの処理
  const handleSave = () => {
    if (!siteName || !content) {
      alert("⚠️ 現場名と作業内容を入力してください");
      return;
    }

    // 新しい日報データを作る
    const newReport = {
      id: Date.now(), // ID（時間をID代わりにする）
      date: date,
      site: siteName,
      work: content,
      timestamp: new Date().toLocaleString()
    };

    // リストに追加して、保存する
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    
    // スマホ（ブラウザ）に保存！ここが重要
    localStorage.setItem('guardian_reports', JSON.stringify(updatedReports));

    alert("✅ 日報を保存しました！");
    
    // 入力欄をクリア
    setSiteName('');
    setContent('');
  };

  // 履歴を削除する機能（テスト用）
  const clearHistory = () => {
    if(window.confirm("本当に履歴をすべて消しますか？")) {
      setReports([]);
      localStorage.removeItem('guardian_reports');
    }
  };

  // --- 見た目のデザイン (CSS in JS) ---
  const s = {
    container: { padding: '20px', background: '#f8fafc', minHeight: '100%' },
    card: { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '20px' },
    label: { display: 'block', fontWeight: 'bold', color: '#64748b', marginBottom: '5px', fontSize: '12px' },
    input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '15px', fontSize: '16px', boxSizing: 'border-box' },
    button: { width: '100%', padding: '15px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
    historyTitle: { fontSize: '14px', fontWeight: 'bold', color: '#0f172a', margin: '20px 0 10px' },
    reportItem: { background: 'white', borderLeft: '4px solid #3b82f6', padding: '15px', marginBottom: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' },
    dateBadge: { background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', marginRight: '10px' }
  };

  return (
    <div style={s.container}>
      <h2 style={{fontSize:'18px', margin:'0 0 20px', color:'#0f172a'}}>📝 日報入力</h2>

      {/* 入力フォーム */}
      <div style={s.card}>
        <label style={s.label}>日付</label>
        <input type="date" style={s.input} value={date} onChange={(e) => setDate(e.target.value)} />

        <label style={s.label}>現場名</label>
        <input type="text" style={s.input} placeholder="例：小郡Y様邸" value={siteName} onChange={(e) => setSiteName(e.target.value)} />

        <label style={s.label}>作業内容</label>
        <textarea style={{...s.input, height:'80px'}} placeholder="例：養生、高圧洗浄" value={content} onChange={(e) => setContent(e.target.value)} />

        <button style={s.button} onClick={handleSave}>日報を送信</button>
      </div>

      {/* 過去の履歴 */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={s.historyTitle}>📜 送信履歴 ({reports.length}件)</div>
        <button onClick={clearHistory} style={{background:'transparent', border:'none', color:'#ef4444', fontSize:'10px'}}>履歴消去</button>
      </div>

      <div>
        {reports.map((r) => (
          <div key={r.id} style={s.reportItem}>
            <div style={{marginBottom:'5px'}}>
              <span style={s.dateBadge}>{r.date}</span>
              <span style={{fontWeight:'bold', fontSize:'14px'}}>{r.site}</span>
            </div>
            <div style={{fontSize:'13px', color:'#334155', whiteSpace: 'pre-wrap'}}>{r.work}</div>
            <div style={{fontSize:'10px', color:'#94a3b8', marginTop:'5px', textAlign:'right'}}>送信: {r.timestamp}</div>
          </div>
        ))}
        {reports.length === 0 && <div style={{textAlign:'center', color:'#94a3b8', fontSize:'12px'}}>まだ履歴がありません</div>}
      </div>
    </div>
  );
};