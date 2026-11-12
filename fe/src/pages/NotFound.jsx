import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>Halaman tidak ditemukan. <Link to="/">Kembali ke Home</Link></p>
    </section>
  )
}
