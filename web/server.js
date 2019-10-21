
const express  = require('express');
const mongoose = require('mongoose');
var morgan     = require('morgan');

const app    = express();
const port   = 5000;
const server = require('http').createServer( app );

app.use( morgan('dev') );

// initialise middleware
var config = require('./config/settings.js');
    config.middleware( app , __dirname );
    config.authChecks( app , __dirname );

// connect to mblabs
mongoose
   .connect( process.env.DATABASE_ATLAS , { useNewUrlParser: true } )
   .then ( ()  => console.log('mongodb Connected'))
   .catch( err => console.log( err ));


// api's
app.use( '/api'     , require('./dev/api') );
app.use( '/graphql' , require('./dev/apiGraph'));

// error middleware
catchError = require('./dev/middleware/errors').errors( app );


server.listen( process.env.PORT || port , () => console.log('server started'));
