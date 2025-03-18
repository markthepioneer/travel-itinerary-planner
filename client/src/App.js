import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import ItineraryPage from './pages/ItineraryPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/itinerary/:id" element={<ItineraryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
