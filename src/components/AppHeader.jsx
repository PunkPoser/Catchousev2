import React, { useState } from 'react';
import { user } from '../data/mockData';

const AppHeader = ({ onShowLoading, onProfileClick, isHeroExpanded }) => {
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <header className="flex items-center justify-between text-white">
      <button
        type="button"
        onDoubleClick={() => onShowLoading && onShowLoading()}
        className="text-left"
        title="Double-click to see loading screen"
      >
        <p className="text-white/80 text-sm">Welcome back</p>
        <p className="text-2xl font-semibold leading-none">{user.name.split(' ')[0]}</p>
      </button>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setNotificationCount(0)}
          className="relative w-10 h-10 rounded-full bg-white/15 text-white backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-all"
          aria-label="Notifications"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9a6 6 0 00-12 0v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.248 24.248 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary-500">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onProfileClick}
          className={`h-11 w-11 overflow-hidden rounded-full border border-white/40 bg-white/20 p-1 shadow-soft transition-transform ${
            isHeroExpanded ? 'ring-2 ring-white/60 scale-105' : ''
          }`}
          aria-label="Toggle profile preferences"
        >
          <img
            src="https://i.pravatar.cc/44?img=blonde"
            alt={user.name}
            className="h-full w-full rounded-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
