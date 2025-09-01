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

// Serve client build (static files)
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
const fs = require('fs');

// Check if client build exists
if (fs.existsSync(clientBuildPath)) {
  console.log(`✅ Client build found at: ${clientBuildPath}`);
  app.use(express.static(clientBuildPath));
} else {
  console.log(`❌ Client build NOT found at: ${clientBuildPath}`);
  // Serve a simple fallback page
  app.get('/', (req, res) => {
    res.send(`
      <html>
        <head><title>Social Posting App</title></head>
        <body>
          <h1>Social Posting App</h1>
          <p>Client build not found. Check Render build logs.</p>
          <p>API is working: <a href="/api/health">/api/health</a></p>
        </body>
      </html>
    `);
  });
}

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Social posting API is running', 
    clientBuildPath,
    clientBuildExists: fs.existsSync(clientBuildPath)
  });
});

// SPA fallback for client-side routing (must be after API routes)
app.get('*', (req, res, next) => {
  // Only handle non-API routes here
  if (req.path.startsWith('/api/')) return next();
  
  if (fs.existsSync(clientBuildPath)) {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  } else {
    res.status(404).send('Client build not found');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  // Server started successfully
});
