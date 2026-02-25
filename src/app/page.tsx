'use client'

import React, { useState } from 'react'
import Firstfloor from "../../components/firstfloor"
import FloorGround from "../../components/FloorGround"
import SecondFloor from "../../components/SecondFloor"
import MinusOneFloor from "../../components/MinusOneFloor"

type FloorType = 'first' | 'second' | 'ground' | 'minus1';

const floorOrder: FloorType[] = ['minus1', 'ground', 'first', 'second'];

function Page() {
  const [floor, setFloor] = useState<FloorType>('first')

  const handleFloorChange = (direction: number) => {
    const currentIndex = floorOrder.indexOf(floor);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < floorOrder.length) {
      setFloor(floorOrder[newIndex]);
    }
  };

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
        <button
          className={`px-3 py-1 rounded ${floor === 'minus1' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFloor('minus1')}
        >
          -1 Floor
        </button>
      </div>

      <div className='flex-1'>
        {floor === 'first' && <Firstfloor onFloorChange={handleFloorChange} />}
        {floor === 'second' && <SecondFloor onFloorChange={handleFloorChange} />}
        {floor === 'ground' && <FloorGround onFloorChange={handleFloorChange} />}
        {floor === 'minus1' && <MinusOneFloor onFloorChange={handleFloorChange} />}
      </div>
    </div>
  )
}

export default Page