const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Social posting API is running' });
});

// Serve client build (static files)
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(clientBuildPath));
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Social posting API is running', clientBuildPath });
});

// Basic log on startup
try {
  const fs = require('fs');
  if (!fs.existsSync(clientBuildPath)) {
    console.warn(`Client build folder not found at ${clientBuildPath}. SPA will 404 until built.`);
  }
} catch (e) {
  // ignore
}

// SPA fallback for client-side routing (must be after API routes)
app.get('*', (req, res, next) => {
  // Only handle non-API routes here
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  // Server started successfully
});
