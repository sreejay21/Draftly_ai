# Draftly AI - Runbook

## Overview
This document explains how to run the Draftly AI project end-to-end:
- Frontend
- Backend API
- Worker process
- Google authentication setup

It also includes required dependencies and environment configuration.

---

## Prerequisites

### Software
- Node.js v16 or newer
- npm
- MongoDB (local or remote)
- Redis (local or remote)
- Google Cloud project with OAuth credentials

### Required services
- MongoDB listening on the URI configured by `MONGO_URI`
- Redis listening on the host/port configured by `REDIS_HOST` / `REDIS_PORT` or default to `127.0.0.1:6379`

---

## Project structure

```
DraftlyAI/
├── Draftly_ai/           # Backend API and worker
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/             # React frontend
│   ├── src/
│   ├── package.json
│   └── .env.example
├── RUN_PROJECT.md        # This runbook
├── QUICKSTART.md
├── SETUP_GUIDE.md
└── FRONTEND_COMPLETE.md
```

---

## Backend setup

### 1. Install backend dependencies

```bash
cd Draftly_ai
npm install
```

### 2. Configure backend environment

Create a `.env` file in `Draftly_ai/` with the following values (use your own values):

```env
MONGO_URI=mongodb://localhost:27017/draftly
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
REDIRECT_URI=http://localhost:3000/api/auth/callback
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:5173
API_BASE_PATH=http://localhost:3000
```

### 3. Start the backend API

```bash
cd Draftly_ai
npm run dev
```

This runs `server.js`, connects MongoDB, starts the Express API on `http://localhost:3000`, and starts the cron job for email ingestion.

### 4. Verify backend is running

Open:

```text
http://localhost:3000/api/health
```

If the API is healthy, it should return a successful response.

---

## Worker setup

### What the worker does

The worker listens for queued email send jobs and sends approved drafts via Gmail using the saved Google credentials. It connects to MongoDB and Redis.

### 1. Start Redis

If you do not already have Redis running locally, start it with your platform-specific command.

Example:

```bash
redis-server
```

### 2. Start the worker

```bash
cd Draftly_ai
node src/workers/send.worker.js
```

### 3. Expected behavior

- Connects to MongoDB
- Connects to Redis
- Listens on the `email-sending` queue
- Processes approved drafts and sends email using Gmail

### Notes

- The worker reads the same `.env` file as the backend.
- No separate npm script is required, but you can create one if desired.

---

## Cron job behavior

The backend automatically starts a cron job when the API launches.

- File: `Draftly_ai/src/cron/cron.js`
- Schedule: every 2 minutes (`*/2 * * * *`)
- Purpose: scan users with saved Gmail credentials and process unread emails

This means the backend itself is already polling for new Gmail messages on a schedule.

---

## Frontend setup

### 1. Install frontend dependencies

```bash
cd frontend
npm install
```

### 2. Configure frontend environment

Copy or create `.env` in `frontend/` based on `.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Start the frontend

```bash
cd frontend
npm run dev
```

### 4. Access the frontend

Open:

```text
http://localhost:5173
```

---

## Google OAuth / Gmail authentication steps

### 1. Create a Google Cloud project

- Go to https://console.cloud.google.com/
- Create or select a project
- Enable the Gmail API

### 2. Create OAuth 2.0 credentials

- Navigate to **APIs & Services > Credentials**
- Click **Create Credentials > OAuth client ID**
- Choose **Web application**
- Add the following Authorized redirect URI:

```text
http://localhost:3000/api/auth/callback
```

- Save the credentials and copy:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`

### 3. Configure backend `.env`

Set the values in `Draftly_ai/.env`:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
REDIRECT_URI=http://localhost:3000/api/auth/callback
```

### 4. Use the app login flow

From the frontend at `http://localhost:5173`:

1. Click the Google login button
2. The app calls `GET /api/auth/google`
3. The response returns a Google OAuth URL
4. Complete the Google login flow in the browser
5. Google redirects back to `http://localhost:3000/api/auth/callback?code=...`
6. The backend exchanges the code for Gmail access tokens
7. The backend stores encrypted Gmail tokens and returns a JWT
8. The frontend uses the JWT for authenticated API calls

### 5. Scopes requested

The backend requests these Gmail scopes:

- `openid`
- `email`
- `profile`
- `https://www.googleapis.com/auth/gmail.readonly`
- `https://www.googleapis.com/auth/gmail.send`
- `https://www.googleapis.com/auth/gmail.compose`
- `https://www.googleapis.com/auth/gmail.modify`

### 6. Confirm authentication

After login, the frontend should be able to call these authenticated endpoints:

- `GET /api/gmail/unread`
- `GET /api/drafts`
- `PUT /api/drafts/approve/:draftId`
- `PUT /api/drafts/reject/:draftId`
- `PUT /api/drafts/edit/:draftId`

---

## Recommended run order

Open separate terminal tabs for each service:

1. Backend API
   ```bash
   cd Draftly_ai
   npm run dev
   ```

2. Worker
   ```bash
   cd Draftly_ai
   node src/workers/send.worker.js
   ```

3. Frontend
   ```bash
   cd frontend
   npm run dev
   ```

---

## Troubleshooting

### Backend fails to start
- Ensure MongoDB is running and `MONGO_URI` is correct
- Ensure Redis is available at `127.0.0.1:6379`
- Check `.env` values

### Worker fails to connect
- Ensure Redis is running
- Ensure MongoDB is running
- Verify `Draftly_ai/.env` is present and correct

### Google auth fails
- Confirm `REDIRECT_URI` in Google Cloud matches `http://localhost:3000/api/auth/callback`
- Confirm `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Confirm the backend is running on port `3000`
- Confirm `FRONTEND_URL` is set to `http://localhost:5173`

### Frontend cannot access API
- Confirm `VITE_API_URL=http://localhost:3000/api`
- Confirm backend CORS allows `http://localhost:5173`

---

## Useful URLs

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- Swagger docs: `http://localhost:3000/api-docs`
- Health check: `http://localhost:3000/api/health`

---

## Summary

To run Draftly AI locally:
1. Start MongoDB and Redis
2. Start backend with `npm run dev`
3. Start worker with `node src/workers/send.worker.js`
4. Start frontend with `npm run dev`
5. Login with Google and test the Gmail/draft flows
