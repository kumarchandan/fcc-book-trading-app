// components/Books.react.js

import AvailableBooks from './AvailableBooks.react'
import BookActions from '../actions/BookActions'
import BooksList from './BooksList.react'
import BookStore from '../stores/BookStore'
import Divider from 'material-ui/Divider'
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import { Tab, Tabs } from 'material-ui/Tabs'

// fill state from Store
function getFromBookStore() {
    return {
        books: BookStore.getBooks(),
        availBooks: BookStore.getAvailBooks(),
        msg: BookStore.getMsg()
    }
}

var Books = React.createClass({
    //
    getInitialState: function() {
        return getFromBookStore()
    },
    //
    onChange: function() {
        this.setState(getFromBookStore())
    },
    //
    handleAddBook: function() {
        //
        var bookName = this.inpAddBook.getValue()
        BookActions.getBooks(bookName)
    },
    handleKeyDown: function(event) {
        if(event.keyCode === 13) {  // on Enter
            this.handleAddBook()
        }
    },
    //
    componentDidMount: function() {
        //
        this.inpAddBook.focus()
        BookStore.addListener(this.onChange)
    },
    componentWillUnmount: function() {
        BookStore.removeListener(this.onChange)
    },
    //
    render: function() {
        //
        return (
            <div>
                <Tabs>
                    <Tab label='All Books'>
                        <h3>All Books List</h3>
                        <Divider />
                        <AvailableBooks books={this.state.availBooks} />
                    </Tab>
                    <Tab label='My Books'>
                        <h3>My Books List</h3>
                        <TextField label='My Books' hintText='type your book...' ref={ (ref) => this.inpAddBook = ref } onKeyDown={this.handleKeyDown} fullWidth={true} />
                        <Divider />
                        <BooksList books={this.state.books} />
                    </Tab>
                    <Tab label='Trading Status'>
                        <h3>Approved or Pending or Rejected</h3>
                    </Tab>
                </Tabs>
                <Snackbar open={this.state.msg === ''? false: true} message={this.state.msg} autoHideDuration={3000} />
            </div>
        )
    }
})

module.exports = Books