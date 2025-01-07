import React from 'react';

interface CalculatorButtonsProps {
  onButtonClick: (value: string) => void;
}

export function CalculatorButtons({ onButtonClick }: CalculatorButtonsProps) {
  const buttons = [
    ['C', '⌫', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <div className="grid grid-cols-4 gap-[1px] p-[1px] bg-gray-200 dark:bg-gray-800 flex-1">
      {buttons.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((btn) => (
            <button
              key={btn}
              onClick={() => onButtonClick(btn)}
              className={`
                h-[64px] text-xl font-medium transition-all duration-200 
                hover:brightness-95 active:brightness-90
                ${btn === '=' ? 'col-span-2' : ''}
                ${
                  btn === 'C' || btn === '⌫' 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                    : btn === '/' || btn === '*' || btn === '-' || btn === '+' || btn === '=' 
                    ? 'bg-blue-500 dark:bg-blue-600 text-white' 
                    : btn === '%'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }
              `}
            >
              {btn}
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}