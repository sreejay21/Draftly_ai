import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDrafts } from '../context/DraftsContext'
import Header from '../components/Header'
import DraftCard from '../components/DraftCard'
import './DraftsPage.css'

export default function DraftsPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { drafts, fetchDrafts, loading } = useDrafts()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchDrafts()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const filteredDrafts = drafts.filter((draft) => {
    if (filter === 'all') return true
    return draft.status === filter
  })

  return (
    <div className="drafts-container">
      <Header user={user} onLogout={handleLogout} />

      <main className="drafts-main">
        <div className="drafts-content">
          <div className="drafts-header">
            <div>
              <h1>📝 Email Drafts</h1>
              <p>Review and manage your AI-generated email drafts</p>
            </div>
            <button className="refresh-btn" onClick={fetchDrafts} disabled={loading}>
              {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {['all', 'generated', 'approved', 'rejected', 'pending'].map((status) => (
              <button
                key={status}
                className={`filter-tab ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status === 'all' && `All (${drafts.length})`}
                {status === 'generated' && `Generated (${drafts.filter((d) => d.status === 'generated').length})`}
                {status === 'approved' && `Approved (${drafts.filter((d) => d.status === 'approved').length})`}
                {status === 'rejected' && `Rejected (${drafts.filter((d) => d.status === 'rejected').length})`}
                {status === 'pending' && `Pending (${drafts.filter((d) => d.status === 'pending').length})`}
              </button>
            ))}
          </div>

          {/* Drafts List */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading drafts...</p>
            </div>
          ) : filteredDrafts.length === 0 ? (
            <div className="empty-state">
              <p>📭 No {filter !== 'all' ? filter : ''} drafts found</p>
              <p className="text-muted">Your AI-generated drafts will appear here</p>
            </div>
          ) : (
            <div className="drafts-grid">
              {filteredDrafts.map((draft) => (
                <DraftCard key={draft._id} draft={draft} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
