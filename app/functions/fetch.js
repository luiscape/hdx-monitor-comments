var Comment = require('../models/comment')

//
// Fetches all status
// from the database.
//
var fetchAllComments = function (limit, callback) {
  Comment.find(function (err, data) {
    if (err) {
      var payload = { 'success': false, 'message': 'Could not collect comments from database.' }
      callback(payload)
    } else {
      var out = {
        'success': true,
        'count': data.length,
        'records': data
      }
      callback(null, out)
    }
  }).limit(limit)
}

//
// Fetches a single comment based on id.
//
var fetchComment = function (id, callback) {
  Comment.find({ 'dataset.id': id }, function (err, data) {
    if (err) {
      var payload = {
        'success': false,
        'message': 'Could not find comment for provided id.',
        'id': id
      }
      callback(payload)
    } else {
      var out = {
        'success': true,
        'count': data.length,
        'records': data
      }
      callback(null, out)
    }
  })
}

//
// Exporting functions.
//
module.exports = {
  fetchComment: fetchComment,
  fetchAllComments: fetchAllComments
}
