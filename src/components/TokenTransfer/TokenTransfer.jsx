import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleTransferABI from './TokenTransfer.json'; // Import ABI

const SimpleTransfer = () => {
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
                '0x9e940683A95D955D261A66559008cb6D6c7edeb8' // Replace with your deployed contract address
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
                const _value = web3.utils.toWei(amount, 'ether');
                await contract.methods.transferEther(recipientAddress).send({ from: account, value: _value.toString() });

                setMessage('Transfer successful!');
            } catch (error) {
                console.error("Error during transfer:", error);
                setMessage('Transfer failed!');
            }
        }
    };

    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-800 shadow-lg rounded-lg max-w-md mx-auto">
  {account === null && (
    <button
      className="w-full py-3 px-5 text-white text-lg font-semibold rounded-lg transition-transform duration-300 bg-blue-500 hover:bg-blue-600 transform hover:scale-105"
      onClick={connectWallet}
    >
      Complete Payment
    </button>
  )}
  {account && (
    <div className="w-full space-y-6">
      <div className="w-full flex justify-center items-center text-white text-4xl font-bold tracking-wide mb-4">
        Token Transfer
      </div>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        className="w-full p-4 bg-gray-700 text-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-4 bg-gray-700 text-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-transform duration-300 transform hover:scale-105"
        onClick={handleTransfer}
      >
        Transfer Ether
      </button>
      {message && (
  <p
    className={`text-center mt-3 ${
      message === 'Transfer successful!' ? 'text-green-500' : 'text-red-500'
    }`}
  >
    {message}
  </p>
)}
    </div>
  )}
</div>

  
    );
};

export default SimpleTransfer;