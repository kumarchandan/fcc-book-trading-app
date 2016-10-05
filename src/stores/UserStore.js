// stores/UserStore.js

import _ from 'underscore'
import AppDispatcher from '../dispatcher/AppDispatcher'
import UserConstants from '../constants/UserConstants'
var EventEmitter = require('events').EventEmitter

//
var _msg = {
    text: '',
    severity: ''
}

// User Profile
var _userProfile = null

// Messages
function loadMsg(msg) {
    _msg = msg
}
// User Profile
function loadUserProfile(userProfile) {
    _userProfile = userProfile
}

//
var UserStore = _.extend({}, EventEmitter.prototype, {
    //
    getMsg: function() {
        var temp = Object.assign({}, _msg)     // Clone entire object
        _msg.text = ''
        _msg.severity = ''
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
            loadMsg(action.data)
            UserStore.emitChange()
            break
        case UserConstants.LOGIN_RESPONSE:
            loadMsg(action.data)
            UserStore.emitChange()
            break
        case UserConstants.GET_USER_PROFILE_RESPONSE:
            loadUserProfile(action.data)
            UserStore.emitChange()
            break
        case UserConstants.UPDATE_USER_PROFILE_RESPONSE:
            loadMsg(action.data)
            UserStore.emitChange()
            break
        default:
            break
    }
    return true
})

module.exports = UserStore
