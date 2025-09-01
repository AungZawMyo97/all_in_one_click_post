import React, { useState } from 'react';
import { Send, Image, X } from 'lucide-react';

const PostingForm = ({ onSubmit, loading }) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 1000;

  const handleContentChange = (e) => {
    const text = e.target.value;
    setContent(text);
    setCharCount(text.length);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const clearImageUrl = () => {
    setImageUrl('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Please enter some content to post');
      return;
    }
    onSubmit(content.trim(), imageUrl.trim() || null);
  };

  const handleClear = () => {
    setContent('');
    setImageUrl('');
    setCharCount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Content Textarea */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Post Content
        </label>
        <div className="relative">
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            rows={6}
            maxLength={maxChars}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="What's on your mind? Share your thoughts, updates, or announcements..."
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {charCount}/{maxChars}
          </div>
        </div>
      </div>

      {/* Image URL Input */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Image URL (Optional)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Image className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="https://example.com/image.jpg"
          />
          {imageUrl && (
            <button
              type="button"
              onClick={clearImageUrl}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Enter a direct link to an image (JPG, PNG, GIF)
        </p>
      </div>

      {/* Image Preview */}
      {imageUrl && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Image Preview</h4>
          <div className="relative">
            <img
              src={imageUrl}
              alt="Preview"
              className="max-w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden max-w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-sm text-gray-500">Image not available</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Clear
        </button>

        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <div className="loading-spinner mr-2"></div>
              Posting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Post to Selected Platforms
            </>
          )}
        </button>
      </div>

      {/* Character Limit Warning */}
      {charCount > maxChars * 0.8 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            {charCount > maxChars * 0.9 
              ? 'Character limit almost reached!' 
              : 'Approaching character limit'
            }
          </p>
        </div>
      )}
    </form>
  );
};

export default PostingForm;
