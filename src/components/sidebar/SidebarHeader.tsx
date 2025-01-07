import React from 'react';
import { Menu, X } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onMenuToggle: () => void;
  isMobileView?: boolean;
}

export function SidebarHeader({ isCollapsed, onMenuToggle, isMobileView }: SidebarHeaderProps) {
  const [settings] = useLocalStorage('siteSettings', {
    title: 'Gelir Gider Takip',
    logo: ''
  });

  return (
    <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      {!isCollapsed && (
        <div className="flex items-center space-x-2">
          {settings.logo ? (
            <img src={settings.logo} alt={settings.title} className="h-8 w-auto" />
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.375" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-red-600"
            >
              <path d="M6 3h12l4 6-10 13L2 9Z"/>
              <path d="M11 3 8 9l4 13 4-13-3-6"/>
              <path d="M2 9h20"/>
            </svg>
          )}
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">{settings.title}</h1>
        </div>
      )}
      <button
        onClick={onMenuToggle}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        {isMobileView ? (
          <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        ) : (
          <Menu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        )}
      </button>
    </div>
  );
}