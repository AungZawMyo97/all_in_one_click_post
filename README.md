# All-in-One Social Media Posting Platform

A modern web application that allows you to post content to multiple social media platforms (Telegram, Viber) from a single interface. Built with React frontend and Node.js/Express backend.

## Features

- 🚀 **Multi-platform posting**: Post to Telegram and Viber simultaneously
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- 🔐 **Secure authentication**: JWT-based user authentication
- 📸 **Image support**: Add images to your posts via URL
- 📊 **Real-time results**: See posting results for each platform
- 🔄 **Platform selection**: Choose which platforms to post to
- 📱 **Mobile responsive**: Works great on all devices

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Lucide React (Icons)
- Axios (HTTP client)
- React Router

### Backend
- Node.js
- Express.js
- JWT Authentication
- Axios (API calls)
- Rate limiting

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd all_in_one_social_posting
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp server/env.example server/.env
   
   # Edit the .env file with your API credentials
   nano server/.env
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Configuration

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

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

### Setting Up API Credentials

#### Telegram Bot Setup
1. Create a bot using [@BotFather](https://t.me/botfather) on Telegram
2. Get your bot token
3. Add the bot to your channel as an admin
4. Get your channel ID (e.g., `@your_channel_name` or numeric ID)

#### Viber Bot Setup
1. Create a Viber bot through [Viber Developer Portal](https://developers.viber.com/)
2. Get your bot token
3. Get your community ID



## Usage

### Default Login Credentials
- **Email**: admin@example.com
- **Password**: password

### How to Post

1. **Login** to the platform
2. **Select platforms** you want to post to (Telegram, Viber)
3. **Write your content** in the text area
4. **Add an image** (optional) by providing an image URL
5. **Click "Post to Selected Platforms"**
6. **View results** in the right sidebar

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Posts
- `GET /api/posts/platforms` - Get available platforms
- `POST /api/posts/publish` - Publish to selected platforms

### Health Check
- `GET /api/health` - Server health status

## Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder to your hosting platform

### Backend Deployment (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the `server` folder
3. Update the frontend API base URL

## Development

### Available Scripts

```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend in development
npm run dev

# Start only the backend
npm run server

# Start only the frontend
npm run client

# Build frontend for production
npm run build
```

### Project Structure

```
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the configuration section
2. Verify your API credentials
3. Check the browser console for errors
4. Review the server logs

## Future Enhancements

- [ ] Post scheduling
- [ ] Draft saving
- [ ] Analytics dashboard
- [ ] More social platforms (Twitter, Instagram, LinkedIn)
- [ ] Image upload functionality
- [ ] User management
- [ ] Post templates
- [ ] Bulk posting
