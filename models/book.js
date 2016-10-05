// models/book.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookSchema = new Schema({
    bookId: String,
    title: String,
    cover: String,
    owner: String,      // email
    active: {
        type: Boolean,
        default: true
    },
    holder: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('books', bookSchema)
