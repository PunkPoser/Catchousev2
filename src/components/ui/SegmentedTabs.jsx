import React from 'react';

const SegmentedTabs = ({ options, activeOption, onOptionChange }) => {
  return (
    <div className="bg-gray-100 rounded-full p-1">
      <div className="flex">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onOptionChange(option.value)}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeOption === option.value
                ? 'bg-white text-primary-500 shadow-soft'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedTabs;
