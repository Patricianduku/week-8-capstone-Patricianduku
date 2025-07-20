import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Mail, Lock, Bell, Shield, Trash2, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import DeleteAccountModal from '../components/DeleteAccountModal';
import { useAuth } from '../hooks/useAuth';
import ChangePasswordModal from '../components/ChangePasswordModal';

const Settings = () => {
  const { t } = useTranslation();
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    anonymousMode: true
  });
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      setLoadingUsers(true);
      fetch('/api/users')
        .then(res => res.json())
        .then(data => {
          setUsers(data);
          setLoadingUsers(false);
        })
        .catch(err => {
          setErrorUsers('Failed to load users');
          setLoadingUsers(false);
        });
    }
  }, [user]);

  const promoteToAdmin = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'admin' }),
      });
      if (res.ok) {
        setUsers(users => users.map(u => u._id === userId ? { ...u, role: 'admin' } : u));
      } else {
        alert('Failed to promote user');
      }
    } catch (err) {
      alert('Failed to promote user');
    }
  };

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Clear any stored user data
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to home page or login
        window.location.href = '/';
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert(t('Failed to delete account. Please try again or contact support.'));
    }
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    setChangePasswordSuccess('');
    const token = localStorage.getItem('token');
    const res = await fetch('/api/users/change-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Failed to change password');
    }
    setChangePasswordSuccess('Password changed successfully!');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 flex flex-col items-center px-2 sm:px-4 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('Settings')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('Manage your account preferences and privacy settings.')}
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-6">
              <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t('Profile Settings')}
              </h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('Display Name')}
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder={t('Your display name')}
                  defaultValue={t('Anonymous User')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('Email Address')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="email"
                    className="input-field pl-10"
                    placeholder={t('your.email@example.com')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-6">
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              ) : (
                <Sun className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              )}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t('Appearance')}
              </h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t('Dark Mode')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Switch between light and dark themes')}
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  isDarkMode ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-6">
              <Bell className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t('Notifications')}
              </h2>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  key: 'emailNotifications',
                  title: t('Email Notifications'),
                  description: t('Receive updates and reminders via email')
                },
                {
                  key: 'pushNotifications',
                  title: t('Push Notifications'),
                  description: t('Get notified about important updates')
                },
                {
                  key: 'weeklyReports',
                  title: t('Weekly Reports'),
                  description: t('Receive weekly mood and progress summaries')
                }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {setting.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {setting.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange(setting.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                      settings[setting.key] ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t('Privacy & Security')}
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {t('Anonymous Mode')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('Hide your identity in support rooms and community features')}
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('anonymousMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                    settings.anonymousMode ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.anonymousMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  onClick={() => setShowChangePassword(true)}
                >
                  <Lock className="h-4 w-4" />
                  <span>{t('Change Password')}</span>
                </button>
                {changePasswordSuccess && <div className="text-green-600 mt-2 text-sm">{changePasswordSuccess}</div>}
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card border-red-200 dark:border-red-800">
            <div className="flex items-center space-x-2 mb-6">
              <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
              <h2 className="text-xl font-semibold text-red-900 dark:text-red-100">
                {t('Danger Zone')}
              </h2>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-medium text-red-900 dark:text-red-100 mb-2">
                {t('Delete Account')}
              </h3>
              <p className="text-sm text-red-700 dark:text-red-200 mb-4">
                {t('Once you delete your account, there is no going back. This will permanently delete your data.')}
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {t('Delete My Account')}
              </button>
            </div>
          </div>

          {/* Admin Panel - Only for Admins */}
          {user?.role === 'admin' && (
            <div className="card border-green-300 dark:border-green-700 mt-8">
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="text-xl font-semibold text-green-900 dark:text-green-100">Admin Panel</h2>
              </div>
              {loadingUsers ? (
                <p>Loading users...</p>
              ) : errorUsers ? (
                <p className="text-red-600">{errorUsers}</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="py-2">Name</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Role</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="py-2">{u.name}</td>
                        <td className="py-2">{u.email}</td>
                        <td className="py-2">{u.role}</td>
                        <td className="py-2">
                          {u.role !== 'admin' ? (
                            <button
                              onClick={() => promoteToAdmin(u._id)}
                              className="btn-primary px-3 py-1 text-xs"
                            >
                              Promote to Admin
                            </button>
                          ) : (
                            <span className="text-green-600 font-semibold">Admin</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <DeleteAccountModal
            onDelete={handleDeleteAccount}
            onCancel={() => setShowDeleteModal(false)}
            t={t}
          />
        )}
        <ChangePasswordModal
          isOpen={showChangePassword}
          onClose={() => setShowChangePassword(false)}
          onConfirm={handleChangePassword}
        />
      </div>
    </div>
  );
};

export default Settings;