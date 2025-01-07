import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavigation } from './SidebarNavigation';
import { useSidebarState } from './hooks/useSidebarState';

export function SidebarContainer() {
  const { isCollapsed, isMobileOpen, setIsCollapsed, setIsMobileOpen } = useSidebarState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    const handleToggleMobileMenu = () => {
      setIsMobileOpen(!isMobileOpen);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('toggleMobileMenu', handleToggleMobileMenu);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('toggleMobileMenu', handleToggleMobileMenu);
    };
  }, [isMobileOpen, setIsMobileOpen]);

  const handleMenuToggle = () => {
    if (window.innerWidth >= 1024) {
      setIsCollapsed(!isCollapsed);
    } else {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex ${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-[#171717] border-r border-gray-200 dark:border-neutral-800 h-screen flex-col transition-all duration-300 relative overflow-hidden`}>
        {/* Wavy Lines Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]">
          <svg width="100%" height="100%" className="text-current">
            <defs>
              <pattern id="wavy-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path 
                  d="M0 20C10 20 10 10 20 10C30 10 30 20 40 20C50 20 50 10 60 10" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1"
                  strokeDasharray="0.5 3"
                />
                <path 
                  d="M0 30C10 30 10 20 20 20C30 20 30 30 40 30C50 30 50 20 60 20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1"
                  strokeDasharray="0.5 3"
                />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#wavy-pattern)" />
          </svg>
        </div>

        <SidebarHeader 
          isCollapsed={isCollapsed} 
          onMenuToggle={handleMenuToggle}
        />
        <SidebarNavigation 
          isCollapsed={isCollapsed} 
        />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-64 h-full bg-white dark:bg-[#171717] shadow-xl">
            {/* Wavy Lines Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]">
              <svg width="100%" height="100%" className="text-current">
                <defs>
                  <pattern id="wavy-pattern-mobile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path 
                      d="M0 20C10 20 10 10 20 10C30 10 30 20 40 20C50 20 50 10 60 10" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1"
                      strokeDasharray="0.5 3"
                    />
                    <path 
                      d="M0 30C10 30 10 20 20 20C30 20 30 30 40 30C50 30 50 20 60 20" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1"
                      strokeDasharray="0.5 3"
                    />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#wavy-pattern-mobile)" />
              </svg>
            </div>

            <SidebarHeader 
              isCollapsed={false}
              onMenuToggle={() => setIsMobileOpen(false)}
              isMobileView={true}
            />
            <SidebarNavigation 
              isCollapsed={false}
              onMobileItemClick={() => setIsMobileOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}