// components/Books.react.js

import AllBooks from './Books.AllBooks.react'
import BookActions from '../actions/BookActions'
import BookSearchList from './Books.Search.react'
import BookStore from '../stores/BookStore'
import Chip from 'material-ui/Chip'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left'
import MyBooks from './Books.MyBooks.react'
import MyBookTrades from './Books.MyTrades.react'
import React from 'react'
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import TradeActions from '../actions/TradeActions'
import TradeStore from '../stores/TradeStore'
import { Tab, Tabs } from 'material-ui/Tabs'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import UserActions from '../actions/UserActions'

// styles
var styles = {
    toolbar: {
        position: 'fixed',
        right: 0,
        bottom: 0,
        left: 0,
    }
}
// Fill state from Store
function getFromStore() {
    return {
        allBooks: BookStore.getAllBooks(),
        booksList: BookStore.getBooks(),
        bookTrades: TradeStore.getBookTrades(),
        msg: BookStore.getBookMsg(),
        mybooks: BookStore.getMyBooks()
    }
}

var Books = React.createClass({
    //
    _paginationCounter: 0,
    //
    getInitialState: function() {
        return getFromStore()
    },
    //
    _onChange: function() {
        this.setState(getFromStore())
    },
    //
    searchBook: function(paginationText) {
        // Handle Pagination
        var bookName = this.inpAddBook.getValue()
        if(bookName !== '') {
            if(paginationText === 'R') {
                this._paginationCounter += 41
                BookActions.getBooks(bookName, this._paginationCounter)
            } else if(this._paginationCounter !== 0 && paginationText === 'L') {
                this._paginationCounter -= 41
                BookActions.getBooks(bookName, this._paginationCounter)
            } else {
                // Normal case - First time enter
                BookActions.getBooks(bookName, 0)
            }
        }
    },
    handleKeyDown: function(event) {
        if(event.keyCode === 13) {  // on Enter
            this.searchBook()
        }
    },
    clearSearch: function() {
        // Reset Pagination Counter
        this._paginationCounter = 0
        // Clear Search
        BookActions.clearSearch()
    },
    //
    componentDidMount: function() {
        // Update Parent component Index - that User got logged in
        UserActions.getUserProfile()
        // Load Initial data
        BookActions.getAllBooks()
        BookActions.getMyBooks()
        TradeActions.getBookTrades()
        //
        this.inpAddBook.focus()
        BookStore.addChangeListener(this._onChange)
        TradeStore.addChangeListener(this._onChange)
    },
    //
    componentWillUnmount: function() {
        BookStore.removeChangeListener(this._onChange)
        TradeStore.removeChangeListener(this._onChange)
    },
    //
    render: function() {
        //
        return (
            <div>
                <Tabs>
                    <Tab label='All Books'>
                        <h3>All Books List</h3>
                        <AllBooks books={this.state.allBooks} userProfile={this.props.userProfile} />
                    </Tab>
                    <Tab label='My Books'>
                        <h3>My Books List</h3>
                        <MyBooks mybooks={this.state.mybooks} userProfile={this.props.userProfile} />
                        <Divider />
                        <br />
                        <BookSearchList books={this.state.booksList} />
                    </Tab>
                    <Tab label='Trading Status'>
                        <h3>Trading Dashboard</h3>
                        <Divider />
                        <MyBookTrades bookTrades={this.state.bookTrades} />
                    </Tab>
                </Tabs>

                <Snackbar open={this.state.msg.text === ''? false: true} message={this.state.msg.text} autoHideDuration={3000} />

                <Toolbar style={styles.toolbar}>
                    <ToolbarGroup>
                        <TextField label='My Books' hintText='Search your book..' ref={ (ref) => this.inpAddBook = ref } onKeyDown={this.handleKeyDown} />
                        <IconButton onTouchTap={this.clearSearch}>
                            <ClearIcon />
                        </IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconButton onTouchTap={ () => this.searchBook('L') } disabled={this._paginationCounter === 0 ? true: false }>
                            <LeftIcon />
                        </IconButton>
                        <IconButton onTouchTap={ () => this.searchBook('R') } disabled={this.state.booksList.length === 0 ? true: false} >
                            <RightIcon />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
})

module.exports = Books