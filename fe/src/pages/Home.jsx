import { useEffect, useState } from 'react'
import api from '../services/api.js'

export default function Home() {
  const [status, setStatus] = useState('memeriksa...')

  useEffect(() => {
    api.get('/api/health')
      .then((res) => setStatus(`terhubung (${res.data.status})`))
      .catch(() => setStatus('tidak terhubung, pastikan backend sudah berjalan'))
  }, [])

  return (
    <section>
      <h1>Selamat datang 👋</h1>
      <p>Template Progressive Web App untuk Tugas Besar Komputasi Awan.</p>
      <p>Status backend: <strong>{status}</strong></p>
    </section>
  )
}
