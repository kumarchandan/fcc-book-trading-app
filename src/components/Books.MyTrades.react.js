// components/Books.MyTrades.react.js

import DropDownMenu from 'material-ui/DropDownMenu'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import React from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'

var MyTrades = React.createClass({
    //
    getInitialState: function() {
        return {
            value: 1 // Pending
        }
    },
    // Handle DropDownMenu Change
    _handleChange: function(event, index, value) {
        this.setState({ value })
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
        bookTrades.incomingRequests.map( (booktrade, i) => rows.push(
            <TableRow key={booktrade._id}>
                <TableRowColumn>{booktrade.sender}</TableRowColumn>
                <TableRowColumn>{booktrade.bookTitle}</TableRowColumn>
                <TableRowColumn>{booktrade.status}</TableRowColumn>
                <TableRowColumn>
                    <DropDownMenu value={this.state.value} onChange={this._handleChange}>
                        <MenuItem value={1} primaryText='Pending' />
                        <MenuItem value={2} primaryText='Accept' />
                        <MenuItem value={3} primaryText='Reject' />
                    </DropDownMenu>
                </TableRowColumn>
                <TableRowColumn>
                    <FlatButton label='SAVE' primary={true} />
                </TableRowColumn>
            </TableRow>
        ))
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