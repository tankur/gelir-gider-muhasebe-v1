import React from 'react';

interface PrintContentProps {
  children: React.ReactNode;
}

export function PrintContent({ children }: PrintContentProps) {
  return (
    <div className="space-y-6 print:space-y-8">
      {children}
    </div>
  );
}