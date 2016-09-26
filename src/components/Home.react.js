// components/Home.react.js

import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'

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
            <div>
                <p>Trade your books like never before</p>
                <RaisedButton label='Login' primary={true} onTouchTap={this.handleLogin} />
                <RaisedButton label='SignUp' secondary={true} onTouchTap={this.handleRegister} />
            </div>
        )
    }
})



module.exports = Home