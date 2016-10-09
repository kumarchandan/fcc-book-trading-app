// middlewares/passport.js

var LocalStrategy = require('passport-local').Strategy
var UserModel = require('../models/user')

module.exports = function(passport) {
    
    // SignUp
    passport.use('local-signup', new LocalStrategy({
        // by default, LocalStrategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true     // Pass 'request' to callback
    }, function(req, email, password, done) {
        // find if user already registered
        UserModel.findOne({ email: email }, function(err, user) {
            if(err) {
                return done(err)
            }
            //
            if(user) {  // User found
                return done(null, false, {
                    data: {
                        msg: {
                            text: 'Email already registered',
                            severity: 'E'
                        }
                    }
                })
                //
            } else {    // Create User
                //
                var user = new UserModel()
                user.username = req.body.username
                user.email = email
                user.password = password
                user.ownBooks = []
                //
                user.save(function(err, doc) {
                    if(err) throw err
                    //
                    return done(null, user, {
                        data: {
                            msg: {
                                text: 'User registered successfully',
                                severity: 'S'   // success
                            }
                        }
                    })
                })
            }
        })
    }))

    // Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        //
        UserModel.findOne({ email: email }, function(err, user) {
            //
            if(err) {
                return done(err)
            }
            //
            if(!user) {
                return done(null, false, {
                    data: {
                         msg: {
                            text: 'email not registered!',
                            severity: 'E'
                        }
                    }
                })
            }
            //
            if(!(user.password === password)) {
                return done(null, false, {
                    data: {
                         msg: {
                            text: 'wrong password pal!',
                            severity: 'E'
                        }
                    }
                })
            }
            //
            return done(null, user, {
                data: {
                    msg: {
                        text: 'Login successfully!',
                        severity: 'S'
                    }
                }
            })
        })
    }))

    // passport persistent login sessions
    // passport needs ability to serialize and deserialize user out of session
    passport.serializeUser(function(user, done) {
        done(null, user)
    })
    //
    passport.deserializeUser(function(user, done) {
        done(null, user)
    })

}