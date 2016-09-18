// actions/BookServerActions.js

import AppDispatcher from '../dispatcher/AppDispatcher'
import BookConstants from '../constants/BookConstants'

var BookServerActions = {
    //
    addBook: function(data) {
        AppDispatcher.handleAction({
            actionType: BookConstants.ADD_BOOK_RESPONSE,
            data: data
        })
    },
    //
    getBooks: function(data) {
        AppDispatcher.handleAction({
            actionType: BookConstants.GET_BOOKS_RESPONSE,
            data: data
        })
    },
    //
    getAvailBooks: function(data) {
        AppDispatcher.handleAction({
            actionType: BookConstants.GET_AVAIL_BOOKS_RESPONSE,
            data: data
        })
    }
}

module.exports = BookServerActions