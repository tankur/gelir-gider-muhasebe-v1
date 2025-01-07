import React, { useRef } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Upload, Building2, Image, Diamond, Trash2 } from 'lucide-react';
import { showSuccess } from '../../utils/alert';

export default function SiteSettings() {
  const [settings, setSettings] = useLocalStorage('siteSettings', {
    title: '',
    logo: '',
    companyName: '',
    address: '',
    phone: '',
    email: '',
    taxOffice: '',
    taxNumber: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logo: reader.result as string });
        showSuccess('Logo başarıyla güncellendi');
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoRemove = () => {
    setSettings({ ...settings, logo: '' });
    showSuccess('Logo başarıyla kaldırıldı');
    window.location.reload();
  };

  const handleChange = (field: string, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess('Ayarlar başarıyla kaydedildi');
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Site Ayarları
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Logo Upload */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="shrink-0">
              <div className="relative w-24 h-24">
                <div className="w-full h-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center">
                  {settings.logo ? (
                    <img
                      src={settings.logo}
                      alt="Site Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Diamond className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 flex space-x-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Upload size={16} />
                  </button>
                  {settings.logo && (
                    <button
                      type="button"
                      onClick={handleLogoRemove}
                      className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Site Logosu</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                JPG, GIF veya PNG. Max 1MB.
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
          </div>

          {/* Site Title */}
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={settings.title}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="Site Başlığı"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}