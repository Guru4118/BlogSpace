const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const redisClient = require('./config/redis');

dotenv.config();

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
connectDB();
redisClient.connect().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
