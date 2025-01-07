import { useEffect, useState } from 'react';

export interface ExchangeRate {
  code: string;
  rate: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  previousRate?: number;
}

export interface ExchangeRates {
  rates: ExchangeRate[];
  timestamp: string;
}

const POLLING_INTERVAL = 5 * 60 * 1000; // 5 dakika
let lastRates: { [key: string]: number } = {};

export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    
    const calculateTrend = (current: number, previous: number): { trend: 'up' | 'down' | 'stable', change: number } => {
      if (!previous) return { trend: 'stable', change: 0 };
      const change = ((current - previous) / previous) * 100;
      return {
        trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
        change: Math.abs(change)
      };
    };

    const rates: ExchangeRate[] = [
      {
        code: 'USD/TRY',
        rate: data.rates.TRY,
        previousRate: lastRates['USD/TRY'],
        ...calculateTrend(data.rates.TRY, lastRates['USD/TRY'])
      },
      {
        code: 'EUR/TRY',
        rate: data.rates.TRY / data.rates.EUR,
        previousRate: lastRates['EUR/TRY'],
        ...calculateTrend(data.rates.TRY / data.rates.EUR, lastRates['EUR/TRY'])
      }
    ];

    // Update last rates
    rates.forEach(rate => {
      lastRates[rate.code] = rate.rate;
    });

    return {
      rates,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Exchange rates fetch error:', error);
    return {
      rates: [
        { code: 'USD/TRY', rate: 35.2456, trend: 'stable', change: 0 },
        { code: 'EUR/TRY', rate: 38.1234, trend: 'stable', change: 0 }
      ],
      timestamp: new Date().toISOString()
    };
  }
}

export function useExchangeRates() {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateRates = async () => {
      setLoading(true);
      const newRates = await fetchExchangeRates();
      setRates(newRates);
      setLoading(false);
    };

    // İlk yükleme
    updateRates();

    // 5 dakikada bir güncelleme
    const interval = setInterval(updateRates, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { rates, loading };
}