import React from 'react';
import { calculateDaysRemaining, formatDaysRemaining } from '../../utils/date';

interface CheckDueDateProps {
  dueDate: string;
}

export function CheckDueDate({ dueDate }: CheckDueDateProps) {
  const daysRemaining = calculateDaysRemaining(dueDate);
  
  return (
    <div>
      <div className="text-sm text-gray-900">
        {new Date(dueDate).toLocaleDateString('tr-TR')}
      </div>
      <div className={`text-xs ${
        daysRemaining < 0 ? 'text-red-600' :
        daysRemaining <= 7 ? 'text-yellow-600' :
        'text-gray-500'
      }`}>
        {formatDaysRemaining(daysRemaining)}
      </div>
    </div>
  );
}