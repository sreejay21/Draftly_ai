import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import './SettingsPage.css'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [settings, setSettings] = useState({
    tone: user?.style?.tone || 'professional',
    signature: user?.style?.signature || '',
  })
  const [saved, setSaved] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSettingChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
    setSaved(false)
  }

  const handleSave = () => {
    // Save settings to backend
    console.log('Saving settings:', settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="settings-container">
      <Header user={user} onLogout={handleLogout} />

      <main className="settings-main">
        <div className="settings-content">
          <h1>⚙️ Settings</h1>
          <p className="subtitle">Customize your Draftly AI experience</p>

          <div className="settings-grid">
            {/* Email Style Settings */}
            <section className="settings-section">
              <h2>📧 Email Writing Style</h2>
              <p className="section-description">Configure how AI generates your email drafts</p>

              <div className="setting-group">
                <label htmlFor="tone">Email Tone</label>
                <select
                  id="tone"
                  name="tone"
                  value={settings.tone}
                  onChange={handleSettingChange}
                  className="input"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="friendly">Friendly</option>
                </select>
                <p className="help-text">Choose the tone for generated drafts</p>
              </div>

              <div className="setting-group">
                <label htmlFor="signature">Email Signature</label>
                <textarea
                  id="signature"
                  name="signature"
                  value={settings.signature}
                  onChange={handleSettingChange}
                  placeholder="Your email signature..."
                  className="input textarea"
                  rows="4"
                />
                <p className="help-text">This will be added to the end of all emails</p>
              </div>

              <button className="btn btn-primary" onClick={handleSave}>
                Save Settings
              </button>

              {saved && <p className="success-message">✅ Settings saved successfully!</p>}
            </section>

            {/* Account Settings */}
            <section className="settings-section">
              <h2>👤 Account</h2>

              <div className="account-info">
                <div className="info-row">
                  <label>Email</label>
                  <p className="info-value">{user?.email}</p>
                </div>
                <div className="info-row">
                  <label>Name</label>
                  <p className="info-value">{user?.name}</p>
                </div>
                <div className="info-row">
                  <label>Member Since</label>
                  <p className="info-value">May 2026</p>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="settings-section">
              <h2>ℹ️ About</h2>
              <p className="section-description">Learn more about Draftly AI</p>

              <div className="about-content">
                <h3>Draftly AI</h3>
                <p>Version 1.0.0</p>
                <p>
                  Draftly AI is an intelligent email management system that uses AI to generate, review, and manage
                  email drafts. We help you save time and improve your email communication.
                </p>

                <div className="links">
                  <a href="#privacy">Privacy Policy</a>
                  <a href="#terms">Terms of Service</a>
                  <a href="#support">Support</a>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="settings-section danger-zone">
              <h2>🗑️ Danger Zone</h2>

              <button className="btn btn-danger" onClick={handleLogout}>
                Log Out
              </button>

              <p className="danger-text">You'll be signed out and returned to the login page.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
