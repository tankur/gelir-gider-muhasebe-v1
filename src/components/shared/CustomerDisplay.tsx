import React from 'react';

interface CustomerDisplayProps {
  companyName?: string;
  customerName: string;
}

export function CustomerDisplay({ companyName, customerName }: CustomerDisplayProps) {
  return (
    <div>
      {companyName && (
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {companyName}
        </div>
      )}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {customerName}
      </div>
    </div>
  );
}