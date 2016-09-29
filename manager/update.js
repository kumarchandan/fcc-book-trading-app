// manager/update.js

var BookModel = require('../models/book')

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
                    msg: newBook.title + ' added.'
                }
            })
        }
    })
}

module.exports = {
    addBook: addBook
}