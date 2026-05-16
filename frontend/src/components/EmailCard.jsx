import React from 'react'
import { Mail, Clock } from 'lucide-react'
import './EmailCard.css'

export default function EmailCard({ email }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="email-card">
      <div className="email-header">
        <div className="email-icon">
          <Mail size={20} />
        </div>
        <div className="email-info">
          <h4>{email.from || 'Unknown Sender'}</h4>
          <p className="email-subject">{email.subject || '(No subject)'}</p>
        </div>
        <span className="email-time">
          <Clock size={14} />
          {formatDate(email.date || new Date())}
        </span>
      </div>

      {email.snippet && (
        <div className="email-preview">
          <p>{email.snippet.substring(0, 120)}...</p>
        </div>
      )}

      <div className="email-badges">
        {email.isUnread && <span className="badge-unread">Unread</span>}
        {email.hasAttachments && <span className="badge-attachment">📎 Attachment</span>}
      </div>
    </div>
  )
}
