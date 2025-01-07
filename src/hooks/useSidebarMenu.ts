import {
  LayoutDashboard,
  Calculator,
  FileText,
  DollarSign,
  Users,
  FileCheck,
  Package,
  UserCog,
  Settings,
  Clock,
  Wallet,
  Clock3,
  UserRound,
  Sliders
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export interface MenuItem {
  path: string;
  icon: any;
  label: string;
  className?: string;
  subMenu?: MenuItem[];
}

export function useSidebarMenu() {
  const { currentUser } = useAuth();

  const menuItems: MenuItem[] = [
    // Ana menü öğeleri
    { 
      path: '/dashboard', 
      icon: LayoutDashboard, 
      label: 'Ana Sayfa',
      className: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    { 
      path: '/customers', 
      icon: Users, 
      label: 'Müşteriler',
      className: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
    },
    { 
      path: '/orders', 
      icon: Package, 
      label: 'Siparişler',
      className: 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
    },
    
    // Fiyatlandırma ve Teklifler
    {
      path: '/pricing',
      icon: Calculator,
      label: 'Fiyatlandırma',
      className: 'hover:bg-green-50 dark:hover:bg-green-900/20',
      subMenu: [
        { path: '/price-calculator', icon: Calculator, label: 'Fiyat Çıkart' },
        { path: '/offers', icon: FileText, label: 'Teklif Ver' },
        { path: '/settings/prices', icon: Sliders, label: 'Fiyat Ayarları' }
      ]
    },
    
    // Muhasebe alt menüsü
    {
      path: '/accounting',
      icon: Wallet,
      label: 'Muhasebe',
      className: 'hover:bg-orange-50 dark:hover:bg-orange-900/20',
      subMenu: [
        { path: '/transactions', icon: DollarSign, label: 'Gelir/Gider' },
        { path: '/checks', icon: FileCheck, label: 'Çekler' },
        { 
          path: '/salary',
          icon: Clock3,
          label: 'Maaş',
          subMenu: [
            { path: '/salary/employees', icon: UserRound, label: 'Elemanlar' },
            { path: '/salary/payroll', icon: DollarSign, label: 'Maaşlar' },
            { path: '/salary/overtime', icon: Clock, label: 'Mesailer' }
          ]
        }
      ]
    },

    { 
      path: '/activities', 
      icon: Clock, 
      label: 'Son İşlemler',
      className: 'hover:bg-rose-50 dark:hover:bg-rose-900/20'
    }
  ];

  // Admin-only menü öğeleri
  if (currentUser?.role === 'admin') {
    menuItems.push(
      { 
        path: '/users', 
        icon: UserCog, 
        label: 'Kullanıcılar',
        className: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20'
      }
    );
  }

  // Ayarlar en sonda
  menuItems.push(
    { 
      path: '/settings', 
      icon: Settings, 
      label: 'Ayarlar',
      className: 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
    }
  );

  return menuItems;
}