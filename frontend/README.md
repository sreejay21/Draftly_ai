# Draftly AI - React Frontend

A modern, attractive React frontend for Draftly AI - an intelligent email management system with AI-powered drafting.

## Features

✨ **AI-Powered Email Drafting** - Intelligent suggestions for email replies
📧 **Gmail Integration** - Seamless connection with your Gmail account
✅ **Draft Management** - Review, approve, edit, or reject AI-generated drafts
🎯 **User Preferences** - Customize email tone and signature
📊 **Dashboard** - View unread emails and pending drafts at a glance
🔐 **Secure Authentication** - Google OAuth integration
📱 **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with animations

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── DraftCard.jsx   # Draft display card
│   │   └── EmailCard.jsx   # Email display card
│   ├── context/            # React Context for state management
│   │   ├── AuthContext.jsx
│   │   └── DraftsContext.jsx
│   ├── pages/              # Page components
│   │   ├── LoginPage.jsx
│   │   ├── CallbackPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── DraftsPage.jsx
│   │   └── SettingsPage.jsx
│   ├── services/           # API services
│   │   └── api.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## API Integration

The frontend connects to the backend API with the following endpoints:

### Authentication
- `GET /api/auth/google` - Initiate OAuth login
- `GET /api/auth/callback?code=<code>` - OAuth callback handler

### Gmail
- `GET /api/gmail/unread` - Get unread emails

### Drafts
- `GET /api/drafts/` - Get user drafts
- `PUT /api/drafts/approve/:draftId` - Approve a draft
- `PUT /api/drafts/reject/:draftId` - Reject a draft
- `PUT /api/drafts/edit/:draftId` - Edit a draft

## Features in Detail

### Authentication
- Google OAuth integration
- Automatic token storage
- Protected routes
- Auto logout on token expiration

### Dashboard
- Welcome message with user name
- Stats cards showing unread emails, drafts, approved count
- Latest unread emails preview
- Latest AI-generated drafts
- Quick refresh buttons

### Drafts Management
- View all drafts with filtering by status
- Approve drafts (send emails)
- Reject drafts
- Edit drafts before approval
- Draft quality validation indicator
- Responsive grid layout

### Settings
- Email writing style customization
- Tone selection (Professional, Casual, Formal, Friendly)
- Email signature setup
- Account information display
- About section
- Logout functionality

### UI/UX Features
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Loading states with spinners
- Empty states with helpful messages
- Responsive design for all screen sizes
- Hover effects and visual feedback
- Mobile-friendly navigation menu

## Styling

The application uses CSS3 for styling with:
- CSS variables for consistent theming
- Flexbox and Grid layouts
- Smooth transitions and animations
- Mobile-first responsive design
- Gradient backgrounds
- Shadow effects for depth

### Color Palette

- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#ec4899` (Pink)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- Efficient state management with Context API
- Optimized re-renders
- CSS animations using GPU acceleration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Environment Variables

Create a `.env.local` file with:

```
VITE_API_URL=http://localhost:3000/api
```

## Deployment

To build for production:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deployment to Vercel

```bash
vercel
```

### Deployment to Netlify

```bash
netlify deploy --prod --dir=dist
```

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### CORS errors
Ensure the backend is configured to allow requests from `http://localhost:5173`

### Authentication not working
- Verify Google OAuth credentials in backend
- Check that backend callback URL is properly configured
- Ensure token is being stored in localStorage

### API calls failing
- Check that backend API is running on port 3000
- Verify API endpoints in `src/services/api.js`
- Check network tab in browser DevTools

## Future Enhancements

- 📧 Email template library
- 🌙 Dark mode support
- 🔔 Notification system
- 📈 Analytics dashboard
- 🤖 Advanced AI customization
- 💾 Draft history and recovery
- 🏷️ Email tagging system
- 🔍 Search and filtering
- ⌨️ Keyboard shortcuts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for better email management**
