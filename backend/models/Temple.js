const mongoose = require('mongoose');

const TempleSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  image: String, // URL or Base64 string
});

module.exports = mongoose.model('Temple', TempleSchema);
