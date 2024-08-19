import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import "./Navbar.css"

export default function Navbar() {
  const {walletConnectStatus,
    setWalletConnectStatus,
    defaultAccount,
    setDefaultAccount,
    userBalance,
    setUserBalance} = useContext(AppContext)

    const handleDisconnect = () => {
      setWalletConnectStatus(false);
      setDefaultAccount(null);
      setUserBalance(null);
    }

  return (
    <div className='w-full h-24 flex justify-between items-center border-b-4 border-white'>
    <div className='ml-12 text-5xl font-extrabold tracking-wider p-1 rounded-xl text-stroke'>
      <span className='text-orange-600'>Crypto</span>
      <span className='text-black'>Folio</span>
</div>

      {walletConnectStatus && <Link to='/' onClick={() => handleDisconnect()} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out mr-12">
  Disconnect Wallet
</Link>}

    </div>
  )
}
