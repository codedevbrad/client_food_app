require('../util_misc_helpers/graphql_objs');

// orders and tables models
const Analytic_year_model  = require('./records_dbs_model');
const Analytic_year_schema = require('./records_graph_model');

var dateHelpers = require('../util_misc_helpers/dateFormats');
var dateValues  = dateHelpers.returnDates;

module.exports.queryYearly = ( ) => ({

      GetTablesByYear: () => ({
        
      }),
      GetOrdersByYear: () => ({
              type: new GraphQLList( Analytic_year_schema ) ,
              async resolve ( parentValue , args ) {
                  return Analytic_year_model.find()
              }
      }) ,
      GetOrdersByMonth: ( ) => ({

      }) ,
      GetOrdersByWeek: ( ) => ({

      })
});
