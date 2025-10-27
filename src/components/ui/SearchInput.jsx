import React, { useState } from 'react';

const SearchInput = ({ placeholder, value, onChange, onSearch, isTyping = false, onPlaceholderClick, onFocus, onBlur }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  const handleFocusInternal = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlurInternal = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handlePlaceholderClick = () => {
    if (onPlaceholderClick) {
      onPlaceholderClick();
    }
  };

  return (
    <div className="relative">
      <div className={`relative bg-white rounded-full border transition-all duration-300 ease-out ${
        isFocused 
          ? 'border-primary-500 shadow-strong ring-8 ring-primary-500/40' 
          : isTyping && !value
          ? 'border-gray-300 shadow-soft ring-1 ring-primary-500/15'
          : value && value.length > 0
          ? 'border-gray-300 shadow-soft ring-1 ring-primary-500/10'
          : 'border-gray-200 shadow-soft ring-1 ring-primary-500/5'
      }`}>
        <div className="flex items-center px-4 py-3">
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          
          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={handleFocusInternal}
              onBlur={handleBlurInternal}
              placeholder={placeholder || "ask me anything..."}
              className="w-full text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent"
            />
                {isTyping && !value && placeholder && !isFocused && (
                  <div 
                    className="absolute left-0 top-0 h-full w-full flex items-center cursor-pointer"
                    onClick={handlePlaceholderClick}
                    style={{ paddingLeft: '3.5rem' }}
                  >
                    <span className="text-gray-500 animate-pulse">|</span>
                  </div>
                )}
          </div>
          
          {/* Clear Button */}
          {value && (
            <button
              onClick={() => onChange('')}
              className="ml-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
