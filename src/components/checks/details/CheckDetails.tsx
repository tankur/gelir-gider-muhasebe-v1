import React from 'react';
import { Check } from '../../../types/check';
import { X, FileText, Calendar, DollarSign, Building2, Landmark } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';
import { calculateDaysRemaining, formatDaysRemaining } from '../../../utils/date';
import { useCustomers } from '../../../hooks/useCustomers';

interface CheckDetailsProps {
  check: Check;
  onClose: () => void;
}

export function CheckDetails({ check, onClose }: CheckDetailsProps) {
  const { getCustomerInfo } = useCustomers();
  const customerInfo = getCustomerInfo(check.customerId);
  const daysRemaining = calculateDaysRemaining(check.dueDate);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Çek Detayları
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Müşteri Bilgileri */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Building2 className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Müşteri Bilgileri</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Firma Adı</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {customerInfo.companyName || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Yetkili</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {customerInfo.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Çek Bilgileri */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FileText className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Çek Bilgileri</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Belge No</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {check.documentNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Durum</p>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    check.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : check.status === 'printed'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : check.status === 'guarantee'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                      : check.status === 'used'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {check.status === 'pending' ? 'Beklemede' : 
                     check.status === 'printed' ? 'Çek Yazdırıldı' : 
                     check.status === 'guarantee' ? 'Banka Teminatı' :
                     check.status === 'used' ? 'Kullanıldı' : 
                     'İptal Edildi'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarih Bilgileri */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Tarih Bilgileri</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Alış Tarihi</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(check.receiveDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Vade Tarihi</p>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(check.dueDate).toLocaleDateString('tr-TR')}
                    </p>
                    <p className={`text-sm ${
                      daysRemaining < 0 ? 'text-red-600 dark:text-red-400' :
                      daysRemaining <= 7 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatDaysRemaining(daysRemaining)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tutar Bilgileri */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <DollarSign className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Tutar Bilgileri</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tutar</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(check.amount, check.currency)}
                  </p>
                </div>
                {check.currency !== 'TRY' && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">TL Karşılığı</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(check.amount * check.exchangeRate, 'TRY')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Banka Bilgileri */}
          {check.bankName && (
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Landmark className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Banka Bilgileri</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="font-medium text-gray-900 dark:text-white">
                  {check.bankName}
                </p>
              </div>
            </div>
          )}

          {/* Açıklama */}
          {check.description && (
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FileText className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Açıklama</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-900 dark:text-white whitespace-pre-line">
                  {check.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}