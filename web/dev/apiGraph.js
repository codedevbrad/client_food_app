
// spa routes ( food admin )

const GraphQl  = require('express-GraphQl');
const express  = require('express');
const graphApi = express.Router();

// graphql routes
graphApi.use( '/orders' , GraphQl ({
   schema:  require('./graphql/example/schema.js') , graphiql: true
}));

graphApi.use( '/reservatiomns' , GraphQl ({
   schema:  require('./graphql/example/schema.js') , graphiql: true
}));


module.exports = graphApi;
