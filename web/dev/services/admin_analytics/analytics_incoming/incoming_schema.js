
require('../util_misc_helpers/graphql_objs');

const TableQueries  = require('./incoming_queries').queryTables;
const OrderQueries  = require('./incoming_queries').queryOrders;

const RootIncomingQuery = new GraphQLObjectType ({
    name: 'RootQueryType' ,
    fields: {
      eachOrder:  OrderQueries().GetOrder()  ,
      allOrders:  OrderQueries().GetOrders() ,
      OrdersFrom: OrderQueries().GetOrdersBy() ,
      eachTable:  TableQueries().GetTable()  ,
      allTables:  TableQueries().GetTables() ,
      TablesFrom: TableQueries().GetTablesBy()
    }
});

module.exports.incoming_data = new GraphQLSchema ({
    query: RootIncomingQuery
});
