import React from 'react';
import { FinancialStatsSection } from './dashboard/sections/FinancialStatsSection';
import { MainContentSection } from './dashboard/sections/MainContentSection';
import { TransactionChartSection } from './dashboard/sections/TransactionChartSection';

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Gelir/Gider İstatistikleri */}
      <FinancialStatsSection />

      {/* Ana İçerik - Son İşlemler ve Siparişler */}
      <MainContentSection />

      {/* Gelir/Gider Grafiği */}
      <TransactionChartSection />
    </div>
  );
}