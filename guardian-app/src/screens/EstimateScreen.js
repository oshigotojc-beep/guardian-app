// src/screens/EstimateScreen.js
import React, { useState } from 'react';

// 画像(2532.jpg)を再現したAI見積もり画面
export const EstimateScreen = () => {
  const [plan, setPlan] = useState('take'); // ume, take, matsu
  const [margin, setMargin] = useState(35); // 利益率 35%

  const s = {
    container: { padding: '20px', paddingBottom: '100px' },
    // IDヘッダー
    headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', color: '#64748b', fontSize: '12px', fontWeight: 'bold' },
    
    // 黒い見積もりカード
    mainCard: {
      background: '#0f172a', color: 'white', padding: '25px', borderRadius: '24px',
      marginBottom: '20px', boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.5)',
      position: 'relative', overflow: 'hidden'
    },
    label: { fontSize: '10px', letterSpacing: '1px', opacity: 0.7, marginBottom: '5px' },
    totalPrice: { fontSize: '36px', fontWeight: 'bold', fontFamily: 'Arial', marginBottom: '5px', letterSpacing: '-1px' },
    profitRow: { display: 'flex', gap: '15px', fontSize: '12px', marginBottom: '20px' },
    profitVal: { color: '#10b981', fontWeight: 'bold' },
    
    // スライダーエリア
    sliderBox: { background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '16px' },
    sliderLabel: { display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '10px', opacity: 0.8 },
    rangeInput: { width: '100%', cursor: 'pointer', accentColor: '#f59e0b' }, // accentColorで色変更
    
    // 松竹梅タブ
    tabRow: { display: 'flex', background: '#fff', padding: '5px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
    tabBtn: (isActive) => ({
      flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
      background: isActive ? '#0f172a' : 'transparent',
      color: isActive ? 'white' : '#64748b',
      fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', transition: '0.2s'
    }),

    // 見積明細リスト
    itemList: { display: 'flex', flexDirection: 'column', gap: '10px' },
    itemCard: {
      background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    },
    itemName: { fontSize: '14px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' },
    itemSub: { fontSize: '11px', color: '#94a3b8' },
    itemPrice: { fontSize: '16px', fontWeight: 'bold', color: '#1e293b' },
    itemCost: { fontSize: '10px', color: '#ef4444', textAlign: 'right', fontWeight: 'bold' }, // 原価表示
    
    // AI提案
    aiBox: {
      background: '#dcfce7', padding: '15px', borderRadius: '12px', marginTop: '10px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #bbf7d0'
    },
    aiText: { fontSize: '12px', color: '#15803d', fontWeight: 'bold' },
    addBtn: { background: '#15803d', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' },

    // 下部アクションボタン
    actionRow: { display: 'flex', gap: '10px', marginTop: '30px' },
    pdfBtn: { flex: 1, padding: '15px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    lineBtn: { flex: 1, padding: '15px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }
  };

  // 金額計算ロジック (スライダー連動)
  const basePrice = 1650000;
  const price = Math.round(basePrice * (1 + (margin - 35)/100));
  const profit = Math.round(price * (margin / 100));

  return (
    <div style={s.container}>
      {/* ヘッダー */}
      <div style={s.headerRow}>
        <div style={{display:'flex', alignItems:'center', gap:'5px'}}>⚡ AI即積くん</div>
        <div>ID: 2512-098</div>
      </div>

      {/* 黒いカード */}
      <div style={s.mainCard}>
        <div style={s.label}>ESTIMATE TOTAL (TAX INC)</div>
        <div style={s.totalPrice}>¥ {price.toLocaleString()}</div>
        <div style={s.profitRow}>
          <span style={s.profitVal}>粗利: ¥ {profit.toLocaleString()}</span>
          <span>利益率: {margin}%</span>
        </div>

        {/* スライダー */}
        <div style={s.sliderBox}>
          <div style={s.sliderLabel}>
            <span>値引きシミュレーター</span>
            <span>▼ スライドで調整</span>
          </div>
          <input 
            type="range" min="10" max="50" value={margin} 
            onChange={(e) => setMargin(e.target.value)}
            style={s.rangeInput} 
          />
        </div>
      </div>

      {/* 松竹梅タブ */}
      <div style={s.tabRow}>
        <button style={s.tabBtn(plan === 'ume')} onClick={() => setPlan('ume')}>梅: ウレタン</button>
        <button style={s.tabBtn(plan === 'take')} onClick={() => setPlan('take')}>竹: シリコン</button>
        <button style={s.tabBtn(plan === 'matsu')} onClick={() => setPlan('matsu')}>松: フッ素</button>
      </div>

      {/* 明細リスト */}
      <div style={s.itemList}>
        <div style={s.itemCard}>
          <div>
            <div style={s.itemName}>仮設足場工事 (飛散防止込)</div>
            <div style={s.itemSub}>320m² x @850</div>
          </div>
          <div>
            <div style={s.itemPrice}>¥ 272,000</div>
            <div style={s.itemCost}>原価 ¥180,000</div>
          </div>
        </div>

        <div style={s.itemCard}>
          <div>
            <div style={s.itemName}>高圧洗浄 (トルネード)</div>
            <div style={s.itemSub}>150m² x @200</div>
          </div>
          <div>
            <div style={s.itemPrice}>¥ 30,000</div>
            <div style={s.itemCost}>原価 ¥5,000</div>
          </div>
        </div>

        <div style={{...s.itemCard, background: '#fffbeb', border: '1px solid #fcd34d'}}>
          <div>
            <div style={s.itemName}>外壁塗装 ({plan === 'take' ? '日本ペイント' : plan === 'matsu' ? 'KFケミカル' : 'SK化研'})</div>
            <div style={s.itemSub}>{plan === 'take' ? 'パーフェクトトップ 3回塗' : plan === 'matsu' ? 'セミフロンスーパー' : 'セラミクリーン'}</div>
          </div>
          <div>
            <div style={s.itemPrice}>¥ {plan === 'take' ? '850,000' : plan === 'matsu' ? '1,200,000' : '650,000'}</div>
            <div style={s.itemCost}>原価 ¥450,000</div>
          </div>
        </div>
      </div>

      {/* AI提案 */}
      <div style={s.aiBox}>
        <div style={s.aiText}>🤖 AI提案: 雨樋交換 (築15年推奨)</div>
        <button style={s.addBtn}>＋ 追加</button>
      </div>

      {/* アクションボタン */}
      <div style={s.actionRow}>
        <button style={s.pdfBtn}>📄 PDF確認</button>
        <button style={s.lineBtn}>📲 LINEで送る</button>
      </div>

    </div>
  );
};