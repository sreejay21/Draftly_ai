import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'

export default function CallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, logout } = useAuth()
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const token = searchParams.get('token')

    const handleCallback = async () => {
      if (!token) {
        navigate('/login', { replace: true })
        return
      }

      try {
        await authAPI.handleCallback(token)
        const response = await authAPI.getCurrentUser()
        const currentUser = response?.result?.user

        if (!currentUser) {
          throw new Error('Failed to load user profile')
        }

        login(currentUser, token)
        navigate('/', { replace: true })
      } catch (err) {
        console.error('OAuth callback failed:', err)
        setErrorMessage('Unable to complete sign-in. Please try again.')
        logout()
        navigate('/login', { replace: true })
      }
    }

    handleCallback()
  }, [searchParams, login, logout, navigate])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div>
        <div className="spinner"></div>
        {errorMessage && <p style={{ marginTop: '1rem', color: '#ff4d4f' }}>{errorMessage}</p>}
      </div>
    </div>
  )
}
