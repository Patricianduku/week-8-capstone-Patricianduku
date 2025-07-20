import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, MessageCircle, Shield, Clock, User } from 'lucide-react';
import ChatRoom from '../components/ChatRoom';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const SupportRooms = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Use category keys, not translated labels
  const supportRooms = [
    {
      id: 1,
      name: 'Anxiety Support',
      description: 'A safe space to discuss anxiety, coping strategies, and share experiences.',
      activeUsers: 23,
      category: 'mental_health',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      name: 'Depression Support',
      description: 'Connect with others who understand depression and find mutual support.',
      activeUsers: 18,
      category: 'mental_health',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 3,
      name: 'Stress Management',
      description: 'Share stress management techniques and support each other through difficult times.',
      activeUsers: 31,
      category: 'wellness',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      name: 'Sleep Support',
      description: 'Discuss sleep issues, insomnia, and healthy sleep habits.',
      activeUsers: 15,
      category: 'wellness',
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 5,
      name: 'Grief & Loss',
      description: 'A compassionate space for those dealing with grief and loss.',
      activeUsers: 12,
      category: 'support',
      color: 'bg-gray-100 text-gray-800'
    },
    {
      id: 6,
      name: 'Self-Care Circle',
      description: 'Share self-care tips, celebrate small wins, and encourage each other.',
      activeUsers: 27,
      category: 'wellness',
      color: 'bg-pink-100 text-pink-800'
    }
  ];

  // Category filter keys and labels
  const categories = [
    { key: 'all', label: t('All') },
    { key: 'mental_health', label: t('Mental Health') },
    { key: 'wellness', label: t('Wellness') },
    { key: 'support', label: t('Support') }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredRooms = selectedCategory === 'all'
    ? supportRooms
    : supportRooms.filter(room => room.category === selectedCategory);

  // Helper to translate category key for display
  const getCategoryLabel = (key) => {
    switch (key) {
      case 'mental_health':
        return t('Mental Health');
      case 'wellness':
        return t('Wellness');
      case 'support':
        return t('Support');
      default:
        return '';
    }
  };

  if (selectedRoom) {
    return (
      <ChatRoom
        room={selectedRoom}
        onBack={() => setSelectedRoom(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 flex flex-col items-center px-2 sm:px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('Support Rooms')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('Connect with others in a safe, anonymous environment. All conversations are confidential.')}
          </p>

          {/* Safety Notice */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  {t('Community Guidelines')}
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  {t('Be respectful, supportive, and kind. No personal information sharing.')}
                  <br className="hidden sm:block" />
                  <span className="block mt-2">{t('This is a peer support space. For crisis situations, please contact emergency services or visit our resources page.')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedCategory === cat.key
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Support Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="card hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedRoom(room)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {t(room.name)}
                  </h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${room.color}`}>
                  {getCategoryLabel(room.category)}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                {t(room.description)}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{room.activeUsers} {t('active')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{t('24/7')}</span>
                </div>
              </div>

              <button className="w-full mt-4 btn-primary">
                {t('Join Room')}
              </button>
            </div>
          ))}
        </div>

        {/* Anonymous Chat Info */}
        <div className="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
          <div className="text-center">
            <User className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {t('Anonymous & Safe')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("Your identity is protected in all support rooms. You'll be assigned a random, anonymous username that changes with each session. No personal information is stored or shared.")}
            </p>
          </div>
        </div>

        {/* Crisis Resources */}
        <div className="mt-10 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
              {t('Need Immediate Help?')}
            </h3>
            <p className="text-red-700 dark:text-red-200 mb-4">
              {t("If you're experiencing a mental health crisis, please reach out for professional help immediately.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1199"
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {t('Call 1199 (Kenya Red Cross)')}
              </a>
              <a
                href="tel:999"
                className="bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {t('Call 999 (Police)')}
              </a>
              <a
                href="tel:112"
                className="bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {t('Call 112 (Police)')}
              </a>
              <a
                href="tel:1195"
                className="bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {t('Call 1195 (GBV Helpline)')}
              </a>
              <a
                href="/resources"
                className="bg-white hover:bg-red-50 text-red-600 border border-red-600 font-medium py-2 px-6 rounded-lg transition-colors duration-200 dark:bg-gray-800 dark:hover:bg-red-900/20 dark:text-red-400 dark:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                {t('View All Resources')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportRooms;