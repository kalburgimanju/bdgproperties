import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Directory from './pages/Directory';
import DirectoryDetail from './pages/DirectoryDetail';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-emerald-500/25 selection:text-emerald-900">
        
        {/* Marketplace Sticky Navbar */}
        <Navbar />

        {/* Core Router Outlet Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/directory/:id" element={<DirectoryDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-extrabold text-slate-800">404 - Page Not Found</h1>
                <p className="text-slate-500 text-sm mt-2 max-w-sm">The sub-page you are looking for does not exist on HubliEstate. Let's redirect you back.</p>
                <a href="#/" className="mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-md transition-colors">
                  Go back Home
                </a>
              </div>
            } />
          </Routes>
        </main>

        {/* Marketplace Footer */}
        <Footer />

      </div>
    </Router>
  );
}
