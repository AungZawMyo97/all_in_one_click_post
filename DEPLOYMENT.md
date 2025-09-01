# Deploying to Render

This guide will help you deploy your Social Posting Platform to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your project code pushed to a Git repository (GitHub, GitLab, etc.)
3. Telegram and Viber bot tokens (if you want to use those features)

## Deployment Steps

### 1. Connect Your Repository

1. Log in to your Render dashboard
2. Click "New +" and select "Blueprint"
3. Connect your Git repository
4. Render will automatically detect the `render.yaml` file

### 2. Configure Environment Variables

After the initial deployment, you'll need to configure environment variables for the backend service:

1. Go to your backend service dashboard
2. Navigate to "Environment" tab
3. Add the following environment variables:

#### Required Variables:
- `JWT_SECRET`: A secure random string for JWT token signing
- `NODE_ENV`: Set to `production`

#### Optional Variables (for social media integration):
- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
- `TELEGRAM_CHANNEL_ID`: Your Telegram channel ID or username
- `VIBER_BOT_TOKEN`: Your Viber bot token
- `VIBER_COMMUNITY_ID`: Your Viber community ID

### 3. Update Frontend API URL

The frontend will automatically use the backend URL from the environment variable `REACT_APP_API_URL`. This is configured in the `render.yaml` file.

### 4. Access Your Application

After deployment:
- **Frontend**: Available at `https://your-frontend-name.onrender.com`
- **Backend API**: Available at `https://your-backend-name.onrender.com`

## Default Login Credentials

The application comes with a default admin user:
- **Email**: `admin@example.com`
- **Password**: `password`

**Important**: Change these credentials in production by modifying the `server/routes/auth.js` file.

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check the build logs in Render dashboard
2. **Environment Variables**: Ensure all required variables are set
3. **CORS Issues**: The backend is configured to accept requests from the frontend domain
4. **Port Issues**: Render automatically sets the PORT environment variable

### Checking Logs:

1. Go to your service dashboard in Render
2. Click on "Logs" tab
3. Check for any error messages

## Security Notes

1. **JWT Secret**: Always use a strong, random JWT secret in production
2. **Environment Variables**: Never commit sensitive data to your repository
3. **HTTPS**: Render automatically provides HTTPS certificates
4. **Rate Limiting**: The API includes rate limiting to prevent abuse

## Custom Domain (Optional)

To use a custom domain:
1. Go to your service dashboard
2. Navigate to "Settings" tab
3. Add your custom domain
4. Configure DNS records as instructed by Render

## Monitoring

Render provides built-in monitoring:
- Request logs
- Error tracking
- Performance metrics
- Uptime monitoring

## Support

If you encounter issues:
1. Check Render's documentation: https://render.com/docs
2. Review the build and runtime logs
3. Ensure all environment variables are properly configured
4. Verify your code works locally before deploying
