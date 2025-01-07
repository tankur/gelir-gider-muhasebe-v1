import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_LAYOUTS } from '../components/dashboard/config/layoutConfig';

export function useDashboardLayouts() {
  const [layouts, setLayouts] = useLocalStorage('dashboard-layouts', DEFAULT_LAYOUTS);

  const resetLayout = () => {
    setLayouts(DEFAULT_LAYOUTS);
  };

  return { layouts, setLayouts, resetLayout };
}