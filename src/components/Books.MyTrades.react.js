// components/Books.MyTrades.react.js

import DropDownMenu from 'material-ui/DropDownMenu'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import React from 'react'
import TradeActions from '../actions/TradeActions'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'

var MyTrades = React.createClass({
    // Handle DropDownMenu Change
    _handleChange: function(_id, event, index, value) {
        //
        let tradeAction = {
            _id: _id,
            value: value
        }
        //
        TradeActions.updateTradeAction(tradeAction)
    },
    // Save
    _saveTradeAction: function(_id, action) {
        //
        let tradeAction = {
            _id: _id,
            action: action
        }
        //
        TradeActions.saveTradeAction(tradeAction)
    },
    //
    render: function() {
        //
        let bookTrades = this.props.bookTrades

        if(!bookTrades.incomingRequests || bookTrades.incomingRequests.length === 0) {
            return null
        }
        //
        var rows = []
        this.props.bookTrades.incomingRequests.map( (booktrade, i) => rows.push(
            <TableRow key={booktrade._id}>
                <TableRowColumn>{booktrade.sender}</TableRowColumn>
                <TableRowColumn>{booktrade.bookTitle}</TableRowColumn>
                <TableRowColumn>{booktrade.status}</TableRowColumn>
                <TableRowColumn>
                    <DropDownMenu value={booktrade.action} onChange={ (event, key, value) => (this._handleChange(booktrade._id, event, key, value)) }>
                        <MenuItem value={'Pending'} primaryText='Pending' />
                        <MenuItem value={'Accept'} primaryText='Accept' />
                        <MenuItem value={'Reject'} primaryText='Reject' />
                    </DropDownMenu>
                </TableRowColumn>
                <TableRowColumn>
                    <FlatButton label='SAVE' primary={true} onTouchTap={ () => (this._saveTradeAction(booktrade._id, booktrade.action)) } />
                </TableRowColumn>
            </TableRow>
        ), this)
        //
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Requester</TableHeaderColumn>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                        <TableHeaderColumn>Progress</TableHeaderColumn>
                        <TableHeaderColumn>Action</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        )
    }
})

//
module.exports = MyTrades