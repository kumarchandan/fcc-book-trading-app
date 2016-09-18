// manager/query.js

var BookModel = require('../models/book')

function getAvailBooks(req, res, next) {
    //
    BookModel.find(function(err, books) {
        //
        if(err) throw err
        //
        res.status(200).json({
            data: {
                items: books
            }
        })
    })
}

module.exports = {
    getAvailBooks: getAvailBooks
}