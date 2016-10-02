// BooksList.react.js

import BookActions from '../actions/BookActions'
import AddIcon from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'
import React from 'react'
import Subheader from 'material-ui/Subheader'
import { GridList, GridTile } from 'material-ui/GridList'

// Styles
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    gridList: {
        width: 1024,
        height: 'auto',
        overflowY: 'auto',
        marginBottom: 24
    }
}

var BooksList = React.createClass({
    // Add Book
    handleAddBook: function(id, title, cover) {
        BookActions.addBook(id, title, cover)
    },
    //
    render: function() {
        //
        if(!this.props.books || this.props.books.length === 0) {
            return null
        }
        //
        return (
            <div style={styles.root}>
                <GridList cellHeight={250} style={styles.gridList} cols={5} padding={20}>
                    {this.props.books.map((book) => (
                        <GridTile 
                            key={book.id}
                            title={book.volumeInfo.title}
                            subtitle={<span>by {book.volumeInfo.publisher}</span>}
                            actionIcon={
                                <IconButton
                                    onTouchTap={() => (this.handleAddBook(book.id,book.volumeInfo.title, book.volumeInfo.imageLinks.thumbnail))}
                                    tooltip={book.volumeInfo.title}
                                    tooltipPosition='top-left'>
                                <AddIcon color='white' /></IconButton>
                            }
                        >
                            <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null } alt={book.volumeInfo.title} />
                        </GridTile>
                    ), this)}
                </GridList>
            </div>
        )
    }
})

module.exports = BooksList