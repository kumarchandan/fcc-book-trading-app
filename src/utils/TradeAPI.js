// utils/TradeAPI.js

var request = require('superagent')

import TradeServerActions from '../actions/TradeServerActions'

var TradeAPI = {
    // Get Book Trades
    getBookTrades: function(email) {
        //
        request.get('/api/books/trade').end(function(err, result) {
            //
            if(err) throw err
            //
            TradeServerActions.getBookTrades(result.body.data)
        })
    },
    // Save Trade Action
    saveTradeAction: function(tradeAction) {
        //
        request.post('/api/books/trade/update').send({ tradeAction: tradeAction }).end(function(err, result) {
            //
            if(err) throw err
            //
            TradeServerActions.saveTradeAction(result.body.data)
        })
    }
}

module.exports = TradeAPI