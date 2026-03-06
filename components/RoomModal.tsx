'use client'

import { useEffect, useState } from 'react'

interface ClassEntry {
  _id: string
  semester: string
  day: string
  startTime: string
  endTime: string
  type: string
  subjectCode: string
  batch: string
  teacher: string
  roomId: string
}

interface RoomScheduleData {
  roomId: string
  day: string
  currentTime: string
  currentDay: string
  isToday: boolean
  currentClass: ClassEntry | null
  nextClass: ClassEntry | null
  schedule: ClassEntry[]
}

interface Props {
  roomId: string
  roomName: string
  onClose: () => void
}

const TYPE_LABEL: Record<string, string> = {
  L: 'Lecture',
  P: 'Practical',
  T: 'Tutorial',
}

const TYPE_COLOR: Record<string, string> = {
  L: '#3b82f6',
  P: '#10b981',
  T: '#f59e0b',
}

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export default function RoomModal({ roomId, roomName, onClose }: Props) {
  const [data, setData] = useState<RoomScheduleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState<string>('')

  const fetchSchedule = async (day?: string) => {
    setLoading(true)
    try {
      const url = day
        ? `/api/timetable?roomId=${roomId}&day=${day}`
        : `/api/timetable?roomId=${roomId}`
      const res = await fetch(url)
      const json = await res.json()
      setData(json)
      if (!selectedDay) setSelectedDay(json.currentDay)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSchedule()
  }, [roomId])

  const handleDayChange = (day: string) => {
    setSelectedDay(day)
    fetchSchedule(day)
  }

  const isCurrentSlot = (entry: ClassEntry) => {
    if (!data?.isToday || selectedDay !== data.currentDay) return false
    return entry.startTime <= data.currentTime && entry.endTime > data.currentTime
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1a1a2e',
          border: '1px solid rgba(255,215,0,0.3)',
          borderRadius: '16px',
          width: '100%', maxWidth: '520px',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <h2 style={{ color: '#ffd700', margin: 0, fontSize: '20px', fontWeight: 700 }}>
              {roomName}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: '4px 0 0', fontSize: '12px' }}>
              {roomId.toUpperCase()} · {data?.currentTime || ''}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: 'white', borderRadius: '8px', padding: '6px 12px',
              cursor: 'pointer', fontSize: '16px',
            }}
          >✕</button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
            Loading schedule...
          </div>
        ) : (
          <>
            {/* Current Status */}
            {data?.isToday && selectedDay === data.currentDay && (
              <div style={{ padding: '16px 24px' }}>
                {data.currentClass ? (
                  <div style={{
                    background: 'rgba(16,185,129,0.15)',
                    border: '1px solid rgba(16,185,129,0.4)',
                    borderRadius: '12px', padding: '14px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{
                        background: '#10b981', color: 'white',
                        borderRadius: '6px', padding: '2px 10px',
                        fontSize: '11px', fontWeight: 700,
                      }}>🔴 LIVE NOW</span>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                        {data.currentClass.startTime} – {data.currentClass.endTime}
                      </span>
                    </div>
                    <div style={{ color: 'white', fontWeight: 600 }}>{data.currentClass.subjectCode}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '4px' }}>
                      {data.currentClass.batch} · {data.currentClass.teacher} · {TYPE_LABEL[data.currentClass.type] || data.currentClass.type}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{data.currentClass.semester}</div>
                  </div>
                ) : (
                  <div style={{
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.3)',
                    borderRadius: '12px', padding: '14px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ color: '#60a5fa', fontWeight: 600 }}>✅ Room is FREE now</div>
                      {data.nextClass && (
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
                          Next: {data.nextClass.subjectCode} at {data.nextClass.startTime}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Day Selector */}
            <div style={{ padding: '0 24px 12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {DAYS.map(day => (
                <button
                  key={day}
                  onClick={() => handleDayChange(day)}
                  style={{
                    padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
                    fontWeight: 600, cursor: 'pointer', border: 'none',
                    background: selectedDay === day
                      ? 'linear-gradient(135deg, #b8860b, #ffd700)'
                      : 'rgba(255,255,255,0.1)',
                    color: selectedDay === day ? '#1a1000' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Schedule List */}
            <div style={{ padding: '0 24px 24px' }}>
              {data?.schedule.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                  No classes scheduled on {selectedDay}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {data?.schedule.map((entry, i) => (
                    <div key={i} style={{
                      background: isCurrentSlot(entry) ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${isCurrentSlot(entry) ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '10px', padding: '12px',
                      display: 'flex', gap: '12px', alignItems: 'flex-start',
                    }}>
                      <div style={{ minWidth: '80px', textAlign: 'right', color: 'rgba(255,255,255,0.4)', fontSize: '11px', paddingTop: '2px' }}>
                        {entry.startTime}<br />{entry.endTime}
                      </div>
                      <div style={{ width: '3px', borderRadius: '2px', alignSelf: 'stretch', background: TYPE_COLOR[entry.type] || '#888', minHeight: '40px' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                          <span style={{
                            background: TYPE_COLOR[entry.type] || '#888', color: 'white',
                            borderRadius: '4px', padding: '1px 7px', fontSize: '10px', fontWeight: 700,
                          }}>
                            {TYPE_LABEL[entry.type] || entry.type}
                          </span>
                        </div>
                        <div style={{ color: 'white', fontWeight: 600, fontSize: '13px' }}>{entry.subjectCode}</div>
                        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '2px' }}>{entry.batch} · {entry.teacher}</div>
                        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>{entry.semester}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}