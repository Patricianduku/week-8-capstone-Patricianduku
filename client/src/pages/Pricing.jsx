import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

function PremiumModal({ open, onClose }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '' });
  const [mpesaCode, setMpesaCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  if (!open) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !mpesaCode) {
      setError(t('All fields are required.'));
      return;
    }
    try {
      const res = await fetch('/api/users/submit-mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, mpesaCode }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err) {
      setError(t('Submission failed. Please try again.'));
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full p-6 relative animate-fade-in">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl">&times;</button>
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200 text-center">{t('Upgrade to Premium')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('Name')}</label>
                <input type="text" required className="input-field w-full" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={t('Your name')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('Email')}</label>
                <input type="email" required className="input-field w-full" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder={t('you@email.com')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('M-Pesa Code')}</label>
                <input type="text" required className="input-field w-full" value={mpesaCode} onChange={e => setMpesaCode(e.target.value)} placeholder={t('M-Pesa Transaction Code')} />
              </div>
              <div className="bg-green-50 dark:bg-green-800 rounded-lg p-4 text-sm text-green-900 dark:text-green-100 mb-2">
                <strong>{t('M-Pesa Payment Instructions:')}</strong><br/>
                {t('Pay Ksh 300 to')} <strong>{t('Paybill')}: 220220</strong><br/>
                <span>{t('Account No')}: <strong>{t('Your Name')}</strong></span><br/>
                {t('After payment, enter your M-Pesa code and click Submit below.')}
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button type="submit" className="btn-primary w-full">{t('Submit')}</button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200">{t('Thank you!')}</h2>
            <p className="mb-4">{t('Your registration has been received. We will verify your payment and activate your Premium access soon.')}</p>
            <button className="btn-primary" onClick={onClose}>{t('Close')}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Pricing() {
  const { t } = useTranslation();
  const [showPremium, setShowPremium] = useState(false);
  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 flex flex-col items-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-green-800 dark:text-green-200 animate-fade-in">{t('Tuliza Pricing')}</h1>
      <p className="mb-8 max-w-2xl text-center text-gray-700 dark:text-gray-200 animate-fade-in delay-100">
        <strong>{t('Tuliza is built on peer-to-peer support.')}</strong> {t('All youth can access core features for free. Premium is for those who want extra guidance and advanced tools—while keeping the community at the center.')}
      </p>
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Free Tier */}
        <div className="bg-green-50 dark:bg-green-800 rounded-xl p-8 shadow flex flex-col items-center transition-transform duration-300 animate-fade-in delay-100 hover:animate-bounce-slight">
          <h2 className="text-2xl font-bold mb-2">{t('Free')}</h2>
          <p className="text-3xl font-bold mb-4">{t('Ksh 0')}</p>
          <ul className="mb-6 text-left list-disc list-inside">
            <li>{t('Journaling (text)')}</li>
            <li>{t('Peer support rooms')}</li>
            <li>{t('Kenyan helplines')}</li>
            <li>{t('Daily affirmations')}</li>
            <li>{t('Accessible to all youth')}</li>
          </ul>
          <button className="btn-primary w-full animate-pulse-on-hover" disabled>{t('Current Plan')}</button>
        </div>
        {/* Premium */}
        <div className="bg-white dark:bg-primary-900 border-2 border-green-400 rounded-xl p-8 shadow-lg flex flex-col items-center transition-transform duration-300 animate-fade-in delay-200 hover:animate-bounce-slight">
          <h2 className="text-2xl font-bold mb-2">{t('Premium')}</h2>
          <p className="text-3xl font-bold mb-4">{t('Ksh 300')}<span className="text-base font-normal">/{t('month')}</span></p>
          <ul className="mb-6 text-left list-disc list-inside">
            <li><strong>{t('Ask a therapist (10 questions/month)')}</strong></li>
            <li>{t('Personalized mood insights & tips')}</li>
            <li>{t('Voice note journaling')}</li>
            <li>{t('Priority support')}</li>
            <li>{t('Early access to new features')}</li>
            <li>{t('Download/export your journal')}</li>
            <li>{t('Premium-only support rooms')}</li>
            <li>{t('All Free features included')}</li>
          </ul>
          <button className="btn-primary w-full animate-pulse-on-hover" onClick={() => setShowPremium(true)}>{t('Upgrade')}</button>
          <p className="text-xs text-gray-500 mt-4 text-center">
            <strong>{t('Note:')}</strong> {t('Therapist Q&A is for general advice only and does not replace professional therapy or crisis support.')}
          </p>
        </div>
        {/* Institutional */}
        <div className="bg-green-50 dark:bg-green-800 rounded-xl p-8 shadow flex flex-col items-center transition-transform duration-300 animate-fade-in delay-300 hover:animate-bounce-slight">
          <h2 className="text-2xl font-bold mb-2">{t('Institutional')}</h2>
          <p className="text-3xl font-bold mb-4">{t('Ksh 5,000')}<span className="text-base font-normal">/{t('month')}</span></p>
          <ul className="mb-6 text-left list-disc list-inside">
            <li>{t('All Premium features for every member')}</li>
            <li>{t('Admin dashboard & anonymized reporting')}</li>
            <li>{t('Custom onboarding & training')}</li>
            <li>{t('Bulk user management')}</li>
            <li>{t('Private community support rooms')}</li>
            <li>{t('Branding options (logo/colors)')}</li>
            <li>{t('Priority support')}</li>
          </ul>
          <button className="btn-primary w-full animate-pulse-on-hover" onClick={() => window.location.href = 'mailto:sales@tuliza.co.ke?subject=Tuliza Institutional License Inquiry'}>{t('Contact Sales')}</button>
          <p className="text-xs text-gray-500 mt-4 text-center">
            <strong>{t('Data privacy:')}</strong> {t('All reporting is anonymized. No personal data is shared with institutions.')}<br/>
            <span className="block mt-2">{t('Contact us for a demo or to discuss your organization’s needs.')}</span>
          </p>
        </div>
      </div>
      <div className="mt-12 max-w-2xl text-center text-sm text-gray-600 dark:text-gray-300 animate-fade-in delay-400">
        <strong>{t('How Therapist Q&A Works:')}</strong> {t('Premium users can submit up to 10 questions per month to a licensed therapist. Answers are provided within 48 hours. This is for general advice only and does not replace ongoing therapy or crisis support.')}
      </div>
      <PremiumModal open={showPremium} onClose={() => setShowPremium(false)} />
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        @keyframes bounce-slight {
          0% { transform: scale(1) translateY(0); }
          30% { transform: scale(1.05) translateY(-8px); }
          60% { transform: scale(0.98) translateY(4px); }
          100% { transform: scale(1) translateY(0); }
        }
        .hover\:animate-bounce-slight:hover { animation: bounce-slight 0.5s; }
        @keyframes pulse-on-hover {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70% { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        .animate-pulse-on-hover:hover { animation: pulse-on-hover 0.7s; }
      `}</style>
    </div>
  );
} 