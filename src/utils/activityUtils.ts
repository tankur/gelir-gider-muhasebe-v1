import { Activity } from '../types/activity';
import { 
  Receipt, 
  Building2, 
  ScrollText, 
  Box, 
  UserCog,
  CreditCard,
  Users,
  ClipboardCheck,
  Package,
  Settings
} from 'lucide-react';

interface ActivityIconConfig {
  lightIcon: typeof Receipt;
  darkIcon: typeof Receipt;
  label: string;
}

export function getActivityIcon(type: Activity['type']): ActivityIconConfig {
  switch (type) {
    case 'transaction':
      return { 
        lightIcon: Receipt,
        darkIcon: CreditCard,
        label: 'İşlem' 
      };
    case 'customer':
      return { 
        lightIcon: Building2,
        darkIcon: Users,
        label: 'Müşteri' 
      };
    case 'check':
      return { 
        lightIcon: ScrollText,
        darkIcon: ClipboardCheck,
        label: 'Çek' 
      };
    case 'order':
      return { 
        lightIcon: Box,
        darkIcon: Package,
        label: 'Sipariş' 
      };
    case 'user':
      return { 
        lightIcon: UserCog,
        darkIcon: Settings,
        label: 'Kullanıcı' 
      };
  }
}

export function getActivityColor(type: Activity['type']) {
  switch (type) {
    case 'transaction':
      return {
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-600 dark:text-blue-400'
      };
    case 'customer':
      return {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-600 dark:text-green-400'
      };
    case 'check':
      return {
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        textColor: 'text-purple-600 dark:text-purple-400'
      };
    case 'order':
      return {
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        textColor: 'text-orange-600 dark:text-orange-400'
      };
    case 'user':
      return {
        bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
        textColor: 'text-indigo-600 dark:text-indigo-400'
      };
  }
}