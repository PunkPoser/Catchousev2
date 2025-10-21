import React from 'react';
import PropertyCard from './PropertyCard';

const PropertySlider = ({ title, properties, matchPercentages }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 px-4">{title}</h2>
      <div className="flex space-x-4 px-4 overflow-x-auto pb-4 scrollbar-hide">
        {properties.map((property, index) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            matchPercentage={matchPercentages[index] || 85}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertySlider;
