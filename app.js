// app.js

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport')
var session = require('express-session')
//
var socket = require('socket.io')
//
var mongoURL = require('./config/keys').db.mongoURL
var mongoose = require('mongoose')
// Connect to MongoDB
mongoose.connect(mongoURL)

// Express
var app = express();
// socket
var io = socket()
app.io = io
// passport setup
require('./middlewares/passport')(passport)

// routes
var api = require('./routes/api')
var index = require('./routes/index')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware used
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'arduino123',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())     // OR app.use(passport.authenticate('session'))

// handle cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// routes path
app.use('/', index)
app.use('/api', api)
// authenticate routes
require('./routes/passport_auth')(app, passport)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
