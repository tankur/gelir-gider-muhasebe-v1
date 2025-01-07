// Fixed sizes for DMC and Duble stones
export const FIXED_STONE_SIZES = {
  'SS6': 144,
  'SS10': 144,
  'SS16': 144,
  'SS20': 144,
  'SS30': 144
} as const;

// Package sizes for different stone types
export const STONE_PACKAGE_SIZES = {
  'SS6': 1000,  // 1 paket = 1000 gros
  'SS10': 500,  // 1 paket = 500 gros
  'SS16': 200,  // 1 paket = 200 gros
  'SS20': 100,  // 1 paket = 100 gros
  'SS30': 50    // 1 paket = 50 gros
} as const;

// 1 gros = 144 adet
const GROSS_TO_PIECE = 144;

interface StoneCalculation {
  totalPieces: number;     // Toplam taş adedi
  grossAmount: number;     // Gros miktarı
  packageCount: number;    // Tam paket sayısı
  remainingGross: number;  // Kalan gros miktarı
}

export function calculateStoneNeeds(
  stoneSize: keyof typeof STONE_PACKAGE_SIZES | string,
  quantity: number,
  productCount: number
): StoneCalculation {
  // Get package size based on stone size
  const packageSize = STONE_PACKAGE_SIZES[stoneSize as keyof typeof STONE_PACKAGE_SIZES] || 100;
  
  // Calculate total pieces needed
  const totalPieces = quantity * productCount;
  
  // Calculate gross amount (round up)
  const grossAmount = Math.ceil(totalPieces / GROSS_TO_PIECE);
  
  // Calculate packages and remaining gross
  const packageCount = Math.floor(grossAmount / packageSize);
  const remainingGross = grossAmount % packageSize;

  return {
    totalPieces,
    grossAmount,
    packageCount,
    remainingGross
  };
}

export function formatStoneCalculation(calculation: StoneCalculation): string {
  const parts = [];
  
  if (calculation.packageCount > 0) {
    parts.push(`${calculation.packageCount} paket`);
  }
  
  if (calculation.remainingGross > 0) {
    parts.push(`${calculation.remainingGross} gros`);
  }
  
  return parts.join(' + ') || '0';
}