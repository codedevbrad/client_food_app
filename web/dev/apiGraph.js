
// spa routes ( food admin )

const GraphQl  = require('express-GraphQl');
const express  = require('express');
const graphApi = express.Router();


const testMe = ( req , res , next ) => {
   console.log('hit graphql route');
   next();
}

// graphql routes
graphApi.use( '/orders' , testMe , GraphQl ({
   schema:  require('./graphql/example/schema.js') , graphiql: true
}));

graphApi.use( '/analytics' , testMe , GraphQl ({
   schema:  require('./graphql/example/schema.js') , graphiql: true
}));


module.exports = graphApi;
