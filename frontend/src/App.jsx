import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DraftsProvider } from './context/DraftsContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import DraftsPage from './pages/DraftsPage'
import CallbackPage from './pages/CallbackPage'
import SettingsPage from './pages/SettingsPage'
import { Toaster } from 'react-hot-toast'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppContent() {
  const { isAuthenticated } = useAuth()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<CallbackPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/drafts"
          element={
            <ProtectedRoute>
              <DraftsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <DraftsProvider>
        <AppContent />
        <Toaster position="top-right" reverseOrder={false} />
      </DraftsProvider>
    </AuthProvider>
  )
}

export default App
