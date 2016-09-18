// models/book.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookSchema = new Schema({
    bookId: String,
    title: String,
    owner: String,
    cover: String,
    requested: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('books', bookSchema)
