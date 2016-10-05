// actions/BookServerActions.js

import AppDispatcher from '../dispatcher/AppDispatcher'
import BookConstants from '../constants/BookConstants'

var BookServerActions = {
    // Add Book
    addBook: function(data) {
        AppDispatcher.handleServerAction({
            actionType: BookConstants.ADD_BOOK_RESPONSE,
            data: data
        })
    },
    // Remove Book
    removeBook: function(data) {
        AppDispatcher.handleServerAction({
            actionType: BookConstants.REMOVE_BOOK_RESPONSE,
            data: data
        })
    },
    // Search Book
    getBooks: function(data) {
        AppDispatcher.handleServerAction({
            actionType: BookConstants.GET_BOOKS_RESPONSE,
            data: data
        })
    },
    // Get All Books
    getAllBooks: function(data) {
        AppDispatcher.handleServerAction({
            actionType: BookConstants.GET_ALL_BOOKS_RESPONSE,
            data: data
        })
    },
    // Get My Books
    getMyBooks: function(data) {
        AppDispatcher.handleServerAction({
            actionType: BookConstants.GET_MY_BOOKS_RESPONSE,
            data: data
        })
    },
    // Get Book Trades
    getBookTrades: function(data) {
        AppDispatcher.handleServerAction({
            actionType: BookConstants.GET_BOOK_TRADES_RESPONSE,
            data: data
        })
    },
    // Request Book
    requestBook: function(data) {
        AppDispatcher.handleServerAction({
            actionType: BookConstants.REQUEST_BOOK_RESPONSE,
            data: data
        })
    }
}

module.exports = BookServerActions