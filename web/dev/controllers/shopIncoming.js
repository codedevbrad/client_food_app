
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const passport = require('passport');
const Menus    = require('../models/order_menu');
const Incoming_Order = require('../models/incoming/order');

const config = require('../../config/settings.js');
const pusher = config.pusher();
const stripe = require('stripe') ( process.env.stripe_secretKey );

const { time , addZero } = require('../middleware/time');

const itemsDoMatch  = async( order ) => {
      var foundItems = [ ] ,
          item = { };

      return new Promise( async ( resolve , reject ) => {
          let error = false;
          for ( let i = 0; i < order.length; i++ ) {
              item = { };
              console.log('searching item');
              let query = await Menus.findOne( { _id : order[ i ].menuSection }  , { sectionItems : { $elemMatch : { _id : order[ i ].menuItemId } } } )
                       .then( obj => {
                             item.menuSection = obj._id;
                             return obj.sectionItems[0];
                       })
                       .then( obj => {
                            item.itemName = obj.product; item.menuItemId = obj._id; item.quantity = order[i].quantity;
                            item.inStock  = obj.inStock;item.price = obj.price;
                            foundItems.push( item );
                       })
                       .catch( err => {
                            error = true;
                       });
                if ( error ) break;
            }
            if ( error ) { return reject({ code: 500 , err: 'item does not exist'}) }
            resolve( foundItems );
      });
}

const calculateCost = async( foundItems ) => {

    return new Promise( async( resolve , reject ) => {
          // all items are in stock.
          // make the order ( checking stock and calculating price )
          var totalCost = 0;

          for ( let i = 0; i < foundItems.length; i++ ) {
                console.log('looping to test stock');
                 if ( !foundItems[i].inStock ) {
                      return reject({ code: 500 , err: 'problem ordering. An item is out of stock'});
                };
                totalCost = totalCost + ( parseFloat(foundItems[i].price ) * foundItems[ i ].quantity );
          }
          resolve( totalCost );
    });
}

const makePurchase  = async( totalCost ) => {
    return new Promise( async( resolve , reject ) => {
        const customer = await stripe.customers.retrieve( 'cus_GT5skX9yGdoH8K' );
        const charge   = await stripe.charges.create({ amount: totalCost , currency: 'gbp' , customer: customer.id } , function( err , charge ) {
              if (err) { return reject({ code: 500 , err: 'problem charging your account' })};
              resolve( charge );
        });
    });
}

const timeIsAcceptable = ( startHour, endHour ) => {
    const timeSlots = [ 08 , 09 , 10 , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19 , 20 , 21 , 22 ];
    const timeMinutes = [ 15 , 30 , 45 , 60 ];
    let allTimes = [ ];

    let currentTime = new Date();
    let currHours = currentTime.getUTCHours();
    let currMins  = currentTime.getUTCMinutes();

    const potential = timeSlots.filter(( each => each >= currHours ));

    var trim = timeMinutes.filter( ( item ) => item >= currMins + 15 );

    let endofcurrHour = false;

    potential.forEach( ( each , index ) => {
     				if ( index == 0 ) {
            			// if more than 1 // loop and print.
                  if ( trim.length > 1 ) {
                  			trim.forEach( ( element ) => {
                        		allTimes.push( { hour: each + ':' + element })
                        })
                  }
                  if ( trim.length <= 1 ) {
                  		endofcurrHour = true;
                  }
            } else {
                index == 1 && endofcurrHour ? null : allTimes.push( { hour: each + ':' + '00' });
                allTimes.push( { hour: each + ':' + '15' });
                allTimes.push( { hour: each + ':' + '30' });
                allTimes.push( { hour: each + ':' + '45' });
            }
    });
    return allTimes;
}

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

exports.handleOrderFromShop = async( req , res , next ) => {

    // const { customerName , deliveryNotes , dateFor } = req.body;
    // const { order_name ,  order_email , order_details , order_at } = req.body.user;
    // const orderUnclean = req.body.orderUnclean;

    // properties of orderUnclean = _id , sectionId , quantity from order.
    // let order = orderUnclean.map( ( { quantity , sectionId , _id } ) => {
    //    return { quantity , menuSection : sectionId , menuItemId : _id }
    // });

    let order = [
        { quantity: 1 , menuSection: '5e0f366833071e4b04e66bad' , menuItemId: '5e14e31dba1b8f2c70323e68' } ,
        { quantity: 1 , menuSection: '5e0f366833071e4b04e66bad' , menuItemId: '5e14e31dba1b8f2c70323e68' } ,
    ]

    // calculte times
    // let orderTime = new Date() ,  pickupTime = new Date();

    // 15:45
    // pickupTime.setHours(   order_at.substring( 0 , 2 ) );
    // pickupTime.setMinutes( order_at.substring( 3 , 5 ) );

    console.log('searching 1');
    let doMatch = await itemsDoMatch ( order ).catch( err => err );
    if ( doMatch.code == 500 ) { return next( doMatch.err )};

    console.log('searching 2');
    let getOrderTotal = await calculateCost( doMatch ).catch( err => err );
    if ( getOrderTotal.code == 500 ) return next( getOrderTotal.err );

    let chargeCustomer = await makePurchase ( getOrderTotal * 100 ).catch( err => err );
    if ( chargeCustomer.code == 500 ) return next( chargeCustomer.err );

    const newOrder = new Incoming_Order( { customerName: order_name , orderTime , pickupTime , food : orderThatMatched , deliveryNotes : order_details,
                                           totalCost : getOrderTotal , isSuccess : false
                                        } );
    var savedOrder = await newOrder.save()
        .then( orderObj => {
              return {
                  _id : orderObj._id ,  customerName : orderObj.customerName ,
                  orderTime :  time( orderObj.orderTime  ) , pickupTime : time( orderObj.pickupTime ) ,
                  deliveryNotes : orderObj.deliveryNotes   , food: orderObj.food
              }
        })
        .catch( err => { return { code: 500 , err: 'could not save order'} });

    if ( savedOrder.code == 500 ) { return next(savedOrder.err )}

    pusher.trigger('orders', 'new', { "msg": "new order" , "order": savedOrder });
    pusher.trigger('notification' , 'new' , { "msg": 'new order' });
    res.status( 200 ).send( { order : savedOrder , payment: getOrderTotal } );
};

exports.handleReserveFromShop = async ( req , res , next ) => {
    // check reserve against available
    // reserve spot in database
    // send email confirming spot.
    const { bookedName , notes , tableNumber , tableTime } = req.body;
    var setTime = new Date();
        setTime.setHours(   tableTime.substring( 0 , 2 ) );
        setTime.setMinutes( tableTime.substring( 3 , 5 ) );

    const newReservation = new Incoming_Table( { bookedName , notes , tableNumber , tableTime : setTime } );
    var newTable = await newReservation.save()
        .then( booking => {
            var bookingNew = booking.toObject();
                bookingNew.tableTime = time( booking.tableTime );
            return bookingNew;
        })
        .catch( next );

    // reserve is complete. send to admin with pusher.
    pusher.trigger('reservations', 'new'  , { "message": "new reservation" , "obj": newTable });
    pusher.trigger('notification' , 'new' , { "msg": 'new reservation' });
    res.status( 200 ).send( newTable );
};

//
