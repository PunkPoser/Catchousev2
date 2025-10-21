import React from 'react';

const GradientButton = ({ 
  children, 
  className = "", 
  onClick,
  ...props 
}) => {
  return (
    <button 
      className={`bg-gradient-to-br from-pink-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default GradientButton;
