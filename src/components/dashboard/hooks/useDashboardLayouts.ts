import { useLocalStorage } from '../../../hooks/useLocalStorage';

const DEFAULT_LAYOUTS = {
  lg: [
    { i: 'financial-stats', x: 0, y: 0, w: 12, h: 2 },
    { i: 'business-stats', x: 0, y: 2, w: 12, h: 2 },
    { i: 'recent-activities', x: 0, y: 4, w: 8, h: 4 },
    { i: 'transaction-chart', x: 8, y: 4, w: 4, h: 4 }
  ],
  md: [
    { i: 'financial-stats', x: 0, y: 0, w: 10, h: 2 },
    { i: 'business-stats', x: 0, y: 2, w: 10, h: 2 },
    { i: 'recent-activities', x: 0, y: 4, w: 6, h: 4 },
    { i: 'transaction-chart', x: 6, y: 4, w: 4, h: 4 }
  ],
  sm: [
    { i: 'financial-stats', x: 0, y: 0, w: 6, h: 2 },
    { i: 'business-stats', x: 0, y: 2, w: 6, h: 2 },
    { i: 'recent-activities', x: 0, y: 4, w: 6, h: 4 },
    { i: 'transaction-chart', x: 0, y: 8, w: 6, h: 4 }
  ]
};

export function useDashboardLayouts() {
  const [layouts, setLayouts] = useLocalStorage('dashboard-layouts', DEFAULT_LAYOUTS);

  const resetLayout = () => {
    setLayouts(DEFAULT_LAYOUTS);
  };

  return { layouts, setLayouts, resetLayout };
}