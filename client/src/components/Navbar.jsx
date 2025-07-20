import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Home, BookOpen, Users, Phone, LogIn, Settings, LogOut, User } from 'lucide-react';
import tulizaLogo from '../assets/tuliza-logo.png';
import DarkModeToggle from './DarkModeToggle';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: t('Home'), href: '/', icon: Home },
    { name: t('Journal'), href: '/journal', icon: BookOpen },
    { name: t('Support Rooms'), href: '/support', icon: Users },
    { name: t('Resources'), href: '/resources', icon: Phone },
    { name: t('Settings'), href: '/settings', icon: Settings },
    { name: t('Pricing'), href: '/pricing', icon: Heart },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-950 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={tulizaLogo} alt={t('Tuliza Logo')} className="h-16 w-auto" />
          <span className="text-2xl font-bold text-primary-700 dark:text-primary-200 tracking-wide">{t('Tuliza')}</span>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <DarkModeToggle />
          {/* Language Switcher */}
          <select
            value={i18n.language}
            onChange={handleLanguageChange}
            className="rounded-lg px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
            aria-label={t('Language')}
          >
            <option value="en">{t('English')}</option>
            <option value="sw">{t('Swahili')}</option>
          </select>
          {user ? (
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span className="font-semibold text-primary-700 dark:text-primary-200">{user.name}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('Logout')}</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 btn-primary"
            >
              <LogIn className="h-4 w-4" />
              <span>{t('Login')}</span>
            </Link>
          )}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <div className="mr-2">
            <DarkModeToggle />
          </div>
          {/* Language Switcher for mobile - REMOVED FROM HERE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none focus:text-gray-900 dark:focus:text-gray-100 p-2 transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {user ? (
              <div className="flex items-center space-x-2 px-3 py-2">
                <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <span className="font-semibold text-primary-700 dark:text-primary-200">{user.name}</span>
                <button
                  onClick={() => { setIsOpen(false); logout(); }}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t('Logout')}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20 rounded-md transition-colors duration-200"
              >
                <LogIn className="h-5 w-5" />
                <span>{t('Login')}</span>
              </Link>
            )}
            {/* Language Switcher for mobile - MOVED HERE */}
            <div className="px-3 pt-2">
              <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className="rounded-lg px-2 py-1 text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-primary-400"
                aria-label={t('Language')}
              >
                <option value="en">{t('English')}</option>
                <option value="sw">{t('Swahili')}</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;