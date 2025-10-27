import React, { useMemo, useRef, useState } from 'react';
import PropertySlider from '../components/ui/PropertySlider';
import CommunityCard from '../components/ui/CommunityCard';
import CommentModal from '../components/ui/CommentModal';
import SegmentedTabs from '../components/ui/SegmentedTabs';
import { neighborhoods, properties, featuredMatchPercentages, newListingMatchPercentages, communityPosts, communityEvents } from '../data/mockData';

const Discover = ({ onNavigateToCommunity }) => {
  const [commentModal, setCommentModal] = useState({ isOpen: false, post: null });
  const [activeCommunityFilter, setActiveCommunityFilter] = useState('all');
  const featuredRef = useRef(null);

  const activeNeighborhood = neighborhoods[0];
  const mapImageUrl = '/Images/google-maps-png-12.png';

  const handleScrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    // For now, we'll just log it
  };

  const filteredCommunityPosts = useMemo(() => (
    activeCommunityFilter === 'all'
      ? communityPosts
      : communityPosts.filter((post) => post.neighborhoodId === activeCommunityFilter)
  ), [activeCommunityFilter]);

  return (
    <div className="min-h-screen bg-gray-50 pt-2">
      {/* Hero Section - Removed for cleaner focus */}

      {/* Neighborhood Spotlight */}
      {activeNeighborhood && (
        <div className="px-4 pt-1 pb-4 space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">Neighborhood Spotlight</h2>
          <div className="relative bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-soft">
            <div className="relative h-64 bg-white px-2 pt-2 pb-2">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <img
                  src={mapImageUrl}
                  alt={`${activeNeighborhood.name} map`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="block h-3 w-3 rounded-full bg-primary-500 ring-4 ring-primary-500/30" />
                </div>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{activeNeighborhood.name}</h3>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  {activeNeighborhood.city}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeNeighborhood.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {activeNeighborhood.stories?.[0] && (
                <div className="rounded-2xl bg-gray-50 p-3">
                  <p className="text-sm italic text-gray-600">"{activeNeighborhood.stories[0].text}"</p>
                  <p className="mt-2 text-xs text-gray-500">— {activeNeighborhood.stories[0].author}</p>
                </div>
              )}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleScrollToFeatured}
                  className="inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  See matching homes
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateToCommunity && onNavigateToCommunity('communities', activeNeighborhood.id)}
                  className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Meet locals
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                    <path d="M7 4a3 3 0 016 0v1h1.5A1.5 1.5 0 0116 6.5V9h-1V6.5a.5.5 0 00-.5-.5H13v1a3 3 0 11-6 0v-1H5.5a.5.5 0 00-.5.5V9H4V6.5A1.5 1.5 0 015.5 5H7V4zm3-2a2 2 0 00-2 2v3a2 2 0 104 0V4a2 2 0 00-2-2z" />
                    <path d="M4 12a2 2 0 012-2h8a2 2 0 012 2v2.5a1.5 1.5 0 01-1.5 1.5H14v-.75a2.25 2.25 0 00-4.5 0V16h-1v-.75a2.25 2.25 0 00-4.5 0V16H5.5A1.5 1.5 0 014 14.5V12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Featured Properties */}
      <div ref={featuredRef} id="featured-properties" className="pt-2 pb-6">
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Community Updates</h2>
          <button
            type="button"
            onClick={() => onNavigateToCommunity && onNavigateToCommunity('events')}
            className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            View all
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {filteredCommunityPosts.map((post) => (
            <CommunityCard
              key={post.id}
              post={post}
              onComment={handleComment}
              onSelectNeighborhood={(neighborhoodId) => {
                if (onNavigateToCommunity) {
                  onNavigateToCommunity('feed', neighborhoodId);
                } else {
                  setActiveCommunityFilter(neighborhoodId ?? 'all');
                }
              }}
              onViewNeighborhood={(postData) => {
                if (onNavigateToCommunity && postData?.neighborhoodId) {
                  onNavigateToCommunity('events', postData.neighborhoodId);
                }
              }}
            />
          ))}
        </div>

        {/* Upcoming Highlight */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Coming up this week</h3>
          <div className="grid grid-cols-1 gap-3">
            {communityEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-soft">
                <div>
                  <p className="text-xs uppercase tracking-wide text-primary-600 font-semibold">{event.date}</p>
                  <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToCommunity && onNavigateToCommunity('events')}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700"
                >
                  See details
                </button>
              </div>
            ))}
          </div>
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
