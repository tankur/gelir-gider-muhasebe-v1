import { StonePrice } from '../types/pricing';

const STONE_SIZES = ['SS6', 'SS10', 'SS16', 'SS20', 'SS30'];
const STONE_TYPES = ['dmc', 'duble'];

export function generateInitialStones(colors: string[]): StonePrice[] {
  const stones: StonePrice[] = [];
  let id = 1;

  for (const type of STONE_TYPES) {
    for (const color of colors) {
      for (const size of STONE_SIZES) {
        stones.push({
          id: id++,
          name: `${color} ${size}`,
          type: type as 'dmc' | 'duble',
          size,
          color,
          unit: '144 adet (1 Gros)',
          price: 1,
          currency: 'USD'
        });
      }
    }
  }

  return stones;
}