import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SegmentedTabs from '../components/ui/SegmentedTabs';
import CommunityCard from '../components/ui/CommunityCard';
import PostCreationModal from '../components/ui/PostCreationModal';
import CommentModal from '../components/ui/CommentModal';
import { communityPosts } from '../data/mockData';

const Community = () => {
  const [activeTab, setActiveTab] = useState('foryou');
  const [posts, setPosts] = useState(communityPosts);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [commentModal, setCommentModal] = useState({ isOpen: false, post: null });

  const tabOptions = [
    { label: 'For You', value: 'foryou' },
    { label: 'Asheville', value: 'asheville' },
    { label: 'Following', value: 'following' }
  ];

  const handleCreatePost = (postData) => {
    const newPost = {
      id: posts.length + 1,
      ...postData,
      timestamp: "Just now"
    };
    setPosts([newPost, ...posts]);
  };

  const handleComment = (post) => {
    setCommentModal({ isOpen: true, post });
  };

  const handleCloseComment = () => {
    setCommentModal({ isOpen: false, post: null });
  };

  const handleSubmitComment = (commentData) => {
    console.log('New comment submitted:', commentData);
    // In a real app, this would update the post's comment count
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 space-y-6">

        {/* Segmented Control */}
        <div className="flex justify-center">
          <SegmentedTabs
            options={tabOptions}
            activeOption={activeTab}
            onOptionChange={setActiveTab}
          />
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <CommunityCard key={post.id} post={post} onComment={handleComment} />
          ))}
        </div>

        {/* Create Post Button */}
        <div className="fixed bottom-20 right-4 z-40">
          <button 
            onClick={() => setIsCreatingPost(true)}
            className="w-14 h-14 bg-primary-500 text-white rounded-full shadow-strong flex items-center justify-center hover:bg-primary-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        {/* Post Creation Modal */}
        <PostCreationModal
          isOpen={isCreatingPost}
          onClose={() => setIsCreatingPost(false)}
          onSubmitPost={handleCreatePost}
        />

        {/* Comment Modal */}
        <CommentModal
          isOpen={commentModal.isOpen}
          onClose={handleCloseComment}
          post={commentModal.post}
          onSubmitComment={handleSubmitComment}
        />
      </div>
    </div>
  );
};

export default Community;
