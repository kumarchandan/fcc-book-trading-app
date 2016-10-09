// components/Home.react.js

import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'

// Styles
const styles = {
    div: {
            background: 'images/cat-book.jpg',
            backgroundSize: 'cover'
    },
    span: {
        position: 'absolute',
        textAlign: 'center',
        right: 0,
        bottom: 0,
        left: 0,
    }
}

//
var Home = React.createClass({
    //
    contextTypes: {
        router: React.PropTypes.object
    },
    //
    handleRegister: function() {
        // route to Signup page
        this.context.router.push('/signup')
    },
    //
    handleLogin: function() {
        // route to login page
        this.context.router.push('/login')
    },
    //
    render: function() {
        //
        return (
            <div style={styles.div}>
                <p>Trade your books like never before</p>
                <RaisedButton label='Login' primary={true} onTouchTap={this.handleLogin} />
                <RaisedButton label='SignUp' secondary={true} onTouchTap={this.handleRegister} />
                <span style={styles.span}><a href='https://github.com/kumarchandan/fcc-book-trading-app' target='_blank'>@github</a></span>
            </div>
        )
    }
})



module.exports = Home