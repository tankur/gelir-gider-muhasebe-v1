export interface BeadPrice {
  id: number;
  type: 'inci' | 'beyoglu';
  size: string;
  color: string;
  price: number;
  currency: 'TRY' | 'USD';
  unit: 'kg';
  piecesPerKg: number; // Added field for pieces per kg
}

// Rest of the types remain the same...