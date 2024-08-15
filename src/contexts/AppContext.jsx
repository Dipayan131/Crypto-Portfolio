// AppContext.js
import React, { createContext, useState } from 'react';

// Create a Context
export const AppContext = createContext();

// Create a Context Provider component
export const AppProvider = ({ children }) => {
  const [walletConnectStatus, setWalletConnectStatus] = useState(false);

  return (
    <AppContext.Provider value={{ walletConnectStatus, setWalletConnectStatus }}>
      {children}
    </AppContext.Provider>
  );
};
