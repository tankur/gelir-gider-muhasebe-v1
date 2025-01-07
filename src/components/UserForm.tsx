import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types/user';
import { UserFormFields } from './users/form/UserFormFields';

interface UserFormProps {
  onSubmit: (user: User) => void;
  onClose: () => void;
  initialData?: User | null;
}

export function UserForm({ onSubmit, onClose, initialData }: UserFormProps) {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    username: '',
    password: '',
    fullName: '',
    role: UserRole.USER,
    isActive: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: initialData?.id || Date.now() });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          {initialData ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <UserFormFields
            formData={formData}
            isNewUser={!initialData}
            onChange={handleChange}
          />

          {/* Butonlar */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialData ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}