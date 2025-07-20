import React, { useState, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';

const faqs = [
  {
    question: 'Is Tuliza really private?',
    answer: 'Yes! Your journal and data are only visible to you. We never share your information.'
  },
  {
    question: 'How do I join a support room?',
    answer: 'Go to the Support Rooms page and select a room that matches your needs. You can join anonymously.'
  },
  {
    question: 'What resources are available?',
    answer: 'Tuliza provides Kenyan helplines, emergency contacts, daily affirmations, and support rooms for peer support.'
  },
  {
    question: 'How do I change my password?',
    answer: 'Go to Settings > Privacy & Security and click Change Password.'
  },
  {
    question: 'Is Tuliza free?',
    answer: 'Yes, Tuliza is free for all users.'
  },
  {
    question: 'Can I use Tuliza on my phone?',
    answer: 'Yes! Tuliza is fully mobile responsive and works great on any device.'
  },
  {
    question: 'Are support rooms moderated?',
    answer: 'Yes, moderators help keep the rooms safe and supportive. You can report any issues at any time.'
  },
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleQuestion = (faq) => {
    setMessages((msgs) => [
      ...msgs,
      { from: 'user', text: faq.question },
      { from: 'bot', text: faq.answer }
    ]);
  };

  const handleOpen = () => {
    setOpen(true);
    setMessages([]);
  };

  React.useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        className="fixed bottom-24 right-4 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg focus:outline-none"
        onClick={handleOpen}
        aria-label="Open Chatbot"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      {/* Chatbot Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-end sm:items-center justify-end sm:justify-end z-50">
          <div className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm m-0 sm:m-8 p-4 flex flex-col h-3/4 sm:h-[32rem]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-green-700 dark:text-green-200">Tuliza Chatbot</span>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto mb-2 space-y-2">
              {messages.length === 0 && (
                <div className="text-gray-500 text-sm text-center mt-8">How can I help you today?</div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${msg.from === 'user' ? 'bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {faqs.map((faq, i) => (
                  <button
                    key={i}
                    className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 rounded-full px-3 py-1 text-xs font-medium hover:bg-green-200 dark:hover:bg-green-700 transition"
                    onClick={() => handleQuestion(faq)}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 