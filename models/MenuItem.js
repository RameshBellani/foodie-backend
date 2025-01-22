const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  available: Boolean,
  rating: Number,
  reviews: [{ userId: String, userName: String, rating: Number, comment: String }],
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
