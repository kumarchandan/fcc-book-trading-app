// manager/google.js : google api related query

var key = require('../config/keys').googleBooksAPI.key
var googleBooks = require('googleapis').books('v1')

function getBooks(req, res, next) {
    //
    const bookName = req.query.bookName
    const startIndex = req.query.sIndex || 0      // handle pagination using startIndex
    const maxResults = 40
    //
    googleBooks.volumes.list({
        auth: key,
        startIndex: startIndex,
        maxResults: maxResults,
        q: bookName
    }, function(err, books) {
        //
        if(err) {
            res.status(200).json({
                data: null
            })
        }
        //
        res.status(200).json({
            data: books
        })
    })
}

//
module.exports = {
    getBooks: getBooks
}