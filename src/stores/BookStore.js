// stores/BookStore.js

var _ = require('underscore')
var EventEmitter = require('events').EventEmitter
import AppDispatcher from '../dispatcher/AppDispatcher'
import BookConstants from '../constants/BookConstants'
import TradeConstants from '../constants/TradeConstants'

//
var _allBooks = []
var _books = []
//
var _bookMsg = {
    text: '',
    severity: ''
}
var _myBooks = []

//
function loadBooks(data) {
    _books = data.items
}
// Messages
function loadMessage(data) {
    _bookMsg = data.msg
}

// Add Book
function addBook(data) {
    // 
    _bookMsg = data.msg
    //
    _myBooks.push(data.book)
    _allBooks.push(data.book)
}
//
function removeBook(data) {
    //
    _bookMsg = data.msg
    //
    if(data._id) {
        // Remove from MyBooks
        let index = _myBooks.findIndex(function(book, index) {
            return book._id === data._id
        })
        _myBooks.splice(index, 1)

        // Remove from AllBooks
        let i = _allBooks.findIndex(function(book, index) {
            return book._id === data._id
        })
        _allBooks.splice(i, 1)
    }
}
//
function clearSearch() {
    _books = []
}
//
function loadAllBooks(data) {
    _allBooks = data.items
}
//
function loadMyBooks(data) {
    _myBooks = data.items
}

var BookStore = _.extend({}, EventEmitter.prototype, {
    //
    getBooks: function() {
        return _books
    },
    //
    getBookMsg: function() {
        var temp = Object.assign({}, _bookMsg)     // Clone entire object
        _bookMsg.text = ''
        _bookMsg.severity = ''
        return temp
    },
    //
    getAllBooks: function() {
        return _allBooks
    },
    //
    getMyBooks: function() {
        //
        return _myBooks
    },
    //
    emitChange: function() {
        this.emit('change')
    },
    //
    addChangeListener: function(done) {
        this.on('change', done)
    },
    //
    removeChangeListener: function(done) {
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
        case BookConstants.GET_BOOKS_RESPONSE:      // Search Books
            loadBooks(action.data)
            BookStore.emitChange()
            break
        case BookConstants.ADD_BOOK_RESPONSE:
            addBook(action.data)
            BookStore.emitChange()
            break
        case BookConstants.GET_ALL_BOOKS_RESPONSE:
            loadAllBooks(action.data)
            BookStore.emitChange()
            break
        case BookConstants.GET_MY_BOOKS_RESPONSE:
            loadMyBooks(action.data)
            BookStore.emitChange()
            break
        case BookConstants.REMOVE_BOOK_RESPONSE:
            removeBook(action.data)
            BookStore.emitChange()
            break
        case BookConstants.CLEAR_SEARCH:
            clearSearch()
            BookStore.emitChange()
            break
        case BookConstants.REQUEST_BOOK_RESPONSE:
            loadMessage(action.data)
            BookStore.emitChange()
            break
        case TradeConstants.SAVE_TRADE_ACTION_RESPONSE:
            loadMessage(action.data)
            BookStore.emitChange()
            break
        default:
            break
    }
    return true
})

//
module.exports = BookStore