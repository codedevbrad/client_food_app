
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const passport = require('passport');
const Staff    = require('../models/staff');


exports.user_Login = ( req , res , next ) => {
    // @route  : POST user/auth
    // @dec    : authenticate user login
    // @access : public to all
    const { username , password } = req.body;

    if ( !username || !password ) {
        throw new Error(' missing username or password ');
    }

    passport.authenticate('local', ( err , user , info ) => {
          if ( err || !user ) { return res.status(500).send({ msg: 'username or password is incorrect' }) }

          req.logIn( user,  ( err ) => {
            if (err) { return res.status(500).send({ msg: 'username or password is incorrect' })  }
            res.status(200).json( user );
          });
    }) ( req , res , next );
}

exports.user_Logout = ( req , res , next ) => {
    req.logout();
    if ( req.user ) {  throw new Error('something went wrong with logging out');  }
    res.status(200).json( { logout: true} );
}

exports.user_get = ( req, res, next ) => {

    Staff.findById( { _id: req.user._id } )
      .select('-password')
       .then( user => {
         if ( !user ) { throw new Error('no user found'); }
         res.status( 200 ).json( user );
       })
       .catch( next );
}
