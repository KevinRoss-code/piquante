const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  nanufacturer: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes:{ type: Number, required: true },
  dislikes:{ type: Number, required: true },
  usersLiked:{ type: String, required: true },
  userseDisliked:{ type: String, required: true }
});

module.exports = mongoose.model('Sauce', sauceSchema);