import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodaysAffirmation from './components/TodaysAffirmation';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Journal from './pages/Journal';
import SupportRooms from './pages/SupportRooms';
import Resources from './pages/Resources';
import Settings from './pages/Settings';
import Footer from "./components/Footer";
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Pricing from './pages/Pricing';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <TodaysAffirmation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/support" element={<SupportRooms />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;