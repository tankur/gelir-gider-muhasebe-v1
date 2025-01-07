import React from 'react';
import { Edit2, Trash2, Eye, FileText } from 'lucide-react';
import { Offer } from '../../../types/offer';
import { formatCurrency } from '../../../utils/format';

interface OfferListProps {
  offers: Offer[];
  onEdit: (offer: Offer) => void;
  onDelete: (id: number) => void;
}

export function OfferList({ offers, onEdit, onDelete }: OfferListProps) {
  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      accepted: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      expired: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    };

    const labels = {
      pending: 'Beklemede',
      accepted: 'Onaylandı',
      rejected: 'Reddedildi',
      expired: 'Süresi Doldu'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Müşteri
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Teklif Tarihi
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Geçerlilik
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Durum
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
              Toplam
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {offers.map(offer => (
            <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {offer.companyName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {offer.customerName}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {new Date(offer.createdAt).toLocaleDateString('tr-TR')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {new Date(offer.validUntil).toLocaleDateString('tr-TR')}
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(offer.status)}
              </td>
              <td className="px-6 py-4 text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                {formatCurrency(offer.totalAmount, offer.currency)}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => {}} // TODO: Implement preview
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  title="Görüntüle"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => {}} // TODO: Implement print
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  title="Yazdır"
                >
                  <FileText size={18} />
                </button>
                <button
                  onClick={() => onEdit(offer)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  title="Düzenle"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(offer.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  title="Sil"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {offers.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Henüz teklif bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}