
const express  = require('express');
const mongoose = require('mongoose');

module.exports.auth = ( req, res, next ) => {
    // if user is auth & finished > return to route
    if   ( req.isAuthenticated() && req.user ) { return next();  }
    else { return res.status(500).send( {
                msg: 'not authenticated' ,
                portMsg: 'could not login to dashboard. please sign for access to admin shop' });
         }
}

// service authchecks

// ( service - admin features )

// ( service - admin shop )

// ( service - admin analytics )



// . . . 
