import React from 'react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { Wallet } from 'lucide-react';

interface PrintHeaderProps {
  title: string;
}

export function PrintHeader({ title }: PrintHeaderProps) {
  const [settings] = useLocalStorage('siteSettings', {
    title: 'Gelir Gider Takip',
    logo: ''
  });

  return (
    <div className="flex justify-between items-start mb-8 print:mb-12 print-avoid-break border-b border-gray-200 dark:border-gray-700 pb-6">
      <div className="flex items-center space-x-4">
        {settings.logo ? (
          <img src={settings.logo} alt="Logo" className="h-16 w-auto print:h-20" />
        ) : (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl print:bg-transparent">
            <Wallet className="h-10 w-10 text-blue-600 dark:text-blue-400 print:text-blue-800" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white print:text-black">
            {settings.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 print:text-gray-700 mt-1">
            {title}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600 dark:text-gray-400 print:text-gray-700">
          Tarih
        </p>
        <p className="font-medium text-gray-900 dark:text-white print:text-black">
          {new Date().toLocaleDateString('tr-TR')}
        </p>
      </div>
    </div>
  );
}