// components/Books.MyTrades.react.js

import React from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'

var MyTrades = React.createClass({
    //
    render: function() {
        //
        let bookTrades = this.props.bookTrades

        if(!bookTrades || bookTrades.length === 0) {
            return null
        }
        //
        var rows = []
        bookTrades.map( (booktrade, i) => rows.push(
            <TableRow>
                <TableRowColumn>{booktrade.email}</TableRowColumn>
                <TableRowColumn>{booktrade.incomingRequests[0].status}</TableRowColumn>
                <TableRowColumn>{booktrade.incomingRequests[0].action}</TableRowColumn>
            </TableRow>
        ))
        //
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Requester</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
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