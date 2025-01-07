import React, { useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';

interface DashboardWidgetProps {
  children: React.ReactNode;
  isEditing?: boolean;
}

export function DashboardWidget({ children, isEditing }: DashboardWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const { observerRef, inView } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (inView && widgetRef.current) {
      widgetRef.current.style.opacity = '1';
      widgetRef.current.style.transform = 'translateY(0) scale(1)';
    }
  }, [inView]);

  return (
    <div
      ref={(el) => {
        widgetRef.current = el;
        observerRef(el);
      }}
      className="h-full w-full bg-white dark:bg-[#171717] rounded-xl shadow-sm overflow-hidden
                 opacity-0 transform translate-y-4 scale-95"
      style={{ 
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, opacity'
      }}
    >
      {isEditing && (
        <div className="dashboard-widget-header p-2 bg-gray-50 dark:bg-neutral-800 cursor-move
                       flex items-center justify-center border-b border-gray-200 dark:border-neutral-700">
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>
      )}
      <div className="p-4 h-full relative group">
        {children}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}