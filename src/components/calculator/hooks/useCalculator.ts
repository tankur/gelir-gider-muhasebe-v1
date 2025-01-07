import { useState } from 'react';
import useSound from 'use-sound';

export function useCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5 });
  const [playResult] = useSound('/sounds/result.mp3', { volume: 0.5 });

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

  return { expression, result, handleButtonClick };
}