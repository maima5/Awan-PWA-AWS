import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="brand">PWA AWS</span>
      <div className="links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/items">Items</NavLink>
      </div>
    </nav>
  )
}
