import React, { useState, useEffect } from 'react';
import { useCalculatorPosition } from './hooks/useCalculatorPosition';
import { useCalculatorKeyboard } from './hooks/useCalculatorKeyboard';
import { CalculatorHeader } from './components/CalculatorHeader';
import { CalculatorDisplay } from './components/CalculatorDisplay';
import { CalculatorButtons } from './components/CalculatorButtons';
import { useCalculator } from './hooks/useCalculator';

export default function Calculator() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { expression, result, handleButtonClick } = useCalculator();
  const { position, calculatorRef, handleMouseDown } = useCalculatorPosition();

  useCalculatorKeyboard(handleButtonClick);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      ref={calculatorRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        height: isMinimized ? 'auto' : '480px'
      }}
      className={`fixed z-50 w-[320px] bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-2xl 
                 border border-gray-200 dark:border-gray-800
                 transition-all duration-300 backdrop-blur-lg backdrop-filter 
                 hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20
                 flex flex-col overflow-hidden
                 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
    >
      <CalculatorHeader
        onMouseDown={handleMouseDown}
        isMinimized={isMinimized}
        onMinimize={() => setIsMinimized(!isMinimized)}
      />

      {!isMinimized && (
        <>
          <CalculatorDisplay expression={expression} result={result} />
          <CalculatorButtons onButtonClick={handleButtonClick} />
        </>
      )}
    </div>
  );
}