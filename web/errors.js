
module.exports.errors = function( app ) {

  // error 500
  app.use( ( err , req , res , next ) => {
     console.log( 'unexpected error' , err );
     res.status( err.status || 500   );
     res.send( { msg : err.message || err , portMsg : 'the app doesnt seem to be working as intended. please refresh your broweser.' });
  });
}
