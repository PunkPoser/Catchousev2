import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import SegmentedTabs from '../components/ui/SegmentedTabs';
import CommunityCard from '../components/ui/CommunityCard';
import PostCreationModal from '../components/ui/PostCreationModal';
import CommentModal from '../components/ui/CommentModal';
import { communityPosts, communityEvents, communityGroups, neighborhoodRituals } from '../data/mockData';

const Community = ({ initialTab = 'feed', initialFilter = 'all', onTabChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeCommunityFilter, setActiveCommunityFilter] = useState(initialFilter);
  const [posts, setPosts] = useState(communityPosts);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [commentModal, setCommentModal] = useState({ isOpen: false, post: null });

  const tabOptions = useMemo(() => [
    { label: 'Feed', value: 'feed' },
    { label: 'Events', value: 'events' },
    { label: 'Communities', value: 'communities' },
    { label: 'Rituals', value: 'rituals' }
  ], []);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    setActiveCommunityFilter(initialFilter);
  }, [initialFilter]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (typeof onTabChange === 'function') {
      onTabChange(value);
    }
  };

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

  const filteredFeedPosts = useMemo(() => {
    if (activeCommunityFilter === 'all') {
      return posts;
    }
    return posts.filter((post) => post.neighborhoodId === activeCommunityFilter);
  }, [posts, activeCommunityFilter]);

  const neighborhoodFilterOptions = useMemo(() => {
    const unique = new Map();
    communityPosts.forEach((post) => {
      if (post.neighborhoodId) {
        unique.set(post.neighborhoodId, post.neighborhoodName ?? post.neighborhoodId);
      }
    });
    return [{ label: 'All neighborhoods', value: 'all' }, ...Array.from(unique.entries()).map(([value, label]) => ({ value, label }))];
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'events':
        return (
          <div className="space-y-4">
            {communityEvents.map((event) => (
              <Card key={event.id}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-primary-600 font-semibold">{event.date}</p>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">{event.title}</h3>
                    </div>
                    <span className="rounded-full bg-primary-50 text-primary-600 text-xs font-medium px-3 py-1">{event.rsvpCount} going</span>
                  </div>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1">{event.location}</span>
                    {event.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-primary-50 text-primary-600 text-xs font-medium px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                    Save to calendar
                  </button>
                </div>
              </Card>
            ))}
          </div>
        );
      case 'communities':
        return (
          <div className="space-y-4">
            {communityGroups.map((group) => (
              <Card key={group.id}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                      <p className="text-sm text-gray-600">{group.description}</p>
                    </div>
                    <span className="rounded-full bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1">
                      {group.members} members
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary-50 text-primary-600 text-xs font-medium px-3 py-1">
                      {group.meetups}
                    </span>
                    {group.vibe.map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                    Request to join
                  </button>
                </div>
              </Card>
            ))}
          </div>
        );
      case 'rituals':
        return (
          <div className="space-y-4">
            {neighborhoodRituals.map((ritual) => (
              <Card key={ritual.id}>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wide text-primary-600 font-semibold">{ritual.time}</p>
                  <h3 className="text-lg font-semibold text-gray-900">{ritual.title}</h3>
                  <p className="text-sm text-gray-600">{ritual.description}</p>
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase">In {ritual.neighborhood}</span>
                    <span className="text-xs text-gray-500">{ritual.host}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );
      case 'feed':
      default:
        return (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {neighborhoodFilterOptions.map((option) => {
                const isActive = activeCommunityFilter === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setActiveCommunityFilter(option.value)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'border-primary-500 bg-primary-50 text-primary-600 shadow-soft'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-primary-200 hover:text-primary-600'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <div className="space-y-4">
              {filteredFeedPosts.map((post) => (
                <CommunityCard
                  key={post.id}
                  post={post}
                  onComment={handleComment}
                  onSelectNeighborhood={(neighborhoodId) => {
                    setActiveCommunityFilter(neighborhoodId ?? 'all');
                  }}
                  onViewNeighborhood={(postData) => setActiveCommunityFilter(postData?.neighborhoodId ?? 'all')}
                />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 space-y-6">

        {/* Segmented Control */}
        <div className="flex justify-center">
          <SegmentedTabs
            options={tabOptions}
            activeOption={activeTab}
            onOptionChange={handleTabChange}
          />
        </div>

        {/* Tab Content */}
        {renderTabContent()}

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
