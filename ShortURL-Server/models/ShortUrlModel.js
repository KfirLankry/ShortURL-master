const mongoose = require("mongoose");
const shortId = require("shortid");

// ShortURL Schema
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
    minlength: 10,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("shortUrl", shortUrlSchema);
