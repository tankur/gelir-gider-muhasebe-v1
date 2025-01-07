import React from 'react';
import { Calculator as CalculatorIcon, X, Minus } from 'lucide-react';

interface CalculatorHeaderProps {
  onMouseDown: (e: React.MouseEvent) => void;
  isMinimized: boolean;
  onMinimize: () => void;
}

export function CalculatorHeader({ onMouseDown, isMinimized, onMinimize }: CalculatorHeaderProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="p-3 bg-gray-100 dark:bg-gray-800 rounded-t-2xl cursor-move flex items-center justify-between
                 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg">
          <CalculatorIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hesap Makinesi
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <button
          onClick={onMinimize}
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors group"
        >
          <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
        </button>
        <button
          onClick={() => window.dispatchEvent(new Event('closeCalculator'))}
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors group"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
        </button>
      </div>
    </div>
  );
}