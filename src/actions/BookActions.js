// actions/BookActions.js

import AppDispatcher from '../dispatcher/AppDispatcher'
import BookAPI from '../utils/BookAPI'
import BookConstants from '../constants/BookConstants'

var BookActions = {
    //
    getBooks: function(bookName) {
        AppDispatcher.handleAction({
            actionType: BookConstants.GET_BOOKS
        })
        //
        BookAPI.getBooks(bookName)
    },
    //
    addBook: function(id, title, cover) {
        AppDispatcher.handleAction({
            actionType: BookConstants.ADD_BOOK
        })
        //
        BookAPI.addBook(id, title, cover)
    }
}

module.exports = BookActions