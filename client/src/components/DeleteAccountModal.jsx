import React, { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') return;
    
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Delete Account
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            disabled={isDeleting}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <p className="text-red-800 dark:text-red-200 text-sm">
              <strong>Warning:</strong> This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>The following data will be permanently deleted:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>All journal entries and mood data</li>
              <li>Account settings and preferences</li>
              <li>Chat history (if any)</li>
              <li>Personal information</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="confirmText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type <strong>DELETE</strong> to confirm:
          </label>
          <input
            id="confirmText"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="input-field"
            placeholder="DELETE"
            disabled={isDeleting}
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={confirmText !== 'DELETE' || isDeleting}
            className="btn-danger flex-1 flex items-center justify-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>{isDeleting ? 'Deleting...' : 'Delete Account'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;