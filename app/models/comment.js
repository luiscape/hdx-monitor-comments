var mongoose = require('mongoose')

// define the schema for our user model
var Comment = mongoose.Schema({
  author: String,
  time: { type: Date, default: Date.now },
  comment: String,
  dataset: {
    id: String,
    age: Number,
    status: String
  }
})

module.exports = mongoose.model('Comment', Comment)
