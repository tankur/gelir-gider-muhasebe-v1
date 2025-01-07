import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_STONE_COLORS } from '../constants/stoneColors';

export function useStoneColors() {
  const [colors, setColors] = useLocalStorage<string[]>('stone-colors', DEFAULT_STONE_COLORS);

  const addColor = (color: string) => {
    if (!colors.includes(color)) {
      setColors([...colors, color].sort());
    }
  };

  const removeColor = (color: string) => {
    setColors(colors.filter(c => c !== color));
  };

  const updateColor = (oldColor: string, newColor: string) => {
    if (!colors.includes(newColor)) {
      setColors(colors.map(c => c === oldColor ? newColor : c).sort());
    }
  };

  return {
    colors,
    addColor,
    removeColor,
    updateColor
  };
}