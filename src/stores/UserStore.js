// stores/UserStore.js

import _ from 'underscore'
import AppDispatcher from '../dispatcher/AppDispatcher'
import UserConstants from '../constants/UserConstants'

var EventEmitter = require('events').EventEmitter
//
var _signupMsg = {
    text: '',
    severity: ''
}
var _loginMsg = {
    text: '',
    severity: ''
}
var _logoutMsg = {
    text: '',
    severity: ''
}
// User Profile
var _userProfile = null

//
function loadSignupMsg(msg) {
    _signupMsg = msg
}
function loadLoginMsg(msg) {
    _loginMsg = msg
}
function loadLogoutMsg(msg) {
    _logoutMsg = msg
}
function loadUserProfile(userProfile) {
    _userProfile = userProfile
}

//
var UserStore = _.extend({}, EventEmitter.prototype, {
    //
    getRegisterMsg: function() {
        var temp = Object.assign({}, _signupMsg)    // clone entire object
        _signupMsg.text = ''
        _signupMsg.severity = ''
        return temp
    },
    getLoginMsg: function() {
        var temp = Object.assign({}, _loginMsg)     // Clone entire object
        _loginMsg.text = ''
        _loginMsg.severity = ''
        return temp
    },
    getLogoutMsg: function() {
        var temp = Object.assign({}, _logoutMsg)
        _logoutMsg.text = ''
        _logoutMsg.severity = ''
        return temp
    },
    getUserProfile: function() {
        return _userProfile
    },
    emitChange: function() {
        this.emit('change')
    },
    addChangeListener: function(cb) {
        this.on('change', cb)
    },
    removeChangeListener: function(cb) {
        this.removeListener('change', cb)
    }
})

//
AppDispatcher.register(function(payload) {
    //
    var action = payload.action
    switch(action.actionType) {
        case UserConstants.REGISTER_USER_RESPONSE:
            loadSignupMsg(action.data)
            UserStore.emitChange()
            break
        case UserConstants.LOGIN_RESPONSE:
            loadLoginMsg(action.data)
            UserStore.emitChange()
            break
        case UserConstants.GET_USER_PROFILE_RESPONSE:
            loadUserProfile(action.data)
            UserStore.emitChange()
            break
        case UserConstants.LOGOUT_RESPONSE:
            loadLogoutMsg(action.data)
            UserStore.emitChange()
            break
        default:
            break
    }
    return true
})

module.exports = UserStore
