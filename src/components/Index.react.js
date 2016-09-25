// Index.react.js : Navigation bar [parent of all UI components]

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import { white } from 'material-ui/styles/colors'

// Styles
const style = {
    color: white
}

// Navigation bar
var NavigationBar = React.createClass({
    //
    handleLogout: function() {
        alert('Do not logout man!')
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
                                <FlatButton label='Login' style={style}  />
                                <FlatButton label='Signup' style={style} />
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

