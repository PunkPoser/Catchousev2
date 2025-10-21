import React, { useState } from 'react';
import Button from './Button';

const CommentModal = ({ isOpen, onClose, post, onSubmitComment }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onSubmitComment) {
        onSubmitComment({
          postId: post.id,
          comment: comment.trim(),
          author: 'Maya Webb',
          title: 'First-time Buyer',
          timestamp: new Date().toLocaleString()
        });
      }
      setComment('');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-t-3xl w-full max-w-md mx-4 mb-4 transform transition-transform duration-300 ease-out">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Add a comment</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Post Preview */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src={`https://i.pravatar.cc/40?img=${post.id + 10}`}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{post.author.name}</p>
              <p className="text-gray-500 text-xs">Replying to</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
            {post.text}
          </p>
        </div>

        {/* Comment Input */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="https://i.pravatar.cc/40?img=blonde"
                alt="Maya Webb"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-3 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{comment.length}/500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 pt-0">
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleSubmit}
              disabled={!comment.trim() || isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
