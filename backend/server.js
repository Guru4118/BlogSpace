require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const redisClient = require('./config/redis');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/blogs', require('./routes/commentRoutes'));


// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  connectDB();

  if (process.env.REDIS_URL) {
    try {
      await Promise.race([
        redisClient.connect(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Redis connect timed out after 10s')), 10_000)
        ),
      ]);
      console.log('Redis connected');
    } catch (err) {
      try {
        redisClient.disconnect();
      } catch {
        /* ignore */
      }
      console.warn('Redis unavailable — blog caching disabled:', err.message);
    }
  } else {
    console.warn('REDIS_URL not set — blog caching disabled');
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
