
// const mongoose = require('mongoose');
// const bcrypt   = require('bcryptjs');
// const passport = require('passport');
const axios    = require('axios');

const Menus          = require('../admin_features/feature_models/order_menu');
const Incoming_Order = require('../admin_incoming/incoming_models/order').orders;
const Incoming_Table = require('../admin_incoming/incoming_models/table').tables;

const asyncHandleError = require('../../service_helpers/async_support');

const { time , addZero } = require('../../service_helpers/time');
const fakeAddresses = require('./util_order_helpers/_fakeLocations.js');

const config = require('../../../config/services.js');
const pusher = config.pusher();

// miscellaneous helpers
const timeIsAcceptable = require('./util_misc_helpers/acceptableTime').timeIsAcceptable;
// order helper
const setupOrder = require('./util_order_helpers/_setupOrder');
// payment helpers
const { itemsDoMatch , calculateCost , makePurchase } = require('./util_order_helpers/_chargeCustomer');
// save order helper
const saveOrderReq = require('./util_order_helpers/_saveOrder');

const matchitemsResult = async ( order ) => {
			try {
          let orderdoesMatch = await itemsDoMatch ( order );
          let getOrderTotal  = await calculateCost( orderdoesMatch );
          let chargeCustomer = await makePurchase ( getOrderTotal * 100 );

          return { getOrderTotal , orderdoesMatch , stripeOrder : chargeCustomer };
      }
      catch( err ) {
          throw new Error( err );
      }
}

exports.handleOrderFromShop = asyncHandleError( async( req , res , next ) => {

    const { order_name ,  order_email , order_details , order_at , order_address } = req.body.user;
    const orderUnclean = req.body.orderUnclean;

    let { orderTime , pickupTime } = setupOrder( order_at );

	  let { getOrderTotal , orderdoesMatch , stripeOrder } = await matchitemsResult( orderUnclean );

		const newOrder = new Incoming_Order( { customerName: order_name ,
																					 customerEmail : order_email ,
			                                     orderTime: orderTime ,
																					 pickupTime : pickupTime ,
																					 food : orderdoesMatch , deliveryNotes : order_details,
																					 totalCost : getOrderTotal , isSuccess : false ,
																					 location: order_address
																			 } );
		let savedOrder = await saveOrderReq( newOrder );

		// expect order is valid, is purchased by customer , order is saved to database.
		console.log( 'after 2');
    pusher.trigger('orders', 'new', { "msg": "new order" , "order": savedOrder });
    pusher.trigger('notification' , 'new' , { "msg": 'new order' });

    res.status( 200 ).send( { order : savedOrder , payment: getOrderTotal });
});

exports.populateOrderTimes = ( req , res , next ) => {
    res.status( 200 ).send( timeIsAcceptable() );
}

exports.getFoodforShop = ( req , res , next ) => {
    Menus.find()
         .sort({ posIndex: + 1 })
         .then( menus => {
               let filtered = menus.filter( each => each.sectionItems.length != 0 )
               .map( ( { _id , sectionName , sectionItems , posIndex } ) => {
                 let menuNew = sectionItems.filter( each => ( each.inStock == true && each.menuShow == true ) );
                 return { _id , sectionName , sectionItems : menuNew , posIndex };
               });
               return filtered;
         })
         .then( cleaned => res.status( 200 ).send( cleaned ))
         .catch( next );
};

exports.handleReserveFromShop = ( req , res , next ) => {
    // check reserve against available
    // reserve spot in database
    // send email confirming spot.
    const { bookedName , tableTime , tableParty } = req.body;
    var setTime = new Date();
        setTime.setHours(   tableTime.substring( 0 , 2 ) );
        setTime.setMinutes( tableTime.substring( 3 , 5 ) );

    const newReservation = new Incoming_Table( { bookedName , tableTime : setTime , tableParty } );
    newReservation.save()
        .then( booking => {
            var bookingNew = booking.toObject();
                bookingNew.tableTime = time( booking.tableTime );
            return bookingNew;
        })
        .then( newTable => {
            // reserve is complete. send to admin with pusher.
            pusher.trigger('reservations', 'new'  , { "message": "new reservation" , "obj": newTable });
            pusher.trigger('notification' , 'new' , { "msg": 'new reservation' });
            res.status( 200 ).send( newTable );
        })
       .catch( next );
};

exports.handleAddressLookup = ( req , res , next ) => {
    let { address } = req.query;
    address = address.trim() || "";
    if ( address == 'undefined' || address == "" ) {
         return next('no value for address supplied');
    }
    const address_url = 'https://ws.postcoder.com/pcw/' + process.env.addressKey + '/address/uk/' + address;
		res.status(200).send( fakeAddresses.fakeAddresses );
    // axios.get( address_url )
    //     .then(  obj => res.status( 200 ).send( obj.data ))
    //     .catch( err =>  {
    //         console.log( 'api could not get list of addresses from postcoder. check errors on their service');
    //         res.status(200).send( fakeAddresses.fakeAddresses );
    //     });
}

//
