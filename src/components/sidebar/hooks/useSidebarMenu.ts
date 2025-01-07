import {
  Calculator,
  FileText,
  LayoutDashboard,
  DollarSign,
  Users,
  FileCheck,
  Package,
  UserCog,
  Settings,
  Clock
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export function useSidebarMenu() {
  const { currentUser } = useAuth();

  const menuItems = [
    // Priority menu items
    { path: '/price-calculator', icon: Calculator, label: 'Fiyat Çıkart' },
    { path: '/offers', icon: FileText, label: 'Teklif Ver', className: 'mb-4' },

    // Regular menu items
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transactions', icon: DollarSign, label: 'Gelir/Gider' },
    { path: '/customers', icon: Users, label: 'Müşteriler' },
    { path: '/orders', icon: Package, label: 'Siparişler' },
    { path: '/checks', icon: FileCheck, label: 'Çekler' },
    { path: '/activities', icon: Clock, label: 'Son İşlemler' }
  ];

  // Add admin-only menu items
  if (currentUser?.role === 'admin') {
    menuItems.push(
      { path: '/users', icon: UserCog, label: 'Kullanıcılar' }
    );
  }

  // Add settings as the last item
  menuItems.push(
    { path: '/settings', icon: Settings, label: 'Ayarlar' }
  );

  return menuItems;
}