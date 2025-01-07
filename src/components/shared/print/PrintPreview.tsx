import React from 'react';
import { PrintHeader } from './components/PrintHeader';
import { PrintContent } from './components/PrintContent';
import { PrintActions } from './components/PrintActions';

interface PrintPreviewProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onPrint: () => void;
}

export function PrintPreview({ title, children, onClose, onPrint }: PrintPreviewProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-1/2 min-w-[600px] max-w-[800px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <PrintActions title={title} onClose={onClose} onPrint={onPrint} />
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="p-8 print:p-0">
            <PrintHeader title={title} />
            <PrintContent>
              {children}
            </PrintContent>
          </div>
        </div>
      </div>
    </div>
  );
}