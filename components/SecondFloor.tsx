'use client'

import React, { useState } from 'react';

type DoorPosition = 'top' | 'bottom' | 'left' | 'right';

interface DoorSpec {
  position: DoorPosition;
  width?: number;
  height?: number;
  offset?: number;
  interactive?: boolean;
  x?: number;
  y?: number;
}

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isStair?: boolean;
  stairDirection?: number;
  door?: DoorPosition | DoorSpec | Array<DoorPosition | DoorSpec>;
}

function SecondFloor({ setFloor }: { setFloor: (floor: 'minus1' | 'ground' | 'first' | 'second' | 'third' | 'fourth') => void }) {
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());

  const floors = [
    { value: 'minus1', label: '-1 Floor' },
    { value: 'ground', label: 'Ground' },
    { value: 'first',  label: '1st Floor' },
    { value: 'second', label: '2nd Floor' },
    { value: 'third',  label: '3rd Floor' },
    { value: 'fourth', label: '4th Floor' },
  ];

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

  const toggleRoom = (roomId: string) => {
    setSelectedRooms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roomId)) {
        newSet.delete(roomId);
      } else {
        newSet.add(roomId);
      }
      return newSet;
    });
  };

  const rooms: Room[] = [
    { id: 'DBT', name: 'DBT', x: 20, y: 20, width: 100, height: 90, color: '#f3e5f5', door: 'right' },
    { id: 'lift', name: 'Lift', x: 160, y: 20, width: 50, height: 35, color: '#ede7f6' },
    { id: 'block-1', name: 'PC OFFICE', x: 270, y: 10, width: 120, height: 80, color: '#f3e5f5', door: 'bottom' },
    { id: 'STAFF ROOM', name: 'VC OFFICE', x: 390, y: 10, width: 120, height: 80, color: '#e3f2fd', door: 'bottom' },
    { id: 'block-3', name: 'DEAN OFFICE', x: 510, y: 10, width: 120, height: 80, color: '#f1f8e9', door: 'bottom' },
    { id: 'cr11', name: 'CR 11', x: 680, y: 10, width: 90, height: 80, color: '#c8e6c9', door: [{ position: 'bottom', offset: -20 }, { position: 'bottom', offset: 20 }] },
    { id: 'cr12', name: 'CR 12', x: 770, y: 10, width: 90, height: 80, color: '#c8e6c9', door: [{ position: 'bottom', offset: -20 }, { position: 'bottom', offset: 20 }] },
    { id: 'Stair-BW', name: 'Stair ↓', x: 250, y: 107, width: 120, height: 20, color: '#d4af37', isStair: true, stairDirection: -1 },
    { id: 'Stair-Lobby', name: 'Stair ↓', x: 510, y: 107, width: 120, height: 20, color: '#d4af37', isStair: true, stairDirection: -1 },
    { id: 'corridor-gap1', name: 'Corridor', x: 180, y: 130, width: 70, height: 120, color: '#f5f5f5' },
    { id: 'corridor-gap2', name: 'Corridor', x: 630, y: 130, width: 50, height: 120, color: '#f5f5f5' },
    { id: 'space-left', name: '', x: 20, y: 130, width: 160, height: 120, color: '#e0e0e0' },
    { id: 'space-middle', name: '', x: 250, y: 130, width: 380, height: 120, color: '#e0e0e0' },
    { id: 'space-right', name: '', x: 680, y: 130, width: 180, height: 120, color: '#e0e0e0' },
    { id: 'cif', name: 'CIF', x: 10, y: 290, width: 30, height: 90, color: '#e1f5fe', door: [{ position: 'right', offset: -30 }] },
    { id: 'lt3', name: 'TR 7', x: 40, y: 320, width: 60, height: 60, color: '#e1f5fe', door: 'top' },
    { id: 'TR6', name: 'TR 6', x: 100, y: 320, width: 60, height: 60, color: '#c8e6c9', door: 'top' },
    { id: 'cr8', name: 'TR 5', x: 160, y: 320, width: 60, height: 60, color: '#c8e6c9', door: 'top' },
    { id: 'RR', name: 'RR', x: 220, y: 290, width: 30, height: 90, color: '#e0f2f1', door: [{ position: 'left', offset: -30 }] },
    { id: 'GW', name: 'GW', x: 250, y: 310, width: 40, height: 70, color: '#e0f2f1' },
    { id: 'cr7', name: 'ECE LAB 3', x: 290, y: 290, width: 80, height: 90, color: '#c8e6c9', door: 'top' },
    { id: 'ECE LAB4', name: 'ECE LAB 4', x: 370, y: 290, width: 80, height: 90, color: '#c8e6c9', door: 'top' },
    { id: 'SRS', name: 'SRS ROOM', x: 450, y: 340, width: 30, height: 40, color: '#c8e6c9', door: 'top' },
    { id: 'ECE LAB5', name: 'ECE LAB 5', x: 480, y: 290, width: 80, height: 90, color: '#c8e6c9', door: 'top' },
    { id: 'ECE LAB1', name: 'BIOTECH LAB', x: 560, y: 290, width: 80, height: 90, color: '#c8e6c9', door: 'top' },
    { id: 'bw', name: 'bw', x: 640, y: 310, width: 40, height: 70, color: '#e0f2f1' },
    { id: 'lab1', name: 'BIOINFO. LAB', x: 680, y: 290, width: 80, height: 90, color: '#ffecb3', door: 'top' },
    { id: 'server-room', name: 'SR', x: 760, y: 310, width: 30, height: 70, color: '#e0f2f1', door: 'left' },
    { id: 'cl1', name: 'CL 1', x: 790, y: 240, width: 70, height: 140, color: '#ffecb3', door: { position: 'left', offset: -35 } },
    { id: 'mughal-garden', name: 'Mughal Garden', x: 20, y: 390, width: 840, height: 130, color: '#d4edda' },
  ];

  const isSelectableRoom = (roomId: string) => {
    return roomId.toLowerCase().startsWith('tr') ||
      roomId.toLowerCase().startsWith('cr') ||
      roomId.toLowerCase().startsWith('lt') ||
      roomId.toLowerCase().startsWith('lab') ||
      roomId.toLowerCase().startsWith('cl') ||
      roomId.toLowerCase().startsWith('block') ||
      roomId.toLowerCase().startsWith('ece') ||
      roomId.toLowerCase().includes('biotech') ||
      roomId.toLowerCase().includes('server') ||
      roomId.toLowerCase().includes('board');
  };

  const clickableRooms = rooms.filter(r => isSelectableRoom(r.id));

  const getRoomColor = (room: Room) => {
    if (isSelectableRoom(room.id) && selectedRooms.has(room.id)) {
      return '#ffd54f';
    }
    return room.color;
  };

  const renderDoorOne = (room: Room, doorRaw: DoorPosition | DoorSpec, key?: string | number) => {
    const spec: DoorSpec = typeof doorRaw === 'string' ? { position: doorRaw } : doorRaw;
    const pos = spec.position;
    const slabW = spec.width ?? (pos === 'top' || pos === 'bottom' ? 20 : 4);
    const slabH = spec.height ?? (pos === 'left' || pos === 'right' ? 20 : 8);
    const offset = spec.offset ?? 0;
    const interactive = spec.interactive ?? false;
    const pointer = interactive ? undefined : 'none';

    let x = room.x + (room.width - slabW) / 2 + (pos === 'left' || pos === 'right' ? 0 : offset);
    let y = room.y - slabH / 2;

    if (pos === 'top') {
      x = room.x + (room.width - slabW) / 2 + offset;
      y = room.y - slabH / 2;
    } else if (pos === 'bottom') {
      x = room.x + (room.width - slabW) / 2 + offset;
      y = room.y + room.height - slabH / 2;
    } else if (pos === 'left') {
      x = room.x - slabW / 2;
      y = room.y + (room.height - slabH) / 2 + offset;
    } else if (pos === 'right') {
      x = room.x + room.width - slabW / 2;
      y = room.y + (room.height - slabH) / 2 + offset;
    }

    const userX = spec.x;
    const userY = spec.y;
    const boxW = spec.width ?? Math.min(16, slabW);
    const boxH = spec.height ?? Math.min(12, slabH);

    let bx: number;
    let by: number;

    if (typeof userX === 'number' && typeof userY === 'number') {
      bx = userX;
      by = userY;
    } else {
      const cx = x + slabW / 2;
      const cy = y + slabH / 2;
      bx = cx - boxW / 2;
      by = cy - boxH / 2;
    }

    return (
      <g key={key} pointerEvents={pointer as React.CSSProperties['pointerEvents']} aria-hidden={!interactive}>
        <rect
          x={bx}
          y={by}
          width={boxW}
          height={boxH}
          fill="url(#grid)"
          stroke="#475569"
          strokeWidth="1"
          rx="1"
          opacity="1"
        />
        <line x1={bx} y1={by} x2={bx} y2={by + boxH} stroke="#475569" strokeWidth="1" opacity="0.9" />
        <line x1={bx + boxW} y1={by} x2={bx + boxW} y2={by + boxH} stroke="#475569" strokeWidth="1" opacity="0.9" />
      </g>
    );
  };

  const renderDoor = (room: Room) => {
    if (!room.door) return null;
    if (Array.isArray(room.door)) {
      return room.door.map((d, i) => renderDoorOne(room, d, i));
    }
    return renderDoorOne(room, room.door);
  };

  const handleStairNavigation = (direction: number) => {
    if (direction < 0) {
      setFloor('first');
      return;
    }
    setFloor('third');
  };

  return (
    <div className="min-h-screen p-6" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Layer 1 — Campus image */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'url("/juitpit2.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.45) saturate(1.2) contrast(1.1)',
        zIndex: 0,
      }} />

      {/* Layer 2 — Deep blue gradient overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(135deg, rgba(5,15,45,0.55) 0%, rgba(10,30,80,0.45) 50%, rgba(20,10,50,0.55) 100%)',
        zIndex: 1,
      }} />

      {/* Gold top accent bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #b8860b, #ffd700, #f0c040, #ffd700, #b8860b)',
        zIndex: 10,
        boxShadow: '0 0 12px rgba(255,215,0,0.6)',
      }} />

      {/* Content */}
      <div className="max-w-7xl mx-auto pt-2" style={{ position: 'relative', zIndex: 5 }}>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div style={{
              width: '5px', minHeight: '56px', borderRadius: '4px',
              background: 'linear-gradient(180deg, #ffd700, #b8860b)',
              boxShadow: '0 0 10px rgba(255,215,0,0.5)',
              flexShrink: 0,
            }} />
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{
                color: '#ffd700',
                textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 0 30px rgba(255,215,0,0.2)',
                letterSpacing: '0.5px',
              }}>
                2nd Floor Plan
              </h1>
              <p className="text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(180,210,255,0.75)' }}>
                EduNav Campus Navigation System
              </p>
            </div>
          </div>

          {/* Pill Button Floor Switcher */}
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,215,0,0.3)',
            borderRadius: '12px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.7)', marginRight: '4px' }}>
              Floor
            </span>
            {floors.map(f => (
              <button
                key={f.value}
                onClick={() => setFloor(f.value as 'minus1' | 'ground' | 'first' | 'second' | 'third' | 'fourth')}
                className="transition-transform duration-200 hover:scale-105 active:scale-100"
                style={{
                  padding: '5px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  border: f.value === 'second'
                    ? '1.5px solid #ffd700'
                    : '1.5px solid rgba(255,255,255,0.2)',
                  background: f.value === 'second'
                    ? 'linear-gradient(135deg, #b8860b, #ffd700)'
                    : 'rgba(255,255,255,0.08)',
                  color: f.value === 'second' ? '#1a1000' : 'rgba(255,255,255,0.75)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: f.value === 'second' ? '0 0 10px rgba(255,215,0,0.4)' : 'none',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Floor Map Card */}
        <div style={glassCard}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:'#ffd700', boxShadow:'0 0 6px #ffd700' }}/>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.75)' }}>Floor Map</span>
          </div>

          <div className="flex justify-center">
            <svg
              viewBox="0 0 880 530"
              className="rounded-xl"
              style={{
                width: '90%',
                display: 'block',
                margin: '0 auto',
                border: '1px solid rgba(255,215,0,0.15)',
                background: 'rgba(255,255,255,0.95)',
                aspectRatio: '880/530',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              {/* Background Pattern */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="880" height="530" fill="url(#grid)" />

              {/* Floor label */}
              <text x="440" y="35" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#666" opacity="0.4">
                2nd Floor
              </text>

              {/* Render all rooms */}
              {rooms.map(room => {
                const isInLegend = clickableRooms.some(item => item.id === room.id);
                return (
                  <g
                    key={room.id}
                    className={isInLegend ? 'transition-transform duration-200 hover:scale-105 active:scale-100' : undefined}
                    style={isInLegend ? { transformBox: 'fill-box', transformOrigin: 'center' } : undefined}
                  >
                    <rect
                      x={room.x}
                      y={room.y}
                      width={room.width}
                      height={room.height}
                      fill={getRoomColor(room)}
                      stroke={isSelectableRoom(room.id) && selectedRooms.has(room.id) ? '#ff6b6b' : room.isStair ? '#8B4513' : '#475569'}
                      strokeWidth={isSelectableRoom(room.id) && selectedRooms.has(room.id) ? '3' : room.isStair ? '3' : '2'}
                      rx="3"
                      className={isInLegend || room.isStair ? 'cursor-pointer transition-all duration-200' : 'cursor-default'}
                      onClick={() => {
                        if (room.isStair && room.stairDirection) {
                          handleStairNavigation(room.stairDirection);
                        } else if (isSelectableRoom(room.id)) {
                          toggleRoom(room.id);
                        }
                      }}
                      style={{
                        filter: isSelectableRoom(room.id) && selectedRooms.has(room.id)
                          ? 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.5))'
                          : room.isStair
                            ? 'drop-shadow(0 0 4px rgba(139, 69, 19, 0.5))'
                            : 'none'
                      }}
                    />

                    {room.door && renderDoor(room)}

                    {room.isStair && (
                      (() => {
                        if (room.width > room.height) {
                          const steps = Math.max(4, Math.floor(room.width / 12));
                          const stepWidth = room.width / steps;
                          const riserWidth = Math.max(2, stepWidth - 2);
                          const stepHeightOffset = room.height / steps;
                          const baseY = room.y + room.height;

                          return (
                            <g>
                              {Array.from({ length: steps }).map((_, i) => {
                                const x = room.x + i * stepWidth;
                                const h = Math.max(4, (i + 1) * stepHeightOffset);
                                const y = baseY - h;

                                return (
                                  <rect
                                    key={i}
                                    x={x}
                                    y={y}
                                    width={riserWidth}
                                    height={h}
                                    fill="#6a4f0bff"
                                    stroke="#8b7500"
                                    strokeWidth="0.4"
                                    opacity="0.95"
                                  />
                                );
                              })}
                            </g>
                          );
                        }

                        const steps = Math.max(4, Math.floor(room.height / 12));
                        const stepHeight = room.height / steps;
                        const stepWidthOffset = room.width / steps;
                        const gap = Math.max(1, stepHeight * 0.12);

                        return (
                          <g>
                            {Array.from({ length: steps }).map((_, i) => {
                              const x = room.x + i * stepWidthOffset;
                              const h = Math.max(2, stepHeight - gap);
                              const y = room.y + room.height - (i + 1) * stepHeight + gap / 2;
                              const w = Math.max(2, room.width - i * stepWidthOffset);

                              return (
                                <rect
                                  key={i}
                                  x={x}
                                  y={y}
                                  width={w}
                                  height={h}
                                  fill="#6a4f0bff"
                                  stroke="#8b7500"
                                  strokeWidth="0.4"
                                  opacity="0.95"
                                />
                              );
                            })}
                          </g>
                        );
                      })()
                    )}

                    {room.name && (
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-bold select-none"
                        fontSize={room.width < 80 ? '10' : '12'}
                        fill="#1f2937"
                        pointerEvents="none"
                      >
                        {room.name}
                      </text>
                    )}

                    {isSelectableRoom(room.id) && (
                      <circle
                        cx={room.x + room.width - 8}
                        cy={room.y + 8}
                        r="5"
                        fill="#22c55e"
                        opacity="1"
                        pointerEvents="none"
                      />
                    )}
                  </g>
                );
              })}

            </svg>
          </div>
        </div>

        {/* Selected Rooms */}
        {selectedRooms.size > 0 && (
          <div style={{
            ...glassCard,
            border: '1px solid rgba(239,68,68,0.5)',
            borderLeft: '4px solid #ef4444',
          }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: '#ffd700' }}>
              Selected Rooms ({selectedRooms.size})
            </h2>
            <div className="space-y-2">
              {rooms.filter(r => selectedRooms.has(r.id)).map(room => (
                <div key={room.id} className="flex items-center gap-3 p-2 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div className="w-6 h-6 rounded"
                    style={{ backgroundColor: room.color, border: '2px solid rgba(255,215,0,0.5)' }} />
                  <span className="text-sm font-bold" style={{ color: '#fff' }}>{room.name}</span>
                  {room.isStair && <span className="text-amber-400 text-xs ml-auto">⚠️ Stair</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div style={glassCard}>
          <h2 className="text-lg font-bold mb-4" style={{ color: '#ffd700' }}>Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {clickableRooms.map(room => (
              <div key={room.id} onClick={() => toggleRoom(room.id)}
                className="flex items-center gap-3 p-3 rounded-xl transition-transform duration-200 hover:scale-105 active:scale-100"
                style={{
                  background: selectedRooms.has(room.id) ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.08)',
                  border: selectedRooms.has(room.id) ? '1px solid rgba(239,68,68,0.7)' : '1px solid rgba(255,215,0,0.4)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div className="w-5 h-5 rounded flex-shrink-0"
                  style={{ backgroundColor: room.color, border: '1px solid rgba(255,255,255,0.5)' }} />
                <span className="text-sm font-semibold" style={{ color: '#f0f4ff' }}>{room.name}</span>
                <span className="ml-auto text-xs" style={{ color: '#22c55e' }}>●</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs flex items-center gap-2" style={{ color: 'rgba(180,210,255,0.55)' }}>
            <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 5px #22c55e' }} />
            Green dot indicates clickable rooms
          </p>
        </div>

        <div className="mt-4 text-center text-xs" style={{ color: 'rgba(180,210,255,0.4)' }}>
          Last updated: February 2026 | Interactive Floor Plan
        </div>
      </div>
    </div>
  );
}

export default SecondFloor;