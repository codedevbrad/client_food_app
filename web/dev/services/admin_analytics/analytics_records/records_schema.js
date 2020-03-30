require('../util_misc_helpers/graphql_objs');

const Analytic_year_query = require('./records_queries').queryYearly;

const RootAnalyticQuery = new GraphQLObjectType ({
    name: 'RootQueryType' ,
    fields: {
      GetYeardata: Analytic_year_query().GetOrdersByYear()
    }
});

module.exports.analytic_records = new GraphQLSchema ({
    query: RootAnalyticQuery
});
