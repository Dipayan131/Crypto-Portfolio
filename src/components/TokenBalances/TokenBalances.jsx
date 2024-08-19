import React, { useState } from 'react';
import { ethers } from 'ethers';

const tokenContracts = {
  ETH: null, // ETH doesn't need a contract address
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  USDC: '0xA0b86991c6218B36c1D19D4a2e9Eb0cE3606eb48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  AAVE: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  MKR: '0x9f8F72aA9304c8B593d555F12ef6589Cc3A579A2',
};

const TokenBalances = () => {
  const [selectedToken, setSelectedToken] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  const handleFetchBalance = async () => {
    try {
      setBalance('');
      setError('');

      if (!window.ethereum) {
        setError('MetaMask is not installed.');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      if (selectedToken === 'ETH') {
        const rawBalance = await provider.getBalance(userAddress);
        const formattedBalance = ethers.utils.formatEther(rawBalance);
        setBalance(formattedBalance);
      } else {
        const tokenAddress = tokenContracts[selectedToken];
        const contract = new ethers.Contract(
          tokenAddress,
          ['function balanceOf(address owner) view returns (uint256)'],
          signer
        );
        const rawBalance = await contract.balanceOf(userAddress);
        const formattedBalance = ethers.utils.formatUnits(rawBalance, 18);
        setBalance(formattedBalance);
      }
    } catch (err) {
      setError('Failed to fetch balance. Please check the selected token and try again.');
      console.error(err);
    }
  };

  return (
    <div className="p-6 w-[90%] mx-auto bg-[#252323] rounded-lg shadow-md border border-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-300">Check Token Balance</h1>
      <div className="mb-3">
        <label className="block text-gray-200 text-base font-medium mb-2">
          Select Token:
        </label>
        <select
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          className="block w-full mt-1 border border-gray-300 rounded-lg bg-white py-2 px-3 text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select a token</option>
          {Object.keys(tokenContracts).map((token) => (
            <option key={token} value={token}>
              {token}
            </option>
          ))}
        </select>
      </div>
      {balance && (
        <div className="mb-6 p-1 bg-gray-800 border border-gray-600 text-white rounded-lg">
          <p className="text-lg font-semibold">Balance: {balance}</p>
        </div>
      )}
      {error && (
        <div className="m-6 p-2 bg-red-100 border border-red-400 text-red-800 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}
      <button
        onClick={handleFetchBalance}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        disabled={!selectedToken}
      >
        Fetch Balance
      </button>
    </div>
  );
  
  
};

export default TokenBalances;
