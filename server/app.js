const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const forumRoutes = require('./routes/forumRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors')

const app = express();
app.use(cors());

connectDB();


app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline';");
  next();
});

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
