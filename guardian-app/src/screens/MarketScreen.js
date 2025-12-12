// src/screens/MarketScreen.js
import React, { useState } from 'react';

export const MarketScreen = () => {
  const [mode, setMode] = useState('buy'); // buy: 建材購入, sell: フリマ出品

  const s = {
    container: { padding: '20px', paddingBottom: '100px' },
    // タブ切り替え
    tabRow: { display: 'flex', background: '#e2e8f0', padding: '4px', borderRadius: '12px', marginBottom: '20px' },
    tabBtn: (isActive) => ({
      flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
      background: isActive ? 'white' : 'transparent',
      color: isActive ? '#0f172a' : '#64748b', fontWeight: 'bold', cursor: 'pointer',
      boxShadow: isActive ? '0 2px 5px rgba(0,0,0,0.05)' : 'none', transition: '0.2s'
    }),

    // --- 購入モードのスタイル ---
    hero: { background: '#0f172a', color: 'white', padding: '25px 20px', borderRadius: '16px', marginBottom: '20px', textAlign: 'center' },
    heroVal: { fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', fontFamily: 'Arial' },
    itemCard: { background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '15px', display: 'flex', gap: '15px', border: '1px solid #f1f5f9' },
    
    // --- フリマモードのスタイル (画像2527.jpg再現) ---
    fleaHero: { background: '#10b981', color: 'white', padding: '20px', borderRadius: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    fleaVal: { fontSize: '28px', fontWeight: 'bold' },
    fleaCard: { background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '15px', border: '1px solid #f1f5f9', display: 'flex', gap: '15px' },
    fleaThumb: { width: '80px', height: '80px', background: '#cbd5e1', borderRadius: '8px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontSize:'9px', color:'white', textAlign:'center' },
    fleaTag: { background: '#0f172a', color: 'white', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', marginTop: '5px' },
    fleaPrice: { fontSize: '18px', fontWeight: 'bold', color: '#10b981' },
    chatBtn: { background: 'white', border: '1px solid #3b82f6', color: '#3b82f6', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginLeft: 'auto' },
    cameraBtn: { position: 'fixed', bottom: '90px', right: '20px', width: '60px', height: '60px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'white', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)', cursor: 'pointer' }
  };

  return (
    <div style={s.container}>
      <div style={{fontSize:'18px', fontWeight:'bold', marginBottom:'15px'}}>🛒 マーケット & フリマ</div>

      {/* タブ切り替え */}
      <div style={s.tabRow}>
        <button style={s.tabBtn(mode === 'buy')} onClick={() => setMode('buy')}>🏢 建材購入</button>
        <button style={s.tabBtn(mode === 'sell')} onClick={() => setMode('sell')}>♻️ 現場在庫フリマ</button>
      </div>

      {mode === 'buy' ? (
        // --- 購入モード (Amazon対抗) ---
        <>
          <div style={s.hero}>
            <div style={{fontSize:'12px', opacity:0.8}}>今月のコスト削減額</div>
            <div style={s.heroVal}>¥ 42,500</div>
            <div style={{fontSize:'10px', marginTop:'10px', background:'rgba(255,255,255,0.1)', display:'inline-block', padding:'4px 10px', borderRadius:'10px'}}>共同購買 18% OFF</div>
          </div>
          <div style={{fontWeight:'bold', color:'#64748b', marginBottom:'15px'}}>おすすめ商品</div>
          <div style={s.itemCard}>
            <div style={{width:'80px', height:'80px', background:'#e2e8f0', borderRadius:'8px'}}></div>
            <div style={{flex:1}}>
              <div style={{fontWeight:'bold', fontSize:'14px'}}>日本ペイント 1液ファインシリコン (15kg)</div>
              <div style={{fontSize:'10px', color:'#94a3b8'}}>Amazon: ¥14,800</div>
              <div style={{fontSize:'18px', fontWeight:'bold', color:'#ef4444'}}>¥ 11,200</div>
            </div>
            <button style={{background:'#0f172a', color:'white', width:'30px', height:'30px', borderRadius:'15px', border:'none'}}>＋</button>
          </div>
        </>
      ) : (
        // --- フリマモード (在庫処分) ---
        <>
          <div style={s.fleaHero}>
            <div>
              <div style={{fontSize:'11px', opacity:0.9}}>廃棄コスト削減</div>
              <div style={s.fleaVal}>¥ 18,500</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:'11px', opacity:0.9}}>譲った数</div>
              <div style={{fontSize:'24px', fontWeight:'bold'}}>3 <span style={{fontSize:'14px'}}>個</span></div>
            </div>
          </div>

          <div style={{fontWeight:'bold', color:'#64748b', marginBottom:'15px'}}>📍 近くの出品 (半径 5km)</div>

          {/* 出品カード 1 */}
          <div style={s.fleaCard}>
            <div style={s.fleaThumb}>
              [写真]
              <div style={s.fleaTag}>1.2km 先</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:'bold', fontSize:'14px', marginBottom:'5px'}}>日本ペイント ファインSi (グレー)</div>
              <div style={{fontSize:'10px', color:'#64748b', marginBottom:'5px'}}>残量: 約40% | 状態: 開封済</div>
              <div style={{display:'flex', alignItems:'center'}}>
                <div style={s.fleaPrice}>¥ 0 (あげます)</div>
                <button style={s.chatBtn}>💬 欲しい</button>
              </div>
            </div>
          </div>

          {/* 出品カード 2 */}
          <div style={s.fleaCard}>
            <div style={s.fleaThumb}>
              [写真]
              <div style={s.fleaTag}>3.5km 先</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:'bold', fontSize:'14px', marginBottom:'5px'}}>サンゲツ フロアタイル (木目)</div>
              <div style={{fontSize:'10px', color:'#64748b', marginBottom:'5px'}}>残量: 2ケース (未使用) | 倉庫整理</div>
              <div style={{display:'flex', alignItems:'center'}}>
                <div style={{...s.fleaPrice, color:'#ef4444'}}>¥ 2,000</div>
                <button style={s.chatBtn}>💬 交渉する</button>
              </div>
            </div>
          </div>

          {/* 出品ボタン */}
          <div style={s.cameraBtn} onClick={() => alert("カメラを起動して出品します")}>
            📷
          </div>
        </>
      )}
    </div>
  );
};