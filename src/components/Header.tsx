import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import Calculator from './calculator/Calculator';
import { useActivities } from '../hooks/useActivities';
import { 
  Settings as SettingsIcon, 
  LogOut, 
  User as UserIcon,
  ChevronDown,
  Menu as MenuIcon,
  Calculator as CalculatorIcon
} from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();
  const { logActivity } = useActivities();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCloseCalculator = () => setIsCalculatorOpen(false);
    window.addEventListener('closeCalculator', handleCloseCalculator);
    return () => window.removeEventListener('closeCalculator', handleCloseCalculator);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (currentUser) {
      const logoutTime = new Date().toLocaleTimeString('tr-TR');
      logActivity(
        'Kullanıcı çıkışı',
        `${currentUser.fullName} sistemden çıkış yaptı (${logoutTime})`,
        'user'
      );
    }
    setCurrentUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <div className="h-16 bg-white dark:bg-[#171717] border-b border-gray-200 dark:border-neutral-800 px-4 flex items-center justify-between">
        <button
          onClick={() => document.dispatchEvent(new CustomEvent('toggleMobileMenu'))}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          <MenuIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="flex items-center space-x-4 ml-auto">
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            title="Hesap Makinesi"
          >
            <CalculatorIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          
          <ThemeToggle />
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                {currentUser?.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt={currentUser.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                )}
              </div>
              <span className="hidden md:inline text-gray-700 dark:text-gray-300">
                {currentUser?.fullName}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 hidden md:block" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#171717] rounded-lg shadow-lg border border-gray-200 dark:border-neutral-800 py-1">
                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center"
                >
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Profil Düzenle
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isCalculatorOpen && <Calculator />}
    </>
  );
}