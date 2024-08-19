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
    const initializeWeb3AndConnectWallet = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
  
          // Request accounts and set the selected account
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
  
          const contractInstance = new web3Instance.eth.Contract(
            SimpleTransferABI,
            '0x9E8d3d3c3b238D54A8B3C7592D824F02C826Ff42' // Replace with your deployed contract address
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        alert('MetaMask is not installed. Please install it to use this feature.');
      }
    };
  
    initializeWeb3AndConnectWallet();
  }, []);
  

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
    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6 flex flex-col justify-center items-center m-auto mt-32">
      <div className='text-white text-3xl font-bold'>Token Transfer</div>
      <input 
        type="text" 
        placeholder="Recipient Address" 
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        className="w-full px-5 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
      />
      <input 
        type="number" 
        placeholder="Amount (ETH)" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-5 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
      />
      <button 
        onClick={handleTransfer}
        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
      >
        Transfer Ether
      </button>
      {message && <p className="text-red-400 text-center text-sm">{message}</p>}
    </div>
  );
  
  
};
