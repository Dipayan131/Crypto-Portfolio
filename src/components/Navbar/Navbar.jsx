import React, { useContext } from 'react'
import "./Navbar.css"

export default function Navbar() {

  return (
    <div className='w-full h-24 flex justify-between items-center border-b-4 border-white'>
    <div className='ml-12 text-5xl font-extrabold tracking-wider p-1 rounded-xl text-stroke'>
      <span className='text-orange-600'>Crypto</span>
      <span className='text-black'>Folio</span>
</div>
    </div>
  )
}
