import React, { useState, useEffect, useRef } from 'react';
import { Calculator as CalculatorIcon, X, Minus } from 'lucide-react';
import useSound from 'use-sound';

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5 });
  const [playResult] = useSound('/sounds/result.mp3', { volume: 0.5 });

  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hesap makinesini başlangıçta ortala
    if (calculatorRef.current) {
      const calcWidth = calculatorRef.current.offsetWidth;
      setPosition({
        x: (window.innerWidth - calcWidth) / 2,
        y: 80 // Header'ın altında
      });
    }

    // Klavye olaylarını dinle
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      if (/[\d\+\-\*\/\.\=]/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        e.preventDefault();
        if (key === 'Enter' || key === '=') {
          handleButtonClick('=');
        } else if (key === 'Escape') {
          handleButtonClick('C');
        } else if (key === 'Backspace') {
          handleButtonClick('⌫');
        } else {
          handleButtonClick(key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [expression]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && calculatorRef.current) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        const maxX = window.innerWidth - calculatorRef.current.offsetWidth;
        const maxY = window.innerHeight - calculatorRef.current.offsetHeight;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (calculatorRef.current) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleButtonClick = (value: string) => {
    playClick();
    
    if (value === '=') {
      try {
        const calculatedResult = eval(expression);
        setResult(calculatedResult.toString());
        setExpression(calculatedResult.toString());
        playResult();
      } catch (error) {
        setResult('Error');
        setExpression('');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('0');
    } else if (value === '⌫') {
      setExpression(prev => prev.slice(0, -1));
    } else {
      setExpression(prev => prev + value);
    }
  };

  const buttons = [
    ['C', '⌫', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  if (!isOpen) return null;

  return (
    <div
      ref={calculatorRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        height: isMinimized ? 'auto' : '400px'
      }}
      className="fixed z-50 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-all duration-300 backdrop-blur-md backdrop-filter border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div
        onMouseDown={handleMouseDown}
        className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-t-xl cursor-move flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <CalculatorIcon className="w-5 h-5 text-white" />
          <span className="text-sm font-medium text-white">
            Hesap Makinesi
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <Minus className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Display */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900">
            <div className="text-right">
              <div className="text-gray-500 dark:text-gray-400 text-sm h-6 font-mono">
                {expression || '\u00A0'}
              </div>
              <div className="text-3xl font-semibold text-gray-800 dark:text-gray-100 font-mono">
                {result}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="p-3 grid grid-cols-4 gap-2">
            {buttons.map((row, i) => (
              <React.Fragment key={i}>
                {row.map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleButtonClick(btn)}
                    className={`p-3 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-95 active:scale-90
                      ${btn === '=' ? 'col-span-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white' :
                        btn === 'C' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50' :
                        btn === '⌫' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' :
                        isNaN(Number(btn)) ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-600' :
                        'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                      }`}
                  >
                    {btn}
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}