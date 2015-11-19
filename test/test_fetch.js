//
// Tests configuration files.
//
var fs = require('fs')
var path = require('path')
var should = require('should')
var expect = require('chai').expect

//
// Functions.
//
var Fetch = require('../app/functions/fetch')

describe('Application fecth functions.', function () {
  it('Fetch.fetchAllComments() should return an object.', function (done) {
    Fetch.fetchAllComments(function (err, data) {
      var result
      if (err) {
        result = err
      } else {
        result = data
      }
      expect(typeof result).to.equal('object')
    })
    done()
  })

  it('Fetch.fetchComment() should return an object.', function (done) {
    Fetch.fetchComment(function (err, data) {
      var result
      if (err) {
        result = err
      } else {
        result = data
      }
      expect(typeof result).to.equal('object')
    })
    done()
  })

})
