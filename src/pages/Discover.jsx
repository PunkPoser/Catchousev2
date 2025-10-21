import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import GradientButton from '../components/ui/GradientButton';
import PropertySlider from '../components/ui/PropertySlider';
import CommunityCard from '../components/ui/CommunityCard';
import CommentModal from '../components/ui/CommentModal';
import { neighborhoods, properties, user, featuredMatchPercentages, newListingMatchPercentages, communityPosts } from '../data/mockData';

const Discover = ({ onNavigateToSearch }) => {
  const [commentModal, setCommentModal] = useState({ isOpen: false, post: null });

  const handleComment = (post) => {
    setCommentModal({ isOpen: true, post });
  };

  const handleCloseComment = () => {
    setCommentModal({ isOpen: false, post: null });
  };

  const handleSubmitComment = (commentData) => {
    console.log('New comment submitted:', commentData);
    // In a real app, this would update the post's comment count
    // For now, we'll just log it
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Removed for cleaner focus */}

      {/* Featured Properties */}
      <div className="py-6">
        <PropertySlider 
          title="Featured Properties" 
          properties={properties.slice(0, 4)} 
          matchPercentages={featuredMatchPercentages}
        />
      </div>

      {/* New Listings */}
      <div className="py-6">
        <PropertySlider 
          title="New Listings" 
          properties={properties} 
          matchPercentages={newListingMatchPercentages}
        />
      </div>

      {/* Community Updates */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Updates</h2>
        <div>
          {communityPosts.map((post) => (
            <CommunityCard key={post.id} post={post} onComment={handleComment} />
          ))}
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={commentModal.isOpen}
        onClose={handleCloseComment}
        post={commentModal.post}
        onSubmitComment={handleSubmitComment}
      />
    </div>
  );
};

export default Discover;
