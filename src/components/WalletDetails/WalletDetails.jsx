import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { FiCopy } from 'react-icons/fi';

export default function WalletDetails() {
    const { defaultAccount, userBalance } = useContext(AppContext);

    const truncateAddress = (address) => {
        if (address.length > 10) {
            return `${address.slice(0, 6)}...${address.slice(-4)}`;
        }
        return address;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(defaultAccount).then(() => {
            alert('Address copied to clipboard!');
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="bg-[#252323] text-green-300 p-6 rounded-lg shadow-lg max-w-md w-full border border-white">
                <h1 className="text-4xl font-extrabold mb-6 text-center">Your Wallet</h1>
                <div className="mb-4 flex items-center">
                    <strong className="text-lg">Your Account:</strong>
                    <p className="text-base font-medium mt-1 break-all text-gray-500 ml-2">
                        {truncateAddress(defaultAccount)}
                    </p>
                    <FiCopy 
                        onClick={copyToClipboard} 
                        className="ml-2 text-blue-500 cursor-pointer hover:text-blue-600"
                        size={20}
                        title='Copy Address to Clipboard'
                    />
                </div>
                <div>
                    <strong className="text-lg">Balance:</strong>
                    <p className="text-base font-medium mt-1 text-gray-500">{userBalance} ETH</p>
                </div>
            </div>
        </div>
    );
}
