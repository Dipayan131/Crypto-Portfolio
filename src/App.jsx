import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import WalletConnect from './components/WalletConnect/WalletConnect';
import TokenTransfer from './components/TokenTransfer/TokenTransfer';
import { AppContext } from './contexts/AppContext';
import HistoricalData from './components/HistoricalData/HistoricalData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';

export default function App() {
  const {walletConnectStatus, setWalletConnectStatus} = useContext(AppContext);

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element = {<WalletConnect />} />
        {walletConnectStatus && <Route path='/dashboard' element = {<Dashboard />} />}
      </Routes>
    </Router>
    </>
  );
  
  
};
