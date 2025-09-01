# Deployment Guide

## Option 1: Render (Current - Full Stack)
- Uses `render.yaml` blueprint
- Builds client and serves from Express server
- Single URL for both frontend and API

## Option 2: Separate Services (Recommended)
### Backend: Render/Railway
- Deploy only `server/` folder
- Set environment variables
- Get backend URL (e.g., `https://social-posting-api.onrender.com`)

### Frontend: Netlify/Vercel
- Deploy `client/` folder
- Build command: `npm run build`
- Add redirects to proxy API calls:

**For Netlify** - Create `client/public/_redirects`:
```
/api/*  https://your-backend-url.com/api/:splat  200
```

**For Vercel** - Create `client/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-url.com/api/$1"
    }
  ]
}
```

## Option 3: Railway (Alternative)
- Railway supports full-stack apps better
- Create new project → Deploy from GitHub
- Set build command: `cd client && npm install && npm run build && cd ../server && npm install`
- Set start command: `node server/index.js`

## Environment Variables Needed
- JWT_SECRET
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHANNEL_ID  
- VIBER_BOT_TOKEN
- VIBER_COMMUNITY_ID

## Current Issue
The client build isn't being created properly on Render. Try Option 2 for more reliable deployment.
