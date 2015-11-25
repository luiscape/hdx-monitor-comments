var fs = require('fs')
var cors = require('cors')
var morgan = require('morgan')
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var startApplication = function (instance) {
  if (instance === undefined) {
    instance = 'development'
  }

  var DB = require('./config/database')
  var config = JSON.parse(fs.readFileSync('package.json', 'utf8'))

  //
  // Only start the application
  // if the database is ready.
  //
  mongoose.connection.on('connected', function (ref) {
    //
    // Application variables.
    //
    var app = express()
    var port = process.env.PORT || 8000

    //
    // Application configuration.
    //
    app.use(cors())
    app.use(morgan('dev'))
    app.use(bodyParser.json({ type: 'application/*' }))
    app.use(bodyParser.urlencoded({ extended: true }))

    //
    // Routes.
    //
    require('./app/routes.js')(app, config)

    //
    // Start server.
    //
    app.listen(port)
    console.log('HDX Monitor Commenting service v.' + config.version + ' running on port: ' + port)

  })

  mongoose.connection.on('error', function (err) {
    console.log('Could not connect to MongoDB.')
    throw err
  })

  //
  // Attempt connection with MongoDB.
  //
  console.log('Attemting connection to: ' + DB.url)
  mongoose.connect(DB.url)
}

//
// Invoking function.
//
var main = function () {
  startApplication(process.argv[2])
}

if (require.main === module) {
  main()
}
