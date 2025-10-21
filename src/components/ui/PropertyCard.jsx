import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, matchPercentage, variant = "slider" }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent navigation
    setIsAnimating(true);
    setIsLiked(!isLiked);
    
    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 600);
  };

  const widthClasses = variant === "slider" ? "w-80 flex-shrink-0" : "w-full";
  
  return (
    <div 
      className={`bg-white rounded-3xl border border-gray-200 overflow-hidden ${widthClasses} cursor-pointer hover:shadow-medium transition-shadow`}
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative">
        {/* Property Image */}
        <div className="w-full h-48 bg-gray-200 rounded-t-3xl overflow-hidden">
          <img 
            src={`https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&auto=format&q=80&ixlib=rb-4.0.3&ixid=${property.id}`}
            alt={`Property ${property.id}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Open House Tag */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#A53B7E] text-white px-3 py-1 rounded-full text-xs font-medium">
            Open House
          </span>
        </div>
        
                {/* Heart Icon */}
                <button 
                  onClick={handleLike}
                  className={`absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                    isAnimating ? 'scale-125' : 'scale-100'
                  } ${isLiked ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                >
                  <span className={`text-xl transition-all duration-300 ${
                    isLiked ? 'text-red-500' : 'text-gray-600'
                  } ${isAnimating ? 'animate-pulse' : ''}`}>
                    {isLiked ? '♥' : '♡'}
                  </span>
                </button>
        
      </div>

      {/* Details Section */}
      <div className="p-4">
        {/* Status and Match Percentage */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">For sale</span>
          </div>
          <div className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
            {matchPercentage}% match
          </div>
        </div>

        {/* Price */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          ${property.price.toLocaleString()}
        </h3>

        {/* Property Specs */}
        <p className="text-gray-600 mb-2">
          {property.beds} BR · {property.baths} BA · {property.sqft.toLocaleString()} sqft
        </p>

        {/* Address */}
        <p className="text-gray-500 text-sm">
          {property.address}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
