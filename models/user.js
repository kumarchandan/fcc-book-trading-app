// models/user.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    ownBooks: []   // bookIds
})

module.exports = mongoose.model('users', UserSchema)