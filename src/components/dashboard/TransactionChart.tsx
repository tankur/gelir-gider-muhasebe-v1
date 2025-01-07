import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionType } from '../../types/transaction';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function TransactionChart() {
  const { transactions } = useTransactions();

  const last3Months = Array.from({ length: 3 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toLocaleDateString('tr-TR', { month: 'short' });
  }).reverse();

  const monthlyData = last3Months.map(month => {
    const monthTransactions = transactions.filter(t => {
      const transactionMonth = new Date(t.date).toLocaleDateString('tr-TR', { month: 'short' });
      return transactionMonth === month;
    });

    return {
      month,
      income: monthTransactions
        .filter(t => t.type === TransactionType.INCOME)
        .reduce((sum, t) => sum + t.amount, 0),
      expense: monthTransactions
        .filter(t => t.type === TransactionType.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0)
    };
  });

  const data = {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Gelir',
        data: monthlyData.map(d => d.income),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Gider',
        data: monthlyData.map(d => d.expense),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => 
            new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY'
            }).format(value)
        }
      }
    }
  };

  return <Line data={data} options={options} />;
}