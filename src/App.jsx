import React from 'react';
import Dashboardfinal from './pages/Dashboardfinal';
import Navbar from './components/ui/Navbar';
import LandingPage from './pages/LandingPage';
import ContactUs from './pages/ContactUs';
import Footer from './components/ui/Footer';
import Sidebar from './components/ui/Sidebar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import CampaignPage from './pages/Campaigns';
import Settings from './pages/Settings';
import MarketingAnalysis from './pages/MarketingAnalysis';
import Plans from './pages/plans';

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Sidebar /> 
          <div className="flex-grow bg-white text-gray-900 min-h-screen">
            <Navbar />
            
            <Routes>
              <Route path="/" element={<>
                <div className="ml-7">
                  <LandingPage />
                  <div id="features"><Features /></div>
                  <div id="pricing"><Pricing /></div>
                  <div id="contact-us"><ContactUs /></div>
                </div>
              </>} />
              <Route path="/dashboard" element={<Dashboardfinal />} />
              <Route path="/analytics" element={<MarketingAnalysis />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/reports" element={<CampaignPage />} />
              <Route path="/plans" element={<Plans />} />
            </Routes>
            
            <Footer />
          </div>
        </div>
      </Router>
    </>
  )
}

export default App;
