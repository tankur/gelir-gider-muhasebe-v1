import React from 'react';

interface DashboardWidgetProps {
  children: React.ReactNode;
}

export function DashboardWidget({ children }: DashboardWidgetProps) {
  return (
    <div className="bg-white dark:bg-[#171717] rounded-lg border border-gray-200 dark:border-neutral-800 shadow-sm overflow-auto h-full">
      <div className="p-4 h-full">{children}</div>
    </div>
  );
}