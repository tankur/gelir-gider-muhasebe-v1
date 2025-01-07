import React from 'react';
import { Link } from 'react-router-dom';
import { Diamond } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function AppHeader() {
  const [settings] = useLocalStorage('siteSettings', {
    title: '',
    logo: ''
  });

  return (
    <header className="bg-white dark:bg-[#171717] border-b border-gray-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            {settings.logo ? (
              <img src={settings.logo} alt="Logo" className="h-8 w-auto" />
            ) : (
              <Diamond className="h-8 w-8 text-blue-600" />
            )}
            {settings.title && (
              <span className="font-medium text-gray-900 dark:text-white">
                {settings.title}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}