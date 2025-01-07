import React from 'react';

interface CalculatorDisplayProps {
  expression: string;
  result: string;
}

export function CalculatorDisplay({ expression, result }: CalculatorDisplayProps) {
  return (
    <div className="p-4 flex flex-col items-end justify-end h-[120px] text-right bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="text-gray-600 dark:text-gray-400 text-xl h-8 font-light mb-2">
        {expression || '\u00A0'}
      </div>
      <div className="text-gray-900 dark:text-white text-4xl font-light tracking-wider">
        {result}
      </div>
    </div>
  );
}