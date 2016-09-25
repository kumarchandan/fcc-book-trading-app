// stores/UserStore.js

import _ from 'underscore'
import AppDispatcher from '../dispatcher/AppDispatcher'
import UserConstants from '../constants/UserConstants'

var EventEmitter = require('events').EventEmitter
//
var _signupMsg = ''
var _loginMsg = ''

//
function loadSignupMsg(msg) {
    _signupMsg = msg.text
}
function loadLoginMsg(msg) {
    _loginMsg = msg.text
}

//
var UserStore = _.extend({}, EventEmitter.prototype, {
    //
    getRegisterMsg: function() {
        var temp = _signupMsg
        _signupMsg = ''
        return temp
    },
    getLoginMsg: function() {
        var temp = _loginMsg
        _loginMsg = ''
        return temp
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
        default:
            break
    }
    return true
})

module.exports = UserStore
