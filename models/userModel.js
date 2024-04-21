/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Artefact', 
  }],
  facts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Fact',
  }],
  dp: {
    type: String,
    default:'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
  },
});

userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);
