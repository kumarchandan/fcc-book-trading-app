// stores/BookStore.js

var _ = require('underscore')
var EventEmitter = require('events').EventEmitter
import AppDispatcher from '../dispatcher/AppDispatcher'
import BookConstants from '../constants/BookConstants'

//
var _books = []
var _availBooks = []
var _msg = ''

//
function loadBooks(data) {
    _books = data.items
}
//
function loadMsg(data) {
    _msg = data.msg
}
//
function loadAvailBooks(data) {
    _availBooks = data.items
}

var BookStore = _.extend({}, EventEmitter.prototype, {
    //
    getBooks: function() {
        return _books
    },
    //
    getMsg: function() {
        var temp = _msg
        _msg = ''
        return temp
    },
    //
    getAvailBooks: function() {
        return _availBooks
    },
    //
    emitChange: function() {
        this.emit('change')
    },
    //
    addListener: function(done) {
        this.on('change', done)
    },
    //
    removeListener: function(done) {
        this.removeListener('change', done)
    }
})

//
AppDispatcher.register(function(payload) {
    //
    var action = payload.action
    //
    switch(action.actionType) {
        //
        case BookConstants.GET_BOOKS_RESPONSE:
            loadBooks(action.data)
            BookStore.emitChange()
            break
        case BookConstants.ADD_BOOK_RESPONSE:
            loadMsg(action.data)
            BookStore.emitChange()
            break
        case BookConstants.GET_AVAIL_BOOKS_RESPONSE:
            loadAvailBooks(action.data)
            BookStore.emitChange()
            break
        default:
            break
    }
    return true
})

//
module.exports = BookStore