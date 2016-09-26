// models/book.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookSchema = new Schema({
    bookId: String,
    title: String,
    cover: String,
    owner: String,
    active: Boolean,    // books is availabe for rent or not
    holder: String      // email of user(holder), else null
})

module.exports = mongoose.model('books', bookSchema)