// manager/update.js

var BookModel = require('../models/book')

// Add Book
function addBook(req, res) {
    // User can have many books of same title, let it all save
    var newBook = new BookModel()
    newBook.bookId = req.body.id
    newBook.title = req.body.title
    newBook.cover = req.body.cover === undefined ? '': req.body.cover
    newBook.owner = req.user.email
    newBook.requested = false
    //
    newBook.save(function(err, doc) {
        if(err) throw err
        //
        if(doc) {
            res.status(200).json({
                data: {
                    book: doc,
                    msg: newBook.title + ' added.'
                }
            })
        }
    })
}

// Remove Book
function removeBook(req, res) {
    // Remove using current user's id

    var email = req.user ? req.user.email : null
    var _id = req.body._id
    if(email) {
        BookModel.remove({ _id: _id, owner: email }, function(err, doc) {
            if(err) throw err
            if(!err) {
                res.status(200).json({
                    data: {
                        msg: 'Removed successfully!',
                        severity: 'S',
                        _id: _id
                    }
                })
            } else {
                res.status(200).json({
                    data: {
                        msg: 'Cannot remove! Error found!',
                        severity: 'E'
                    }
                })
            }
        })
    } else {
        res.status(200).json({
            data: {
                msg: 'Cannot remove! This is not your book',
                severity: 'W'
            }
        })
    }
}

module.exports = {
    addBook: addBook,
    removeBook: removeBook
}