import React, { useState, useEffect } from 'react';
import { LogOut, Send, Image, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import PostingForm from './PostingForm';
import PlatformSelector from './PlatformSelector';
import PostingResults from './PostingResults';

const Dashboard = ({ user, onLogout }) => {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postingResults, setPostingResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get('/api/posts/platforms');
      setPlatforms(response.data.platforms);
    } catch (error) {
      // Failed to fetch platforms
    }
  };

  const handlePost = async (content, imageUrl) => {
    if (selectedPlatforms.length === 0) {
      alert('Please select at least one platform');
      return;
    }

    setLoading(true);
    setPostingResults(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/posts/publish', {
        content,
        platforms: selectedPlatforms,
        imageUrl
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setPostingResults(response.data.results);
    } catch (error) {
      setPostingResults({
        success: [],
        failed: selectedPlatforms.map(platform => ({
          platform,
          error: error.response?.data?.error || 'Posting failed'
        }))
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Social Posting Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, {user?.username || 'User'}!
              </p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Posting Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Create New Post
              </h2>
              
              <PlatformSelector
                platforms={platforms}
                selectedPlatforms={selectedPlatforms}
                onSelectionChange={setSelectedPlatforms}
              />

              <PostingForm
                onSubmit={handlePost}
                loading={loading}
              />
            </div>
          </div>

          {/* Right Column - Results & Info */}
          <div className="space-y-6">
            {/* Platform Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Platform Status
              </h3>
              <div className="space-y-3">
                {platforms.map(platform => (
                  <div key={platform.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{platform.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {platform.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {selectedPlatforms.includes(platform.id) ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-300" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Posting Results */}
            {postingResults && (
              <PostingResults results={postingResults} />
            )}

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Select multiple platforms to post simultaneously</li>
                <li>• Add images to make your posts more engaging</li>
                <li>• Use hashtags to increase visibility</li>
                <li>• Schedule posts for optimal timing</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
