const mongoose = require('mongoose');

const { time , addZero } = require('../../../service_helpers/time');

module.exports = ( newOrder ) => {
        return newOrder.save()
            .then( orderObj => {
                  return {
                      _id : orderObj._id ,
                      customerName : orderObj.customerName ,
                      orderTime :  time( orderObj.orderTime  ) ,
                      pickupTime : time( orderObj.pickupTime ) ,
                      deliveryNotes : orderObj.deliveryNotes   ,
                      food: orderObj.food
                  }
            })
            .catch ( err => {
                 // will need to revert the save if an error persists.
                 console.log( err );
                 throw new Error( 'something went wrong when saving a new order' );
            });
}
