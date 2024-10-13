/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  commentLikes: {
    type: Array,
    default: [],
  },
});

// Post Schema
const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true,
  },
  imageDescription: {
    type: String,
    
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
});

const posts = mongoose.model("Post", postSchema);
module.exports = posts;
