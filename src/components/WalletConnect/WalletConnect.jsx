import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import { AppContext } from "../../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export default function WalletConnect() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [accountAddressInput, setAccountAddressInput] = useState("");
  const {
    walletConnectStatus,
    setWalletConnectStatus,
    defaultAccount,
    setDefaultAccount,
    userBalance,
    setUserBalance,
  } = useContext(AppContext);

  const navigate = useNavigate()

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

  const connectWithAddress = () => {
    const address = accountAddressInput.trim();
    if (ethers.utils.isAddress(address)) {
      accountChanged(address);
      setWalletConnectStatus(true);
      navigate('/dashboard')
    } else {
      setErrorMessage("Invalid address");
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
    <div className="flex flex-col justify-center items-center h-[85vh] p-4">
  <div className="bg-gray-800 p-8 rounded-lg shadow-lg h-auto max-w-md">
    <h1 className="text-3xl font-bold mb-4 text-center text-gray-100">
      MetaMask Wallet Connection
    </h1>
    <div className="flex justify-center mb-4">
      {!walletConnectStatus && (
        <Link
          to="/dashboard"
          onClick={connectWallet}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
        >
          Connect Wallet
        </Link>
      )}
    </div>

    {/* OR separator */}
    <div className="flex items-center my-4">
      <hr className="flex-grow border-t border-gray-300" />
      <span className="mx-4 text-gray-300">OR</span>
      <hr className="flex-grow border-t border-gray-300" />
    </div>

    {/* Connect with account address */}
    <div className="text-center">
      <input
        type="text"
        value={accountAddressInput}
        onChange={(e) => setAccountAddressInput(e.target.value)}
        placeholder="Enter account address"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full"
      />
      <button
        onClick={connectWithAddress}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-150 ease-in-out"
      >
        Connect with Address
      </button>
    </div>

    {errorMessage && (
      <p className="mt-4 text-red-400 text-center font-medium">{errorMessage}</p>
    )}
  </div>
</div>

  );
}
