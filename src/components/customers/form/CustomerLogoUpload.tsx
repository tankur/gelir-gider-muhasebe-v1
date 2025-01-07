import React from 'react';
import { Upload, Building2 } from 'lucide-react';

interface CustomerLogoUploadProps {
  logo: string;
  onLogoChange: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function CustomerLogoUpload({ logo, onLogoChange, fileInputRef }: CustomerLogoUploadProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-6">
        <div className="shrink-0">
          <div className="relative w-24 h-24">
            <div className="w-full h-full rounded-xl overflow-hidden bg-gray-50 border-2 border-gray-200 flex items-center justify-center">
              {logo ? (
                <img
                  src={logo}
                  alt="Firma Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building2 className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Upload size={16} />
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Logo</h3>
          <p className="text-sm text-gray-500">
            PNG, JPG veya GIF. Maksimum 1MB.
          </p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) onLogoChange(file);
        }}
        className="hidden"
      />
    </div>
  );
}