import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleStorage = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return { user, logout };
}
