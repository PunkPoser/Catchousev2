import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import BottomTabs from '../components/BottomTabs';
import FloatingHeader from '../components/FloatingHeader';
import { properties, user } from '../data/mockData';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  
  // Find the property by ID
  const property = properties.find(p => p.id === parseInt(id));
  
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Discover</Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleTabChange = (tabId) => {
    switch (tabId) {
      case 'discover':
        navigate('/');
        break;
      case 'search':
        navigate('/search');
        break;
      case 'community':
        navigate('/community');
        break;
      case 'saved':
        navigate('/saved');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Header */}
      <FloatingHeader 
        title="Property Details"
        rightButton={
          <button 
            onClick={handleSave}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors shadow-soft"
          >
            <span className={`text-xl ${isSaved ? 'text-red-500' : 'text-gray-400'}`}>
              {isSaved ? '♥' : '♡'}
            </span>
          </button>
        }
      />

      <div className="px-4 pt-20 pb-32 space-y-6">
        {/* Property Image */}
        <Card variant="property">
          <div className="relative">
            <img 
              src={`https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&auto=format&q=80&ixlib=rb-4.0.3&ixid=${property.id}`}
              alt={`Property ${property.id}`}
              className="w-full h-64 object-cover rounded-t-3xl"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-[#A53B7E] text-white px-3 py-1 rounded-full text-xs font-medium">
                For Sale
              </span>
            </div>
          </div>
        </Card>

        {/* Property Info */}
        <Card>
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">${property.price.toLocaleString()}</h2>
              <p className="text-gray-600 mt-1">{property.address}</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">{property.beds}</span>
                <span className="text-gray-600">bedrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">{property.baths}</span>
                <span className="text-gray-600">bathrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">{property.sqft.toLocaleString()}</span>
                <span className="text-gray-600">sqft</span>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
            
            {property.tags && (
              <div className="flex flex-wrap gap-2">
                {property.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* AI Summary Section */}
        <Card className="bg-gray-50">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <h3 className="text-xl font-bold text-gray-900">Why this is a good fit for you, {user.name.split(' ')[0]}</h3>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-primary-500 bg-primary-50 px-3 py-1 rounded-full">
                92% Match
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-lg">✅</span>
                <p className="text-gray-700">Walkable neighborhood (0.3mi to coffee shops and restaurants)</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-lg">✅</span>
                <p className="text-gray-700">Great schools nearby (Rated 9/10 by local families)</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-lg">✅</span>
                <p className="text-gray-700">Safe area with low crime rates and well-lit streets</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-lg">✅</span>
                <p className="text-gray-700">Within your $350-450k budget range</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-lg">✅</span>
                <p className="text-gray-700">Close to parks and local culture spots you love</p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Based on your preferences: Walkable, Good schools, Safe at night, Near parks, Local culture
              </p>
            </div>
          </div>
        </Card>

        {/* Neighborhood Info */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Neighborhood</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Walkability</span>
              <span className="font-semibold text-gray-900">85/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Safety</span>
              <span className="font-semibold text-gray-900">92/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Schools</span>
              <span className="font-semibold text-gray-900">88/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Commute to Downtown</span>
              <span className="font-semibold text-gray-900">15 min</span>
            </div>
          </div>
        </Card>

        {/* Nearby Amenities */}
        {property.nearby && (
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nearby</h3>
            <div className="space-y-2">
              {property.nearby.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-primary-500">📍</span>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button className="flex-1" size="lg">
            Schedule a Viewing
          </Button>
          <Button variant="outline" className="flex-1" size="lg">
            Contact Agent
          </Button>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomTabs activeTab="discover" onTabChange={handleTabChange} />
    </div>
  );
};

export default PropertyDetail;
