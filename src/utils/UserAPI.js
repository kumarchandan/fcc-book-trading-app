// utils/UserAPI.js

import request from 'superagent'
import UserServerActions from '../actions/UserServerActions'

var UserAPI = {
    // SignUp
    registerUser: function(userData) {
        //
        request.post('/signup').send({ username: userData.username, email: userData.email, password: userData.password }).end(function(err, result) {
            //
            if(err) throw err
            //
            if(result.body.msg) {
                // Msg for Snackbar
                UserServerActions.registerUser(result.body.msg)
            }
        })
    },
    // Login
    login: function(userData) {
        //
        request.post('/login').send({ email: userData.email, password: userData.password }).end(function(err, result) {
            //
            if(err) throw err
            //
            if(result.body.msg) {
                UserServerActions.login(result.body.msg)
            }
        })
    },
    //
    isLoggedIn: function(done) {
        //
        request.get('/isloggedin').end(function(err, result) {
            //
            if(err) throw err
            //
            if(result.body.data) {
                done(true)
            } else {
                done(false)
            }
        })
    },
    //
    getUserProfile: function() {
        request.get('/isloggedin').end(function(err, result) {
            if(err) throw err
            //
            if(result.body.data) {
                UserServerActions.getUserProfile(result.body.data)
            } else {
                UserServerActions.getUserProfile(null)
            }
        })
    },
    //
    updateUserProfile: function(user) {
        request.post('/api/user/update').send({ user: user }).end(function(err, result) {
            //
            if(err) throw err
            //
            UserServerActions.updateUserProfile(result.body.msg)
        })
    }
}

//
module.exports = UserAPI