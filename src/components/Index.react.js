// Index.react.js : Navigation bar [parent of all UI components]

import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import { Link } from 'react-router'
import Menu from 'material-ui/Menu'
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
        drawerOpen: false
    }
}

// Navigation bar
var NavigationBar = React.createClass({
    //
    getInitialState: function() {
        return getUserStore()
    },
    //
    _onChange: function() {
        this.setState(getUserStore())
    },
    //
    _handleDrawerToggle: function() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        })
    },
    //
    _handleLogout: function() {
        window.location.href = '/logout'
    },
    //
    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange)
    },
    //
    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange)
    },
    // render
    render: function() {
        return (
            <div>
                <MuiThemeProvider>
                <div>
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
                                    iconStyle= {style}
                                >
                                    <MenuItem primaryText='Settings' onTouchTap={this._handleDrawerToggle} />
                                    <MenuItem primaryText='Help' />
                                    <MenuItem primaryText='Logout' onTouchTap={this._handleLogout} />
                                </IconMenu>
                            </div>
                        }
                        onLeftIconButtonTouchTap={this._handleDrawerToggle}
                    />
                    <Drawer open={this.state.drawerOpen} docked={false} onRequestChange={ (drawerOpen) => this.setState({drawerOpen}) }>
                        {
                            this.state.userProfile ?
                            <Menu>
                                <MenuItem>
                                    <Avatar>{this.state.userProfile.username.split('')[0].toUpperCase()}</Avatar> {this.state.userProfile.detailedInfo.displayName ? this.state.userProfile.detailedInfo.displayName : this.state.userProfile.username}
                                </MenuItem>
                                <MenuItem onTouchTap={this._handleDrawerToggle}><Link to='/profile'>Profile</Link></MenuItem>
                                <MenuItem onTouchTap={this._handleDrawerToggle}>App Settings</MenuItem>
                            </Menu>
                        : null
                        }
                    </Drawer>
                </div>
                </MuiThemeProvider>
                <MuiThemeProvider>
                    {React.cloneElement(this.props.children, { userProfile: this.state.userProfile })}
                </MuiThemeProvider>
            </div>
        )
    }
})


// module exports 
module.exports = NavigationBar

