'use client'

import React, { useState } from 'react'
import Firstfloor from "../../components/firstfloor"
import FloorGround from "../../components/FloorGround"
import SecondFloor from "../../components/SecondFloor"

function Page() {
  const [floor, setFloor] = useState<'first' | 'second' | 'ground'>('first')

  return (
    <div className='h-screen w-screen flex flex-col'>
      <div className='p-4 flex gap-2 justify-center bg-white text-black shadow-sm'>
        <button
          className={`px-3 py-1 rounded ${floor === 'first' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFloor('first')}
        >
          1st Floor
        </button>
        <button
          className={`px-3 py-1 rounded ${floor === 'second' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFloor('second')}
        >
          2nd Floor
        </button>
        <button
          className={`px-3 py-1 rounded ${floor === 'ground' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFloor('ground')}
        >
          Ground
        </button>
      </div>

      <div className='flex-1'>
        {floor === 'first' && <Firstfloor />}
        {floor === 'second' && <SecondFloor />}
        {floor === 'ground' && <FloorGround />}
      </div>
    </div>
  )
}

export default Page