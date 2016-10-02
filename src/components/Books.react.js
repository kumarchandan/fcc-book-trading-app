// components/Books.react.js

import AllBooks from './Books.AllBooks.react'
import BookActions from '../actions/BookActions'
import BookSearchList from './Books.Search.react'
import BookStore from '../stores/BookStore'
import Divider from 'material-ui/Divider'
import MyBooks from './Books.MyBooks.react'
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import { Tab, Tabs } from 'material-ui/Tabs'

// Fill state from Store
function getFromBookStore() {
    return {
        mybooks: BookStore.getMyBooks(),
        booksList: BookStore.getBooks(),
        allBooks: BookStore.getAllBooks(),
        msg: BookStore.getBookMsg()
    }
}

var Books = React.createClass({
    //
    getInitialState: function() {
        return getFromBookStore()
    },
    //
    _onChange: function() {
        this.setState(getFromBookStore())
    },
    //
    handleAddBook: function() {
        //
        var bookName = this.inpAddBook.getValue()
        if(bookName !== '') {
            BookActions.getBooks(bookName)
        }
    },
    handleKeyDown: function(event) {
        if(event.keyCode === 13) {  // on Enter
            this.handleAddBook()
        }
    },
    //
    componentDidMount: function() {
        // Load Initial data
        BookActions.getAllBooks()
        BookActions.getMyBooks()
        //
        this.inpAddBook.focus()
        BookStore.addListener(this._onChange)
    },
    componentWillUnmount: function() {
        BookStore.removeListener(this._onChange)
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
                        <AllBooks books={this.state.allBooks} />
                    </Tab>
                    <Tab label='My Books'>
                        <TextField label='My Books' hintText='Search your book..' ref={ (ref) => this.inpAddBook = ref } onKeyDown={this.handleKeyDown} fullWidth={true} />

                        <BookSearchList books={this.state.booksList} />
                        <h3>My Books List</h3>
                        <MyBooks mybooks={this.state.mybooks} />
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