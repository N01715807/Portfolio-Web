const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

//Initializing the Express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Read configuration
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Health Check
app.get('/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'dev' });
});

// Try to connect to the database and start the service
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

app.use('/api/profile', require('./routes/api/profile.routes'));
app.use('/api/codeworks', require('./routes/api/codework.routes'));