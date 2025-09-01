import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const PostingResults = ({ results }) => {
  const { success, failed } = results;

  const getPlatformIcon = (platform) => {
    const icons = {
      telegram: '📱',
      viber: '💬'
    };
    return icons[platform] || '🌐';
  };

  const getPlatformName = (platform) => {
    const names = {
      telegram: 'Telegram',
      viber: 'Viber'
    };
    return names[platform] || platform;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Posting Results
      </h3>

      {/* Success Results */}
      {success.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" />
            Successful Posts ({success.length})
          </h4>
          <div className="space-y-2">
            {success.map((result, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <span className="text-lg mr-3">{getPlatformIcon(result.platform)}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">
                    {getPlatformName(result.platform)}
                  </p>
                  <p className="text-xs text-green-600">
                    {result.message}
                  </p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Failed Results */}
      {failed.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
            <XCircle className="h-4 w-4 mr-1" />
            Failed Posts ({failed.length})
          </h4>
          <div className="space-y-2">
            {failed.map((result, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <span className="text-lg mr-3">{getPlatformIcon(result.platform)}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">
                    {getPlatformName(result.platform)}
                  </p>
                  <p className="text-xs text-red-600">
                    {result.error}
                  </p>
                </div>
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            Total: {success.length + failed.length} platforms
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-green-600">
              ✓ {success.length} successful
            </span>
            <span className="text-red-600">
              ✗ {failed.length} failed
            </span>
          </div>
        </div>
      </div>

      {/* Error Help */}
      {failed.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Need help with failed posts?
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Check your API credentials and platform settings. Make sure your tokens and IDs are correctly configured.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostingResults;
