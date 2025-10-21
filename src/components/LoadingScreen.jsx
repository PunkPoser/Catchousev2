import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const notifications = [
    { message: "Welcome back, Maya!", side: "right" },
    { message: "You have 3 new messages", side: "left" },
    { message: "6 new properties in your area", side: "right" },
    { message: "Exciting new community event", side: "left" }
  ];

  useEffect(() => {
    // Logo animates in first
    const logoTimer = setTimeout(() => setLogoVisible(true), 300);
    
    // Then bubbles animate in one by one
    const step1 = setTimeout(() => setCurrentStep(1), 1000);
    const step2 = setTimeout(() => setCurrentStep(2), 1700);
    const step3 = setTimeout(() => setCurrentStep(3), 2400);
    const step4 = setTimeout(() => setCurrentStep(4), 3100);
    
    // Auto exit after all animations
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onComplete && onComplete(), 1000);
    }, 4500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative z-10 max-w-2xl mx-auto px-8 w-full">
        
        {/* Logo */}
        <div className={`mb-16 text-center transition-all duration-700 ${
          isExiting 
            ? 'opacity-0 scale-90' 
            : logoVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-90'
        }`}>
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
          </div>
        </div>

        {/* Speech Bubbles */}
        <div className="space-y-8">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`flex transition-all duration-900 ease-out ${
                notification.side === 'right' ? 'justify-end' : 'justify-start'
              } ${
                isExiting
                  ? notification.side === 'right' 
                    ? 'opacity-0 translate-x-16 translate-y-8'
                    : 'opacity-0 -translate-x-16 translate-y-8'
                  : currentStep > index
                  ? 'opacity-100 translate-x-0 translate-y-0'
                  : notification.side === 'right'
                  ? 'opacity-0 translate-x-16 -translate-y-8'
                  : 'opacity-0 -translate-x-16 -translate-y-8'
              }`}
              style={{
                transitionDelay: isExiting ? `${index * 100}ms` : '0ms'
              }}
            >
              {/* Message Bubble - alternating corners */}
              <div className={`bg-white px-6 py-4 shadow-sm border border-gray-100 max-w-sm transition-all duration-700 ease-out ${
                index % 2 === 0
                  ? notification.side === 'right' 
                    ? 'rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl' 
                    : 'rounded-tl-3xl rounded-tr-3xl rounded-br-3xl'
                  : notification.side === 'right'
                  ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
                  : 'rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
              } ${
                isExiting
                  ? 'opacity-0 scale-95'
                  : currentStep > index
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: isExiting ? `${index * 100 + 100}ms` : `${index * 150}ms`
              }}>
                <p className="text-gray-800 text-base font-medium">
                  {notification.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;