module.exports = function (app, config) {
  var http = require('http')
  var moment = require('moment')

  var Fetch = require('./functions/fetch')
  var Comment = require('./models/comment')

  var commentObject = {
    'id': null
  }

  app.param('id', function (req, res, next, data) {
    commentObject.id = data
    next()
  })

  app.get('/status', function (req, res) {
    var payload = {
      'online': true,
      'message': config.description,
      'version': config.version,
      'repository': config.repository.url
    }
    res.send(payload)
  })

  app.get('/', function (req, res) {
    //
    // Check if the user is
    // trying to create a record.
    //
    if (req.body.id) {
      var payload = {
        'success': false,
        'message': 'We noticed data in the request. If you are trying to store data, please use a POST request instead.'
      }
      res.send(payload)
    } else {
      Fetch.fetchAllComments(20, function (err, data) {
        if (err) {
          res.send(err)
        } else {
          res.send(data)
        }
      })
    }
  })

  app.get('/:id', function (req, res) {
    Fetch.fetchComment(commentObject.id, function (err, data) {
      if (err) {
        res.send(err)
      } else {
        res.send(data)
      }
    })
  })

  app.post('/', function (req, res) {
    //
    // Check that necessary parameters have
    // been provided.
    //
    console.log('Query: ' + JSON.stringify(req.body))
    if (typeof req.body['id'] === undefined || typeof req.body['comment'] === undefined) {
      var payload = {
        'success': false,
        'message': 'Parameters are missing. Please provide a dataset id and comment.',
      }
      res.send(payload)
    }

    //
    // Creates new comment object.
    //
    var comment = new Comment({
      'author': req.body['author'],
      'comment': req.body['comment'],
      'dataset': {
        'id': req.body['id'],
        'age': req.body['age'],
        'status': req.body['status']
      }
    }, {
      minimize: false
    })

    //
    // Saves comment object in database.
    //
    comment.save(function (err, data) {
      if (err) {
        console.log(err)
        var payload = {
          'success': false,
          'message': 'Database error. Failed to store data.',
        }
        res.send(payload)
      } else {
        var payload = {
          'success': true,
          'message': 'Stored record in database successfully.',
          'record': data,
        }
        res.send(payload)
      }
    })
  })

  //
  // Endpoint for deleting data
  // from specific node.
  //
  app.delete('/', function (req, res) {
    Comment.remove({ id: req.body.id }, function (err, data) {
      if (err) {
        var payload = {
          'success': false,
          'message': 'Failed to remove record from database.',
          'error': err,
        }
        res.send(payload)
      } else {
        var i = 0
        var payload = {
          'success': true,
          'message': 'All record from node' + req.body.id + ' were removed from database.',
          'count': i,
          'log': data,
        }
        res.send(payload)
      }
    })
  })

  //
  // Any other routes send error.
  //
  app.use(function (req, res) {
    res.status(404)
    res.send({ 'success': false, 'message': 'URL not found.'})
  })

}
