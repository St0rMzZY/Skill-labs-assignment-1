const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogTitle: String,
  blogContent: String,
  authorId: String,
});

const Design = mongoose.model('Design', blogSchema);

module.exports = Design;