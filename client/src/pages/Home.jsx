import React from "react";
import { Smile, MessageCircle, Phone, Sun, Heart, Plus, Minus, Info, Lock, Users, UserCircle, Users as UsersIcon, HeartHandshake } from "lucide-react";
import tulizaLogo from "../assets/tuliza-logo.png";
import heroIllustration from "../assets/hero-illustration.png";
import featureSupport from "../assets/feature-support.png";
import featureJournal from "../assets/feature-journal.png";
import featureCommunity from "../assets/feature-community.png";
import featureEmpathy from "../assets/feature-empathy.png";
import featureEncouragement from "../assets/feature-encouragement.png";
import featureResources from "../assets/feature-resources.png";
import testimonialQuote from "../assets/testimonial-quote.png";
import phoneMockup from '../assets/feature-encouragement.png'; // Use your phone mockup or a relevant image
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = React.useState(null);

  // Move translation-dependent arrays inside the component
  const features = [
    {
      img: featureJournal,
      title: t('feature_journal_title'),
      desc: t('feature_journal_desc')
    },
    {
      img: featureSupport,
      title: t('feature_support_title'),
      desc: t('feature_support_desc')
    },
    {
      img: featureCommunity,
      title: t('feature_community_title'),
      desc: t('feature_community_desc')
    },
    {
      img: featureResources,
      title: t('feature_resources_title'),
      desc: t('feature_resources_desc')
    },
    {
      img: featureEncouragement,
      title: t('feature_encouragement_title'),
      desc: t('feature_encouragement_desc')
    },
  ];

  const howItWorks = [
    {
      img: featureJournal,
      title: t('howitworks_journal_title'),
      desc: t('howitworks_journal_desc')
    },
    {
      img: featureSupport,
      title: t('howitworks_support_title'),
      desc: t('howitworks_support_desc')
    },
    {
      img: featureEmpathy,
      title: t('howitworks_empathy_title'),
      desc: t('howitworks_empathy_desc')
    },
  ];

  const testimonials = [
    {
      quote: t('testimonial_1_quote'),
      name: t('testimonial_1_name'),
      img: testimonialQuote,
    },
    {
      quote: t('testimonial_2_quote'),
      name: t('testimonial_2_name'),
      img: testimonialQuote,
    },
    {
      quote: t('testimonial_3_quote'),
      name: t('testimonial_3_name'),
      img: testimonialQuote,
    },
    {
      quote: t('testimonial_4_quote'),
      name: t('testimonial_4_name'),
      img: testimonialQuote,
    },
    {
      quote: t('testimonial_5_quote'),
      name: t('testimonial_5_name'),
      img: testimonialQuote,
    },
    {
      quote: t('testimonial_6_quote'),
      name: t('testimonial_6_name'),
      img: testimonialQuote,
    },
  ];

  const faqs = [
    {
      question: t('faq_1_question'),
      answer: t('faq_1_answer'),
    },
    {
      question: t('faq_2_question'),
      answer: t('faq_2_answer'),
    },
    {
      question: t('faq_3_question'),
      answer: t('faq_3_answer'),
    },
    {
      question: t('faq_4_question'),
      answer: t('faq_4_answer'),
    },
  ];

  // Helper to duplicate testimonials for seamless marquee
  const marqueeTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const fadeInClass = "animate-fade-in";

  // Replace phoneMockup with a neutral SVG/illustration for the phone section
  const phoneIllustration = (
    <svg width="120" height="240" viewBox="0 0 120 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="100" height="220" rx="20" fill="#e0e7ef" stroke="#38bdf8" strokeWidth="4"/>
      <rect x="25" y="35" width="70" height="160" rx="10" fill="#fff" />
      <circle cx="60" cy="210" r="7" fill="#38bdf8" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 flex flex-col items-center px-2 sm:px-4 overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center py-16 px-4 bg-white dark:bg-primary-900">
        <div className="flex-1 text-center md:text-left">
          <img src={tulizaLogo} alt="Tuliza Logo" className="h-40 w-auto mx-auto md:mx-0 mb-8" />
          <h1 className="text-6xl sm:text-7xl font-extrabold mb-8 text-gray-800 dark:text-white">{t('Tuliza: Find Your Calm')}</h1>
          <p className="text-lg sm:text-xl font-medium mb-8 text-gray-700 dark:text-gray-100">
            {t('Tuliza is your privacy-first mental wellness companion for Kenya. Track your mood, journal your thoughts, and connect with supportive communities. Our mission is to empower Kenyan youth and communities with safe, stigma-free mental health support.')}
          </p>
          <a href="/register" className="inline-block bg-green-600 text-white px-10 py-4 rounded-lg font-semibold shadow hover:bg-green-700 transition text-xl">
            {t('Get Started')}
          </a>
        </div>
        <img src={heroIllustration} alt="Mental health illustration" className="flex-1 max-w-xs md:max-w-md mx-auto mt-8 md:mt-0" />
      </section>

      {/* Why Mental Health Matters */}
      <section className="fadeIn shadow-md rounded-xl p-6 md:w-3/4 mx-auto mb-12 bg-green-50 dark:bg-primary-900">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{t('Why Mental Health Matters')}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-100">
          {t('Mental health issues are rising in Kenya, especially among youth. Yet stigma and lack of access make it hard to seek help. Tuliza offers a safe, stigma-free path to healing.')}
        </p>
      </section>

      {/* Our Mission & Vision (existing) */}
      <section className="w-full max-w-4xl mx-auto py-8 px-4 text-center bg-white dark:bg-primary-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t('Our Mission')}</h2>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          {t('To empower every Kenyan youth, student, and community member to access mental health support, find community, and thrive—free from stigma and judgment.')}
        </p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t('Our Vision')}</h2>
        <p className="text-gray-700 dark:text-gray-100">
          {t('A Kenya where mental health is valued, supported, and accessible to all.')}
        </p>
      </section>

      {/* Target Demographic Section */}
      <section className="w-full max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8 text-green-800 dark:text-green-200 text-center">{t('Target Demographic')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-100 dark:bg-green-800 rounded-xl p-6 shadow text-center hover:scale-105 transition-all">
            <h3 className="font-semibold text-lg mb-2">{t('Youth Aged 15–35')}</h3>
            <p>{t('This demographic is crucial as they represent the largest segment of Kenyan youth, with a significant need for mental health support.')}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-800 rounded-xl p-6 shadow text-center hover:scale-105 transition-all">
            <h3 className="font-semibold text-lg mb-2">{t('Urban High Schoolers')}</h3>
            <p>{t('Urban high school students are particularly vulnerable to mental health challenges due to academic pressure and social dynamics.')}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-800 rounded-xl p-6 shadow text-center hover:scale-105 transition-all">
            <h3 className="font-semibold text-lg mb-2">{t('University Students')}</h3>
            <p>{t('University students often face a new set of stressors, including academic demands, social isolation, and identity exploration.')}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-800 rounded-xl p-6 shadow text-center hover:scale-105 transition-all">
            <h3 className="font-semibold text-lg mb-2">{t('Young Professionals')}</h3>
            <p>{t('Young professionals may experience a transition from student life to the workforce, which can be challenging and impactful on mental health.')}</p>
          </div>
        </div>
      </section>

      {/* Breaker Section: Mental Health in Kenya */}
      <section className="w-full max-w-3xl mx-auto py-8 px-4 mb-8 text-center bg-green-50 dark:bg-primary-800 rounded-xl shadow fadeIn">
        <h3 className="text-2xl font-bold text-green-700 dark:text-green-200 mb-2">{t('Why We Focus on Youth')}</h3>
        <p className="text-lg text-gray-700 dark:text-gray-100">{t('75% of mental health conditions begin before age 24. In Kenya, youth face unique pressures—academic, social, and economic—that make early support critical. Tuliza is here to help you thrive.')}</p>
      </section>

      {/* Overcoming Stigma and Barriers Section */}
      <section className="w-full max-w-4xl mx-auto py-10 px-6 mb-10 text-center bg-white dark:bg-primary-900 rounded-xl shadow-lg border-l-8 border-green-400 fadeIn">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-200 mb-2">{t('Overcoming Stigma and Barriers')}</h2>
        <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4">{t('Breaking the Silence on Mental Health')}</h3>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          {t('In Kenya, many people still face stigma, shame, and misunderstanding when it comes to mental health. Myths and misconceptions can prevent individuals from seeking the help they need. At Tuliza, we believe that mental health is just as important as physical health.')}
        </p>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          {t('We are committed to breaking the silence—by providing a safe, anonymous space for you to share, learn, and heal. Our platform offers resources, real stories, and supportive communities to help you overcome barriers and find your voice.')}
        </p>
        <p className="text-green-800 dark:text-green-200 font-semibold mb-2">{t('Let’s end the stigma together. Your story matters. Your feelings are valid. You are not alone.')}</p>
        <p className="text-gray-700 dark:text-gray-100 mt-4">
          {t('Many people don’t know where to turn for help, or may not recognize the signs of mental health challenges. Tuliza provides easy access to information, Kenyan helplines, and daily tips to empower you with knowledge and support.')}
        </p>
      </section>

      {/* Comprehensive Resource Network Section */}
      <section className="w-full max-w-4xl mx-auto py-10 px-6 mb-10 text-center bg-green-50 dark:bg-primary-800 rounded-xl shadow fadeIn">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-200 mb-4">{t('Comprehensive Resource Network')}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-100 mb-4">
          {t('Tuliza connects you to a network of trusted Kenyan mental health resources. Whether you need to talk to someone, find emergency help, or access self-care tools, our platform makes it easy.')}
        </p>
        <ul className="text-left text-gray-700 dark:text-gray-100 mb-6 max-w-xl mx-auto list-disc list-inside">
          <li><span className="font-semibold">{t('Kenyan Helplines:')}</span> {t('Direct access to verified crisis and support lines.')}</li>
          <li><span className="font-semibold">{t('Emergency Contacts:')}</span> {t('Quick links for urgent help, available 24/7.')}</li>
          <li><span className="font-semibold">{t('Self-Help Tools:')}</span> {t('Daily affirmations, mood tracking, and educational content.')}</li>
        </ul>
        <div className="bg-white dark:bg-green-900 rounded-lg shadow p-6 mt-4">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-200 mb-2">{t('Our Support Rooms')}</h3>
          <p className="text-gray-700 dark:text-gray-100">
            {t('In addition to professional resources, Tuliza’s anonymous support rooms let you connect with peers who understand your journey. Share your story, ask questions, and get real-time encouragement in a safe, moderated space. You’re never alone—our community is here for you, every step of the way.')}
          </p>
        </div>
      </section>

      {/* Features Section (5 feature cards) */}
      <section className="w-full max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 bg-white dark:bg-primary-900">
        {features.map((f, i) => (
          <div
            key={i}
            className={`relative border-2 border-green-400 group bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden flex flex-col justify-end min-h-[250px] transition-transform transition-colors duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-green-400/50 hover:border-green-500 group-hover:shadow-2xl ${fadeInClass}`}
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.10), rgba(0,0,0,0.20)), url(${f.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="relative z-10 p-6 text-center flex flex-col items-center text-white">
              <h3 className="text-lg font-semibold drop-shadow">{f.title}</h3>
              <p className="mt-2 text-sm drop-shadow">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Your Data, Your Control */}
      <section className="p-6 shadow-lg rounded-lg flex items-center gap-6 mb-12 fadeIn bg-green-50 dark:bg-primary-900">
        <div className="flex-shrink-0">
          <Lock className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Your Data, Your Control</h2>
          <p className="text-gray-700 dark:text-gray-100 text-lg">
            Tuliza never shares your data. Your journal is encrypted, your support chats are anonymous. You control what you share.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-5xl mx-auto py-12 px-4 bg-white dark:bg-primary-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">How Tuliza Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.map((step, i) => (
            <div
              key={i}
              className={`relative border-2 border-green-400 group bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden flex flex-col justify-end min-h-[250px] transition-transform transition-colors duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-green-400/50 hover:border-green-500 group-hover:shadow-2xl ${fadeInClass}`}
              style={{
                backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.10), rgba(0,0,0,0.20)), url(${step.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              <div className="relative z-10 p-6 text-center flex flex-col items-center text-white">
                <h3 className="text-lg font-semibold drop-shadow">{step.title}</h3>
                <p className="mt-2 text-sm drop-shadow">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features at a Glance */}
      <section className="grid md:grid-cols-3 gap-6 p-8 rounded-xl mb-12 bg-green-50 dark:bg-primary-900">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition p-6">
          <Smile className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">{t('Private Mood Journal')}</h3>
          <p className="text-gray-700 dark:text-gray-100 text-sm">{t('Track your mood, add notes, and see your progress over time.')}</p>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition p-6">
          <MessageCircle className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">{t('Anonymous Support Rooms')}</h3>
          <p className="text-gray-700 dark:text-gray-100 text-sm">{t('Join themed chat rooms and connect with others anonymously.')}</p>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition p-6">
          <Phone className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">{t('Kenyan Helplines')}</h3>
          <p className="text-gray-700 dark:text-gray-100 text-sm">{t('Access real, working Kenyan mental health contacts and emergency support.')}</p>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition p-6">
          <Heart className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">{t('Panic Button')}</h3>
          <p className="text-gray-700 dark:text-gray-100 text-sm">{t('Get immediate help in a crisis with one tap.')}</p>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition p-6">
          <Sun className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">{t('Affirmations')}</h3>
          <p className="text-gray-700 dark:text-gray-100 text-sm">{t('Receive daily encouragement and mental health tips.')}</p>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition p-6">
          <Users className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">{t('Community Forums')}</h3>
          <p className="text-gray-700 dark:text-gray-100 text-sm">{t('Share experiences, ask questions, and support each other.')}</p>
        </div>
      </section>

      {/* Behind Tuliza */}
      <section className="p-8 rounded-xl shadow-sm mb-12 bg-white dark:bg-primary-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('Behind Tuliza')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            {/* Replace with your real team photo if available */}
            <UserCircle className="h-24 w-24 text-green-600 dark:text-green-400 mb-2" />
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{t('Kenyan Mental Health Advocates')}</h3>
            <p className="text-gray-700 dark:text-gray-100 text-sm text-center">{t('Created by Kenyans, for Kenyans. Our team deeply understands local challenges and is committed to your wellness journey.')}</p>
          </div>
          <div className="flex flex-col items-center">
            {/* Replace with your real team photo if available */}
            <HeartHandshake className="h-24 w-24 text-green-600 dark:text-green-400 mb-2" />
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{t('A Movement, Not Just an App')}</h3>
            <p className="text-gray-700 dark:text-gray-100 text-sm text-center">{t('Tuliza is more than an app—it\'s a movement to break stigma and build a supportive community across Kenya.')}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section as Accordion */}
      <section className="w-full max-w-3xl mx-auto py-12 px-4 bg-green-50 dark:bg-primary-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">{t('Frequently Asked Questions')}</h2>
        <p className="text-center text-green-700 dark:text-green-200 mb-6 font-medium">{t('For more questions, use our chatbot in the corner!')}</p>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-green-300 rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-800 dark:text-white font-semibold focus:outline-none focus:bg-green-50 dark:focus:bg-gray-800 transition"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="flex items-center gap-2">
                  {openFaq === i ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {faq.question}
                </span>
              </button>
              <div
                className={`px-4 pb-3 text-gray-700 dark:text-gray-100 text-sm transition-all duration-300 ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                style={{ transitionProperty: 'max-height, opacity' }}
              >
                {openFaq === i && <div>{faq.answer}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Marquee Section (cards only) */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4 bg-white dark:bg-primary-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">{t('What Our Users Say')}</h2>
        <div className="overflow-hidden w-full">
          <div className="flex gap-6 animate-marquee" style={{ minWidth: '200%' }}>
            {marqueeTestimonials.map((t, i) => (
              <div key={i} className={`min-w-[300px] max-w-xs bg-white dark:bg-gray-800 border-2 border-green-400 rounded-lg shadow p-6 flex flex-col items-center mx-2 ${fadeInClass}`} style={{ flex: '0 0 auto' }}>
                <img src={t.img} alt="Quote" className="h-8 w-8 mb-2" />
                <p className="italic text-gray-700 dark:text-gray-100 mb-2">"{t.quote}"</p>
                <span className="text-sm text-green-600 dark:text-gray-100 font-semibold">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kenyan Focus Section as a background card */}
      <section className="w-full max-w-3xl mx-auto py-8 px-4 bg-green-50 dark:bg-primary-900">
        <div
          className={`relative rounded-xl shadow overflow-hidden flex flex-col justify-end min-h-[200px] transition-transform transition-colors duration-300 group ${fadeInClass}`}
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.10), rgba(0,0,0,0.20)), url(${featureCommunity})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
          <div className="relative z-10 p-8 text-center flex flex-col items-center text-white dark:text-black">
            <h3 className="text-xl font-bold drop-shadow mb-2">{t('Made for Kenya')}</h3>
            <p className="text-white dark:text-black">
              {t('Tuliza is built for Kenyan youth, students, and anyone seeking a safe, stigma-free space for mental wellness. All resources and support are tailored for Kenya.')} <br />
              <span className="font-semibold">{t('You are not alone. We are here for you.')}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="w-full max-w-3xl mx-auto py-12 px-4 text-center bg-white dark:bg-primary-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('Contact Us')}</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-100">{t('Have questions, feedback, or need support? Reach out to us anytime.')}</p>
        <a href="mailto:support@tuliza.co.ke" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition">{t('Email support@tuliza.co.ke')}</a>
      </section>
      {/* Fade-in, flip, and marquee animation keyframes */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease both; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @media (max-width: 768px) {
          .min-w-[300px] { min-width: 220px !important; }
        }
      `}</style>
      {/*
        ---
        IMAGE USAGE SUGGESTIONS FOR INDIVIDUAL PAGES:
        - featureJournal: Use in Journal page as a banner or section image.
        - featureSupport: Use in Support Rooms page.
        - featureCommunity: Use in About or Community page.
        - featureEmpathy: Use in Resources or Testimonials section.
        - featureEncouragement: Use in Affirmations or Tips section.
        - featureResources: Use in Resources page as a hero or info image.
        - heroIllustration: Use in Home hero section (already used).
        - testimonialQuote: Use in Testimonials or as a quote icon.
        - tulizaLogo: Use in Navbar, Footer, and as favicon.
      */}
    </div>
  );
}