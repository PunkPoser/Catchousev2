import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import BottomTabs from './components/BottomTabs';
import LoadingScreen from './components/LoadingScreen';
import Discover from './pages/Discover';
import Search from './pages/Search';
import Community from './pages/Community';
import Saved from './pages/Saved';
import PropertyDetail from './pages/PropertyDetail';
import Settings from './pages/Settings';
import { user } from './data/mockData';

const HERO_HEIGHT = 200;
const HERO_VISIBLE_AT_REST = 140;
const SHEET_OVERLAP_AT_REST = HERO_HEIGHT - HERO_VISIBLE_AT_REST; // 60px overlap
const SHEET_FLOAT_OFFSET = 70;

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [isLoading, setIsLoading] = useState(true);
  const [sheetOffset, setSheetOffset] = useState(SHEET_FLOAT_OFFSET);
  const sheetOffsetRef = useRef(SHEET_FLOAT_OFFSET);
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(() => new Set(user.preferences));

  const expandedOffset = useMemo(() => {
    if (typeof window === 'undefined') {
      return SHEET_FLOAT_OFFSET;
    }
    return Math.max(window.innerHeight * 0.5, SHEET_FLOAT_OFFSET + SHEET_OVERLAP_AT_REST);
  }, []);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'discover':
        return <Discover onNavigateToSearch={() => setActiveTab('search')} />;
      case 'search':
        return <Search />;
      case 'community':
        return <Community />;
      case 'saved':
        return <Saved />;
      default:
        return <Discover onNavigateToSearch={() => setActiveTab('search')} />;
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (isHeroExpanded && currentScroll > 0) {
        setIsHeroExpanded(false);
      }

      const target = isHeroExpanded
        ? expandedOffset
        : Math.max(SHEET_FLOAT_OFFSET - currentScroll, 0);

      if (Math.abs(target - sheetOffsetRef.current) > 0.5) {
        sheetOffsetRef.current = target;
        setSheetOffset(target);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeroExpanded, expandedOffset]);

  useEffect(() => {
    const target = isHeroExpanded ? expandedOffset : SHEET_FLOAT_OFFSET;
    sheetOffsetRef.current = target;
    setSheetOffset(target);
  }, [isHeroExpanded, expandedOffset]);

  const handleProfileClick = () => {
    setIsHeroExpanded((prev) => {
      const next = !prev;
      if (!next && typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return next;
    });
  };

  const toggleFilter = (filter) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#FF3366] via-[#FF3366] to-[#FF3366]">
        <Routes>
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/*" element={
            <>
              <div className="relative min-h-screen pb-32 text-white overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FF3366] via-[#FF5A7C] to-[#FF87A1]" />

                <div className="relative z-10 px-5 pt-5 pb-6 text-white space-y-4">
                  <AppHeader
                    onShowLoading={() => setIsLoading(true)}
                    onProfileClick={handleProfileClick}
                    isHeroExpanded={isHeroExpanded}
                  />
                  {isHeroExpanded && (
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-white/70">Your vibe filters</p>
                          <h2 className="text-xl font-semibold text-white">Fine-tune what matters</h2>
                        </div>
                        <Link
                          to="/settings"
                          className="inline-flex items-center text-xs font-semibold text-white/80 px-3 py-1 rounded-full border border-white/30 hover:bg-white/15 transition"
                        >
                          Settings
                        </Link>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {user.preferences.map((pref) => {
                          const isActive = activeFilters.has(pref);
                          return (
                            <button
                              key={pref}
                              type="button"
                              onClick={() => toggleFilter(pref)}
                              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                isActive
                                  ? 'bg-white text-primary-600'
                                  : 'bg-white/20 text-white hover:bg-white/30'
                              }`}
                            >
                              {pref}
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid gap-2 text-xs font-semibold text-white/80">
                        <div className="flex items-center justify-between">
                          <span>Location filter</span>
                          <button
                            type="button"
                            className="rounded-full bg-white/15 px-3 py-1 text-white"
                            onClick={() => setActiveTab('search')}
                          >
                            Asheville · editable
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Filter by</span>
                          <button
                            type="button"
                            className="rounded-full bg-white/15 px-3 py-1 text-white"
                            onClick={() => setActiveTab('search')}
                          >
                            Match · Walkable · Good schools
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-white/70">
                          <span>{Array.from(activeFilters).length} vibe filters active</span>
                          <button
                            type="button"
                            onClick={() => setActiveTab('search')}
                            className="text-xs font-semibold text-white hover:text-white/90"
                          >
                            Adjust filters
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="relative z-20 px-0 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateY(${sheetOffset}px)`,
                    marginTop: `-${SHEET_OVERLAP_AT_REST}px`
                  }}
                >
                  <div className="relative rounded-t-[24px] overflow-hidden shadow-[0_-24px_50px_-30px_rgba(17,24,39,0.4)] bg-gray-50">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FF3366]/60 via-transparent to-transparent" />
                    <div className="relative bg-gray-50 text-gray-900 pt-6 pb-10">
                      <main className="pb-16">
                        {renderActivePage()}
                      </main>
                    </div>
                  </div>
                </div>
              </div>
              <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
