import React, { useState } from 'react'
import HistoricalData from '../HistoricalData/HistoricalData'
import TokenTransfer from '../TokenTransfer/TokenTransfer'
import WalletDetails from '../WalletDetails/WalletDetails'

export default function Dashboard() {
    const [mainTab, setMainTab] = useState("Historical Data")

  return (
    <div className='h-[90.8vh] bg-yellow-200 flex'>
        <div className='h-full w-[40%] bg-blue-300 flex flex-col'>
            <div className='w-full h-[40%] bg-pink-300'><WalletDetails /></div>
            <div className='w-full h-[60%] bg-green-300'></div>
        </div>
        <div className='w-[75%] h-full bg-slate-400'>
            <div className='w-full h-11 bg-green-700 flex justify-between items-center'>
                <div className='w-1/2 bg-pink-200 flex justify-center cursor-pointer' onClick={() => setMainTab("Historical Data")}>Historical Data</div>
                <div className='w-1/2 bg-pink-200 flex justify-center cursor-pointer' onClick={() => setMainTab("Token Transfer")}>Token Transfer</div>
            </div>
            <div className='w-full h-[84.5vh] bg-lime-500 flex justify-center items-center'>
                {mainTab === "Historical Data" ? <HistoricalData /> : <TokenTransfer />}
            </div>
        </div>
    </div>
  )
}
