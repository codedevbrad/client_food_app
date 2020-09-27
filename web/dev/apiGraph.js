
// spa routes ( food admin )

const GraphQl  = require('express-GraphQl');
const express  = require('express');
const graphApi = express.Router();

const testMe = ( req , res , next ) => {
   console.log('hit graphql route');
   next();
}

// graphql routes
graphApi.use( '/analytics/incoming' , GraphQl ({
     schema:   require('./services/admin_analytics/analytics_incoming/incoming_schema.js').incoming_data ,
     graphiql: true
}));

// graphApi.use( '/analytics/records' , GraphQl ({
//      schema:   require('./services/admin_analytics/analytics_records/records_schema.js').analytic_records ,
//      graphiql: true
// }));

module.exports = graphApi;
