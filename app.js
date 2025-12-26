const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);  // signup/login without token
app.use('/api/products', verifyToken, productRoutes);  // secure products

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
