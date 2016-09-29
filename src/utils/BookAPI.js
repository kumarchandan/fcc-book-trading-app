// utils/BookAPI.js

var request = require('superagent')

import BookServerActions from '../actions/BookServerActions'

var BookAPI = {
    //
    getAllBooks: function() {
        //
        request.get('/api/books/all').end(function(err, result) {
            //
            if(err) throw err
            //
            BookServerActions.getAllBooks(result.body.data)
        })
    },
    //
    getBooks: function(bookName) {
        //
        request.get('/api/books/search?bookName='+ bookName).end(function(err, result) {
            //
            if(err) throw err
            //
            BookServerActions.getBooks(result.body.data)
        })
    },
    //
    getMyBooks: function() {
        request.get('/api/books/mine').end(function(err, result) {
            if(err) throw err
            //
            BookServerActions.getMyBooks(result.body.data)
        })
    },
    //
    addBook: function(id, title, cover) {
        //
        request.post('/api/books/add').send({ id: id, title: title, cover: cover }).end(function(err, result) {
            //
            if(err) throw err
            //
            BookServerActions.addBook(result.body.data)
        })
    }
}

module.exports = BookAPI