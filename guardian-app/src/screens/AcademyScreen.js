// src/screens/AcademyScreen.js
import React from 'react';

export const AcademyScreen = () => {
  const s = {
    container: { padding: '20px', paddingBottom: '100px', background: '#0f172a', minHeight: '100vh', color: 'white' },
    header: { fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    
    // ヒーロー動画 (今週の必修)
    heroBox: { marginBottom: '30px' },
    videoFrame: { 
      width: '100%', aspectRatio: '16/9', background: '#334155', borderRadius: '16px', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px',
      position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    },
    playBtn: { width: '60px', height: '60px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(5px)', cursor: 'pointer' },
    tag: { position: 'absolute', top: '10px', left: '10px', background: '#ef4444', color: 'white', fontSize: '10px', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' },
    heroTitle: { fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' },
    heroDesc: { fontSize: '12px', color: '#94a3b8' },

    // 進捗エリア
    progressBox: { background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px', marginBottom: '30px' },
    progTitle: { fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' },
    barBg: { height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' },
    barVal: { width: '65%', height: '100%', background: '#f59e0b' },

    // カテゴリリスト
    sectionTitle: { fontSize: '14px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '15px', borderLeft: '4px solid #f59e0b', paddingLeft: '10px' },
    videoList: { display: 'flex', flexDirection: 'column', gap: '15px' },
    videoCard: { display: 'flex', gap: '15px', alignItems: 'center', cursor: 'pointer' },
    thumb: { width: '120px', height: '68px', background: '#475569', borderRadius: '8px', position: 'relative', flexShrink: 0 },
    timeBadge: { position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.8)', fontSize: '9px', padding: '2px 4px', borderRadius: '4px' },
    info: { flex: 1 },
    vTitle: { fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', lineHeight: '1.4' },
    vMeta: { fontSize: '10px', color: '#94a3b8' },
    check: { color: '#10b981', fontSize: '12px', marginLeft: 'auto' }
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>🎓 ガーディアン・アカデミー</div>
      </div>

      {/* 今週の必修動画 */}
      <div style={s.heroBox}>
        <div style={s.videoFrame} onClick={() => alert("動画を再生します")}>
          <div style={s.tag}>今週の必修</div>
          <div style={s.playBtn}>▶</div>
        </div>
        <div style={s.heroTitle}>CEOメッセージ: 我々の目指す未来</div>
        <div style={s.heroDesc}>
          なぜ我々は「建設DX」に挑むのか？ 10年後のビジョンを共有します。<br/>
          (視聴期限: 今週末まで)
        </div>
      </div>

      {/* 学習ステータス */}
      <div style={s.progressBox}>
        <div style={s.progTitle}>
          <span>今月のカリキュラム進捗</span>
          <span>65%</span>
        </div>
        <div style={s.barBg}>
          <div style={s.barVal}></div>
        </div>
        <div style={{fontSize:'10px', marginTop:'8px', color:'#94a3b8'}}>
          あと3本の動画で「ランクB」に昇格できます。
        </div>
      </div>

      {/* 動画リスト: 技術 */}
      <div style={s.sectionTitle}>🎨 塗装技術・現場ノウハウ</div>
      <div style={s.videoList}>
        <div style={s.videoCard}>
          <div style={s.thumb}>
            <div style={s.timeBadge}>12:40</div>
          </div>
          <div style={s.info}>
            <div style={s.vTitle}>【新人向け】刷毛（ハケ）の正しい持ち方と洗い方</div>
            <div style={s.vMeta}>講師: 田中職長 • 350回視聴</div>
          </div>
          <div style={s.check}>✔ 済</div>
        </div>

        <div style={s.videoCard}>
          <div style={s.thumb}>
            <div style={s.timeBadge}>08:15</div>
          </div>
          <div style={s.info}>
            <div style={s.vTitle}>養生（マスキング）を10倍速くするプロの技</div>
            <div style={s.vMeta}>講師: 鈴木 • 120回視聴</div>
          </div>
        </div>
      </div>

      <br/>

      {/* 動画リスト: 安全・マナー */}
      <div style={s.sectionTitle}>⛑️ 安全衛生・マナー</div>
      <div style={s.videoList}>
        <div style={s.videoCard}>
          <div style={s.thumb}>
            <div style={s.timeBadge}>05:00</div>
          </div>
          <div style={s.info}>
            <div style={s.vTitle}>お客様に信頼される「朝の挨拶」徹底マニュアル</div>
            <div style={s.vMeta}>必修 • 未視聴</div>
          </div>
        </div>
      </div>

    </div>
  );
};