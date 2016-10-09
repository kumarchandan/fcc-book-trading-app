// actions/TradeServerActions.js

import AppDispatcher from '../dispatcher/AppDispatcher'
import TradeConstants from '../constants/TradeConstants'

var TradeServerActions = {
    // Get Book Trades
    getBookTrades: function(data) {
        AppDispatcher.handleServerAction({
            actionType: TradeConstants.GET_BOOK_TRADES_RESPONSE,
            data: data
        })
    },
    //
    saveTradeAction: function(data) {
        AppDispatcher.handleServerAction({
            actionType: TradeConstants.SAVE_TRADE_ACTION_RESPONSE,
            data: data
        })
    }
}

module.exports = TradeServerActions