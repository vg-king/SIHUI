import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import PreventionPage from './pages/PreventionPage';
import SuggestionsPage from './pages/SuggestionsPage';

function App() {
  // State management
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Router>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-200/20 to-emerald-200/20 rounded-full blur-2xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, 30, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative z-10 min-h-screen">
            {/* Navigation Bar */}
            <Navigation />
            
            {/* Page Content */}
            <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-blue-50 border-l border-slate-200">
              <Routes>
                <Route path="/" element={<HomePage currentLanguage={currentLanguage} />} />
                <Route path="/chat" element={<ChatPage currentLanguage={currentLanguage} />} />
                <Route path="/suggestions" element={<SuggestionsPage currentLanguage={currentLanguage} />} />
                <Route path="/prevention" element={<PreventionPage currentLanguage={currentLanguage} />} />
                <Route path="/symptoms" element={<div className="p-8 text-center text-slate-600">Symptom Checker - Coming Soon!</div>} />
                <Route path="/vaccination" element={<div className="p-8 text-center text-slate-600">Vaccination Center - Coming Soon!</div>} />
              </Routes>
            </div>
          </div>
        </div>
      </motion.div>
    </Router>
  );
}

export default App;
