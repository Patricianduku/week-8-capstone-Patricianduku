import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { getTodaysAffirmation } from '../data/affirmations';

const TodaysAffirmation = () => {
  const affirmation = getTodaysAffirmation();

  return (
    <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
              Today's Affirmation
            </h3>
          </div>
          <p className="text-primary-800 dark:text-primary-200 leading-relaxed italic">
            "{affirmation}"
          </p>
          <p className="text-xs text-primary-600 dark:text-primary-400 mt-3">
            Take a moment to breathe and let this message resonate with you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodaysAffirmation;