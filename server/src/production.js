require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const leadsRouter = require('./routes/leads');
const analyticsRouter = require('./routes/analytics');
const authRouter = require('./routes/auth');
const abandonedSignupsRouter = require('./routes/abandonedSignups');
const settingsRouter = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configurado para mesmo domínio em produção
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'minha-tshirt-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// API Routes - devem vir ANTES do static serving
app.use('/api/leads', leadsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/auth', authRouter);
app.use('/api/abandoned-signups', abandonedSignupsRouter);
app.use('/api/settings', settingsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API 404 handler - DEVE vir ANTES do SPA fallback
// Garante que rotas /api/* não encontradas retornem JSON, não HTML
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    path: req.path 
  });
});

// Serve static files do build React
const buildPath = path.join(__dirname, '../../build');
app.use(express.static(buildPath));

// SPA fallback - todas as rotas não-API servem index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running on port ${PORT}`);
  console.log(`Serving API at /api/*`);
  console.log(`Serving React app from ${buildPath}`);
});
