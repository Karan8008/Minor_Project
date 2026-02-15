'use client'

import React from 'react';

function Firstfloor() {
  // Rooms based on your updated floor plan
  const rooms = [
    // Top row - 1st Floor
    { id: 'cl9', name: 'CL 9', x: 20, y: 20, width: 80, height: 70 },
    { id: 'placement-cell', name: ' T & p cell', x: 110, y: 55, width: 60, height: 35},
    { id: 'pharma-cell', name: 'HR office', x: 110, y: 20, width: 60, height: 35 },
    { id: 'washroom-boys', name: 'BW', x: 180, y: 20, width: 50, height: 35 },

    { id: 'cc-11', name: 'CL- 10 & 11', x: 250, y: 10, width: 160, height: 37 },
    { id: 'cc-11', name: 'TR 1', x: 250, y: 50, width: 68, height: 35 },
    { id: 'cc-11', name: 'TR 2', x: 320, y: 50, width: 68, height: 35 },
    { id: 'staff-room', name: 'Staff Room', x: 516, y: 14, width: 100, height: 37 },
     { id: 'staff-room', name: 'Board Room', x: 415, y: 13, width: 100, height: 37 },
    { id: 'cc-11', name: 'TR 4', x: 565, y: 50, width: 53, height: 35 },
    { id: 'cc-11', name: 'TR 3', x: 510, y: 50, width: 53, height: 35 },
    { id: 'lobby', name: 'Lobby', x: 620, y: 15, width: 58, height: 75 },
    { id: 'ca-9', name: 'Cr 9', x: 680, y: 15, width: 90, height: 75 },
    { id: 'ca-10', name: 'Cr 10', x: 770, y: 15, width: 90, height: 75   },

    // Middle corridor area
    { id: 'corridor-top', name: '', x: 20, y: 130, width: 840, height: 60 },

    // Bottom section - Ground Floor area
    
    { id: 'lt3', name: 'LT3', x: 20, y: 240, width: 100, height: 140 },
    { id: 'ca-8', name: 'CR 8', x: 200, y: 250, width: 80, height: 130 },
    { id: 'ca-7', name: 'CR 7', x: 290, y: 250, width: 80, height: 130 },
    { id: 'lab1', name: 'LAB 1', x: 690, y: 250, width: 80, height: 130 },
     { id: 'lab2', name: 'LAB 2', x: 780, y: 250, width: 80, height: 130 },
    
    
    // Mughal Garden area
    { id: 'mughal-garden', name: 'Mughal Garden', x: 20, y: 390, width: 840, height: 130 },
    
    // Right side bottom
   
    { id: 'ramps-lab', name: 'CR 6', x: 460, y: 250, width: 80, height: 130},
    { id: 'see-lab', name: 'CR 5', x: 550, y: 250, width: 80, height: 130},
     { id: 'see-lab', name: 'GW', x: 630, y: 310  , width: 60, height: 70},
    
    

    
  ];

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full h-full p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Campus Floor Plan</h1>
        
        <div className="bg-gray-50 rounded-lg p-4 h-full">
          <svg viewBox="0 0 880 600" className="w-full h-full">
            {/* Building outline */}
            <rect x="10" y="10" width="860" height="520" fill="none" stroke="#999" strokeWidth="3" strokeDasharray="10,5" />
            
            {/* Floor labels */}
            <text x="440" y="110" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#666" opacity="0.5">
              1st Floor
            </text>
            
            
            {/* Render all rooms */}
            {rooms.map(room => {
              const isGarden = room.id === 'mughal-garden';
              const isCorridor = room.id.includes('corridor') || room.id === 'passage' || room.id === 'lobby';
              const isWayPath = room.id === 'way-to-green';
              
              return (
                <g key={room.id}>
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill={isGarden ? '#d4edda' : isCorridor ? '#f8f9fa' : isWayPath ? '#fff3cd' : '#ffffff'}
                    stroke="#333"
                    strokeWidth="2"
                    rx="3"
                  />
                  {room.name && (
                    <text
                      x={room.x + room.width / 2}
                      y={room.y + room.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={room.width < 80 ? '10' : '12'}
                      fontWeight={isGarden ? 'normal' : 'bold'}
                      fill="#333"
                      style={{ fontStyle: isGarden ? 'italic' : 'normal' }}
                    >
                      {room.name}
                    </text>
                  )}
                </g>
              );
            })}
            
            {/* Stairway markers */}
            <rect x="600" y="30" width="15" height="50" fill="#666" stroke="#333" strokeWidth="1" />
            <text x="607" y="55" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">
              ↕
            </text>
            
          </svg>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          EduNav Campus Navigation System
        </div>
      </div>
    </div>
  );
}

export default Firstfloor;