
require('../util_misc_helpers/graphql_objs');

const Incoming_graphql_models = require('../util_misc_helpers/data_graphql_model');
const OrderType = Incoming_graphql_models.orderType;
const TableType = Incoming_graphql_models.tableType;

const ItemPointer = new GraphQLObjectType ({
    name: 'datapointeritem' ,
    fields: () => ({
        id:          { type: GraphQLString } ,
        id_to_order: { type: GraphQLString } ,
    })
});

const DataPointer  = new GraphQLObjectType ({
    name: 'datapointers' ,
    fields: () => ({
        id:             { type: GraphQLString } ,
        range_type:     { type: GraphQLString } ,
        range_pointers: [ ItemPointer ],
    })
});

module.exports.analyticsGraphTypes = new GraphQLObjectType ({
    name: 'analyticsYear' ,
    fields: () => ({
        id:            { type: GraphQLString } ,
        last_updated:  { type: GraphQLString } ,
        analytic_year: { type: GraphQLString } ,
        all_orders:    { type: new GraphQLList( OrderType ) }   ,
        all_tables:    { type: new GraphQLList( TableType ) }   ,
        top5Year:      { type: new GraphQLList( ItemPointer ) } ,
        top5Month:     { type: new GraphQLList( DataPointer ) } ,
        top5week:      { type: new GraphQLList( DataPointer ) } ,
    })
});
