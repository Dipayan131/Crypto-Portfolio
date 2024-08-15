import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletConnect from './components/WalletConnect/WalletConnect';
import TokenTransfer from './components/TokenTransfer/TokenTransfer';

export default function App() {

  return (
    <>
    <WalletConnect />
    <TokenTransfer />
    </>
  );
  
  
};
