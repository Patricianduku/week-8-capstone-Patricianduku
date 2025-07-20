import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = t('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('Please enter a valid email');
    }
    
    if (!formData.password) {
      newErrors.password = t('Password is required');
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        let data = {};
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await res.json();
        }
        if (!res.ok) throw new Error(data.message || 'Login failed');
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('user', JSON.stringify(data));
          sessionStorage.setItem('token', data.token);
        }
        navigate('/');
      } catch (err) {
        setServerError(err.message || 'An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 flex flex-col items-center px-2 sm:px-4 overflow-x-hidden">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('Welcome back')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('Sign in to continue your wellness journey')}
          </p>
        </div>
        
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('Email address')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.email ? 'border-red-300 focus:ring-red-500 dark:border-red-600' : ''}`}
                  placeholder={t('Enter your email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('Password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-300 focus:ring-red-500 dark:border-red-600' : ''}`}
                  placeholder={t('Enter your password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {serverError && (
              <p className="mt-2 text-sm text-red-600 text-center">{serverError}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('Remember me')}
                </label>
              </div>
              <Link to="/settings" className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300" title="Go to Settings to change your password.">
                {t('Forgot password?')}
              </Link>
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
              disabled={loading}
            >
              {loading ? t('Signing in...') : t('Sign in')}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("Don't have an account?")}{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                {t('Sign up')}
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('Your privacy and security are our top priority. All data is encrypted and secure.')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;