import React from 'react';

const Card = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-white rounded-2xl shadow-soft border border-gray-100 p-6",
    elevated: "bg-white rounded-2xl shadow-medium border border-gray-100 p-6",
    property: "bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden",
    compact: "bg-white rounded-xl shadow-soft border border-gray-100 p-4",
  };
  
  return (
    <div 
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
