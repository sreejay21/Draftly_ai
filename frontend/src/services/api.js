import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ✅ Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') // ✅ FIXED

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// ✅ Handle responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// ✅ APIs
export const authAPI = {
  getLoginUrl: () => api.get(`/auth/google?t=${Date.now()}`), // prevent 304
  handleCallback: (token) => {
    localStorage.setItem('authToken', token)
    return Promise.resolve()
  },
  getCurrentUser: () => api.get('/auth/me'),
}

export const gmailAPI = {
  getUnreadEmails: () => api.get('/gmail/unread'),
}

export const draftsAPI = {
  getUserDrafts: () => api.get('/drafts'),
  approveDraft: (draftId) => api.put(`/drafts/approve/${draftId}`),
  rejectDraft: (draftId) => api.put(`/drafts/reject/${draftId}`),
  editDraft: (draftId, data) => api.put(`/drafts/edit/${draftId}`, data),
}

export default api