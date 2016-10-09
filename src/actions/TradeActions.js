// actions/TradeActions.js

import AppDispatcher from '../dispatcher/AppDispatcher'
import TradeAPI from '../utils/TradeAPI'
import TradeConstants from '../constants/TradeConstants'

var TradeActions = {
    // Get Book Trades
    getBookTrades: function(email) {
        AppDispatcher.handleAction({
            actionType: TradeConstants.GET_BOOK_TRADES
        })
        //
        TradeAPI.getBookTrades(email)
    },
    // Update action
    updateTradeAction: function(tradeAction) {
        //
        AppDispatcher.handleAction({
            actionType: TradeConstants.UPDATE_TRADE_ACTION,
            data: tradeAction
        })
    },
    // Save Trade action
    saveTradeAction: function(tradeAction) {
        //
        AppDispatcher.handleAction({
            actionType: TradeConstants.SAVE_TRADE_ACTION,
            data: tradeAction
        })
        //
        TradeAPI.saveTradeAction(tradeAction)
    }
}

module.exports = TradeActions