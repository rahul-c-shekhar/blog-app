const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  comment: {
    type: String,
    required: true
  },
  postTitle: {
    type: String,
    required: true
  },
  postID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Comment', schema);