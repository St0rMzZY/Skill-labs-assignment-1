const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
});

const Author = mongoose.model('Authentication', authorSchema);

module.exports = Author;