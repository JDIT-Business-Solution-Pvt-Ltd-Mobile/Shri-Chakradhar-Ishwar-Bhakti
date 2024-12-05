const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Hash this in production
  role: { type: String, default: 'user' } // 'admin' or 'user'
});

module.exports = mongoose.model('User', UserSchema);
