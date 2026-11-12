import { useEffect, useState } from 'react'

// Menampilkan banner ketika perangkat sedang offline
export default function OfflineBanner() {
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  if (online) return null
  return <div className="offline-banner">Kamu sedang offline. Data yang tampil berasal dari cache.</div>
}
