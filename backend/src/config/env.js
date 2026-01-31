const dotenv = require('dotenv');
dotenv.config();

if (!process.env.GROQ_API_KEY) {
  console.error("❌ FATAL: GROQ_API_KEY is missing in .env");
  process.exit(1);
}

module.exports = {
  PORT: process.env.PORT || 5000,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development'
};