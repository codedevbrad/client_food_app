
const LocalStrategy = require('passport-local').Strategy;
const Staff_model   = require('./staff_model');
const bcrypt = require('bcryptjs')


module.exports = function( passport ) {

        // local Strategy
        passport.use( new LocalStrategy( function( username , password , done ) {

                var query = { username }

                Staff_model.findOne( query, ( err , user ) => {

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
          Staff_model.findById(id, function(err, user) {  done(err, user);  });
        });

};
