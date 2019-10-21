

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')

var Staff = require('../dev/models/staff')

module.exports = function( passport ) {

        // local Strategy
        passport.use( new LocalStrategy( function( username , password , done ) {

                var query = { username }

                Staff.findOne( query, ( err , user ) => {

                        if( err ) { throw err  }
                        if(!user) { return done(null, false );  }

                        // match password
                        bcrypt.compare(password, user.password, function(err, isMatch) {
                              if( err)    { throw err;   }
                              if(isMatch) { return done(null, user);   }
                              else        { return done(null, false ); }
                        });
                });
        }));

        passport.serializeUser(function(user, done) { done(null, user.id);  });

        passport.deserializeUser(function(id, done) {
          Staff.findById(id, function(err, user) {  done(err, user);  });
        });

};
