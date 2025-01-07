import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../contexts/AuthContext';
import { User, UserRole } from '../types/user';
import { LogIn, User as UserIcon, Lock, AlertCircle } from 'lucide-react';
import { useActivities } from '../hooks/useActivities';

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const { logActivity } = useActivities();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [settings] = useLocalStorage('siteSettings', {
    title: 'Gelir Gider Takip',
    logo: ''
  });

  React.useEffect(() => {
    if (users.length === 0) {
      setUsers([
        {
          id: 1,
          username: 'admin',
          password: 'admin123',
          fullName: 'Admin User',
          role: UserRole.ADMIN,
          isActive: true
        },
        {
          id: 2,
          username: 'user',
          password: 'user123',
          fullName: 'Normal User',
          role: UserRole.USER,
          isActive: true
        }
      ]);
    }
  }, [users.length, setUsers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => 
      u.username === formData.username && 
      u.password === formData.password
    );

    if (user) {
      if (!user.isActive) {
        setError('Bu hesap aktif değil.');
        handleError();
        return;
      }
      setCurrentUser(user);
      const loginTime = new Date().toLocaleTimeString('tr-TR');
      logActivity(
        'Kullanıcı girişi',
        `${user.fullName} sisteme giriş yaptı (${loginTime})`,
        'user'
      );
      navigate('/dashboard', { replace: true });
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
      handleError();
    }
  };

  const handleError = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-transform ${isShaking ? 'animate-shake' : ''}`}>
        <div className="text-center mb-8">
          {settings.logo ? (
            <img src={settings.logo} alt="Logo" className="h-16 mx-auto mb-4" />
          ) : (
            <LogIn className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          )}
          <h2 className="text-2xl font-bold text-gray-800">{settings.title}</h2>
          <p className="text-gray-500 mt-2">Hesabınıza giriş yapın</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors py-2"
                placeholder="Kullanıcı adınızı girin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <div className="relative">
              <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors py-2"
                placeholder="Şifrenizi girin"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-transform active:scale-95"
          >
            Giriş Yap
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Demo hesap bilgileri: <br />
          <span className="font-medium">Kullanıcı adı:</span> admin <br />
          <span className="font-medium">Şifre:</span> admin123
        </p>
      </div>
    </div>
  );
}