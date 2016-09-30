// Index.react.js : Navigation bar [parent of all UI components]

import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import UserActions from '../actions/UserActions'
import UserStore from '../stores/UserStore'
import { white } from 'material-ui/styles/colors'

// Styles
const style = {
    color: white
}

// UserStore
function getUserStore() {
    return {
        userProfile: UserStore.getUserProfile(),
        logoutMsg: UserStore.getLogoutMsg()
    }
}

// Navigation bar
var NavigationBar = React.createClass({
    //
    contextTypes: {
        router: React.PropTypes.object
    },
    //
    getInitialState: function() {
        return getUserStore()
    },
    //
    _onChange: function() {
        this.setState(getUserStore())
    },
    //
    handleLogout: function() {
        UserActions.logout()
    },
    //
    componentDidMount: function() {
        //
        UserActions.getUserProfile()
        UserStore.addChangeListener(this._onChange)
    },
    componentDidUpdate: function() {
        //
        if(this.state.logoutMsg.severity === 'S') {
            this.context.router.push('/')
        }
    },
    //
    componentWillUnmount: function() {
        //
        UserStore.removeChangeListener(this._onChange)
    },
    // render
    render: function() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title='book.Trade'
                        iconElementRight={
                            <div>
                                {
                                    this.state.userProfile ?
                                        <Avatar>{this.state.userProfile.username.split('')[0].toUpperCase()}</Avatar>
                                    : null
                                }
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton><MoreVertIcon /></IconButton>
                                    }
                                    targetOrigin={ { horizontal:'right', vertical: 'top' } }
                                    anchorOrigin={ { horizontal:'right', vertical: 'top' } }
                                >
                                    <MenuItem primaryText='Settings' />
                                    <MenuItem primaryText='Help' />
                                    <MenuItem primaryText='Logout' onTouchTap={this.handleLogout} />
                                </IconMenu>
                            </div>
                        }
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    {this.props.children}
                </MuiThemeProvider>
            </div>
        )
    }
})


// module exports 
module.exports = NavigationBar

