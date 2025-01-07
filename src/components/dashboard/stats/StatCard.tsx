import React from 'react';
import { LucideIcon } from 'lucide-react';
import { AnimatedCounter } from '../../stats/AnimatedCounter';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  formatter?: (value: number) => string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgColor, 
  trend,
  formatter 
}: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-6 border border-gray-100 dark:border-neutral-800 transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-center">
        <div className="p-3 bg-white dark:bg-neutral-800 rounded-lg">
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <div className="flex items-center mt-1">
            <p className={`text-2xl font-semibold ${color}`}>
              {typeof value === 'number' && formatter ? (
                <AnimatedCounter value={value} formatter={formatter} />
              ) : (
                value
              )}
            </p>
            {trend && (
              <span className={`ml-2 text-sm font-medium ${
                trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}