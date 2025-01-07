import { BeadType } from '../types/order';

// Package quantities for different bead sizes
export const BEAD_PACKAGE_SIZES = {
  // İnci package sizes
  '4mm': 24000,
  '5mm': 13000,
  '6mm': 8000,
  '8mm': 3500,
  '10mm': 1700,
  // Beyoğlu package sizes
  'SS25': 10000,
  'SS35': 5000,
  '10mm-beyoglu': 1000,
  '12mm': 1000,
  '15mm': 1000
} as const;

export interface BeadCalculation {
  totalPieces: number;
  packageCount: number;
  remainingPieces: number;
  packageSize: number;
}

export function calculateBeadNeeds(
  size: keyof typeof BEAD_PACKAGE_SIZES | string,
  quantity: number,
  productCount: number
): BeadCalculation {
  // For Beyoğlu 10mm, use the specific key
  const sizeKey = size === '10mm' ? '10mm-beyoglu' : size;
  const packageSize = BEAD_PACKAGE_SIZES[sizeKey as keyof typeof BEAD_PACKAGE_SIZES] || 0;
  
  const totalPieces = quantity * productCount;
  const packageCount = Math.floor(totalPieces / packageSize);
  const remainingPieces = totalPieces % packageSize;

  return {
    totalPieces,
    packageCount,
    remainingPieces,
    packageSize
  };
}

export const BEAD_SIZES = {
  inci: [
    { value: '4mm', label: '4mm (24,000 adet/paket)' },
    { value: '5mm', label: '5mm (13,000 adet/paket)' },
    { value: '6mm', label: '6mm (8,000 adet/paket)' },
    { value: '8mm', label: '8mm (3,500 adet/paket)' },
    { value: '10mm', label: '10mm (1,700 adet/paket)' }
  ],
  beyoglu: [
    { value: 'SS25', label: 'SS25 (10,000 adet/paket)' },
    { value: 'SS35', label: 'SS35 (5,000 adet/paket)' },
    { value: '10mm', label: '10mm (1,000 adet/paket)' },
    { value: '12mm', label: '12mm (1,000 adet/paket)' },
    { value: '15mm', label: '15mm (1,000 adet/paket)' }
  ]
};