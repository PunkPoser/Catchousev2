import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingHeader = ({ title, onBack, showBackButton = true, rightButton, onSave }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show header when near the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setIsAnimating(true);
    setIsSaved(!isSaved);
    
    if (onSave) {
      onSave(!isSaved);
    }
    
    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-40 p-4 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="flex items-center justify-between">
        {showBackButton ? (
          <button 
            onClick={handleBack}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors shadow-soft"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        ) : (
          <div className="w-10 h-10"></div>
        )}
        
        {title && (
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        )}
        
        {rightButton ? (
          <button 
            onClick={handleSave}
            className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-300 shadow-soft ${
              isAnimating ? 'scale-125' : 'scale-100'
            } ${isSaved ? 'bg-red-50' : ''}`}
          >
            <span className={`text-xl transition-all duration-300 ${
              isSaved ? 'text-red-500' : 'text-gray-400'
            } ${isAnimating ? 'animate-pulse' : ''}`}>
              {isSaved ? '♥' : '♡'}
            </span>
          </button>
        ) : <div className="w-10 h-10"></div>}
      </div>
    </div>
  );
};

export default FloatingHeader;
