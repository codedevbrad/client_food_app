
// @ analytics_incoming
// @ mongoose schema for graphql to query tables and orders data.
const Incoming_Order_db = require('../admin_incoming/incoming_models/order').orders_test;
const Incoming_Table_db = require('../admin_incoming/incoming_models/table').tables_test;

// @ analytics_records
// @ mongoose schema to query and graphql schema to structure queries.
const Analytic_year_DB_model  = require('./analytics_records/records_dbs_model').analytics_all_model_test;
const Analytic_year_QL_schema = require('./analytics_records/records_graph_model').analyticsGraphTypes;

// @ defines graphQL schema structure for saved orders and tables .
// @ sharable graphql schema for
//    - analytics_incoming tables / orders
//    - analytics_records all_tables and all_orders.

const Incoming_graphql_models = require('./util_misc_helpers/data_graphql_model');
const OrderType = Incoming_graphql_models.orderType;
const TableType = Incoming_graphql_models.tableType;

const graphSchemaTest = ( DbModel , GraphQLmodel ) => {
    // db model
    let {paths}  = DbModel;
    let pathArr  = Object.values( paths );
    let db_model = pathArr.map( ( { path , instance } ) => {
        return { path , instance }
    });

    let db_model_obj = db_model.reduce( ( result, item) => {
        var key1 = Object.values(item)[0];
        var key2 = Object.values(item)[1];
        result[key1] = key2;
        return result;
    }, {});

    // graphql model.
    let graphqlProperties = GraphQLmodel["_fields"]();
    let gQL_model = Object.values( graphqlProperties ).map( ( { type , name } ) => {
        return { name , type }
    });

    let fails = [];

    gQL_model.forEach( ( testField ) => {
        let { name , type } = testField;
        if ( testField !== 'id' || testField !== '_id' ) {
             if ( db_model_obj[name] !== undefined ) { }
             if ( db_model_obj[name] === type ) { }
        }
    });
    // defined names in graphql must be in db_model and be of same type.
    console.log( 'model:' , db_model_obj , '-------------------------------' , 'schema' , gQL_model );
}

// test that analytics_incoming correctly defines data from Incoming_Order and Incoming_Table.
let testIncoming_table = graphSchemaTest( Incoming_Table_db , TableType );
// let testIncoming_order = graphSchemaTest( Incoming_Order_db , OrderType );


//
