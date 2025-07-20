import React from "react";
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-primary-900 px-4">
      <h1 className="text-3xl font-bold mb-4">{t('Privacy Policy')}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
        {t('Our Privacy Policy will be available here soon.')}
      </p>
      <p className="text-sm text-gray-500">
        {t('For questions, contact')} <a href="mailto:support@tuliza.co.ke" className="underline">support@tuliza.co.ke</a>.
      </p>
      <a href="/" className="mt-8 text-primary-600 hover:underline">{t('Back to Home')}</a>
    </div>
  );
};

export default PrivacyPolicy; 