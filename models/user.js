// models/user.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    incomingRequests: [
        {
            sender: String,         // email
            bookObjId: String,
            bookId: String,
            bookTitle: String,
            bookCover: String,
            status: {
                type: String,
                default: 'New'      // New, Finished
            },
            action: {
                type: String,
                default: 'Pending'  // Approved, Pending, Rejected
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    outgoingRequests: [
        {
            receiver: String,       // email
            bookObjId: String,
            bookId: String,
            bookTitle: String,
            bookCover: String,
            status: {
                type: String,
                default: 'New'      // New, Finished
            },
            action: {
                type: String,
                default: 'Pending'  // Approved, Pending, Rejected
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    detailedInfo: {
        displayName: {
            type: String,
            default: null
        },
        street: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        country: {
            type: String,
            default: null
        },
        phone: {
            type: String,
            default: null
        },
        profile_pic_url: {
            type: String,
            default: null
        }
    }
})

module.exports = mongoose.model('users', UserSchema)