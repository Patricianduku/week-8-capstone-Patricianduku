import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

const ChangePasswordModal = ({ isOpen, onClose, onConfirm }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState('');

  const handleChange = async () => {
    setIsChanging(true);
    setError('');
    try {
      await onConfirm(currentPassword, newPassword);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to change password');
    } finally {
      setIsChanging(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Lock className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Change Password
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            disabled={isChanging}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="input-field"
            placeholder="Enter current password"
            disabled={isChanging}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="input-field"
            placeholder="Enter new password"
            disabled={isChanging}
          />
        </div>
        {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
            disabled={isChanging}
          >
            Cancel
          </button>
          <button
            onClick={handleChange}
            disabled={!currentPassword || !newPassword || isChanging}
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <span>{isChanging ? 'Changing...' : 'Change Password'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal; 