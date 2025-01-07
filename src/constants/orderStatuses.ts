export const ORDER_STATUSES = {
  PENDING: 'pending',
  DRAWING: 'drawing',
  MOLDING: 'molding',
  LASER_CUTTING: 'laser_cutting',
  PRESSING: 'pressing',
  IRONING: 'ironing',
  CONVEYOR: 'conveyor',
  MOUNTING: 'mounting',
  GLUING: 'gluing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export type OrderStatus = typeof ORDER_STATUSES[keyof typeof ORDER_STATUSES];

export const getOrderStatusText = (status: OrderStatus): string => {
  switch (status) {
    case ORDER_STATUSES.PENDING:
      return 'Beklemede';
    case ORDER_STATUSES.DRAWING:
      return 'Çizim Yapılıyor';
    case ORDER_STATUSES.MOLDING:
      return 'Kalıp Çıkıyor';
    case ORDER_STATUSES.LASER_CUTTING:
      return 'Lazer Kesimde';
    case ORDER_STATUSES.PRESSING:
      return 'Preste';
    case ORDER_STATUSES.IRONING:
      return 'Ütüde';
    case ORDER_STATUSES.CONVEYOR:
      return 'Konvörde';
    case ORDER_STATUSES.MOUNTING:
      return 'Çakımda';
    case ORDER_STATUSES.GLUING:
      return 'Tutkal Makinesinde';
    case ORDER_STATUSES.COMPLETED:
      return 'Tamamlandı';
    case ORDER_STATUSES.CANCELLED:
      return 'İptal Edildi';
  }
};