// app/routes.js
module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // USER PROFILE SECTION ================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });
    // =====================================
    // Dashboard SECTION ===================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/dashboard', isLoggedIn, function (req, res) {
        res.render('dashboard.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });
    // =====================================
    // PROFILE EDIT SECTION ================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile/editprofile', isLoggedIn, function (req, res) {
        res.render('editprofile.ejs', {
            user: req.user,
            success: req.query.success
        });
    });
    // =====================================
    // ARTWORK UPLOAD SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile/submitartwork', isLoggedIn, function (req, res) {
        res.render('submitartwork.ejs', {
            user: req.user,
            success: req.query.success
        });
    });

    // =====================================
    // ARTWORK View SECTION ================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile/viewartwork', isLoggedIn, function (req, res){
        res.render('viewartwork.ejs', {
            user: req.user
        })
    });
    // =====================================
    // ARTWORK Edit SECTION ================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile/editartwork', isLoggedIn, function (req, res){
        res.render('editartwork.ejs', {
            user: req.user,
            success: req.query.success
        })
    });
    // =====================================
    // ARTIST Search SECTION ================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/search', isLoggedIn, function (req, res) {
        res.render('search.ejs');
    });
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    app.get('/search/profile/:userid', function (req, res) {
        res.render('searchprofile.ejs', {
            user : req.params.userid
        });
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}