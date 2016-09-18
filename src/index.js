// index.js - UI Controller

import BookAPI from './utils/BookAPI'
import Books from './components/Books.react'
import Index from './components/Index.react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

// For Overall App - onTouchTap() for onClick
injectTapEventPlugin()

// Load available books
BookAPI.getAvailBooks()

// Home Page
ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path='/' component={Index}>
                <IndexRoute component={Books} />
            </Route>
        </Router>
    ), document.getElementById('content'))