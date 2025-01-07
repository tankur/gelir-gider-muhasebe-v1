import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Activity } from '../types/activity';
import { useAuth } from '../contexts/AuthContext';
import { getOrderStatusText } from '../constants/orderStatuses';

export function useActivities() {
  const [activities, setActivities] = useLocalStorage<Activity[]>('activities', []);
  const { currentUser } = useAuth();

  const logActivity = (action: string, details: string, type: Activity['type'], metadata?: Record<string, any>) => {
    if (!currentUser) return;

    const newActivity: Activity = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.fullName,
      action,
      details,
      timestamp: new Date().toISOString(),
      type,
      metadata: {
        ...metadata,
        customerId: metadata?.customerId || undefined
      }
    };

    setActivities(prev => [newActivity, ...prev].slice(0, 100)); // Keep last 100 activities
  };

  return { activities, logActivity };
}