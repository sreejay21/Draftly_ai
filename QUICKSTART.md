# 🚀 Draftly AI Frontend - Quick Start Guide

## ⚡ Get Running in 60 Seconds

### Prerequisites
- Node.js v16+
- Backend API running on `http://localhost:3000`

### Step 1: Navigate to Frontend
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

✨ **Your frontend is now running at `http://localhost:5173`**

---

## 📋 What's Included

### Pages
- **Login Page** - Google OAuth authentication with beautiful UI
- **Dashboard** - Overview with stats, unread emails, and recent drafts
- **Drafts** - Full draft management with filtering and editing
- **Settings** - User preferences, email tone, and signature customization

### Components
- **Header** - Sticky navigation with responsive mobile menu
- **DraftCard** - Interactive draft cards with action buttons
- **EmailCard** - Email preview cards with sender info and timestamps

### Features
- 🔐 Protected routes with authentication
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations and transitions
- 🎨 Beautiful gradient UI with modern design
- 📊 Real-time data fetching from backend
- 🔄 Draft approval, rejection, and editing
- 💾 Persistent authentication with localStorage
- 🌐 Gmail integration ready

---

## 🔌 API Configuration

The frontend automatically connects to `http://localhost:3000/api`

To change, edit the `API_BASE_URL` in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://your-api-url/api'
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── DraftCard.jsx
│   │   └── EmailCard.jsx
│   ├── context/             # State management
│   │   ├── AuthContext.jsx
│   │   └── DraftsContext.jsx
│   ├── pages/               # Full page components
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── DraftsPage.jsx
│   │   └── SettingsPage.jsx
│   ├── services/            # API calls
│   │   └── api.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎨 Customization

### Change Color Scheme
Edit CSS variables in `src/index.css`:

```css
:root {
  --primary: #6366f1;        /* Change primary color */
  --secondary: #ec4899;      /* Change secondary color */
  --success: #10b981;        /* Change success color */
  /* ... more colors ... */
}
```

### Modify API Endpoints
Edit `src/services/api.js`:

```javascript
export const draftsAPI = {
  getUserDrafts: () => api.get('/your-endpoint'),
  // ... other endpoints
}
```

---

## 🚀 Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Vercel
```bash
vercel
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

---

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
npm run dev -- --port 3001
```

### Dependencies won't install?
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS errors?
Ensure backend is configured to allow `http://localhost:5173`

### Not seeing changes?
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+F5)
- Check if dev server is running

---

## 📚 Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm install` | Install dependencies |
| `npm audit fix` | Fix security vulnerabilities |

---

## ✅ Feature Checklist

- [x] Google OAuth authentication
- [x] Gmail email fetching
- [x] AI draft generation integration
- [x] Draft approval/rejection
- [x] Draft editing
- [x] User settings customization
- [x] Dashboard with stats
- [x] Responsive design
- [x] Protected routes
- [x] Error handling
- [x] Loading states
- [x] Beautiful UI/UX

---

## 🎯 Next Steps

1. **Customize the theme** - Update colors and logo
2. **Add your branding** - Update favicon and page title
3. **Test with backend** - Ensure API calls work
4. **Deploy** - Push to production
5. **Monitor** - Track user analytics

---

## 💡 Tips

- Use React DevTools for debugging
- Check browser console for API errors
- Network tab shows all API requests
- Inspect elements to modify CSS on-the-fly

---

## 📞 Support

For issues or questions:
1. Check the terminal for error messages
2. Look at browser console (F12)
3. Verify backend is running
4. Check API endpoint URLs

---

**Happy coding! 🎉**

Last updated: May 2026
