import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import { authAPI } from '../services/api'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const response = await authAPI.getLoginUrl()
      if (response.result?.url ) {
        window.location.href = response.result.url
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Failed to initiate login. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-left">
          <div className="logo-section">
            <div className="logo">
              <Mail size={40} />
            </div>
            <h1>Draftly AI</h1>
            <p>Email Management Reimagined</p>
          </div>

          <div className="features">
            <div className="feature">
              <Zap className="feature-icon" />
              <div>
                <h3>AI-Powered Drafting</h3>
                <p>Get intelligent email suggestions in seconds</p>
              </div>
            </div>
            <div className="feature">
              <CheckCircle className="feature-icon" />
              <div>
                <h3>Smart Review System</h3>
                <p>Approve, edit, or reject with confidence</p>
              </div>
            </div>
            <div className="feature">
              <Mail className="feature-icon" />
              <div>
                <h3>Gmail Integration</h3>
                <p>Seamless connection to your Gmail account</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <h2>Welcome Back</h2>
            <p className="subtitle">Sign in to your Draftly AI account</p>

            <button className="google-button" onClick={handleGoogleLogin} disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign in with Google
                </>
              )}
            </button>

            <div className="divider">or continue with email</div>

            <div className="coming-soon">
              <p>🔒 More authentication options coming soon</p>
            </div>
          </div>

          <div className="benefits-section">
            <h3>Why choose Draftly AI?</h3>
            <ul>
              <li>⚡ Save hours replying to emails</li>
              <li>🎯 AI learns your writing style</li>
              <li>✅ Full control before sending</li>
              <li>📊 Track email metrics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
