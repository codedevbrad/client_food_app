const express = require('express');

const server = require('http').createServer(app);
const port   = 4000;
const app    = express();
 
const PathController = require('/web/api');
const PayController  = require('/web/api');

// routes

const store = express();
store.get('/'     , PathController.home );
store.get('/shop' , PathController.vendor );

// vendor store

const payment = express();
payment.route('/stripe')
    .get(  PayController.home );
    .post( PayController.vendor );



// start server ...
server.listen(process.env.PORT || port, ( req, res ) => { console.log('server started');
});
