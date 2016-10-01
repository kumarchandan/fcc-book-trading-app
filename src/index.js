// index.js - UI Controller

import Books from './components/Books.react'
import Home from './components/Home.react'
import Index from './components/Index.react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Login from './components/Login.react'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Signup from './components/Signup.react'
import UserAPI from './utils/UserAPI'

// For Overall App - onTouchTap() for onClick
injectTapEventPlugin()

// onEnter check isLoggedIn
function isLoggedIn(nextState, replace, done) {
    //
    UserAPI.isLoggedIn(function(response) {
        if(!response) {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            })
        }
        done()
    })
}

// Home Page
ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path='/' component={Index}>
                <IndexRoute component={Home} />
                <Route path='/home' component={Home}></Route>
                <Route path='/books' component={Books} onEnter={isLoggedIn}></Route>
                <Route path='/signup' component={Signup} ></Route>
                <Route path='/login' component={Login} ></Route>
            </Route>
        </Router>
    ), document.getElementById('content'))