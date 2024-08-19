import React, { useState, useEffect, useContext } from 'react';
import WalletConnect from './components/WalletConnect/WalletConnect';
import { AppContext } from './contexts/AppContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';

export default function App() {
  const {walletConnectStatus} = useContext(AppContext);

  return (
    <div className="relative min-h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url(./Image/cyberpunk-bitcoin-illustration_23-2151611192.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Router>
      <div className="relative z-10">
        <Navbar />
          <Routes>
            <Route path='/' element = {<WalletConnect />} />
            {walletConnectStatus && <Route path='/dashboard' element = {<Dashboard />} />}
          </Routes>
        </div>
      </Router>
    </div>
  );
}
