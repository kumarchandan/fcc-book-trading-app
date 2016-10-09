// stores/TradeStore.js

var _ = require('underscore')
var EventEmitter = require('events').EventEmitter
import AppDispatcher from '../dispatcher/AppDispatcher'
import TradeConstants from '../constants/TradeConstants'

//
var _bookTrades = {}

// Book Trades
function loadBookTrades(bookTrades) {
    _bookTrades = bookTrades.trades
}
//
function updateTradeAction(tradeAction) {
    // Update array inplace 
    _bookTrades.incomingRequests.forEach(function(value, index, arr) {
        if(value._id === tradeAction._id) {
            arr[index].action = tradeAction.value       // value = Accepted, Pending or Rejected
        }
    })
}

var TradeStore = _.extend({}, EventEmitter.prototype, {
    //
    getBookTrades: function() {
        return _bookTrades
    },
    //
    emitChange: function() {
        this.emit('change')
    },
    //
    addChangeListener: function(done) {
        this.on('change', done)
    },
    //
    removeChangeListener: function(done) {
        this.removeListener('change', done)
    }
})

//
AppDispatcher.register(function(payload) {
    //
    var action = payload.action
    //
    switch(action.actionType) {
        //
        case  TradeConstants.GET_BOOK_TRADES_RESPONSE:
            loadBookTrades(action.data)
            TradeStore.emitChange()
            break
        case TradeConstants.UPDATE_TRADE_ACTION:
            updateTradeAction(action.data)
            TradeStore.emitChange()
            break
        default:
            break
    }
    return true
})

//
module.exports = TradeStore