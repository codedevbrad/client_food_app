const express  = require('express');
const path     = require('path');
const session  = require('express-session');
const cors     = require('cors');
const passport = require('passport');
const Pusher   = require('pusher');
const formData = require('express-form-data');
const morgan   = require('morgan');;

require('./passport') ( passport );

module.exports = {

    middleware: ( app ) => {
        // body parser middleware
        app.use( express.urlencoded({ extended: true }))
        // parse application/json
        app.use( express.json());
        app.use( cors());
        app.use(formData.parse());
        app.use( morgan('dev') );
    } ,

    authChecks: ( app ) => {
        app.use(session ({
            secret: 'a cool keyboard cat',
            cookie: { maxAge: 960000,  _expires : 500000 },
            resave: true, saveUninitialized: true, rolling: true
        }));
        app.use( passport.initialize());
        app.use( passport.session());
    } ,
    pusher: (  ) => {
        return new Pusher({
            appId:  process.env.pusherAppId  ,
            key:    process.env.pusherClient ,
            secret: process.env.pusherSecret ,
            cluster: 'eu',
            encrypted: true
        });
    } ,
    cloudinaryConfig: ( ) => {
        return {
            cloud_name:  process.env.cloud_name,
            api_key:     process.env.cloud_key ,
            api_secret:  process.env.cloud_secret
        };
    }
}
