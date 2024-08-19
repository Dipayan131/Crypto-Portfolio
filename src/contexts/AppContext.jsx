// AppContext.js
import React, { createContext, useState } from 'react';

// Create a Context
export const AppContext = createContext();

// Create a Context Provider component
export const AppProvider = ({ children }) => {
  const [walletConnectStatus, setWalletConnectStatus] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const context = {
    walletConnectStatus,
    setWalletConnectStatus,
    defaultAccount,
    setDefaultAccount,
    userBalance,
    setUserBalance
  }

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
};
