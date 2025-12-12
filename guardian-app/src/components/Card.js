// src/components/Card.js
import React from 'react';

// 共通のカードデザイン
export const Card = ({ title, value, sub, badge, badgeColor, onClick }) => {
  const s = {
    card: {
      background: '#fff', padding: '16px', borderRadius: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9',
      display: 'flex', flexDirection: 'column', gap: '5px', cursor: 'pointer',
      marginBottom: '10px'
    },
    titleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: '13px', fontWeight: 'bold' },
    value: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginTop: '5px' },
    sub: { fontSize: '10px', color: '#64748b' },
    badge: { fontSize: '9px', padding: '2px 6px', borderRadius: '4px', background: badgeColor || '#e2e8f0', color: '#fff', fontWeight: 'bold' }
  };

  return (
    <div style={s.card} onClick={onClick}>
      <div style={s.titleRow}>
        <div style={s.title}>{title}</div>
        {badge && <div style={s.badge}>{badge}</div>}
      </div>
      {value && <div style={s.value}>{value}</div>}
      <div style={s.sub}>{sub}</div>
    </div>
  );
};