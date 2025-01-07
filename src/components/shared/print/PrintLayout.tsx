import React, { useEffect } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Wallet, Printer, X } from 'lucide-react';

interface PrintLayoutProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onPrint: () => void;
}

export function PrintLayout({ title, children, onClose, onPrint }: PrintLayoutProps) {
  const [settings] = useLocalStorage('siteSettings', {
    title: 'Gelir Gider Takip',
    logo: ''
  });

  useEffect(() => {
    const handleBeforePrint = () => {
      document.body.classList.add('print-content');
    };

    const handleAfterPrint = () => {
      document.body.classList.remove('print-content');
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-1/2 min-w-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 print:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
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

        {/* Print Content */}
        <div className="p-8 print:p-0">
          {/* Logo and Company Info */}
          <div className="flex justify-between items-start mb-8 print:mb-12 print-avoid-break">
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

          {/* Main Content */}
          <div className="space-y-8 print:space-y-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}