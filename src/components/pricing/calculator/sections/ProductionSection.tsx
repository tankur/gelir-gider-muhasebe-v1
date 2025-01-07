import React from 'react';
import { Settings } from 'lucide-react';

interface ProductionSectionProps {
  formData: any;
  onChange: (data: any) => void;
}

export function ProductionSection({ formData, onChange }: ProductionSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Settings className="w-5 h-5 text-gray-400" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Üretim Detayları</h3>
      </div>
    </div>
  );
}