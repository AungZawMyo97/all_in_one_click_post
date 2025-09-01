import React from 'react';
import { Check } from 'lucide-react';

const PlatformSelector = ({ platforms, selectedPlatforms, onSelectionChange }) => {
  const handlePlatformToggle = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      onSelectionChange(selectedPlatforms.filter(id => id !== platformId));
    } else {
      onSelectionChange([...selectedPlatforms, platformId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPlatforms.length === platforms.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(platforms.map(platform => platform.id));
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Select Platforms
        </h3>
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {selectedPlatforms.length === platforms.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {platforms.map(platform => (
          <div
            key={platform.id}
            className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
              selectedPlatforms.includes(platform.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => handlePlatformToggle(platform.id)}
          >
            <div className="flex items-center flex-1">
              <span className="text-2xl mr-3">{platform.icon}</span>
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {platform.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {platform.description}
                </p>
              </div>
            </div>
            
            {selectedPlatforms.includes(platform.id) && (
              <div className="absolute top-2 right-2">
                <div className="bg-blue-500 rounded-full p-1">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            <span className="font-medium">
              {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''}
            </span>{' '}
            selected for posting
          </p>
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;
