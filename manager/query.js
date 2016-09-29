// manager/query.js

var BookModel = require('../models/book')
var UserModel = require('../models/user')

function getAllBooks(req, res) {
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

// Logged in user's books
function getMyBooks(req, res) {
    //
    var owner = req.user ? req.user.email : null
    if(owner) {
        BookModel.find({ owner: owner }, function(err, mybooks) {
            if(err) throw err
            //
            res.status(200).json({
                data: {
                    items: mybooks
                }
            })
        })
    }
}

module.exports = {
    getAllBooks: getAllBooks,
    getMyBooks: getMyBooks
}