const express  = require('express');
const session  = require('express-session');
const cors     = require('cors');
const passport = require('passport');
const formData = require('express-form-data');
const morgan   = require('morgan');

module.exports = {

    middleware: ( app ) => {
        // body parser middleware
        app.use( express.urlencoded({ extended: true }))
        // parse application/json
        app.use( express.json());
        app.use( cors());
        app.use( formData.parse());
        app.use( morgan('dev') );
    } ,

    authChecks: ( app ) => {
        app.use( session ({
            secret: 'a cool keyboard cat',
            cookie: { maxAge: 960000,  _expires : 500000 },
            resave: true, saveUninitialized: true, rolling: true
        }));
        app.use( passport.initialize());
        app.use( passport.session());
    }
}
