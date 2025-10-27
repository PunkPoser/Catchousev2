import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import PropertyCard from '../components/ui/PropertyCard';
import { properties, featuredMatchPercentages, newListingMatchPercentages, communityEvents, neighborhoods, user } from '../data/mockData';

const Saved = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [compareMode, setCompareMode] = useState(false);

  // Combine all properties with their match percentages
  const allProperties = [
    ...properties.slice(0, 4).map((property, index) => ({
      ...property,
      matchPercentage: featuredMatchPercentages[index]
    })),
    ...properties.map((property, index) => ({
      ...property,
      matchPercentage: newListingMatchPercentages[index]
    }))
  ];

  // Remove duplicates and sort by match percentage (highest first)
  const savedProperties = allProperties
    .filter((property, index, self) => 
      index === self.findIndex(p => p.id === property.id)
    )
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Group properties by neighborhood
  const neighborhoodGroups = useMemo(() => {
    const groups = savedProperties.reduce((acc, property) => {
      const neighborhood = neighborhoods.find(n => n.id === property.neighborhoodId);
      const neighborhoodName = neighborhood ? neighborhood.name : 'Unknown';
      
      if (!acc[neighborhoodName]) {
        acc[neighborhoodName] = {
          name: neighborhoodName,
          properties: [],
          averageMatch: 0,
          neighborhood: neighborhood
        };
      }
      acc[neighborhoodName].properties.push(property);
      return acc;
    }, {});

    // Calculate average match for each group
    Object.values(groups).forEach(group => {
      const total = group.properties.reduce((sum, p) => sum + p.matchPercentage, 0);
      group.averageMatch = Math.round(total / group.properties.length);
    });

    return Object.values(groups);
  }, [savedProperties]);

  // Filter properties based on active filter
  const filteredGroups = useMemo(() => {
    if (activeFilter === 'high-match') {
      return neighborhoodGroups.map(group => ({
        ...group,
        properties: group.properties.filter(p => p.matchPercentage >= 90)
      })).filter(group => group.properties.length > 0);
    }
    return neighborhoodGroups;
  }, [neighborhoodGroups, activeFilter]);

  const highestMatchProperty = savedProperties[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 space-y-6">

        {/* Plan Your Next Move Card */}
        <Card className="bg-white border-gray-100 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Plan your next move</h3>
              <p className="text-sm text-gray-600 mb-3">Your top match is ready for a walk-through</p>
              {highestMatchProperty && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                  <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-600 px-3 py-1 rounded-full border border-primary-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {highestMatchProperty.address}
                  </span>
                  <span className="font-semibold text-primary-600">{highestMatchProperty.matchPercentage}% match</span>
                </div>
              )}
            </div>
            <button className="inline-flex items-center gap-2 self-start rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-600">
              Schedule walk-through
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </Card>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveFilter('all')}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors ${
              activeFilter === 'all'
                ? 'border-primary-500 bg-primary-50 text-primary-600 font-semibold shadow-soft'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary-200'
            }`}
          >
            All saved
          </button>
          <button
            onClick={() => setActiveFilter('high-match')}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors ${
              activeFilter === 'high-match'
                ? 'border-primary-500 bg-primary-50 text-primary-600 font-semibold shadow-soft'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary-200'
            }`}
          >
            High match (≥90%)
          </button>
          <button
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors ${
              compareMode
                ? 'border-primary-500 bg-primary-50 text-primary-600 font-semibold shadow-soft'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary-200'
            }`}
            onClick={() => setCompareMode(!compareMode)}
          >
            Compare mode
          </button>
        </div>

        {/* Grouped Properties by Neighborhood */}
        <div className="space-y-6">
          {filteredGroups.map((group) => (
            <div key={group.name} className="space-y-4">
              {/* Neighborhood Header */}
              <div className="flex flex-col gap-2 px-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                  <p className="text-xs text-gray-500">
                    {group.properties.length} {group.properties.length === 1 ? 'home' : 'homes'} saved • 
                    Average match: <span className="font-semibold text-primary-600">{group.averageMatch}%</span>
                  </p>
                </div>
                {group.neighborhood && (
                  <div className="flex flex-wrap gap-2">
                    {group.neighborhood.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Properties in this neighborhood */}
              <div className="space-y-3">
                {group.properties.map((property) => {
                  // Find matching tags between user preferences and property tags
                  const matchingTags = property.tags.filter(tag =>
                    user.preferences.some(pref => tag.toLowerCase().includes(pref.toLowerCase()))
                  ).slice(0, 2);

                  return (
                    <div key={property.id}>
                      <PropertyCard
                        property={property}
                        matchPercentage={property.matchPercentage}
                        variant="list"
                      />
                      {/* Why you saved this section */}
                      <div className="mt-2 px-4 pb-2 text-xs text-gray-600">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c3.728 0 7.5-3.042 7.5-7.5 0-5.25-5.25-9.75-7.5-11.25C9.75 4.5 4.5 9 4.5 14.25c0 4.458 3.772 7.5 7.5 7.5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                            {group.neighborhood?.city || 'Asheville'}
                          </span>
                          <span>
                            <span className="font-medium text-gray-700">Matches:</span>{' '}
                            {(matchingTags.length > 0 ? matchingTags : property.tags.slice(0, 2)).join(' • ')}
                          </span>
                        </div>
                      </div>
                      {/* Resident testimonial */}
                      {group.neighborhood?.stories?.[0] && (
                        <div className="mx-4 mt-2 mb-3 rounded-2xl bg-gray-50 px-3 py-2 border border-gray-100">
                          <p className="text-xs italic text-gray-600">"{group.neighborhood.stories[0].text}"</p>
                          <p className="text-xs text-gray-500 mt-1">— {group.neighborhood.stories[0].author}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Community Around You */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Community around you</h3>
          <div className="space-y-3">
            {communityEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-soft">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-primary-600 font-semibold mb-1">{event.date}</p>
                    <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                  </div>
                  <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                    Join
                  </button>
                </div>
              </div>
            ))}
            <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              See all upcoming events →
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Saved;
