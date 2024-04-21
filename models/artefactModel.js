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
const artefactSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true,
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

const Artefacts = mongoose.model("Artefact", artefactSchema);
module.exports = Artefacts;
