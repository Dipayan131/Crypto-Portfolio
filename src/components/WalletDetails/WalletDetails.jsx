import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

export default function WalletDetails() {
    const {defaultAccount,
        setDefaultAccount,
        userBalance,
        setUserBalance} = useContext(AppContext)

  return (
    <div className='flex justify-center items-center flex-col w-full h-full p-2 bg-emerald-700'>
        <h1 className='text-3xl font-bold'>Your Wallet</h1>
        <div><strong>Your Account: </strong>{defaultAccount}</div>
        <div><strong>Balance: </strong>{userBalance}</div>

    </div>
  )
}
