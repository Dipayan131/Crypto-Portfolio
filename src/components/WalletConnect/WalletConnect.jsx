import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { AppContext } from "../../contexts/AppContext";
import {Link} from "react-router-dom"

export default function WalletConnect() {
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    walletConnectStatus,
    setWalletConnectStatus,
    defaultAccount,
    setDefaultAccount,
    userBalance,
    setUserBalance,
  } = useContext(AppContext);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChanged(result[0]);
          setWalletConnectStatus(true);
        })
        .catch((err) => {
          setErrorMessage(`Error connecting to wallet: ${err.message}`);
        });
    } else {
      setErrorMessage("Install MetaMask!");
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };

  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((err) => {
        setErrorMessage(`Error fetching balance: ${err.message}`);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90.5vh] bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
          MetaMask Wallet Connection
        </h1>
        <div className="flex justify-center">
          {!walletConnectStatus && (
            <Link to="/dashboard"
              onClick={connectWallet}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
            >
              Connect Wallet
            </Link>
          )}
        </div>
        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
