import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { neighborhoods, user } from '../../data/mockData';

const PropertyCard = ({ property, matchPercentage, variant = "slider" }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const neighborhood = useMemo(
    () => neighborhoods.find((item) => item.id === property.neighborhoodId),
    [property.neighborhoodId]
  );

  const nearbyHighlights = useMemo(() => (property.nearby ? property.nearby.slice(0, 2) : []), [property.nearby]);
  const widthClasses = variant === "slider" ? "w-80 flex-shrink-0" : "w-full";

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsAnimating(true);
    setIsLiked((prev) => !prev);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const toggleInsights = (event) => {
    event.stopPropagation();
    setShowInsights((prev) => !prev);
  };

  return (
    <div
      className={`group bg-white rounded-3xl border border-gray-200 overflow-hidden ${widthClasses} cursor-pointer hover:shadow-medium transition-shadow`}
      onClick={handleClick}
    >
      <div className="bg-white px-2 pt-2 pb-2 relative">
        <div className="relative h-48 w-full overflow-hidden rounded-2xl">
          <img
            src={`https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&auto=format&q=80&ixlib=rb-4.0.3&ixid=${property.id}`}
            alt={`Property ${property.id}`}
            className="h-full w-full object-cover"
          />

          <div
            className={`pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
              showInsights ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <div className="space-y-2 p-4 text-white">
              <p className="text-xs uppercase tracking-wide text-white/80">Why it fits {user.name.split(' ')[0]}</p>
              {neighborhood?.tags && (
                <p className="text-sm font-semibold leading-snug">{neighborhood.tags.slice(0, 2).join(' • ')}</p>
              )}
              {nearbyHighlights.length > 0 && (
                <div className="flex flex-wrap gap-2 text-xs text-white/80">
                  {nearbyHighlights.map((amenity) => (
                    <span key={amenity} className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                      <span aria-hidden="true">📍</span>
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="absolute top-3 left-3">
            <span className="bg-[#A53B7E] text-white px-3 py-1 rounded-full text-xs font-medium">Open House</span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`w-9 h-9 bg-white/85 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                isAnimating ? 'scale-110' : 'scale-100'
              } ${isLiked ? 'bg-red-50' : 'hover:bg-white'}`}
              aria-label={isLiked ? 'Remove from saved homes' : 'Save this home'}
            >
              <span
                className={`text-lg transition-all duration-300 ${
                  isLiked ? 'text-red-500' : 'text-gray-600'
                } ${isAnimating ? 'animate-pulse' : ''}`}
              >
                {isLiked ? '♥' : '♡'}
              </span>
            </button>
            <button
              onClick={toggleInsights}
              className={`w-9 h-9 rounded-full border border-white/40 bg-white/85 text-gray-700 backdrop-blur-sm transition-all hover:bg-white ${
                showInsights ? 'ring-2 ring-primary-300' : ''
              }`}
              aria-label="Toggle neighborhood highlights"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mx-auto"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l8-8m0 0H9m7 0v7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">For sale</span>
          </div>
          <div className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
            {matchPercentage}% match
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">${property.price.toLocaleString()}</h3>

        <p className="text-gray-600 mb-2">
          {property.beds} BR · {property.baths} BA · {property.sqft.toLocaleString()} sqft
        </p>

        <p className="text-gray-500 text-sm">{property.address}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
