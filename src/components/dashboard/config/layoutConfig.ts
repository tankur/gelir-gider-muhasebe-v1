export const BREAKPOINTS = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0
};

export const COLS = {
  lg: 12,
  md: 10,
  sm: 6,
  xs: 4,
  xxs: 2
};

export const DEFAULT_LAYOUTS = {
  lg: [
    { i: 'transaction-chart', x: 0, y: 0, w: 8, h: 4 },
    { i: 'recent-activities', x: 8, y: 0, w: 4, h: 4 },
    { i: 'recent-orders', x: 0, y: 4, w: 12, h: 4 }
  ],
  md: [
    { i: 'transaction-chart', x: 0, y: 0, w: 6, h: 4 },
    { i: 'recent-activities', x: 6, y: 0, w: 4, h: 4 },
    { i: 'recent-orders', x: 0, y: 4, w: 10, h: 4 }
  ],
  sm: [
    { i: 'transaction-chart', x: 0, y: 0, w: 6, h: 4 },
    { i: 'recent-activities', x: 0, y: 4, w: 6, h: 4 },
    { i: 'recent-orders', x: 0, y: 8, w: 6, h: 4 }
  ],
  xs: [
    { i: 'transaction-chart', x: 0, y: 0, w: 4, h: 4 },
    { i: 'recent-activities', x: 0, y: 4, w: 4, h: 4 },
    { i: 'recent-orders', x: 0, y: 8, w: 4, h: 4 }
  ],
  xxs: [
    { i: 'transaction-chart', x: 0, y: 0, w: 2, h: 4 },
    { i: 'recent-activities', x: 0, y: 4, w: 2, h: 4 },
    { i: 'recent-orders', x: 0, y: 8, w: 2, h: 4 }
  ]
};