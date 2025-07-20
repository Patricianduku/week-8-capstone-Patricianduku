import React from 'react';
import { Phone, Globe, MessageCircle, Clock, MapPin, Heart } from 'lucide-react';
import ResourcesList from '../components/ResourcesList';
import { useTranslation } from 'react-i18next';

const Resources = () => {
  const { t } = useTranslation();
  const crisisResources = [
    {
        name: 'Kenya Red Cross Emergency',
        phone: '1199',
        description: 'Free, 24/7 crisis and emergency support.',
        availability: '24/7',
        type: 'crisis'
    },
    {
      name: 'Befrienders Kenya',
      phone: '+254722178177',
      description: '24/7 emotional support for anyone in distress.',
      availability: '24/7',
      type: 'crisis'
    },
    {
        name: "GBVRC Nairobi Women's Hospital",
        phone: '+254703019120',
        description: '24/7 support for survivors of gender-based violence.',
        availability: '24/7',
        type: 'crisis'
    },
    {
      name: 'HAK Helpline (GBV)',
      phone: '1195',
      description: 'National Gender-Based Violence helpline, toll-free, 24/7.',
      availability: '24/7',
      type: 'crisis'
    }
  ];

  const professionalResources = [
    {
      name: 'Psychology Today',
      website: 'psychologytoday.com',
      description: 'Find therapists, psychiatrists, and support groups in your area.',
      type: 'professional'
    },
    {
      name: 'SAMHSA Treatment Locator',
      website: 'findtreatment.samhsa.gov',
      description: 'Locate mental health and substance abuse treatment facilities.',
      type: 'professional'
    },
    {
      name: 'Befrienders Kenya',
      phone: '+254722178177',
      description: '24/7 emotional support for anyone in distress.',
      type: 'professional'
    },
    {
      name: 'Amani Counselling Centre',
      phone: '+254722178133',
      description: 'Professional counseling services.',
      type: 'professional'
    }
  ];

  const onlineResources = [
    {
      name: 'BetterHelp',
      website: 'betterhelp.com',
      description: 'Online therapy and counseling services.',
      type: 'online'
    },
    {
      name: 'Talkspace',
      website: 'talkspace.com',
      description: 'Text, audio, and video therapy sessions.',
      type: 'online'
    },
    {
      name: 'Headspace',
      website: 'headspace.com',
      description: 'Meditation and mindfulness app for mental wellness.',
      type: 'online'
    },
    {
      name: 'Calm',
      website: 'calm.com',
      description: 'Sleep stories, meditation, and relaxation tools.',
      type: 'online'
    }
  ];

  const supportGroups = [
    {
      name: 'Depression and Bipolar Support Alliance (DBSA)',
      website: 'dbsalliance.org',
      description: 'Peer support groups for mood disorders.',
      type: 'support'
    },
    {
      name: 'Anxiety and Depression Association of America (ADAA)',
      website: 'adaa.org',
      description: 'Support groups and resources for anxiety and depression.',
      type: 'support'
    },
    {
      name: 'Mental Health America (MHA)',
      website: 'mhanational.org',
      description: 'Local support groups and mental health screening tools.',
      type: 'support'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-2 sm:px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('Mental Health Resources')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('Professional help, crisis support, and wellness resources available 24/7.')}
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-600 dark:bg-red-700 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-8 w-8" />
              <div>
                <h2 className="text-xl font-bold">{t('Emergency? Call 1199')}</h2>
                <p className="text-red-100 dark:text-red-200">
                  {t('Kenya Red Cross: 24/7 crisis and emergency support')}
                </p>
                <p className="text-red-100 dark:text-red-200 mt-1">
                  {t('Police Emergency')}: <span className="font-bold">999</span> {t('or')} <span className="font-bold">112</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="tel:1199"
                className="bg-white text-red-600 hover:bg-red-50 font-bold py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
              >
                {t('Call 1199')}
              </a>
              <a
                href="tel:999"
                className="bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-600"
              >
                {t('Call 999')}
              </a>
              <a
                href="tel:112"
                className="bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-600"
              >
                {t('Call 112')}
              </a>
            </div>
          </div>
        </div>

        {/* Crisis Resources */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Phone className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t('Crisis Support')}
            </h2>
          </div>
          <ResourcesList resources={crisisResources} />
        </section>

        {/* Professional Resources */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Heart className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t('Professional Help')}
            </h2>
          </div>
          <ResourcesList resources={professionalResources} />
        </section>

        {/* Online Resources */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t('Online Resources')}
            </h2>
          </div>
          <ResourcesList resources={onlineResources} />
        </section>

        {/* Support Groups */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t('Support Groups')}
            </h2>
          </div>
          <ResourcesList resources={supportGroups} />
        </section>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('When to Seek Help')}
              </h3>
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• {t('Persistent feelings of sadness or hopelessness')}</li>
              <li>• {t('Difficulty functioning in daily activities')}</li>
              <li>• {t('Thoughts of self-harm or suicide')}</li>
              <li>• {t('Substance abuse or addiction')}</li>
              <li>• {t('Significant changes in sleep or appetite')}</li>
              <li>• {t('Withdrawal from friends and activities')}</li>
            </ul>
          </div>

          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('Finding Local Help')}
              </h3>
            </div>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <p>
                {t('Contact your primary care doctor for referrals to mental health professionals in your area.')}
              </p>
              <p>
                {t('Check with your insurance provider for covered mental health services and providers.')}
              </p>
              <p>
                {t('Many communities offer sliding-scale or free mental health services through community health centers.')}
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <p className="text-sm text-red-300 dark:text-red-300 text-center">
            <strong>{t('Disclaimer')}:</strong> {t('This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with any questions you may have regarding a medical condition.')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;