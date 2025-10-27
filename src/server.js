const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// static
app.use(express.static(path.join(__dirname, 'public')));

// views
const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// health
app.get('/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'dev' });
});

// API routes
app.use('/api/profile', require('./routes/api/profile.routes'));
app.use('/api/codeworks', require('./routes/api/codework.routes'));

// Admin routes
app.use('/admin', require('./routes/admin/admin.routes'));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: 'SERVER_ERROR', message: err.message });
});

// start
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

(async () => {
  try {
    if (!MONGODB_URI) throw new Error('Missing MONGODB_URI');
    await mongoose.connect(MONGODB_URI, { dbName: 'portfolio' });
    console.log('Mongo connected');

    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err.message);
    process.exit(1);
  }
})();
