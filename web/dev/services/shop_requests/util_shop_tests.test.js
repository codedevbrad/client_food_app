var express = require('express');
var test    = express.router();

// models.
{
	"user": {
			"order_name": "Brad lumber",
		  "order_email": "Brad_124@hotmail.co.uk",
			"order_details": "Please knock loudly" ,
			"order_at": "16:15" ,
			"order_address": "19, Anthony Road, Street, Somerset, BA16 0AE"
   } ,
   "orderUnclean" : [
	     	  {
			  	"menuItemId": "5e80c304713856055c4d4e0b" ,
	    		"quantity": "1" ,
	    		"menuSection": "5e0f3fe933071e4b04e66bb7",
	    		"sectionName" : "mains and grills"
			  },
			  {
 			  	"menuItemId": "5e18abfc2c9e832c6c49128f" ,
 	    		"quantity": "2" ,
 	    		"menuSection": "5e0f366833071e4b04e66bad" ,
 	    		"sectionName" : "starters and nibbles"
 			  }
    ]
}


// order objects for testing
var order_test_fail = null;
var order_test_fail = null;
var order_test_succ = null;

// miscellaneous helpers
const timeIsAcceptable = require('./util_misc_helpers/acceptableTime').timeIsAcceptable;
// order setup
const setupOrder = require('./util_pay_helpers/_setupOrder');
// payment helpers
const { itemsDoMatch , calculateCost , makePurchase } = require('./util_pay_helpers/_chargeCustomer');
// save order helper
const saveOrderReq = require('./util_pay_helpers/_saveOrder');

const testRoutes = require('./req_shop_controller');

const matchitemsThenSave = async ( order ) => {
			try {
          let orderdoesMatch = await itemsDoMatch ( order );
          let getOrderTotal  = await calculateCost( orderdoesMatch );
          let chargeCustomer = await makePurchase ( getOrderTotal * 100 );

          return { getOrderTotal , orderdoesMatch };
      }
      catch(err) {
          throw new Error( err );
      }
}























//
