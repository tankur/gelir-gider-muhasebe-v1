import React from 'react';
import { DollarSign } from 'lucide-react';

interface ProfitSectionProps {
  formData: any;
  onChange: (data: any) => void;
}

export function ProfitSection({ formData, onChange }: ProfitSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <DollarSign className="w-5 h-5 text-gray-400" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Kar Oranı
        </h3>
      </div>

      <div className="relative">
        <input
          type="number"
          value={formData.karOrani || 30}
          onChange={e => onChange({ ...formData, karOrani: e.target.value })}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-[#171717] border border-gray-300 dark:border-neutral-800 rounded-lg pr-12"
          min="0"
          max="100"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500">%</span>
        </div>
      </div>
    </div>
  );
}