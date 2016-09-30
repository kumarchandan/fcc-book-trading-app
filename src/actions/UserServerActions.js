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
    },
    // Logout
    logout: function(msg) {
        AppDispatcher.handleServerAction({
            actionType: UserConstants.LOGOUT_RESPONSE,
            data: msg
        })
    },
    // Get User Profile
    getUserProfile: function(userProfile) {
        AppDispatcher.handleServerAction({
            actionType: UserConstants.GET_USER_PROFILE_RESPONSE,
            data: userProfile
        })
    }
}

module.exports = UserServerActions