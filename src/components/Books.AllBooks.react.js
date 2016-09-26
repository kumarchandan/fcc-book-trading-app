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
    handleRequestBook: function() {
        alert('clicked')
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
                                    onTouchTap={() => (this.handleRequestBook())}
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