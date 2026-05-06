import React, { useState } from 'react'
import { CheckCircle, XCircle, Edit, AlertCircle } from 'lucide-react'
import { useDrafts } from '../context/DraftsContext'
import './DraftCard.css'

export default function DraftCard({ draft }) {
  const { approveDraft, rejectDraft, editDraft } = useDrafts()
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState({
    subject: draft.subject || '',
    body: draft.suggestedReply || '',
  })
  const [loading, setLoading] = useState(false)

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      generated: '#3b82f6',
      approved: '#10b981',
      rejected: '#ef4444',
    }
    return colors[status] || '#6b7280'
  }

  const getStatusLabel = (status) => {
    const labels = {
      pending: '⏳ Pending',
      generated: '✨ Generated',
      approved: '✅ Approved',
      rejected: '❌ Rejected',
    }
    return labels[status] || status
  }

  const handleApprove = async () => {
    try {
      setLoading(true)
      await approveDraft(draft._id)
    } catch (error) {
      console.error('Error approving draft:', error)
      alert('Failed to approve draft')
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async () => {
    try {
      setLoading(true)
      await rejectDraft(draft._id)
    } catch (error) {
      console.error('Error rejecting draft:', error)
      alert('Failed to reject draft')
    } finally {
      setLoading(false)
    }
  }

  const handleEditSave = async () => {
    try {
      setLoading(true)
      await editDraft(draft._id, editedContent)
      setIsEditing(false)
    } catch (error) {
      console.error('Error editing draft:', error)
      alert('Failed to edit draft')
    } finally {
      setLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className="draft-card editing">
        <div className="edit-form">
          <h3>Edit Draft</h3>
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              value={editedContent.subject}
              onChange={(e) => setEditedContent({ ...editedContent, subject: e.target.value })}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              value={editedContent.body}
              onChange={(e) => setEditedContent({ ...editedContent, body: e.target.value })}
              className="input textarea"
              rows="6"
            />
          </div>
          <div className="edit-actions">
            <button className="btn btn-primary btn-sm" onClick={handleEditSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="draft-card">
      <div className="draft-header">
        <div className="draft-meta">
          <h3>{draft.subject || 'No Subject'}</h3>
          <span className="status-badge" style={{ backgroundColor: getStatusColor(draft.status) }}>
            {getStatusLabel(draft.status)}
          </span>
        </div>
        <div className="draft-sender">
          <p className="from">From: {draft.from || 'Unknown'}</p>
          <p className="timestamp">{new Date(draft.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="draft-content">
        <div className="draft-body">
          <p>{draft.suggestedReply?.substring(0, 150)}...</p>
        </div>

        {draft.validation && (
          <div className={`validation-indicator ${draft.validation.score >= 60 ? 'good' : 'poor'}`}>
            <AlertCircle size={16} />
            <span>
              {draft.validation.score >= 60 ? '✅ Quality: Good' : '⚠️ Quality: Needs Review'} ({draft.validation.score}
              %)
            </span>
          </div>
        )}
      </div>

      <div className="draft-actions">
        {draft.status === 'generated' ? (
          <>
            <button
              className="btn btn-success btn-sm"
              onClick={handleApprove}
              disabled={loading}
              title="Approve and send this draft"
            >
              <CheckCircle size={16} /> Approve
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleReject}
              disabled={loading}
              title="Reject this draft"
            >
              <XCircle size={16} /> Reject
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsEditing(true)}
              disabled={loading}
              title="Edit this draft"
            >
              <Edit size={16} /> Edit
            </button>
          </>
        ) : (
          <p className="status-text">Status: {getStatusLabel(draft.status)}</p>
        )}
      </div>
    </div>
  )
}
