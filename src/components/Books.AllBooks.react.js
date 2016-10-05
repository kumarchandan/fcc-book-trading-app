// components/AllBooks.react.js

import BookActions from '../actions/BookActions'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
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

var AllBooks = React.createClass({
    //
    handleRequestBook: function(_id, bookId, owner, holder, active) {
        // Validate
        var res = this.validate(owner, holder, active)
        if(res.isValid) { // If Available
            //
            BookActions.requestBook(_id, bookId, owner, this.props.userProfile.email)   // _id, bookId, owner, renter
        } else {
            alert(res.text)
        }
    },
    // Validate
    validate: function(owner, holder, active) {
        var message = {
            text: 'Available',
            isValid: true
        }
        // check if book belongs to this user
        if(this.props.userProfile.email === owner) {
            message.text = 'Why would you want to rent your own book! :D',
            message.isValid = false
            return message
        } else if(holder) {
            message.text = 'Sorry! This book is already rented! Contact Owner for details!',
            message.isValid = false
        } else if(!active) {
            message.text = 'Sorry! Not Available, Contact Owner for details!',
            message.isValid = false
        } else {
            return message
        }
    },
    //
    render: function() {
        //
        if(this.props.books.length === 0) {
            return null
        }
        //
        return (
            <div style={styles.root}>
                <GridList cellHeight={250} style={styles.gridList} cols={5} padding={20}>
                    {this.props.books.map((book) => (
                        <GridTile 
                            key={book._id}
                            title={book.title}
                            actionIcon={
                                <IconButton
                                    onTouchTap={() => (this.handleRequestBook(book._id, book.bookId, book.owner, book.holder, book.active))}
                                    tooltip={book.title}
                                    tooltipPosition='top-left'>
                                <FavoriteBorder color='white' /></IconButton>
                            }
                        >
                            <img src={book.cover === '' ? null : book.cover } alt={book.title} />
                        </GridTile>
                    ), this)}
                </GridList>
            </div>
        )
    }
})

module.exports = AllBooks