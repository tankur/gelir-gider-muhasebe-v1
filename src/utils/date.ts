export function calculateDaysRemaining(dueDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(dueDate);
  checkDate.setHours(0, 0, 0, 0);
  
  const diffTime = checkDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatDaysRemaining(days: number): string {
  if (days < 0) return 'Vadesi Geçmiş';
  if (days === 0) return 'Bugün';
  if (days === 1) return 'Yarın';
  return `${days} gün kaldı`;
}