
module.exports = ( order_at ) => {

  		// calculte times
  		let orderTime = new Date() ,
  			 pickupTime = new Date();

  		// 15:45
  		pickupTime.setHours(   order_at.substring( 0 , 2 ) );
  		pickupTime.setMinutes( order_at.substring( 3 , 5 ) );

  		return { orderTime , pickupTime };
}
