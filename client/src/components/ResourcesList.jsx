import React from 'react';
import { Phone, Globe, Clock, ExternalLink } from 'lucide-react';

const ResourcesList = ({ resources }) => {
  const getResourceIcon = (type) => {
    switch (type) {
      case 'crisis':
        return <Phone className="h-5 w-5 text-red-600" />;
      case 'professional':
        return <Globe className="h-5 w-5 text-primary-600" />;
      case 'online':
        return <Globe className="h-5 w-5 text-green-600" />;
      case 'support':
        return <Globe className="h-5 w-5 text-purple-600" />;
      default:
        return <Globe className="h-5 w-5 text-gray-600" />;
    }
  };

  const getResourceColor = (type) => {
    switch (type) {
      case 'crisis':
        return 'border-red-200 hover:border-red-300 hover:shadow-red-100';
      case 'professional':
        return 'border-primary-200 hover:border-primary-300 hover:shadow-primary-100';
      case 'online':
        return 'border-green-200 hover:border-green-300 hover:shadow-green-100';
      case 'support':
        return 'border-purple-200 hover:border-purple-300 hover:shadow-purple-100';
      default:
        return 'border-gray-200 hover:border-gray-300 hover:shadow-gray-100';
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource, index) => (
        <div
          key={index}
          className={`bg-white dark:bg-gray-800 rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-lg ${getResourceColor(resource.type)}`}
        >
          <div className="flex items-start space-x-3 mb-4">
            {getResourceIcon(resource.type)}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {resource.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {resource.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <a
                  href={`tel:${resource.phone.replace(/[^\d]/g, '')}`}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm"
                >
                  {resource.phone}
                </a>
              </div>
            )}

            {resource.website && (
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <a
                  href={`https://${resource.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm"
                >
                  {resource.website}
                </a>
              </div>
            )}

            {resource.availability && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {resource.availability}
                </span>
              </div>
            )}
          </div>

          {resource.type === 'crisis' && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                  Available 24/7
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResourcesList;