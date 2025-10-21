import React, { useState, useEffect } from 'react';
import { user } from '../data/mockData';

const AppHeader = ({ onShowLoading }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3); // Start with 3 notifications

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 p-4 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="flex items-center justify-between">
            {/* Welcome message */}
            <p 
              className="text-gray-700 font-medium text-lg cursor-pointer hover:text-primary-500 transition-colors"
              onDoubleClick={() => onShowLoading && onShowLoading()}
              title="Double-click to see loading screen"
            >
              Welcome back, {user.name.split(' ')[0]}
            </p>
        
        {/* Icons on the right */}
        <div className="flex items-center space-x-3">
          {/* Notification Icon */}
          <button 
            className="relative w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors shadow-soft"
            onClick={() => setNotificationCount(0)} // Clear notifications when clicked
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.248 24.248 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            
            {/* Notification Badge */}
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {notificationCount > 9 ? '9+' : notificationCount}
              </div>
            )}
          </button>
          
                  {/* Maya's Profile Picture */}
                  <div className="bg-white rounded-full shadow-strong border border-gray-100 p-1">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src="https://i.pravatar.cc/40?img=blonde"
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
