import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import DraftCard from '../components/DraftCard'
import EmailCard from '../components/EmailCard'
import { useDrafts } from '../context/DraftsContext'
import { gmailAPI } from '../services/api'
import './DashboardPage.css'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { drafts, fetchDrafts, loading: draftsLoading } = useDrafts()
  const [emails, setEmails] = useState([])
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError] = useState(null)

  useEffect(() => {
    fetchDrafts()
    fetchUnreadEmails()
  }, [])

 const fetchUnreadEmails = async () => {
  try {
    setEmailLoading(true)
    setEmailError(null)

    const data = await gmailAPI.getUnreadEmails()

    console.log("Fetched unread emails:", data)

    const result = data.result || {}

    const emailsData = result.drafts || []

    setEmails(emailsData)

    // Handle empty case
    if (emailsData.length === 0) {
      setEmailError(result.message || "No emails found")
    } else {
      setEmailError(null)
    }

  } catch (error) {
    console.error('Error fetching emails:', error)
    setEmailError("Failed to fetch emails")
  } finally {
    setEmailLoading(false)
  }
}

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <Header user={user} onLogout={handleLogout} />

      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1>Welcome, {user?.name || 'User'}! 👋</h1>
            <p>Here's your email management dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon unread">📧</div>
              <div className="stat-info">
                <p className="stat-label">Unread Emails</p>
                <p className="stat-value">{emails.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon drafts">📝</div>
              <div className="stat-info">
                <p className="stat-label">AI Drafts</p>
                <p className="stat-value">{drafts.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon approved">✅</div>
              <div className="stat-info">
                <p className="stat-label">Approved</p>
                <p className="stat-value">{drafts.filter((d) => d.status === 'approved').length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon pending">⏳</div>
              <div className="stat-info">
                <p className="stat-label">Pending Review</p>
                <p className="stat-value">{drafts.filter((d) => d.status === 'generated').length}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Unread Emails Section */}
            <section className="dashboard-section">
              <div className="section-header">
                <h2>📧 Unread Emails</h2>
                <button onClick={fetchUnreadEmails} className="refresh-btn" disabled={emailLoading}>
                  {emailLoading ? '🔄 Loading...' : '🔄 Refresh'}
                </button>
              </div>

              {!emailLoading && emails.length === 0 && !emailError && (
  <div className="empty-state">
    <p>🎉 All caught up! No unread emails.</p>
  </div>
)}

              {emailLoading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading emails...</p>
                </div>
              ) : emails.length === 0 ? (
                <div className="empty-state">
                  <p>🎉 All caught up! No unread emails.</p>
                </div>
              ) : (
                <div className="emails-list">
  {Array.isArray(emails) &&
    emails.slice(0, 5).map((email) => (
      <EmailCard key={email._id} email={email} />
    ))}
</div>
              )}

              {emails.length > 5 && (
                <button className="view-all-btn" onClick={() => navigate('/drafts')}>
                  View all emails →
                </button>
              )}
            </section>

            {/* AI Drafts Section */}
            <section className="dashboard-section">
              <div className="section-header">
                <h2>✨ AI-Generated Drafts</h2>
                <button onClick={fetchDrafts} className="refresh-btn" disabled={draftsLoading}>
                  {draftsLoading ? '🔄 Loading...' : '🔄 Refresh'}
                </button>
              </div>

              {draftsLoading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading drafts...</p>
                </div>
              ) : drafts.length === 0 ? (
                <div className="empty-state">
                  <p>✨ No drafts yet. Start replying to emails to generate AI drafts!</p>
                </div>
              ) : (
                <div className="drafts-list">
                  {drafts.slice(0, 5).map((draft) => (
                    <DraftCard key={draft._id} draft={draft} />
                  ))}
                </div>
              )}

              {drafts.length > 5 && (
                <button className="view-all-btn" onClick={() => navigate('/drafts')}>
                  View all drafts →
                </button>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
