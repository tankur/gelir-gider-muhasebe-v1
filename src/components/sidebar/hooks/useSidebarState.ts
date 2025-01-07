import { useState } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useLocalStorage('sidebar-collapsed', false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return {
    isCollapsed,
    isMobileOpen,
    setIsCollapsed,
    setIsMobileOpen
  };
}