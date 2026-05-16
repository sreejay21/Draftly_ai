# 📋 Draftly AI - Complete Installation & Setup Guide

## 🎉 Frontend Successfully Created!

Your beautiful React frontend for Draftly AI is ready to use. This guide walks you through everything.

---

## 📦 What's Included

### ✨ 12 React Components
- **Pages** (5): Login, Dashboard, Drafts, Settings, Callback
- **Components** (3): Header, DraftCard, EmailCard
- **Services**: Centralized API management
- **Contexts**: Authentication & Drafts state management

### 🎨 Beautiful UI/UX
- Modern gradient backgrounds
- Smooth animations and transitions
- Responsive design (mobile-first)
- Professional color scheme
- Intuitive user experience

### 🔧 Fully Integrated
- Google OAuth authentication
- Gmail API integration
- Draft management system
- User preferences
- Protected routes
- Error handling

---

## 🚀 Quick Start (3 Steps)

### 1️⃣ Navigate to Frontend
```bash
cd frontend
```

### 2️⃣ Install Dependencies (if not done)
```bash
npm install
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

**✅ Frontend running at:** `http://localhost:5173`

---

## 📁 Directory Structure

```
Draftly_ai/
├── frontend/                    # React Frontend (NEW!)
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.jsx       # Navigation bar
│   │   │   ├── Header.css
│   │   │   ├── DraftCard.jsx    # Draft display
│   │   │   ├── DraftCard.css
│   │   │   ├── EmailCard.jsx    # Email preview
│   │   │   └── EmailCard.css
│   │   ├── context/            # State management
│   │   │   ├── AuthContext.jsx  # Auth state
│   │   │   └── DraftsContext.jsx # Drafts state
│   │   ├── pages/              # Full page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── LoginPage.css
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── DashboardPage.css
│   │   │   ├── DraftsPage.jsx
│   │   │   ├── DraftsPage.css
│   │   │   ├── SettingsPage.jsx
│   │   │   ├── SettingsPage.css
│   │   │   ├── CallbackPage.jsx
│   │   │   ├── CallbackPage.css
│   │   ├── services/           # API calls
│   │   │   └── api.js          # Axios configuration
│   │   ├── App.jsx             # Main app component
│   │   ├── App.css             # App styles
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   ├── package.json            # Dependencies
│   ├── .env.example            # Environment template
│   ├── .gitignore              # Git ignore rules
│   ├── README.md               # Frontend documentation
│   └── node_modules/           # Dependencies (generated)
├── Draftly_ai/                 # Backend (existing)
│   ├── src/
│   ├── server.js
│   └── ...
└── QUICKSTART.md               # Quick start guide (NEW!)
```

---

## 🔌 API Configuration

The frontend is configured to connect to `http://localhost:3000/api`

**To change the API URL:**

Edit `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://your-api-url/api'
```

---

## 🎨 Pages Overview

### 📱 Login Page
```
Features:
- Google OAuth button
- Beautiful gradient background
- Feature highlights
- Responsive design
- Redirects authenticated users to dashboard
```

### 📊 Dashboard
```
Features:
- Welcome message
- 4 stat cards (Unread, Drafts, Approved, Pending)
- Recent unread emails
- Recent AI drafts
- Refresh buttons
- Quick links to drafts
```

### ✉️ Drafts Page
```
Features:
- Filter by status (All, Generated, Approved, Rejected, Pending)
- Draft grid layout
- Draft cards with all details
- Approve/Reject/Edit buttons
- Quality indicators
- Responsive grid
```

### ⚙️ Settings Page
```
Features:
- Email tone selection
- Email signature editor
- Account information
- About section
- Logout button
- User-friendly form
```

---

## 🔐 Authentication Flow

```
1. User clicks "Sign in with Google" on Login page
2. Frontend calls GET /api/auth/google
3. User is redirected to Google OAuth
4. Google redirects back with authorization code
5. Backend exchanges code for tokens
6. Backend redirects to /auth/callback?token=JWT
7. Frontend stores token in localStorage
8. User is authenticated and redirected to dashboard
```

---

## 📡 API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/auth/google` | Initiate OAuth |
| GET | `/api/auth/callback?code=xxx` | OAuth callback |
| GET | `/api/gmail/unread` | Get unread emails |
| GET | `/api/drafts` | Get user drafts |
| PUT | `/api/drafts/approve/:id` | Approve draft |
| PUT | `/api/drafts/reject/:id` | Reject draft |
| PUT | `/api/drafts/edit/:id` | Edit draft |

---

## 🛠️ Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install

# Fix security vulnerabilities
npm audit fix
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
cd frontend
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
cd frontend
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages
```bash
# Update package.json homepage
"homepage": "https://yourusername.github.io/repo"

npm run build
# Deploy dist folder to gh-pages
```

### Option 4: Traditional Hosting
```bash
npm run build
# Upload dist/ folder to your web server
```

---

## 🎨 Customization Guide

### Change Logo
Replace in `Header.jsx`:
```jsx
<span className="logo-icon">✉️</span>  // Change emoji
<span className="logo-text">Draftly AI</span>  // Change text
```

### Change Colors
Edit `src/index.css`:
```css
:root {
  --primary: #6366f1;      /* Main color */
  --secondary: #ec4899;    /* Secondary color */
  --success: #10b981;      /* Success green */
  --warning: #f59e0b;      /* Warning amber */
  --danger: #ef4444;       /* Error red */
}
```

### Change Favicon
Replace `index.html`:
```html
<link rel="icon" type="image/svg+xml" href="/your-logo.svg" />
```

### Add Branding
Update `App.jsx` and page titles throughout

---

## 🧪 Testing the Frontend

### Test Authentication
1. Go to `http://localhost:5173`
2. Click "Sign in with Google"
3. Complete Google login
4. Should redirect to dashboard

### Test API Integration
1. Check browser DevTools (F12)
2. Go to Network tab
3. Perform actions (click buttons)
4. Verify API calls show in Network tab

### Test Responsiveness
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select different device sizes
4. Verify layout adapts

---

## 🐛 Troubleshooting

### Issue: Port 5173 already in use
```bash
npm run dev -- --port 3001
```

### Issue: Cannot connect to API
- Verify backend is running on port 3000
- Check API_BASE_URL in `src/services/api.js`
- Check CORS configuration in backend

### Issue: Login not working
- Verify Google OAuth credentials
- Check backend callback configuration
- Inspect browser console for errors

### Issue: Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Styles not loading
- Hard refresh (Ctrl+F5)
- Clear browser cache
- Check CSS file imports

---

## 📊 Performance Metrics

After build:
- **Main JS**: 229.63 KB (76.16 KB gzipped)
- **CSS**: 21.60 KB (4.58 KB gzipped)
- **Build time**: ~12 seconds
- **All optimizations**: ✅ Enabled

---

## 🔒 Security Considerations

- ✅ JWT tokens stored in localStorage
- ✅ Automatic logout on 401 errors
- ✅ Protected routes with authentication
- ✅ Environment variables for sensitive data
- ⚠️ Consider moving tokens to httpOnly cookies in production

---

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🚀 Production Checklist

- [ ] Update API_BASE_URL to production
- [ ] Set up .env.local with production values
- [ ] Build the project: `npm run build`
- [ ] Test all features in production build
- [ ] Set up analytics (optional)
- [ ] Configure error tracking (optional)
- [ ] Set up monitoring (optional)
- [ ] Deploy to hosting platform
- [ ] Update DNS/domain settings
- [ ] Test on production URL
- [ ] Set up automatic backups
- [ ] Monitor performance

---

## 📚 Learning Resources

### React
- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Hooks Documentation](https://react.dev/reference/react)

### Vite
- [Vite Documentation](https://vitejs.dev)
- [Configuration Reference](https://vitejs.dev/config)

### Styling
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Grid & Flexbox](https://css-tricks.com/)

---

## 🤝 Contributing

To make changes:
1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request

---

## 📞 Support & Issues

If you encounter any issues:

1. Check this guide first
2. Review browser console (F12)
3. Check network requests
4. Verify backend is running
5. Check API endpoints match
6. Try clearing cache and restarting

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Frontend runs without errors: `npm run dev`
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Login page displays
- [ ] API connection works
- [ ] No console errors
- [ ] Responsive design works
- [ ] Build completes: `npm run build`
- [ ] Production build works: `npm run preview`
- [ ] All buttons are functional

---

## 🎯 Next Steps

1. **Test with backend** - Verify API calls work correctly
2. **Customize styling** - Update colors and branding
3. **Deploy** - Push to production hosting
4. **Monitor** - Set up analytics and error tracking
5. **Optimize** - Monitor and improve performance

---

## 📈 Features to Add Later

- Dark mode toggle
- Email search and filtering
- Draft templates
- Email scheduling
- Analytics dashboard
- User preferences persistence
- Notification system
- Keyboard shortcuts
- Multi-language support
- Theme customization

---

## 📄 License

MIT License - Feel free to use, modify, and distribute

---

## 🎉 Congratulations!

Your Draftly AI frontend is ready to go! 

**Start development:**
```bash
cd frontend
npm run dev
```

**Happy coding! 💻✨**

---

Last Updated: May 2026
Built with ❤️ for better email management
