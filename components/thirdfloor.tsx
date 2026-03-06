'use client'

import React, { useState } from 'react';
import RoomModal from './RoomModal';
import FreeRoomsPanel from './FreeRoomsPanel';

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isStair?: boolean;
  isCoridor?: boolean;
  clickable?: boolean;
}

function ThirdFloor({ setFloor }: { setFloor: (floor: 'minus1' | 'ground' | 'first' | 'second' | 'third' | 'fourth') => void }) {
  const [activeRoom, setActiveRoom] = useState<{ id: string; name: string } | null>(null);

  const floors = [
    { value: 'minus1', label: '-1 Floor' },
    { value: 'ground', label: 'Ground' },
    { value: 'first',  label: '1st Floor' },
    { value: 'second', label: '2nd Floor' },
    { value: 'third',  label: '3rd Floor' },
    { value: 'fourth', label: '4th Floor' },
  ];

  const rooms: Room[] = [
    { id: 'Food Lab', name: 'Food Lab', x: 30, y: 20, width: 80, height: 65, color: '#fff3e0', clickable: true },
    { id: 'LIFT', name: 'LIFT', x: 120, y: 20, width: 45, height: 65, color: '#e0e0e0', clickable: false },
    { id: 'Physics Lab2', name: 'Physics Lab2', x: 175, y: 20, width: 110, height: 65, color: '#ede7f6', clickable: true },
    { id: 'Robotics Lab', name: 'Robotics Lab', x: 290, y: 20, width: 95, height: 65, color: '#e0f2f1', clickable: true },
    { id: 'Server Room Top', name: 'Server Room', x: 390, y: 20, width: 80, height: 65, color: '#f1f8e9', clickable: false },
    { id: 'Mac lab', name: 'Mac lab', x: 475, y: 20, width: 250, height: 65, color: '#fce4ec', clickable: true },
    { id: 'ECE Lab-9', name: 'ECE Lab-9', x: 732, y: 20, width: 55, height: 150, color: '#e8eaf6', clickable: true },
    { id: 'ECE Lab-8', name: 'ECE Lab-8', x: 792, y: 20, width: 55, height: 150, color: '#e8eaf6', clickable: true },
    { id: 'BI project lab', name: 'BI Project Lab', x: 850, y: 20, width: 69, height: 150, color: '#e8eaf6', clickable: true },
    { id: 'Corridor-Top', name: 'Corridor', x: 120, y: 95, width: 608, height: 30, color: '#f5f5f5', isCoridor: true, clickable: false },
    { id: 'Corridor-Left-Vert', name: 'Corridor', x: 193, y: 130, width: 37, height: 150, color: '#f5f5f5', isCoridor: true, clickable: false },
    { id: 'Stair-1', name: 'Stairs', x: 240, y: 130, width: 50, height: 30, color: '#d4af37', isStair: true, clickable: false },
    { id: 'Stair-2', name: 'Stairs', x: 585, y: 130, width: 50, height: 30, color: '#d4af37', isStair: true, clickable: false },
    { id: 'Corridor-Right', name: 'Corridor', x: 686, y: 130, width: 40, height: 150, color: '#f5f5f5', isCoridor: true, clickable: false },
    { id: 'Corridor-Left', name: 'Corridor', x: 35, y: 180, width: 150, height: 30, color: '#f5f5f5', isCoridor: true, clickable: false },
    { id: 'GD Room', name: 'GD', x: 30, y: 215, width: 17, height: 70, color: '#fff3e0', clickable: true },
    { id: 'Language Lab', name: 'Lang Lab', x: 52, y: 215, width: 50, height: 70, color: '#fce4ec', clickable: true },
    { id: 'TR-5', name: 'TR 5', x: 107, y: 215, width: 80, height: 70, color: '#e3f2fd', clickable: true },
    { id: 'TR-6', name: 'TR 6', x: 192, y: 215, width: 80, height: 70, color: '#e3f2fd', clickable: true },
    { id: 'TR-7', name: 'TR 7', x: 277, y: 215, width: 80, height: 70, color: '#e3f2fd', clickable: true },
    { id: 'TR-8', name: 'TR 8', x: 362, y: 215, width: 80, height: 70, color: '#e3f2fd', clickable: true },
    { id: 'TR-9', name: 'TR 9', x: 447, y: 215, width: 80, height: 70, color: '#e3f2fd', clickable: true },
    { id: 'CR-11', name: 'CR 11', x: 532, y: 215, width: 80, height: 70, color: '#c8e6c9', clickable: true },
    { id: 'CR-12', name: 'CR 12', x: 617, y: 215, width: 65, height: 70, color: '#c8e6c9', clickable: true },
    { id: 'Mughal Garden', name: 'Mughal Garden', x: 30, y: 300, width: 686, height: 70, color: '#d4edda', clickable: false },
  ];

  const getRoomColor = (room: Room) =>
    room.clickable && activeRoom?.id === room.id ? '#ffd54f' : room.color;

  const handleRoomClick = (room: Room) => {
    if (!room.clickable) return;
    setActiveRoom({ id: room.id, name: room.name });
  };

  const glassCard = {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,215,0,0.25)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
    padding: '20px',
    marginBottom: '20px',
  };

  return (
    <div className="min-h-screen p-6" style={{ position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'url("/juitpit2.webp")', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.45) saturate(1.2) contrast(1.1)', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, rgba(5,15,45,0.55) 0%, rgba(10,30,80,0.45) 50%, rgba(20,10,50,0.55) 100%)', zIndex: 1 }} />
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #b8860b, #ffd700, #f0c040, #ffd700, #b8860b)', zIndex: 10, boxShadow: '0 0 12px rgba(255,215,0,0.6)' }} />

      <div className="max-w-7xl mx-auto pt-2" style={{ position: 'relative', zIndex: 5 }}>

        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div style={{ width: '5px', minHeight: '56px', borderRadius: '4px', background: 'linear-gradient(180deg, #ffd700, #b8860b)', boxShadow: '0 0 10px rgba(255,215,0,0.5)', flexShrink: 0 }} />
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: '#ffd700', textShadow: '0 2px 16px rgba(0,0,0,0.7)', letterSpacing: '0.5px' }}>Third Floor Plan</h1>
              <p className="text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(180,210,255,0.75)' }}>EduNav Campus Navigation System</p>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '12px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.7)', marginRight: '4px' }}>Floor</span>
            {floors.map(f => (
              <button key={f.value} onClick={() => setFloor(f.value as any)} style={{ padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, border: f.value === 'third' ? '1.5px solid #ffd700' : '1.5px solid rgba(255,255,255,0.2)', background: f.value === 'third' ? 'linear-gradient(135deg, #b8860b, #ffd700)' : 'rgba(255,255,255,0.08)', color: f.value === 'third' ? '#1a1000' : 'rgba(255,255,255,0.75)', cursor: 'pointer' }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div style={glassCard}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#ffd700', boxShadow: '0 0 6px #ffd700' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.75)' }}>Floor Map — Click a room to see its schedule</span>
          </div>
          <div className="flex justify-center">
            <svg viewBox="0 0 920 380" className="rounded-xl" style={{ width: '90%', display: 'block', margin: '0 auto', border: '1px solid rgba(255,215,0,0.15)', background: 'rgba(255,255,255,0.95)', aspectRatio: '920/380', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ececec" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="920" height="380" fill="url(#grid)" />
              {rooms.map(room => {
                const isActive = room.clickable && activeRoom?.id === room.id;
                return (
                  <g key={room.id} onClick={() => handleRoomClick(room)} className={room.clickable ? 'cursor-pointer' : 'cursor-default'}>
                    <rect x={room.x} y={room.y} width={room.width} height={room.height} fill={getRoomColor(room)} stroke={isActive ? '#ef4444' : '#64748b'} strokeWidth={isActive ? 3 : 1.5} rx="4" className={`transition-all duration-200 ${room.clickable ? 'hover:opacity-75' : ''}`} />
                    <text x={room.x + room.width / 2} y={room.y + room.height / 2} textAnchor="middle" dominantBaseline="middle" fontSize={room.width < 60 ? '8' : '10'} fontWeight="700" fill="#1e293b" pointerEvents="none" className="select-none">{room.name}</text>
                    {room.clickable && <circle cx={room.x + room.width - 8} cy={room.y + 8} r="5" fill="#22c55e" pointerEvents="none" />}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="mt-4 text-center text-xs" style={{ color: 'rgba(180,210,255,0.4)' }}>
          Last updated: February 2026 | Interactive Floor Plan
        </div>
      </div>

      {activeRoom && (
        <RoomModal roomId={activeRoom.id} roomName={activeRoom.name} onClose={() => setActiveRoom(null)} />
      )}
      <FreeRoomsPanel onRoomClick={(id) => setActiveRoom({ id, name: id.toUpperCase() })} />
    </div>
  );
}

export default ThirdFloor;
