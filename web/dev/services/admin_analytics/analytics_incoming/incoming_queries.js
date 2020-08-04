require('../util_misc_helpers/graphql_objs');

// orders and tables models
const Incoming_Order = require('../../admin_incoming/incoming_models/order').orders;
const Incoming_Table = require('../../admin_incoming/incoming_models/table').tables;

const Incoming_graphql_models = require('../util_misc_helpers/data_graphql_model');
const OrderType = Incoming_graphql_models.orderType;
const TableType = Incoming_graphql_models.tableType;

var dateHelpers = require('../util_misc_helpers/dateFormats');
var dateValues  = dateHelpers.returnDates;

// @ takes day / month / year as format
// @ takes year value as a number
// @ takes a conditional value2 to specify an exact date.

module.exports.queryOrders = ( ) => ({
      GetOrdersBy: ( ) => ({
              type: new GraphQLList( OrderType ) ,
              args: { format: { type: GraphQLString } , year: { type: GraphQLInt } ,  value2: { type: GraphQLInt }  },
              async resolve ( parentValue , args ) {
                  let { format , year , value2 } = args;
                  let { start , end } = dateValues( format , year , value2 );
                  return Incoming_Order
                        .find()
                        .where('orderTime').gt( start ).lt( end );
              }
      }) ,
      GetOrders: () => ({
              type: new GraphQLList( OrderType ) ,
              async resolve ( parentValue , args ) {
                  return Incoming_Order.find()
              }
      }) ,

      GetOrder: () => ({
              type: OrderType ,
              args: { id: { type: GraphQLString } },

              async resolve ( parentValue , args ) {
                  console.log( parentValue , args );
                  return Incoming_Order.findById( args.id );
              }
      })
});

module.exports.queryTables = ( ) => ({

      GetTablesBy: ( ) => ({
              type: new GraphQLList( OrderType ) ,
              args: { format: { type: GraphQLString } , year: { type: GraphQLInt } ,  value2: { type: GraphQLInt }  },
              async resolve ( parentValue , args ) {
                  let { format , year , value2 } = args;
                  let { start , end } = dateValues( format , year , value2 );
                  return Incoming_Table
                        .find()
                        .where('tableDate').gt( start ).lt( end );
              }
      }) ,
      GetTables: () => ({
              type: new GraphQLList( TableType ) ,
              async resolve ( parentValue , args ) {
                  return Incoming_Table.find()
              }
      }),
      GetTable: () => ({
              type: TableType ,
              args: { id: { type: GraphQLString } },

              async resolve ( parentValue , args ) {
                  return Incoming_Table.findById( args.id );
              }
      })
});
