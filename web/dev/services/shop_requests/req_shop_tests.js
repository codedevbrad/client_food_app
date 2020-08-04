
const Incoming_Order = require('../admin_incoming/incoming_models/order').orders;
const Menus          = require('../admin_features/feature_models/order_menu');

// order setup
const setupOrder = require('./util_order_helpers/_setupOrder');
const { itemsDoMatch , calculateCost , makePurchase } = require('./util_order_helpers/_chargeCustomer');
const saveOrderReq   = require('./util_order_helpers/_saveOrder');
const convertAddress = require('./util_order_helpers/_convertAddress');

const order_test_helpers = require('./util_tests_helpers/generate_order_fields');
const { generateRandomTimes , timeIsAcceptable } = require('./util_misc_helpers/acceptableTime');

const asyncHandleError = require('../../service_helpers/async_support');
const { time , addZero } = require('../../service_helpers/time');
const { toJSON , daysInMonth } = require('../../service_helpers/convertDate');
const getRandomValue = require('../../service_helpers/randomValue');


// generate new month and day for order.
const pick_r_dates  = order_test_helpers.pick_dates;
// choose a random address for an order.
const pick_r_Address = order_test_helpers.generateRandomAddress;
// choose random food for order.
const pick_r_food = order_test_helpers.generateRandomFood;
// bring in random food.
const fakeAddresses = require('./util_order_helpers/_fakeLocations.js').fakeAddresses;

const getRandomFood_and_Address = async ( ) => {

		  // generate random food choice.
			let menu = await Menus.find( );

			let rando_address = pick_r_Address( fakeAddresses );
      const latLongs = await convertAddress( rando_address );

      let orderUncleanArray = [ ];
      let hashes = [ ];

      for ( let i = 0; i < Math.floor( ( Math.random( ) * 3 ) + 1 ); i++ ) {
          let item = pick_r_food( menu );

          if ( !hashes.includes( item.menuItemId ) ) {
               orderUncleanArray.push( item );
               hashes.push( item.menuItemId );
          } else {
               console.log('item existed');
          }
      }

			let objs = {
				     orderUnclean : orderUncleanArray ,
					  order_address : rando_address ,
						     latLongs : latLongs
			}
			return objs;
};

const generateTime = ( ) => {

      const orderTime = new Date();

      // January = 0 / December = 11
      let currMonth = orderTime.getMonth(); // 7 - auguest = 7 index , 8 in order/

      let rando_month = getRandomValue( 0 , 6 ); // 0 - 7
      orderTime.setFullYear( 2020 , rando_month ); // 2020 / 08

      // January = 0 / December = 11.
      // if rando_month = 1, this is febuary.
      // days total cannot take a 0 value.
      // if rando_month = 0, this is january. daysTotal needs to take 1 as january or 2 as febuary.
      let daysTotal = daysInMonth( rando_month + 1 , 2020 );

      // 1 - days in month. / total days in month.
      // if we're in august and its 02, then restrict possible dates to maximumm of todays date.
      // if in august, then possible dates are from 0 - 2.
      let chosen_date = rando_month === currMonth ? orderTime.getDate() : daysTotal;

      let rando_day = getRandomValue( 1 , chosen_date );
      orderTime.setDate( rando_day );

      // console.log( { randoMonthVal: rando_month , PickedMonth: rando_month + 1 , totalDays: daysTotal } );

      // chosing times for oderTime and pickupTime
      const pickupTime = new Date( orderTime.getTime() );

			let { orderTimeValue , pickupTimeValue } = generateRandomTimes( 8 , 22 );

			pickupTime.setHours(   pickupTimeValue.substring( 0 , 2 ) );
			pickupTime.setMinutes( pickupTimeValue.substring( 3 , 5 ) );

			orderTime.setHours( orderTimeValue.substring( 0 , 2 ) );
			orderTime.setMinutes( orderTimeValue.substring( 3 , 5 ) );


      return {
        orderTime , pickupTime
      }
}

exports.testRandomTimes = ( req , res , next ) => {
      let { orderTimeValue , pickupTimeValue } = generateRandomTimes( 8 , 13 );
      res.status( 200 ).send( { order: orderTimeValue.substring( 0 , 2 ) , pickupTimeValue } );
}


exports.testAvailableTime  = ( req , res , next ) => {
      let t = timeIsAcceptable( 15 , false );
      res.status( 200 ).send( t );
}

exports.getRandomFood_test = asyncHandleError( async( req , res , next ) => {

			const { orderUnclean , order_address , latLongs } = await getRandomFood_and_Address( );
      const { orderTime , pickupTime } = generateTime(  );

			let objs = {
                orderTime:  toJSON( orderTime ) ,
                pickupTime: toJSON( pickupTime ) ,
                orderUnclean ,
						    address : order_address ,
								latLong : latLongs
			}
			res.status( 200 ).send( objs );
});

const matchitemsResult = async ( order ) => {
			try {
          let orderdoesMatch = await itemsDoMatch ( order );
          let getOrderTotal  = await calculateCost( orderdoesMatch );
          return { getOrderTotal , orderdoesMatch };
      }
      catch(err) {
          throw new Error( err );
      }
}


exports.populateFakeOrderRequest = asyncHandleError( async( req , res , next ) => {

			const { order_name ,  order_email , order_details  } = req.body;

      const { orderUnclean , order_address , latLongs } = await getRandomFood_and_Address( );
			const { orderTime , pickupTime } = generateTime(  );

			// // match items.
			let { getOrderTotal , orderdoesMatch } = await matchitemsResult( orderUnclean );

			const newOrder = new Incoming_Order( { customerName :  order_name ,
																						 customerEmail : order_email ,
																						 orderTime :  orderTime ,
																						 pickupTime : pickupTime ,
																						 food : orderdoesMatch , deliveryNotes : order_details,
																						 totalCost : getOrderTotal , isSuccess : false ,
																						 location: order_address ,
																						 latLong: latLongs
																				 } );
			let savedOrder = await saveOrderReq( newOrder );

			res.status( 200 ).send( { order : newOrder } );
});














//
