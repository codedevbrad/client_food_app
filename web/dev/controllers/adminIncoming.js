
// incoming models
const Incoming_Order = require('../models/incoming/order');
const Incoming_Table = require('../models/incoming/table');

const { time , addZero } = require('../middleware/time');

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
                }).map( ( { _id , bookedName , notes , tableNumber , tableTime }) => {
                    return { bookedName , _id  , notes , tableNumber , tableTime : time( tableTime )}
                });
                res.status( 200 ).send( tables );
              })
              .catch( next );
};
