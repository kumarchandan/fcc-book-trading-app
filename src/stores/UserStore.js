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

//
function loadSignupMsg(msg) {
    _signupMsg = msg
}
function loadLoginMsg(msg) {
    _loginMsg = msg
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
