// manager/query.js

var BookModel = require('../models/book')
var UserModel = require('../models/user')

function getAvailBooks(req, res) {
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