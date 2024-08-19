import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

export default function WalletDetails() {
    const {defaultAccount,
        setDefaultAccount,
        userBalance,
        setUserBalance} = useContext(AppContext)

        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="bg-[#252323] text-green-300 p-6 rounded-lg shadow-lg max-w-md w-full border border-white">
              <h1 className="text-4xl font-extrabold mb-6 text-center">Your Wallet</h1>
              <div className="mb-4">
                <strong className="text-lg">Your Account:</strong>
                <p className="text-base font-medium mt-1 break-all text-gray-500">{defaultAccount}</p>
              </div>
              <div>
                <strong className="text-lg">Balance:</strong>
                <p className="text-base font-medium mt-1 text-gray-500">{userBalance} ETH</p>
              </div>
            </div>
          </div>
        );
        
}
