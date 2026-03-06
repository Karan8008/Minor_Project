'use client'

import { useEffect, useState } from 'react'

interface FreeRoomsData {
  currentTime: string
  currentDay: string
  freeRooms: string[]
  busyRooms: string[]
}

interface Props {
  onRoomClick: (roomId: string) => void
}

export default function FreeRoomsPanel({ onRoomClick }: Props) {
  const [data, setData] = useState<FreeRoomsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const fetchFreeRooms = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/timetable?mode=free')
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchFreeRooms()
    const interval = setInterval(fetchFreeRooms, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 500,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white', border: 'none', borderRadius: '50px',
          padding: '12px 20px', fontWeight: 700, fontSize: '14px',
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}
      >
        <span>🟢</span>
        <span>Free Rooms</span>
        {data && (
          <span style={{
            background: 'rgba(255,255,255,0.25)', borderRadius: '20px',
            padding: '1px 8px', fontSize: '12px',
          }}>
            {data.freeRooms.length}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'fixed', bottom: '80px', right: '24px', zIndex: 500,
          background: '#1a1a2e', border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: '16px', width: '300px', maxHeight: '60vh',
          overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
        }}>
          <div style={{
            padding: '16px 20px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ color: '#10b981', fontWeight: 700, fontSize: '15px' }}>Free Rooms Now</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
                {data?.currentDay} · {data?.currentTime}
              </div>
            </div>
            <button
              onClick={fetchFreeRooms}
              style={{
                background: 'rgba(255,255,255,0.1)', border: 'none',
                color: 'white', borderRadius: '8px', padding: '4px 10px',
                cursor: 'pointer', fontSize: '12px',
              }}
            >↻ Refresh</button>
          </div>

          {loading ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
              Loading...
            </div>
          ) : (
            <div style={{ padding: '12px 16px' }}>
              {data?.freeRooms.length === 0 ? (
                <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '20px' }}>
                  No free rooms found
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {data?.freeRooms.map(roomId => (
                    <button
                      key={roomId}
                      onClick={() => { onRoomClick(roomId); setOpen(false); }}
                      style={{
                        background: 'rgba(16,185,129,0.15)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        color: '#10b981', borderRadius: '8px',
                        padding: '5px 12px', fontSize: '12px', fontWeight: 600,
                        cursor: 'pointer', textTransform: 'uppercase',
                      }}
                    >
                      {roomId}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}