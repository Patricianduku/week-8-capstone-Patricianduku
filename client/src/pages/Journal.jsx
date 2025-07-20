import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, TrendingUp, Plus, Search, Filter } from 'lucide-react';
import JournalEntryForm from '../components/JournalEntryForm';
import MoodGraph from '../components/MoodGraph';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Journal = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  
  // Mock journal entries
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2025-07-19',
      mood: 7,
      title: 'Good day at work',
      content: 'Had a productive meeting with the team today. Feeling optimistic about the new project.',
      tags: ['work', 'productive', 'optimistic']
    },
    {
      id: 2,
      date: '2025-07-18',
      mood: 5,
      title: 'Mixed feelings',
      content: 'Some ups and downs today. Struggled with anxiety in the morning but felt better after talking to a friend.',
      tags: ['anxiety', 'friendship', 'support']
    },
    {
      id: 3,
      date: '2025-07-17',
      mood: 8,
      title: 'Great weekend',
      content: 'Spent time in nature, went for a long hike. Feeling refreshed and grateful.',
      tags: ['nature', 'exercise', 'grateful']
    }
  ]);

  const handleNewEntry = (entryData) => {
    const newEntry = {
      id: entries.length + 1,
      date: new Date().toISOString().split('T')[0],
      ...entryData
    };
    setEntries([newEntry, ...entries]);
    setShowEntryForm(false);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMood = selectedMood === 'all' || 
                       (selectedMood === 'low' && entry.mood <= 3) ||
                       (selectedMood === 'medium' && entry.mood >= 4 && entry.mood <= 6) ||
                       (selectedMood === 'high' && entry.mood >= 7);
    
    return matchesSearch && matchesMood;
  });

  const getMoodColor = (mood) => {
    if (mood <= 3) return 'text-red-600 bg-red-100';
    if (mood <= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getMoodLabel = (mood) => {
    if (mood <= 3) return t('Low');
    if (mood <= 6) return t('Medium');
    return t('High');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 flex flex-col items-center px-2 sm:px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('Your Journal')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('Track your thoughts, feelings, and mood patterns over time.')}
          </p>
        </div>

        {/* Mood Graph */}
        <div className="mb-8">
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('Mood Trends')}</h2>
            </div>
            <MoodGraph entries={entries} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowEntryForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>{t('New Entry')}</span>
          </button>
          
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder={t('Search entries...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="input-field pl-10 pr-8"
              >
                <option value="all">{t('All Moods')}</option>
                <option value="high">{t('High (7-10)')}</option>
                <option value="medium">{t('Medium (4-6)')}</option>
                <option value="low">{t('Low (1-3)')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-6">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {searchTerm || selectedMood !== 'all' ? t('No matching entries') : t('No entries yet')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {searchTerm || selectedMood !== 'all' 
                  ? t('Try adjusting your search or filter criteria.')
                  : t('Start your wellness journey by creating your first journal entry.')
                }
              </p>
              {!searchTerm && selectedMood === 'all' && (
                <button
                  onClick={() => setShowEntryForm(true)}
                  className="btn-primary"
                >
                  {t('Create First Entry')}
                </button>
              )}
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div key={entry.id} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(() => {
                        const d = new Date(entry.date);
                        const day = String(d.getDate()).padStart(2, '0');
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const year = d.getFullYear();
                        return `${day}/${month}/${year}`;
                      })()}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMoodColor(entry.mood)}`}>
                    {getMoodLabel(entry.mood)} ({entry.mood}/10)
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {entry.content}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Journal Entry Form Modal */}
        {showEntryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <JournalEntryForm
                onSubmit={handleNewEntry}
                onCancel={() => setShowEntryForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;