import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import BottomTabs from './components/BottomTabs';
import LoadingScreen from './components/LoadingScreen';
import Discover from './pages/Discover';
import Search from './pages/Search';
import Community from './pages/Community';
import Saved from './pages/Saved';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/*" element={
            <>
              <AppHeader onShowLoading={() => setIsLoading(true)} />
              <main className="pt-20 pb-32">
                {renderActivePage()}
              </main>
              <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;