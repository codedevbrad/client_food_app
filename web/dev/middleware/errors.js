
module.exports.errors = function( app ) {

  // error 500
  app.use( ( err , req , res , next ) => {

     console.log( 'unexpected error' , err );
     res.status( err.status || 500   );
     res.send( { msg : err.message  });
  });
}
