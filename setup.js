#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up All-in-One Social Media Posting Platform...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step) {
  log(`\n📋 ${step}`, 'blue');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  logSuccess(`Node.js version: ${nodeVersion}`);
} catch (error) {
  logError('Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Install dependencies
logStep('Installing dependencies...');

try {
  log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  log('Installing server dependencies...');
  execSync('cd server && npm install', { stdio: 'inherit' });
  
  log('Installing client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });
  
  logSuccess('All dependencies installed successfully!');
} catch (error) {
  logError('Failed to install dependencies');
  process.exit(1);
}

// Create .env file if it doesn't exist
logStep('Setting up environment variables...');

const envPath = path.join(__dirname, 'server', '.env');
const envExamplePath = path.join(__dirname, 'server', 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    logSuccess('Created .env file from template');
    logWarning('Please edit server/.env with your actual API credentials');
  } else {
    logError('env.example file not found');
  }
} else {
  logSuccess('.env file already exists');
}

// Create necessary directories
logStep('Creating necessary directories...');

const dirs = [
  'server/uploads',
  'client/public/images'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    logSuccess(`Created directory: ${dir}`);
  }
});

// Check if git is initialized
logStep('Checking Git repository...');

try {
  execSync('git status', { stdio: 'ignore' });
  logSuccess('Git repository is initialized');
} catch (error) {
  logWarning('Git repository not initialized');
  log('To initialize Git, run: git init');
}

// Final instructions
logStep('Setup complete!');

logSuccess('🎉 Your All-in-One Social Media Posting Platform is ready!');
log('\n📝 Next steps:');
log('1. Edit server/.env with your API credentials', 'yellow');
log('2. Run "npm run dev" to start the development servers', 'yellow');
log('3. Open http://localhost:3000 in your browser', 'yellow');
log('4. Login with: admin@example.com / password', 'yellow');

log('\n📚 Documentation:');
log('- README.md - Complete setup and usage guide', 'blue');
log('- DEPLOYMENT.md - Deployment instructions', 'blue');

log('\n🔧 Available commands:');
log('- npm run dev - Start both frontend and backend', 'blue');
log('- npm run server - Start only the backend', 'blue');
log('- npm run client - Start only the frontend', 'blue');
log('- npm run build - Build frontend for production', 'blue');

log('\n💡 Need help?');
log('- Check the README.md file for detailed instructions', 'blue');
log('- Review the DEPLOYMENT.md file for hosting options', 'blue');

console.log('\n' + '='.repeat(60));
log('🚀 Happy posting!', 'green');
console.log('='.repeat(60));
