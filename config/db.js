const mongoose = require('mongoose');
// dotenv is loaded centrally in app.js; avoid loading it again here to prevent duplicate output

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
