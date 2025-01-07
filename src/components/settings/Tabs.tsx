import React from 'react';

interface TabsProps {
  children: React.ReactNode;
  selectedIndex: number;
  onChange: (index: number) => void;
}

export function Tabs({ children }: TabsProps) {
  return <div>{children}</div>;
}

export function TabList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

interface TabProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function Tab({ children, selected, onClick, className = '' }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        selected
          ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

export function TabPanel({ children, selected }: { children: React.ReactNode; selected: boolean }) {
  if (!selected) return null;
  return <div>{children}</div>;
}