import React, { useState, useEffect } from 'react';

// 作成した画面を読み込む
import { DailyReportScreen } from './screens/DailyReportScreen';
import { FinanceScreen } from './screens/FinanceScreen';

// --- その他の画面（まだ空っぽでもOK） ---
// ※ファイルが存在しないとエラーになるので、一旦ダミーで表示する関数を作っておきます
const DummyScreen = ({ title }) => (
  <div style={{padding:'20px', textAlign:'center', marginTop:'50px'}}>
    <h2>🚧 {title}</h2>
    <p>開発中または準備中の画面です</p>
  </div>
);

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  // --- 画面を切り替える司令塔 ---
  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard': 
        return <DailyReportScreen />; // とりあえずホームも日報にしておく（一番使うから）
      case 'report': 
        return <DailyReportScreen />; // 日報画面
      case 'finance': 
        return <FinanceScreen />;     // 給与・人工画面
      default: 
        return <DummyScreen title="準備中" />;
    }
  };

  // --- デザイン設定 ---
  const s = {
    container: { fontFamily: 'Helvetica Neue, sans-serif', background: '#f8fafc', minHeight: '100vh', maxWidth: '480px', margin: '0 auto', boxShadow: '0 0 50px rgba(0,0,0,0.1)', position: 'relative', paddingBottom: '80px' },
    header: { background: '#fff', padding: '15px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold', color: '#0f172a', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100 },
    logo: { display:'flex', alignItems:'center', gap:'5px', cursor:'pointer' },
    logoIcon: { background:'#0f172a', color:'white', width:'24px', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'4px' },
    
    // フッターメニュー（画面下の固定ボタン）
    footer: { position: 'fixed', bottom: 0, width: '100%', maxWidth: '480px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', padding: '12px 0', zIndex: 100 },
    navItem: (isActive) => ({ cursor: 'pointer', textAlign:'center', fontSize:'10px', color: isActive ? '#0f172a' : '#94a3b8', fontWeight: isActive ? 'bold' : 'normal' }),
    navIcon: { fontSize:'20px', marginBottom:'2px' }
  };

  return (
    <div style={s.container}>
      {/* ヘッダー */}
      <div style={s.header}>
        <div style={s.logo} onClick={()=>setCurrentScreen('dashboard')}>
          <span style={s.logoIcon}>G</span> GUARDIAN
        </div>
        <div>⚙️</div>
      </div>

      {/* メイン画面（切り替わる部分） */}
      {renderScreen()}

      {/* フッターメニュー */}
      <div style={s.footer}>
        {/* 1. 日報ボタン */}
        <div onClick={() => setCurrentScreen('report')} style={s.navItem(currentScreen === 'report')}>
          <div style={s.navIcon}>📝</div>
          日報
        </div>

        {/* 2. 給与ボタン */}
        <div onClick={() => setCurrentScreen('finance')} style={s.navItem(currentScreen === 'finance')}>
          <div style={s.navIcon}>💰</div>
          給与
        </div>

        {/* 3. その他（ダミー） */}
        <div onClick={() => setCurrentScreen('settings')} style={s.navItem(currentScreen === 'settings')}>
           <div style={s.navIcon}>⚙️</div>
           設定
        </div>
      </div>
    </div>
  );
}

export default App;