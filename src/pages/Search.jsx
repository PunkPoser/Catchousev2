import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import SegmentedTabs from '../components/ui/SegmentedTabs';
import PropertyCard from '../components/ui/PropertyCard';
import { properties, newListingMatchPercentages, neighborhoods, communityEvents, communityGroups } from '../data/mockData';

const TYPING_SUGGESTIONS = [
  "houses in asheville",
  "good schools near gym",
  "walkable with parks",
  "safe near restaurants",
  "family homes under $400k",
  "great nightlife areas",
  "quiet with good schools",
  "downtown lofts"
];

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

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // In a real app, this would trigger the search
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
    
    const currentSuggestion = TYPING_SUGGESTIONS[currentPromptIndex];
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
          setCurrentPromptIndex((prev) => (prev + 1) % TYPING_SUGGESTIONS.length);
        }, 1500);
      }
    }, 80);
    
    return () => {
      clearInterval(typingInterval);
      setIsTyping(false);
      setDisplayedText('');
    };
  }, [currentPromptIndex, searchQuery, isInputFocused]);

  const areaCards = neighborhoods.map((neighborhood) => {
    const matchScore = Math.round((neighborhood.walkability + neighborhood.safety + neighborhood.schools) / 3);
    const highlightEvent = communityEvents.find((event) => event.location.toLowerCase().includes(neighborhood.name.toLowerCase())) || communityEvents[0];
    const highlightGroup = communityGroups.find((group) => group.name.toLowerCase().includes(neighborhood.name.toLowerCase())) || communityGroups[0];

    return (
      <Card key={neighborhood.id}>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{neighborhood.name}</h3>
              <p className="text-sm text-gray-600">{neighborhood.description}</p>
            </div>
            <span className="rounded-full bg-primary-50 text-primary-600 text-sm font-semibold px-3 py-1">
              {matchScore}% match
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs text-gray-600">
            <div>
              <p className="font-semibold text-gray-900">Walkability</p>
              <p>{neighborhood.walkability}/100</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Safety</p>
              <p>{neighborhood.safety}/100</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Schools</p>
              <p>{neighborhood.schools}/100</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {neighborhood.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-xs">
            <p className="text-gray-500 uppercase font-semibold mb-1">This week</p>
            <div className="space-y-2">
              {highlightEvent && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{highlightEvent.title}</span>
                  <span className="text-gray-400">{highlightEvent.date}</span>
                </div>
              )}
              {highlightGroup && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{highlightGroup.name}</span>
                  <span className="text-gray-400">{highlightGroup.meetups}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" className="flex-1">View listings</Button>
            <Button variant="outline" size="sm" className="flex-1">Meet locals</Button>
          </div>
        </div>
      </Card>
    );
  });

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
                  <Card className="p-0 overflow-hidden">
                    <div className="relative h-64 bg-white p-2">
                      <div className="relative h-full w-full overflow-hidden rounded-2xl">
                        <img
                          src="/Images/google-maps-png-12.png"
                          alt="Neighborhood map"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-transparent to-transparent h-24" />
                        <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <span className="block h-3 w-3 rounded-full bg-primary-500 ring-4 ring-primary-500/30" />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-4">
                    {areaCards}
                  </div>
                </div>
              )}
            </div>
      </div>
    </div>
  );
};

export default Search;
