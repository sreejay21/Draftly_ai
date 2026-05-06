import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import './Header.css'

export default function Header({ user, onLogout }) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">✉️</span>
          <span className="logo-text">Draftly AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
          <Link to="/drafts" className="nav-link">
            Drafts
          </Link>
          <Link to="/settings" className="nav-link">
            Settings
          </Link>
        </nav>

        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
            <span className="user-name">{user?.name || 'User'}</span>
          </div>

          <button className="logout-btn" onClick={onLogout}>
            Sign Out
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/drafts" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Drafts
          </Link>
          <Link to="/settings" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Settings
          </Link>
          <button
            className="mobile-logout-btn"
            onClick={() => {
              onLogout()
              setMobileMenuOpen(false)
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  )
}
