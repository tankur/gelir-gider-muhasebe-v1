import React from 'react';
import { Check } from '../../../types/check';
import { PrintLayout } from '../../shared/print/PrintLayout';
import { PrintSection } from '../../shared/print/PrintSection';
import { PrintSignature } from '../../shared/print/PrintSignature';
import { formatCurrency } from '../../../utils/format';
import { calculateDaysRemaining, formatDaysRemaining } from '../../../utils/date';

interface CheckPrintProps {
  check: Check;
  onClose: () => void;
}

export function CheckPrint({ check, onClose }: CheckPrintProps) {
  const handlePrint = () => {
    window.print();
  };

  const daysRemaining = calculateDaysRemaining(check.dueDate);

  return (
    <PrintLayout 
      title={`Çek #${check.id}`}
      onClose={onClose}
      onPrint={handlePrint}
    >
      {/* Müşteri Bilgileri */}
      <PrintSection title="Müşteri Bilgileri">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{check.customerName}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 dark:text-gray-400">Vade Tarihi</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {new Date(check.dueDate).toLocaleDateString('tr-TR')}
            </p>
            <p className={`text-sm ${
              daysRemaining < 0 ? 'text-red-600' :
              daysRemaining <= 7 ? 'text-yellow-600' :
              'text-gray-500'
            }`}>
              {formatDaysRemaining(daysRemaining)}
            </p>
          </div>
        </div>
      </PrintSection>

      {/* Çek Detayları */}
      <PrintSection title="Çek Detayları">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Durum</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {check.status === 'pending' ? 'Beklemede' :
                 check.status === 'completed' ? 'Tamamlandı' :
                 'İptal Edildi'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tutar</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(check.amount)}
              </p>
            </div>
          </div>

          {check.notes && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Notlar</p>
              <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-line">
                {check.notes}
              </p>
            </div>
          )}
        </div>
      </PrintSection>

      {/* İmza Alanı */}
      <PrintSignature />
    </PrintLayout>
  );
}