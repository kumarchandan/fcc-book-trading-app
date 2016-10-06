// manager/update.js

var BookModel = require('../models/book')
var mongoose = require('mongoose')
var UserModel = require('../models/user')

mongoose.Promise = require('bluebird')

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
                    msg: {
                        text: newBook.title + ' added.',
                        severity: 'S'
                    }
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
                        msg: {
                            text: 'Removed successfully!',
                            severity: 'S',
                        },
                        _id: _id
                    }
                })
            } else {
                res.status(200).json({
                    data: {
                        msg: {
                            text: 'Cannot remove! Error found!',
                            severity: 'E'
                        }
                    }
                })
            }
        })
    } else {
        res.status(200).json({
            data: {
                msg: {
                    text: 'Cannot remove! This is not your book',
                    severity: 'W'
                }
            }
        })
    }
}

// Request Book
function requestBook(req, res, next) {
    //
    var tData = req.body.tData  // _id, bookId, title, cover, owner, renter

    // Check if renter already requested the book
    UserModel.findOne({
        email: tData.renter,
        'outgoingRequests.receiver': tData.owner,
        'outgoingRequests.bookObjId': tData._id
    })
    .then(function(doc) {
        if(doc) {
            // Already requested
            res.status(200).json({
                data: {
                    msg: {
                        text: 'You have already requested!',
                        severity: 'W'
                    }
                }
            })
        } else {
            // Update owners Incoming
            UserModel.update({ email: tData.owner }, {
                $push: {
                    incomingRequests: {
                        sender: tData.renter,
                        bookObjId: tData._id,
                        bookId: tData.bookId,
                        bookTitle: tData.title,
                        bookCover: tData.cover
                    }
                }
            })
            .then(function(doc) {
                if(doc) {
                    // Update renters Outgoing
                    UserModel.update({ email: tData.renter }, {
                        $push: {
                            outgoingRequests: {
                                receiver: tData.owner,
                                bookObjId: tData._id,
                                bookId: tData.bookId,
                                bookTitle: tData.title,
                                bookCover: tData.cover
                            }
                        }
                    })
                    .then(function(doc) {
                        if(doc) {
                            // Return message
                            res.status(200).json({
                                data: {
                                    msg: {
                                        text: 'Requested successfully!',
                                        severity: 'S'
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    .catch(function(err) {
        res.status(200).json({
            data: {
                msg: {
                    text: 'Oops..Request failed!',
                    severity: 'E'
                },
                err: err
            }
        })
    })

}

// Update User Profile
function updateUserProfile(req, res, next) {
    //
    var user = req.body.user
    //
    UserModel.update({ email: user.email }, {
        detailedInfo: {
            displayName: user.displayName,
            street: user.street,
            city: user.city,
            state: user.state,
            country: user.country,
            profile_pic_url: user.profilePic
        }
    }, function(err, doc) {
        //
        if(err) throw err
        //
        if(doc) {
            res.status(200).json({
                msg: {
                    text: 'Profile updated successfully!',
                    severity: 'S'
                }
            })
        } else {
            res.status(200).json({
                msg: {
                    text: 'Profile update failed!',
                    severity: 'E'
                }
            })
        }
    })
}

module.exports = {
    addBook: addBook,
    removeBook: removeBook,
    requestBook: requestBook,
    updateUserProfile: updateUserProfile
}