// Currency formatting functions
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'tr-TR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatExactCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'tr-TR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).format(amount);
}

// Date/time formatting functions
export function formatDateTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Currency conversion helper
export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string, rate: number): number {
  if (fromCurrency === toCurrency) return amount;
  return fromCurrency === 'USD' ? amount * rate : amount / rate;
}