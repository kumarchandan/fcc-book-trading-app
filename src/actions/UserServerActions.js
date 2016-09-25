// actions/UserServerActions.js

import AppDispatcher from '../dispatcher/AppDispatcher'
import UserConstants from '../constants/UserConstants'

var UserServerActions = {
    // SignUp
    registerUser: function(msg) {
        //
        AppDispatcher.handleServerAction({
            actionType: UserConstants.REGISTER_USER_RESPONSE,
            data: msg
        })
    },
    // Login
    login: function(msg) {
        AppDispatcher.handleServerAction({
            actionType: UserConstants.LOGIN_RESPONSE,
            data: msg
        })
    }
}

module.exports = UserServerActions