import React, { useState } from 'react';
import { X, Save, Tag, Smile } from 'lucide-react';

const JournalEntryForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 5,
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({});

  const moodEmojis = ['😢', '😟', '😐', '😊', '😄'];
  const moodLabels = ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent'];

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

  const handleMoodChange = (mood) => {
    setFormData(prev => ({
      ...prev,
      mood
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim().toLowerCase()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">New Journal Entry</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={`input-field ${errors.title ? 'border-red-300 focus:ring-red-500 dark:border-red-600' : ''}`}
            placeholder="How are you feeling today?"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Mood Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <Smile className="inline h-4 w-4 mr-1" />
            Mood Level: {moodLabels[formData.mood - 1]} ({formData.mood}/10)
          </label>
          <div className="space-y-4">
            <input
              type="range"
              min="1"
              max="10"
              value={formData.mood}
              onChange={(e) => handleMoodChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #f59e0b 25%, #eab308 50%, #22c55e 75%, #16a34a 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>1 - Very Low</span>
              <span>5 - Neutral</span>
              <span>10 - Excellent</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            What's on your mind?
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            value={formData.content}
            onChange={handleChange}
            className={`input-field resize-none ${errors.content ? 'border-red-300 focus:ring-red-500 dark:border-red-600' : ''}`}
            placeholder="Write about your thoughts, feelings, experiences, or anything that's important to you today..."
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Tag className="inline h-4 w-4 mr-1" />
            Tags (optional)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-sm rounded-full"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={handleTagKeyPress}
              className="input-field flex-1"
              placeholder="Add a tag (e.g., work, family, anxiety)"
            />
            <button
              type="button"
              onClick={addTag}
              className="btn-secondary"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Tags help you organize and find your entries later
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="btn-primary flex items-center space-x-2 flex-1"
          >
            <Save className="h-4 w-4" />
            <span>Save Entry</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalEntryForm;