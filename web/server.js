
const express  = require('express');
const mongoose = require('mongoose');
const app    = express();
const port   = 5000;
const server = require('http').createServer( app );

// initialise middleware
var config = require('./config/settings.js') ,
  services = require('./config/services.js');

    config.middleware( app , __dirname );
    config.authChecks( app , __dirname );

// connect to mblabs
mongoose.connect( process.env.DATABASE_ATLAS , { useNewUrlParser: true } )
        .then ( ()  => console.log('mongodb Connected'))
        .catch( err => console.log( err ));

// api's
app.use( '/api'     , require('./dev/api') );
app.use( '/graphql' , require('./dev/apiGraph'));

// error middleware
catchError = require('./dev/errors').errors( app );


server.listen( process.env.PORT || port , ( ) => console.log('server started'));
