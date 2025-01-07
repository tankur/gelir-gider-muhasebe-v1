import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { PriceCalculatorForm } from './calculator/PriceCalculatorForm';
import { PriceBreakdown } from './calculator/PriceBreakdown';

export default function PriceCalculator() {
  const [formData, setFormData] = useState({
    customerId: '',
    modelKodu: '',
    isAdedi: '',
    cakimYeri: 'yok',
    cakimDetaylari: [],
    tasDetaylari: [],
    renkVaryanti: 'yok',
    lazerKesim: 'yok',
    lazerKesimFiyati: '',
    presDetaylari: {
      boyut: '',
      adet: ''
    },
    bantDetaylari: {
      genislik: '',
      uzunluk: ''
    }
  });

  const [priceBreakdown, setPriceBreakdown] = useState({
    malzemeMaliyeti: 0,
    iscilikMaliyeti: 0,
    toplamMaliyet: 0,
    karOrani: 30,
    satisFiyati: 0
  });

  const handleCalculate = (data: any) => {
    // Malzeme maliyeti hesaplama
    let malzemeMaliyeti = 0;
    
    // Lazer kesim maliyeti
    if (data.lazerKesim === 'var' && data.lazerKesimFiyati) {
      malzemeMaliyeti += Number(data.lazerKesimFiyati);
    }

    // Pres maliyeti - her pres için sabit bir maliyet ekle
    const presMaliyeti = Number(data.presDetaylari.adet) * 100; // Örnek: her pres 100₺
    malzemeMaliyeti += presMaliyeti;

    // Diğer maliyetler...
    const iscilikMaliyeti = 0; // Hesaplanacak
    const toplamMaliyet = malzemeMaliyeti + iscilikMaliyeti;
    const satisFiyati = toplamMaliyet * (1 + data.karOrani / 100);

    setPriceBreakdown({
      malzemeMaliyeti,
      iscilikMaliyeti,
      toplamMaliyet,
      karOrani: data.karOrani,
      satisFiyati
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Fiyat Hesaplama
      </h1>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Ürün Detayları
              </h2>
            </div>

            <PriceCalculatorForm
              formData={formData}
              onChange={setFormData}
              onCalculate={handleCalculate}
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Fiyat Detayları
              </h2>
            </div>

            <PriceBreakdown breakdown={priceBreakdown} />
          </div>
        </div>
      </div>
    </div>
  );
}