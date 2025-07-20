import React from 'react';

const AnonymousTag = ({ username }) => {
  // Generate a consistent color based on username
  const getColorFromUsername = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-gray-100 text-gray-800'
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };

  const colorClass = getColorFromUsername(username);

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {username}
    </span>
  );
};

export default AnonymousTag;