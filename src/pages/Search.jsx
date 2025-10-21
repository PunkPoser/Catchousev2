import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import SegmentedTabs from '../components/ui/SegmentedTabs';
import PropertyCard from '../components/ui/PropertyCard';
import { properties, featuredMatchPercentages, newListingMatchPercentages } from '../data/mockData';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('listings');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const tabOptions = [
    { label: 'Listings', value: 'listings' },
    { label: 'Areas', value: 'areas' }
  ];

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Walkable', value: 'walkable' },
    { label: 'Good Schools', value: 'schools' },
    { label: 'Near Parks', value: 'parks' },
    { label: 'Safe', value: 'safe' },
    { label: 'Budget $350-450k', value: 'budget' }
  ];

      const typingSuggestions = [
        "houses in asheville",
        "good schools near gym",
        "walkable with parks",
        "safe near restaurants",
        "family homes under $400k",
        "great nightlife areas",
        "quiet with good schools",
        "downtown lofts"
      ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // In a real app, this would trigger the search
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handlePlaceholderClick = () => {
    if (displayedText) {
      // Clear any existing text and set the clicked text
      setSearchQuery(displayedText);
      handleSearch(displayedText);
    }
  };

  // Type out placeholder suggestions character by character
  useEffect(() => {
    // If user has typed or input is focused, stop animation
    if (searchQuery || isInputFocused) {
      setIsTyping(false);
      setDisplayedText('');
      return;
    }
    
    const currentSuggestion = typingSuggestions[currentPromptIndex];
    setIsTyping(true);
    setDisplayedText('');
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < currentSuggestion.length) {
        setDisplayedText(currentSuggestion.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Wait a bit, then move to next suggestion
        setTimeout(() => {
          setCurrentPromptIndex((prev) => (prev + 1) % typingSuggestions.length);
        }, 1500);
      }
    }, 80);
    
    return () => {
      clearInterval(typingInterval);
      setIsTyping(false);
      setDisplayedText('');
    };
  }, [currentPromptIndex, searchQuery, isInputFocused]);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          @keyframes fadeInOut {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
      <div className="px-4 py-6 space-y-6">

        {/* Search Input */}
            <div>
              <SearchInput
                placeholder={displayedText || "ask me anything..."}
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                isTyping={isTyping}
                onPlaceholderClick={handlePlaceholderClick}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </div>

        {/* Tab Toggle and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <SegmentedTabs
              options={tabOptions}
              activeOption={activeTab}
              onOptionChange={setActiveTab}
            />
          </div>
          <div className="w-48">
            <div className="relative">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-full px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                {filterOptions.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

            {/* Results */}
            <div>

              {activeTab === 'listings' ? (
                <div className="space-y-4">
                  {properties.map((property, index) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      matchPercentage={newListingMatchPercentages[index]}
                      variant="list"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Map View for Areas */}
                  <Card className="p-0 overflow-hidden">
                    <div className="h-64 bg-gray-200 relative flex items-center justify-center">
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                        </svg>
                        <p className="text-gray-500 text-sm">Interactive Map</p>
                        <p className="text-gray-400 text-xs mt-1">Areas and neighborhoods</p>
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-4">
                    <Card>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">West Asheville</h4>
                          <p className="text-gray-600 text-sm mb-3">Vibrant neighborhood with local shops, restaurants, and community feel</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Walkable</span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Good Schools</span>
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">Near Parks</span>
                          </div>
                        </div>
                        <Button size="sm">View</Button>
                      </div>
                    </Card>

                    <Card>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Downtown Asheville</h4>
                          <p className="text-gray-600 text-sm mb-3">Historic downtown with arts scene, restaurants, and nightlife</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Walkable</span>
                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">Nightlife</span>
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">Arts Scene</span>
                          </div>
                        </div>
                        <Button size="sm">View</Button>
                      </div>
                    </Card>

                    <Card>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">North Asheville</h4>
                          <p className="text-gray-600 text-sm mb-3">Family-friendly area with great schools and parks</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Good Schools</span>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Family-Friendly</span>
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">Near Parks</span>
                          </div>
                        </div>
                        <Button size="sm">View</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default Search;
