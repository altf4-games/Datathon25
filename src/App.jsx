import React from 'react';
import Dashboardfinal from './pages/Dashboardfinal';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import CampaignPage from './pages/Campaigns';
import Settings from './pages/Settings';
import MarketingAnalysis from './pages/MarketingAnalysis';

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Sidebar /> 
          <div className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
            <Navbar />
            
            <Routes>
              <Route path="/" element={<>
                  <LandingPage />
                  <div id="features"><Features /></div>
                  <div id="pricing"><Pricing /></div>
                  <div id="contact-us"><ContactUs /></div>
              </>} />
              <Route path="/dashboard" element={<Dashboardfinal />} />
              <Route path="/analytics" element={<MarketingAnalysis />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/reports" element={<CampaignPage />} />
            </Routes>
            
            <Footer />
          </div>
        </div>
      </Router>
    </>
  )
}

export default App;
