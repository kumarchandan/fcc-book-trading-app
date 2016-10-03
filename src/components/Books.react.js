// components/Books.react.js

import AllBooks from './Books.AllBooks.react'
import BookActions from '../actions/BookActions'
import BookSearchList from './Books.Search.react'
import BookStore from '../stores/BookStore'
import Chip from 'material-ui/Chip'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import MyBooks from './Books.MyBooks.react'
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import { Tab, Tabs } from 'material-ui/Tabs'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import UserActions from '../actions/UserActions'

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
    searchBook: function() {
        // Handle Pagination
        var bookName = this.inpAddBook.getValue()
        if(bookName !== '') {
            let sIndex = 0
            BookActions.getBooks(bookName, sIndex)
        }
    },
    handleKeyDown: function(event) {
        if(event.keyCode === 13) {  // on Enter
            this.searchBook()
        }
    },
    clearSearch: function() {
        BookActions.clearSearch()
    },
    //
    componentDidMount: function() {
        // Update Parent component Index - that User got logged in
        UserActions.getUserProfile()
        // Load Initial data
        BookActions.getAllBooks()
        BookActions.getMyBooks()
        //
        this.inpAddBook.focus()
        BookStore.addChangeListener(this._onChange)
    },
    //
    componentWillUnmount: function() {
        BookStore.removeChangeListener(this._onChange)
    },
    //
    render: function() {
        //
        return (
            <div>
                <Tabs>
                    <Tab label='All Books'>
                        <h3>All Books List</h3>
                        <AllBooks books={this.state.allBooks} />
                    </Tab>
                    <Tab label='My Books'>
                        <h3>My Books List</h3>
                        <MyBooks mybooks={this.state.mybooks} />
                        <Divider />
                        <br />
                        <BookSearchList books={this.state.booksList} />
                    </Tab>
                    <Tab label='Trading Status'>
                        <h3>Approved or Pending or Rejected</h3>
                    </Tab>
                </Tabs>
                <Snackbar open={this.state.msg === ''? false: true} message={this.state.msg} autoHideDuration={3000} />
                <Toolbar className='toolbar-bottom'>
                    <ToolbarGroup>
                        <TextField label='My Books' hintText='Search your book..' ref={ (ref) => this.inpAddBook = ref } onKeyDown={this.handleKeyDown} />
                        <IconButton onTouchTap={this.clearSearch}>
                            <ClearIcon />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
})

module.exports = Books