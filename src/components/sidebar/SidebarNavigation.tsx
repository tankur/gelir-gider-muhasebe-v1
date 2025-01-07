import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSidebarMenu } from '../../hooks/useSidebarMenu';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarNavigationProps {
  isCollapsed: boolean;
  onMobileItemClick?: () => void;
}

export function SidebarNavigation({ isCollapsed, onMobileItemClick }: SidebarNavigationProps) {
  const menuItems = useSidebarMenu();
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubMenu = (path: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasSubMenu = item.subMenu && item.subMenu.length > 0;
    const isExpanded = expandedMenus[item.path];
    const paddingLeft = level > 0 ? `pl-${(level + 2) * 2}` : '';

    const menuItemContent = (
      <div
        className={`flex items-center ${hasSubMenu ? 'justify-between' : ''} w-full`}
        onClick={() => hasSubMenu && toggleSubMenu(item.path)}
      >
        <div className="flex items-center">
          <item.icon className="w-5 h-5 min-w-[1.25rem]" />
          {!isCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
        </div>
        {hasSubMenu && !isCollapsed && (
          isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
      </div>
    );

    const baseClasses = "transition-all duration-200 ease-in-out";
    const defaultClasses = "text-gray-700 dark:text-gray-300";
    const activeClasses = "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
    const hoverClasses = item.className || "hover:bg-gray-50 dark:hover:bg-gray-800/50";

    return (
      <div key={item.path} className="relative">
        {hasSubMenu ? (
          <>
            <div
              className={`flex items-center px-4 py-2.5 ${defaultClasses} ${hoverClasses} cursor-pointer ${baseClasses} ${
                isExpanded ? activeClasses : ''
              } ${paddingLeft}`}
            >
              {menuItemContent}
            </div>
            {!isCollapsed && isExpanded && item.subMenu && (
              <div className="ml-4 border-l border-gray-200 dark:border-gray-700">
                {item.subMenu.map(subItem => renderMenuItem(subItem, level + 1))}
              </div>
            )}
          </>
        ) : (
          <NavLink
            to={item.path}
            onClick={onMobileItemClick}
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 ${paddingLeft} ${baseClasses} ${defaultClasses} ${
                isActive ? activeClasses : hoverClasses
              }`
            }
            title={isCollapsed ? item.label : undefined}
          >
            {menuItemContent}
          </NavLink>
        )}
      </div>
    );
  };

  return (
    <nav className="flex-1 overflow-y-auto py-4 sidebar-menu">
      <div className="space-y-1">
        {menuItems.map(item => renderMenuItem(item))}
      </div>
    </nav>
  );
}