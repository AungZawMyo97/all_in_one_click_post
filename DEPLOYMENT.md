# Deployment Guide

This guide will help you deploy your All-in-One Social Media Posting Platform to various hosting platforms.

## Prerequisites

- Node.js installed on your system
- Git repository set up
- API credentials for social media platforms

## Option 1: Deploy to Railway (Recommended)

Railway is a modern platform that makes deployment simple and offers a generous free tier.

### Backend Deployment

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Deploy the backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Navigate to server directory
   cd server
   
   # Deploy
   railway up
   ```

3. **Set environment variables**
   - Go to your Railway dashboard
   - Navigate to your project
   - Go to Variables tab
   - Add all the environment variables from `server/env.example`

4. **Get your backend URL**
   - Railway will provide a URL like `https://your-app-name.railway.app`
   - Note this URL for frontend configuration

### Frontend Deployment

1. **Update API base URL**
   ```bash
   cd client
   ```
   
   Edit `client/src/services/api.js` (create if it doesn't exist):
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-app-name.railway.app';
   
   export default API_BASE_URL;
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Navigate to client directory
   cd client
   
   # Deploy
   vercel
   ```

3. **Set environment variable in Vercel**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add environment variable: `REACT_APP_API_URL=https://your-app-name.railway.app`

## Option 2: Deploy to Heroku

### Backend Deployment

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku app**
   ```bash
   cd server
   heroku create your-app-name-backend
   ```

3. **Set environment variables**
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set TELEGRAM_BOT_TOKEN=your-telegram-token
   heroku config:set TELEGRAM_CHANNEL_ID=your-channel-id
   heroku config:set VIBER_BOT_TOKEN=your-viber-token
   heroku config:set VIBER_COMMUNITY_ID=your-community-id
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Frontend Deployment

1. **Create another Heroku app for frontend**
   ```bash
   cd client
   heroku create your-app-name-frontend
   ```

2. **Build and deploy**
   ```bash
   npm run build
   git add build
   git commit -m "Add build files"
   git push heroku main
   ```

## Option 3: Deploy to DigitalOcean App Platform

### Backend Deployment

1. **Create DigitalOcean account**
   - Sign up at [digitalocean.com](https://digitalocean.com)

2. **Deploy backend**
   - Go to App Platform
   - Create new app
   - Connect your GitHub repository
   - Select the `server` directory
   - Set environment variables
   - Deploy

### Frontend Deployment

1. **Deploy frontend**
   - Create another app
   - Select the `client` directory
   - Set build command: `npm run build`
   - Set output directory: `build`
   - Deploy

## Option 4: Deploy to AWS

### Using AWS Elastic Beanstalk

1. **Install AWS CLI and EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB application**
   ```bash
   cd server
   eb init
   ```

3. **Create environment**
   ```bash
   eb create production
   ```

4. **Set environment variables**
   ```bash
   eb setenv JWT_SECRET=your-secret-key
   eb setenv TELEGRAM_BOT_TOKEN=your-telegram-token
   # ... set all other variables
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

### Frontend on S3 + CloudFront

1. **Create S3 bucket**
   ```bash
   aws s3 mb s3://your-app-name-frontend
   ```

2. **Upload build files**
   ```bash
   cd client
   npm run build
   aws s3 sync build/ s3://your-app-name-frontend
   ```

3. **Configure CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure custom domain (optional)

## Environment Variables Setup

Create a `.env` file in your server directory with these variables:

```env
# Server Configuration
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Telegram Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHANNEL_ID=@your_channel_username_or_channel_id

# Viber Configuration
VIBER_BOT_TOKEN=your_viber_bot_token_here
VIBER_COMMUNITY_ID=your_viber_community_id_here


```

## Getting API Credentials

### Telegram Bot Setup

1. **Create a bot**
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Send `/newbot`
   - Follow the instructions
   - Save your bot token

2. **Add bot to channel**
   - Create a Telegram channel
   - Add your bot as an admin
   - Get your channel ID (e.g., `@your_channel_name`)

### Viber Bot Setup

1. **Create Viber bot**
   - Go to [Viber Developer Portal](https://developers.viber.com/)
   - Create a new bot
   - Get your bot token
   - Get your community ID



## Post-Deployment Checklist

- [ ] Backend is accessible and responding
- [ ] Frontend can connect to backend
- [ ] All environment variables are set
- [ ] Social media API credentials are working
- [ ] SSL certificate is valid (if using custom domain)
- [ ] Error monitoring is set up
- [ ] Logs are being collected

## Monitoring and Maintenance

### Health Checks

Your backend includes a health check endpoint:
```
GET https://your-backend-url.com/api/health
```

### Logs

Monitor your application logs:
- Railway: Dashboard → Logs
- Heroku: `heroku logs --tail`
- DigitalOcean: App Platform → Logs
- AWS: CloudWatch Logs

### Updates

To update your application:
1. Make changes locally
2. Test thoroughly
3. Commit and push to your repository
4. Redeploy (most platforms auto-deploy on push)

## Troubleshooting

### Common Issues

1. **CORS errors**
   - Ensure your backend allows requests from your frontend domain
   - Check the CORS configuration in `server/index.js`

2. **API credential errors**
   - Verify all environment variables are set correctly
   - Check that your social media API credentials are valid

3. **Build failures**
   - Ensure all dependencies are in `package.json`
   - Check that build scripts are correct

4. **Runtime errors**
   - Check application logs
   - Verify environment variables are accessible

### Support

If you encounter issues:
1. Check the platform's documentation
2. Review application logs
3. Verify environment variables
4. Test API endpoints manually
