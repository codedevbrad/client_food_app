
const express  = require('express');
const mongoose = require('mongoose');

module.exports.auth = ( req, res, next ) => {
    // if user is auth & finished > return to route
    if   ( req.isAuthenticated() && req.user ) { return next();  }
    else { throw new Error('not authenticated') }
}
