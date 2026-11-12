import { useEffect, useState } from 'react'
import api from '../services/api.js'

// Contoh halaman CRUD sederhana yang memanggil endpoint /api/items di backend
export default function Items() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const res = await api.get('/api/items')
      setItems(res.data)
      setError('')
    } catch {
      setError('Gagal memuat data dari backend.')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const add = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    try {
      await api.post('/api/items', { name })
      setName('')
      load()
    } catch {
      setError('Gagal menambah item.')
    }
  }

  const remove = async (id) => {
    try {
      await api.delete(`/api/items/${id}`)
      load()
    } catch {
      setError('Gagal menghapus item.')
    }
  }

  return (
    <section>
      <h1>Items</h1>
      <form onSubmit={add} className="form">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama item" />
        <button type="submit">Tambah</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul className="list">
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => remove(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
