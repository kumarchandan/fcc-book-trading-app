// manager/query.js

var BookModel = require('../models/book')
var UserModel = require('../models/user')

// All Books
function getAllBooks(req, res, next) {
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

// Logged in Users books
function getMyBooks(req, res, next) {
    //
    var owner = req.user ? req.user.email : null
    if(owner) {
        BookModel.find({ owner: owner }, function(err, mybooks) {
            if(err) throw err
            // mybooks will be 0 length array if no values found
            res.status(200).json({
                data: {
                    items: mybooks
                }
            })
        })
    }
}

// Logged in Users bookTrades
function getBookTrades(req, res, next) {
    //
    var user = req.user ? req.user.email : null
    if(user) {
        UserModel.findOne({ email: user }, function(err, trades) {
            //
            if(err) throw err
            //
            res.status(200).json({
                data: {
                    trades: trades
                }
            })
        })
    }
}

module.exports = {
    getAllBooks: getAllBooks,
    getMyBooks: getMyBooks,
    getBookTrades: getBookTrades
}