// actions/BookActions.js

import AppDispatcher from '../dispatcher/AppDispatcher'
import BookAPI from '../utils/BookAPI'
import BookConstants from '../constants/BookConstants'

var BookActions = {
    //
    getBooks: function(bookName, sIndex) {
        AppDispatcher.handleAction({
            actionType: BookConstants.GET_BOOKS
        })
        //
        BookAPI.getBooks(bookName, sIndex)
    },
    //
    addBook: function(id, title, cover) {
        AppDispatcher.handleAction({
            actionType: BookConstants.ADD_BOOK
        })
        //
        BookAPI.addBook(id, title, cover)
    },
    //
    getAllBooks: function(bookName) {
        AppDispatcher.handleAction({
            actionType: BookConstants.GET_ALL_BOOKS
        })
        //
        BookAPI.getAllBooks()
    },
    //
    getMyBooks: function() {
        AppDispatcher.handleAction({
            actionType: BookConstants.GET_MY_BOOKS,
        })
        //
        BookAPI.getMyBooks()
    },
    // Remove Book
    removeBook: function(_id) {
        AppDispatcher.handleAction({
            actionType: BookConstants.REMOVE_BOOK
        })
        //
        BookAPI.removeBook(_id)
    },
    // Clear Search
    clearSearch: function() {
        AppDispatcher.handleAction({
            actionType: BookConstants.CLEAR_SEARCH
        })
    },
    // Request Book
    requestBook: function(_id, bookId, title, cover, owner, renter) {
        AppDispatcher.handleAction({
            actionType: BookConstants.REQUEST_BOOK
        })
        // Transactional Data
        var tData = {
            _id: _id,
            bookId: bookId,
            title: title,
            cover: cover,
            owner: owner,
            renter: renter
        }
        //
        BookAPI.requestBook(tData)
    }
}

module.exports = BookActions