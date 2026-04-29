# Draftly AI API - Postman Collection

This directory contains a Postman collection for testing the Draftly AI API endpoints.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing Flow](#testing-flow)
- [Additional Resources](#additional-resources)

## Overview

Draftly AI is an email management API that uses AI to help users compose and manage email drafts. The API integrates with Gmail OAuth for authentication and provides endpoints for managing email drafts with AI assistance.

## Prerequisites

- [Postman](https://www.postman.com/downloads/) installed on your machine
- Node.js and npm installed (for running the API server)
- A Google Cloud project with OAuth credentials configured

## Installation

1. **Import the Collection**
   - Open Postman
   - Click on "Import" button
   - Select the `collection.json` file from this folder
   - The collection will be imported with all endpoints

2. **Configure Environment**
   - In Postman, click on the "Environments" tab
   - Create a new environment or use an existing one
   - Add the following variables:
     - `baseUrl`: Set to `http://localhost:3000` (or your API URL)
     - `token`: Leave empty initially (will be set after authentication)

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check if API is running |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/google` | Initiate Google OAuth flow |
| GET | `/api/auth/callback` | Handle OAuth callback |

**Authentication Flow:**
1. Call `GET /api/auth/google` - Returns a Google OAuth URL
2. Visit the URL in a browser and complete Google login
3. Google will redirect to your callback URL with an authorization code
4. Use the code to complete the OAuth process (handled automatically by the API)
5. The API will set a `token` cookie for subsequent requests

### Gmail

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/gmail/unread` | Get all unread emails | Yes |

### Drafts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/drafts/` | Get all user drafts | Yes |
| PUT | `/api/drafts/approve/:draftId` | Approve and send a draft | Yes |
| PUT | `/api/drafts/reject/:draftId` | Reject a draft | Yes |
| PUT | `/api/drafts/edit/:draftId` | Edit a draft | Yes |

## Environment Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `baseUrl` | Base URL of the API | `http://localhost:3000` |
| `token` | JWT authentication token | (set after OAuth) |
| `code` | OAuth authorization code | (from Google callback) |
| `draftId` | ID of a draft | (from draft response) |

## Testing Flow

### 1. Health Check
```
GET /api/health
```
Verify the API is running.

### 2. Authentication
```
GET /api/auth/google
```
- Response: `{ "url": "https://accounts.google.com/..." }`
- Copy the URL and open it in your browser
- Complete the Google login
- After authentication, you'll be redirected to `/api/auth/callback?code=...`
- The API will set a token cookie automatically

### 3. Get Unread Emails
```
GET /api/gmail/unread
Headers: Authorization: Bearer {{token}}
```
Returns all unread emails from the user's Gmail account.

### 4. Manage Drafts

**Get all drafts:**
```
GET /api/drafts/
Headers: Authorization: Bearer {{token}}
```

**Edit a draft:**
```
PUT /api/drafts/edit/:draftId
Headers: Authorization: Bearer {{token}}
Body (JSON):
{
  "subject": "Updated Subject",
  "body": "Updated email body content"
}
```

**Approve a draft:**
```
PUT /api/drafts/approve/:draftId
Headers: Authorization: Bearer {{token}}
```
This typically sends the email.

**Reject a draft:**
```
PUT /api/drafts/reject/:draftId
Headers: Authorization: Bearer {{token}}
```
This typically deletes or archives the draft.

## Additional Resources

- [API Documentation (Swagger)](http://localhost:3000/api-docs)
- [GitHub Repository](#)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

## Troubleshooting

### 401 Unauthorized
- Ensure the `token` environment variable is set
- Check that the token hasn't expired
- Re-authenticate via Google OAuth if needed

### CORS Errors
- The API is configured to allow `http://localhost:5173` origin
- If testing from Postman, ensure proper headers are sent

### Token Not Set
- Complete the Google OAuth flow
- The API sets the token as an HTTP-only cookie
- For Postman testing, you may need to extract the token from the response or cookie

---

**Note:** This collection is for development and testing purposes. Update the `baseUrl` variable for different environments (development, staging, production).