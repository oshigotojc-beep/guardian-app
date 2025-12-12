// src/screens/DashboardScreen.js
import React, { useMemo } from 'react';
import { Card } from '../components/Card';
import { calculateSalary } from '../logic/PayrollSystem';
import { employees, currentWorkData } from '../data/EmployeeData';

export const DashboardScreen = ({ onChangeScreen }) => {
  const totalPayroll = useMemo(() => {
    let totalGross = 0;
    let totalNet = 0;
    employees.forEach(emp => {
      const work = currentWorkData[emp.id];
      const result = calculateSalary(emp, work);
      totalGross += result.grossPay;
      totalNet += result.netPay;
    });
    return { totalGross, totalNet };
  }, []);

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      
      {/* 給与モニター */}
      <div style={{ marginBottom: '20px', padding: '20px', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', borderRadius: '16px', color: 'white', boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)' }}>
        <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '5px' }}>💰 今月の給与支給予測 (リアルタイム)</div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'Arial' }}>¥ {totalPayroll.totalGross.toLocaleString()}</div>
        <div style={{ fontSize: '11px', marginTop: '10px', background: 'rgba(255,255,255,0.2)', padding: '5px 10px', borderRadius: '8px', display: 'inline-block' }}>手取り計: ¥ {totalPayroll.totalNet.toLocaleString()}</div>
      </div>

      {/* FINANCE & STRATEGY */}
      <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '10px', letterSpacing: '1px' }}>FINANCE & LEGAL</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {/* ↓ 資金画面へリンク */}
        <Card title="資金・請求" value="¥ 2.85M" sub="調達可能額" badge="審査済" badgeColor="#f59e0b" onClick={() => onChangeScreen('finance')} />
        <Card title="自動経理ロボ" sub="レシート撮影" badge="稼働中" badgeColor="#10b981" onClick={() => onChangeScreen('accounting')} />
        <Card title="建設業許可" sub="更新期限管理" badge="あと118日" badgeColor="#ef4444" onClick={() => onChangeScreen('legal')} />
        {/* ↓ 税務画面へリンク */}
        <Card title="税務・申告" sub="決算対策" badge="AI分析" badgeColor="#3b82f6" onClick={() => onChangeScreen('tax')} />
      </div>

      {/* SITE OPERATIONS */}
      <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', margin: '20px 0 10px', letterSpacing: '1px' }}>SITE OPERATIONS</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <Card title="現場統括" sub="進捗管理" badge="遅れあり" badgeColor="#ef4444" onClick={() => onChangeScreen('site')} />
        <Card title="AI即積くん" sub="見積作成" badge="New" badgeColor="#f59e0b" onClick={() => onChangeScreen('estimate')} />
        <Card title="日報・打刻" sub="GPS連動" badge="未提出" badgeColor="#ef4444" onClick={() => onChangeScreen('report')} />
        <Card title="God's Eye" sub="現在位置: 5名" badge="Active" badgeColor="#10b981" onClick={() => onChangeScreen('godseye')} />
        <Card title="建材マーケット" sub="削減額: ¥42,500" badge="特価" badgeColor="#3b82f6" onClick={() => onChangeScreen('market')} />
      </div>

      {/* GROWTH & ORG */}
      <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', margin: '20px 0 10px', letterSpacing: '1px' }}>GROWTH & ORG</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <Card title="案件センター" sub="手数料ゼロ受注" badge="新着2" badgeColor="#ef4444" onClick={() => onChangeScreen('ojc')} />
        <Card title="顧客リスト" sub="名刺管理・CRM" badge="Auto" badgeColor="#10b981" onClick={() => onChangeScreen('crm')} />
        <Card title="給与・評価" sub="推移確認" badge="混合" badgeColor="#3b82f6" onClick={() => onChangeScreen('settings')} />
        <Card title="アカデミー" sub="動画で研修" badge="必修あり" badgeColor="#f59e0b" onClick={() => onChangeScreen('academy')} />
      </div>

    </div>
  );
};