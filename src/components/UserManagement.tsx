import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { User } from '../types/user';
import { useActivities } from '../hooks/useActivities';
import { showSuccess, showError, showConfirm } from '../utils/alert';
import { UserList } from './users/UserList';
import { UserForm } from './UserForm';
import { Tabs, TabList, Tab, TabPanel } from './settings/Tabs';
import RoleManagement from './users/RoleManagement';

export default function UserManagement() {
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { logActivity } = useActivities();

  const handleSubmit = (user: User) => {
    try {
      if (editingUser) {
        setUsers(users.map(u => u.id === editingUser.id ? user : u));
        showSuccess('Kullanıcı başarıyla güncellendi');
        logActivity(
          'Kullanıcı güncellendi',
          `${user.fullName} kullanıcı bilgileri güncellendi`,
          'user'
        );
      } else {
        const newUser = { ...user, id: Date.now() };
        setUsers([...users, newUser]);
        showSuccess('Yeni kullanıcı başarıyla eklendi');
        logActivity(
          'Yeni kullanıcı eklendi',
          `${user.fullName} kullanıcı olarak eklendi`,
          'user'
        );
      }
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      showError('Kullanıcı kaydedilirken bir hata oluştu');
      console.error('User error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (users.length === 1) {
      showError('En az bir kullanıcı bulunmalıdır!');
      return;
    }

    const user = users.find(u => u.id === id);
    if (!user) return;

    const confirmed = await showConfirm(
      'Kullanıcıyı Sil',
      'Bu kullanıcıyı silmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
      try {
        setUsers(users.filter(u => u.id !== id));
        showSuccess('Kullanıcı başarıyla silindi');
        logActivity(
          'Kullanıcı silindi',
          `${user.fullName} kullanıcısı silindi`,
          'user'
        );
      } catch (error) {
        showError('Kullanıcı silinirken bir hata oluştu');
        console.error('Delete user error:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Kullanıcı Yönetimi</h1>
        {activeTab === 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Yeni Kullanıcı
          </button>
        )}
      </div>

      <Tabs selectedIndex={activeTab} onChange={setActiveTab}>
        <TabList className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <Tab
            selected={activeTab === 0}
            onClick={() => setActiveTab(0)}
            className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
          >
            Kullanıcılar
          </Tab>
          <Tab
            selected={activeTab === 1}
            onClick={() => setActiveTab(1)}
            className="mr-4 py-4 text-sm font-medium border-b-2 cursor-pointer"
          >
            Rol Yönetimi
          </Tab>
        </TabList>

        <TabPanel selected={activeTab === 0}>
          <UserList
            users={users}
            onEdit={(user) => {
              setEditingUser(user);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        </TabPanel>

        <TabPanel selected={activeTab === 1}>
          <RoleManagement />
        </TabPanel>
      </Tabs>

      {isModalOpen && (
        <UserForm
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          initialData={editingUser}
        />
      )}
    </div>
  );
}