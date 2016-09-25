// manager/update.js

var BookModel = require('../models/book')

function addBook(req, res) {
    //
    var oBook = {
        id: req.body.id,
        title: req.body.title,
        cover: req.body.cover === undefined ? '': req.body.cover
    }
    //
    BookModel.update({ owner: 'kchan', bookId: oBook.id }, { title: oBook.title, cover: oBook.cover, requested: false }, { upsert: true }, function(err, doc) {
        if(err) throw err
        //
        if(doc) {
            res.status(200).json({
                data: {
                    msg: oBook.title + ' added.'
                }
            })
        }
    })
}

module.exports = {
    addBook: addBook
}