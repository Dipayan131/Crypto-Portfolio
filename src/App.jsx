import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import WalletConnect from './components/WalletConnect/WalletConnect';
import TokenTransfer from './components/TokenTransfer/TokenTransfer';
import { AppContext } from './contexts/AppContext';

export default function App() {
  const {walletConnectStatus, setWalletConnectStatus} = useContext(AppContext);

  return (
    <>
    <WalletConnect />
    {walletConnectStatus && <TokenTransfer />}
    </>
  );
  
  
};
