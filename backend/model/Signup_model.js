const mongoose = require('mongoose');

const signup = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,      // Enforce unique emails
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  // Optional fields for Google login or extra user info
  googleId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.user || mongoose.model('user', signup);
