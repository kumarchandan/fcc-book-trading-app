// routes/passport_auth.js

module.exports = function(app, passport) {
    // SignUp
    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, data) {
            //
            if(err) {
                return res.status(500).json(err)
            }
            if(!user) {
                return res.status(200).json(data)
            }
            //
            req.login(user, function(err) {
                if(err) return next(err)
                //
                res.status(200).json(data)
            })
        })(req, res, next)
    })
    // Login
    app.post('/login', function(req, res, next) {
        //
        passport.authenticate('local-login', function(err, user, data) {
            //
            if(err) {
                return res.status(500).json(err)
            }
            //
            if(!user) {
                return res.status(200).json(data)
            }
            // Set user in session as customized callback is used ( no failureRedirect or successRedirect)
            req.login(user, function(err) {
                if(err) return next(err)
                //
                res.status(200).json(data)
            })
        })(req, res, next)
    })
    // isLoggedIn
    app.get('/isloggedin', function(req, res, next) {
        //
        if(req.isAuthenticated()) {
            res.status(200).json({
                data: req.user
            })
        } else {
            res.status(200).json({
                data: false
            })
        }
    })
    // Logout
    app.get('/logout', function(req, res, next) {
        req.logout()
        res.redirect('/')
    })

}