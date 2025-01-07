import React from 'react';
import { Plus } from 'lucide-react';
import { StoneDetail } from '../../../../types/order';
import { StoneDetailRow } from './stone/StoneDetailRow';
import { StoneTotalsSummary } from './stone/StoneTotalsSummary';

interface StoneDetailsSectionProps {
  details: StoneDetail[];
  onChange: (details: StoneDetail[]) => void;
  productCount: number;
}

export function StoneDetailsSection({ details, onChange, productCount }: StoneDetailsSectionProps) {
  const handleAdd = () => {
    onChange([
      ...details,
      { id: Date.now(), tasCinsi: 'dmc', boyut: '', renk: '', adet: '' }
    ]);
  };

  const handleDelete = (id: number) => {
    onChange(details.filter(d => d.id !== id));
  };

  const handleUpdate = (index: number, field: string, value: string) => {
    const newDetails = [...details];
    newDetails[index] = { ...newDetails[index], [field]: value };
    onChange(newDetails);
  };

  return (
    <div className="bg-gray-50 dark:bg-neutral-800/50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
          Taş Detayları
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium 
                   rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={14} className="mr-1.5" />
          Taş Ekle
        </button>
      </div>

      <div className="space-y-3">
        {details.map((detail, index) => (
          <StoneDetailRow
            key={detail.id}
            detail={detail}
            index={index}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            productCount={productCount}
          />
        ))}

        {details.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
            Henüz taş detayı eklenmemiş
          </div>
        )}
      </div>

      {details.length > 0 && productCount > 0 && (
        <div className="mt-4">
          <StoneTotalsSummary 
            stones={details} 
            productCount={productCount}
          />
        </div>
      )}
    </div>
  );
}