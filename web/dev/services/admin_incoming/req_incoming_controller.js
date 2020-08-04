
// incoming models
const Incoming_Order = require('./incoming_models/order').orders;
const Incoming_Table = require('./incoming_models/table').tables;

const { time } = require('../../service_helpers/time');

module.exports.incomingOrders = ( req , res , next ) => {
    var filter = req.query.filter;
    Incoming_Order
          .find()
          .sort( { [filter] : - 1 })
          .then(  array => {
              var currDate = new Date();
              var orders = array.filter( ( eachOrder ) => {
                  return eachOrder[ filter ].getDay() === currDate.getDay() &&
                         eachOrder[ filter ].getDate() === currDate.getDate();
              })
              .map( ( { _id , customerName , orderTime , pickupTime , deliveryNotes }) => {
                  return { customerName ,
                           _id  ,
                           orderTime  : time( orderTime  ) ,
                           pickupTime : time( pickupTime ) ,
                           deliveryNotes
                         }
              });
              res.status( 200 ).send( orders );
          })
          .catch( next );
};

module.exports.incomingReserve = async ( req , res , next ) => {
        var filter = req.query.filter;
        Incoming_Table
              .find( )
              .sort( { [ filter ] : - 1 })
              .then( array => {
                var currDate = new Date();
                var tables = array.filter( ( eachTable ) => {
                    return eachTable.tableTime.getDay()  === currDate.getDay() &&
                           eachTable.tableTime.getDate() === currDate.getDate();
                }).map( ( { _id , bookedName , tableTime , tableParty }) => {
                    return { bookedName , _id  , tableTime , tableParty , tableTime : time( tableTime )}
                });
                res.status( 200 ).send( tables );
              })
              .catch( next );
};
