// routes/api.js

var google = require('../manager/google')
var express = require('express')
var query = require('../manager/query')
var router = express.Router()
var update = require('../manager/update')

// GET
router.get('/books/search', google.getBooks)
router.get('/books/all', query.getAllBooks)
router.get('/books/mine', query.getMyBooks)

// POST
router.post('/books/add', update.addBook)
router.post('/books/remove', update.removeBook)
//
router.post('/user/update', update.updateUserProfile)

module.exports = router