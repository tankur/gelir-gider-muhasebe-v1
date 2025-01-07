// Fixed sizes for each stone type
export const STONE_TYPE_SIZES = {
  dmc: ['SS6', 'SS10', 'SS16', 'SS20', 'SS30'],
  duble: ['SS6', 'SS10', 'SS16', 'SS20', 'SS30'],
  spaciel: ['3mm', '4mm', '5mm', '6mm', '8mm', '10mm', '12mm', '14mm'],
  konik: [] // Empty array for manual management
} as const;

// Package sizes (pieces per package)
export const PACKAGE_SIZES = {
  // DMC and Duble sizes
  'SS6': 1000,
  'SS10': 500,
  'SS16': 200,
  'SS20': 100,
  'SS30': 50,
  // Spaciel sizes
  '3mm': 2000,
  '4mm': 1500,
  '5mm': 1000,
  '6mm': 800,
  '8mm': 500,
  '10mm': 300,
  '12mm': 200,
  '14mm': 100
} as const;

// Pieces per package for each size
export const PIECES_PER_PACKAGE = {
  // DMC and Duble use gross (144 pieces)
  'SS6': 144,
  'SS10': 144,
  'SS16': 144,
  'SS20': 144,
  'SS30': 144,
  // Spaciel and Konik use direct piece counts
  '3mm': 1,
  '4mm': 1,
  '5mm': 1,
  '6mm': 1,
  '8mm': 1,
  '10mm': 1,
  '12mm': 1,
  '14mm': 1
} as const;