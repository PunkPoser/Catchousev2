import React from 'react';

const BottomTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'discover', label: 'Discover' },
    { id: 'search', label: 'Search' },
    { id: 'community', label: 'Community' },
    { id: 'saved', label: 'Saved' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      <div className="bg-white rounded-full shadow-strong border border-gray-100">
        <div className="flex justify-around p-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 mx-1 py-3 px-4 rounded-full transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomTabs;
