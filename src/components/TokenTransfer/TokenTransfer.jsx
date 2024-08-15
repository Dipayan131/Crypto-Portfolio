import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleTransferABI from './TokenTransfer.json'; // Import ABI

export default function TokenTransfer() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const contractInstance = new web3Instance.eth.Contract(
        SimpleTransferABI,
        '0x9E8d3d3c3b238D54A8B3C7592D824F02C826Ff42' // Replace with your deployed contract address
      );
      setContract(contractInstance);
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const handleTransfer = async () => {
    if (contract && account) {
      try {
        const value = web3.utils.toWei(amount, 'ether'); // Convert amount to Wei
        await contract.methods.transferEther(recipientAddress, value).send({ from: account });
        setMessage('Transfer successful!');
      } catch (error) {
        console.error("Error during transfer:", error);
        setMessage('Transfer failed!');
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6 bg-gray-50 min-h-screen">
      <button 
        onClick={connectWallet}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
      >
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
      
      {account && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
          <input 
            type="text" 
            placeholder="Recipient Address" 
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input 
            type="number" 
            placeholder="Amount (ETH)" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button 
            onClick={handleTransfer}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-150 ease-in-out"
          >
            Transfer Ether
          </button>
          {message && <p className="text-red-500 text-center">{message}</p>}
        </div>
      )}
    </div>
  );
  
};
