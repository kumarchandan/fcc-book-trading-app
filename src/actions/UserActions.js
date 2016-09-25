// actions/UserActions.js

import AppDispatcher from '../dispatcher/AppDispatcher'
import UserConstants from '../constants/UserConstants'
import UserAPI from '../utils/UserAPI'

var UserActions = {
    // Signup
    registerUser: function(userData) {
        //
        AppDispatcher.handleAction({
            actionType: UserConstants.REGISTER_USER
        })
        //
        UserAPI.registerUser(userData)
    },
    // Login user
    login: function(userData) {
        //
        AppDispatcher.handleAction({
            actionType: UserConstants.LOGIN
        })
        //
        UserAPI.login(userData)
    }
}

//
module.exports = UserActions
