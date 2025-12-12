// src/screens/LoginScreen.js
import React, { useState } from 'react';

export const LoginScreen = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  // ログインボタンを押したときの動き
  const handleLogin = () => {
    setLoading(true);
    // 1秒だけ「読み込み中」のフリをして、ダッシュボードへ進む
    setTimeout(() => {
      onLogin(); 
    }, 1000);
  };

  const s = {
    container: { 
      padding: '40px', minHeight: '100vh', background: '#fff', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    },
    // ロゴエリア
    logoBox: { marginBottom: '40px', textAlign: 'center' },
    shieldIcon: { fontSize: '60px', marginBottom: '10px', display: 'block' },
    title: { fontSize: '24px', fontWeight: '900', color: '#0f172a', marginBottom: '10px', letterSpacing: '1px' },
    subTitle: { fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' },

    // 入力フォーム
    formBox: { width: '100%', marginBottom: '20px' },
    input: { 
      width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', 
      background: '#f8fafc', fontSize: '14px', marginBottom: '15px', boxSizing: 'border-box'
    },
    
    // ログインボタン
    loginBtn: {
      width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
      background: '#0f172a', color: 'white', fontWeight: 'bold', fontSize: '16px',
      cursor: 'pointer', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)',
      opacity: loading ? 0.7 : 1, transition: '0.2s'
    },

    // LINEボタン
    orText: { fontSize: '10px', color: '#cbd5e1', margin: '20px 0', fontWeight: 'bold' },
    lineBtn: {
      width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
      background: '#06c755', color: 'white', fontWeight: 'bold', fontSize: '16px',
      cursor: 'pointer', boxShadow: '0 4px 12px rgba(6, 199, 85, 0.3)'
    },

    // Face ID
    faceIdBox: { marginTop: '40px', textAlign: 'center', color: '#64748b' },
    faceIcon: { fontSize: '24px', marginBottom: '5px' },
    faceText: { fontSize: '10px' }
  };

  return (
    <div style={s.container}>
      <div style={s.logoBox}>
        <span style={s.shieldIcon}>🛡️</span>
        <div style={s.title}>WELCOME BACK</div>
        <div style={s.subTitle}>建設DXプラットフォームへようこそ</div>
      </div>

      <div style={s.formBox}>
        <input style={s.input} placeholder="ID / Phone Number" defaultValue="CEO Nakashima" />
        <button style={s.loginBtn} onClick={handleLogin}>
          {loading ? '認証中...' : 'ログイン'}
        </button>
      </div>

      <div style={s.orText}>OR</div>

      <button style={s.lineBtn} onClick={handleLogin}>
        LINEでログイン
      </button>

      <div style={s.faceIdBox}>
        <div style={s.faceIcon}>☺</div>
        <div style={s.faceText}>Face ID 解除</div>
      </div>
    </div>
  );
};