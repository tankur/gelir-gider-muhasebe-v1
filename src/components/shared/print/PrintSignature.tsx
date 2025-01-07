import React from 'react';

export function PrintSignature() {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6 print:mt-8">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 print:text-gray-600 mb-2">
            Teslim Alan
          </h3>
          <div className="h-20 border-b border-gray-300 dark:border-gray-600 print:border-gray-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600 mt-1">
            İmza / Kaşe
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 print:text-gray-600 mb-2">
            Teslim Eden
          </h3>
          <div className="h-20 border-b border-gray-300 dark:border-gray-600 print:border-gray-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600 mt-1">
            İmza / Kaşe
          </p>
        </div>
      </div>
    </div>
  );
}