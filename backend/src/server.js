const express = require('express');
const cors = require('cors');
const scanRoutes = require('./routes/scan.route');
const errorHandler = require('./middlewares/error.middleware');
const { PORT } = require('./config/env');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/scan', scanRoutes);

// Health Check
app.get('/', (req, res) => res.send('AccessAI Backend is Running 🚀'));

// Error Handling
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`
  =================================
  🚀 AccessAI Backend Started
  📡 Port: ${PORT}
  🛠  Env: ${process.env.NODE_ENV}
  =================================
  `);
});