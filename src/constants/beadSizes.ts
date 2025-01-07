export const BEAD_SIZES = {
  inci: ['4mm', '5mm', '6mm', '8mm', '10mm'],
  beyoglu: ['SS25', 'SS30', 'SS35', '10mm', '12mm', '14mm', '16mm', '18mm']
} as const;

export const PIECES_PER_PACKAGE = {
  // İnci sizes
  '4mm': 24000,
  '5mm': 13000,
  '6mm': 8000,
  '8mm': 3500,
  '10mm': 1700,
  // Beyoğlu sizes
  'SS25': 10000,
  'SS30': 7500,
  'SS35': 5000,
  '10mm-beyoglu': 1000,
  '12mm': 800,
  '14mm': 600,
  '16mm': 400,
  '18mm': 200
} as const;