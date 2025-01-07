import { useEffect } from 'react';

export function useCalculatorKeyboard(handleButtonClick: (value: string) => void) {
  useEffect(() => {
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
  }, [handleButtonClick]);
}