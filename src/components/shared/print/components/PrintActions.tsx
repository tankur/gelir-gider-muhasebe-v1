import React from 'react';
import { Printer, X } from 'lucide-react';

interface PrintActionsProps {
  title: string;
  onClose: () => void;
  onPrint: () => void;
}

export function PrintActions({ title, onClose, onPrint }: PrintActionsProps) {
  return (
    <div className="sticky top-0 z-10 px-6 py-4 border-b border-gray-200 dark:border-gray-700 print:hidden bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Önizleme: {title}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrint}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2" />
            Yazdır
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}