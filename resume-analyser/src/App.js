import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ResumeParser from './pages/ResumeParser';
import JobDescriptionAnalyzer from './pages/JobDescriptionAnalyzer';
import RRFMapper from './pages/RRFMapper';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/resume-parser" element={<ResumeParser />} />
            <Route path="/job-analyzer" element={<JobDescriptionAnalyzer />} />
            <Route path="/rrf-mapper" element={<RRFMapper />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App; 