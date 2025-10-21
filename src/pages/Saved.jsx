import React from 'react';
import Card from '../components/ui/Card';
import PropertyCard from '../components/ui/PropertyCard';
import { properties, featuredMatchPercentages, newListingMatchPercentages } from '../data/mockData';

const Saved = () => {
  // Combine all properties with their match percentages and sort by match (highest first)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 space-y-6">

        {/* Match Summary */}
        <div className="text-center py-3">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Match Summary</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            {savedProperties.length} properties saved • Average match: {Math.round(savedProperties.reduce((sum, p) => sum + p.matchPercentage, 0) / savedProperties.length)}%
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-500">{savedProperties.filter(p => p.matchPercentage >= 90).length}</div>
              <div className="text-xs text-gray-500">Excellent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{savedProperties.filter(p => p.matchPercentage >= 80 && p.matchPercentage < 90).length}</div>
              <div className="text-xs text-gray-500">Good</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-500">{savedProperties.filter(p => p.matchPercentage < 80).length}</div>
              <div className="text-xs text-gray-500">Fair</div>
            </div>
          </div>
        </div>

        {/* Saved Properties */}
        <div className="space-y-4">
          {savedProperties.map((property, index) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              matchPercentage={property.matchPercentage}
              variant="list"
            />
          ))}
        </div>

        {/* Quick Preferences */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {['Walkable', 'Good Schools', 'Safe at Night', 'Near Parks', 'Local Culture'].map(pref => (
              <span key={pref} className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                {pref}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-3">
            Properties are ranked based on how well they match these preferences
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Saved;
