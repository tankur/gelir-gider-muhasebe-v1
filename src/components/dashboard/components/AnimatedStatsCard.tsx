import React, { useEffect, useRef } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';

interface AnimatedStatsCardProps {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'balance';
}

export function AnimatedStatsCard({ title, value, type }: AnimatedStatsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const icon = card.querySelector('.icon-3d');
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      if (icon) {
        icon.style.transform = `translateZ(20px) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg)`;
      }
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      if (icon) {
        icon.style.transform = 'translateZ(20px) rotateX(0) rotateY(0)';
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getIcon = () => {
    switch (type) {
      case 'income':
        return <ArrowUpCircle className="h-8 w-8 text-green-500" />;
      case 'expense':
        return <ArrowDownCircle className="h-8 w-8 text-red-500" />;
      case 'balance':
        return <Wallet className="h-8 w-8 text-blue-500" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'income':
        return 'from-green-500/20 to-green-500/5 text-green-600';
      case 'expense':
        return 'from-red-500/20 to-red-500/5 text-red-600';
      case 'balance':
        return value >= 0 
          ? 'from-blue-500/20 to-blue-500/5 text-blue-600'
          : 'from-red-500/20 to-red-500/5 text-red-600';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative p-6 rounded-xl bg-gradient-to-br ${getColors()}
                 shadow-lg transition-all duration-200 ease-out
                 hover:shadow-xl border border-white/10`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="icon-3d absolute top-4 right-4 transition-transform duration-200">
        {getIcon()}
      </div>
      
      <div style={{ transform: 'translateZ(30px)' }}>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-3xl font-bold">
          {formatCurrency(Math.abs(value))}
        </p>
      </div>
    </div>
  );
}