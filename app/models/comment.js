var mongoose = require('mongoose')

// define the schema for our user model
var Comment = mongoose.Schema({
  time: { type: Date, default: Date.now },
  author: { type: String, required: true },
  comment: { type: String, required: true },
  dataset: {
    id: { type: String, required: true },
    age: { type: Number, required: true },
    status: { type: String, required: true }
  }
})

module.exports = mongoose.model('Comment', Comment)
