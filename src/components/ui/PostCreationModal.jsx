import React, { useState } from 'react';
import Button from './Button';

const PostCreationModal = ({ isOpen, onClose, onSubmitPost }) => {
  const [postText, setPostText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxChars = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    onSubmitPost({
      text: postText.trim(),
      author: { name: "Maya W", title: "First-time Buyer" }, // Maya's name and title
      comments: 0,
      likes: 0,
      image: "new_post.jpg"
    });
    
    setIsSubmitting(false);
    setPostText('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-t-3xl w-full max-w-md p-4 shadow-strong transform transition-transform duration-300 ease-out translate-y-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Share Something</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-gray-800"
              rows="4"
              placeholder="Share what you love about your neighborhood..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              maxLength={maxChars}
              disabled={isSubmitting}
            ></textarea>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {postText.length}/{maxChars}
              </span>
              <Button 
                type="submit" 
                variant="primary" 
                size="sm" 
                className="px-4 py-2"
                disabled={!postText.trim() || isSubmitting}
              >
                {isSubmitting ? 'Sharing...' : 'Share Post'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCreationModal;
