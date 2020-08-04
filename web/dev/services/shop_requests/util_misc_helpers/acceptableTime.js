const getRandomValue = require('../../../service_helpers/randomValue');

const availableTimes = ( intervals , time_start , hour_end , keepTrails ) => {
    var x = intervals; //minutes interval
    var times = [ ]; // time array
    var tt = ( 60 * time_start ); // start time
    var ap = ['AM', 'PM']; // AM-PM

    //loop to increment the time and push results in array
    for ( var i = 0; tt < hour_end * 60; i++ ) {
      var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
      var mm = (tt%60); // getting minutes of the hour in 0-55 format.
      var time = times[i] = ("0" + hh ).slice(-2) + ':' + ("0" + mm).slice(-2);
      if ( keepTrails ) {
       	   time = time + ap[Math.floor(hh/12) ]
      }
      tt = tt + x;
    }
    return times;
}

const chooseTime = ( start , end ) => {
		let d = new Date();
  	let t = availableTimes( 15 , start , end , false );
    let rando = getRandomValue( 0 , t.length - 2 );
    return { picked: t[rando] , all: t.slice( rando + 1 , t.length ) }
}

module.exports.generateRandomTimes = (start , end  ) => {
      let chosen    = chooseTime( start , end );
      let pickupVal = getRandomValue( 0 , chosen.all.length - 1 );

      // console.log( pickupVal , chosen.all[ pickupVal ] );
      // console.log( chosen.all , chosen.picked );
      return obj = {
        orderTimeValue:  chosen.picked ,
        pickupTimeValue: chosen.all[ pickupVal ]
      }
}

module.exports.timeIsAcceptable = ( intervals , keepTrails ) => {
    var time_start = 8;
    var hour_end = 22;
    var x = intervals; //minutes interval
    var times = [ ]; // time array
    var tt = ( 60 * time_start ); // start time
    var ap = ['AM', 'PM']; // AM-PM
		var currTime = new Date();

    //loop to increment the time and push results in array
    for ( var i = 0; tt < hour_end * 60; i++ ) {
      var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
      var mm = ( tt % 60 ); // getting minutes of the hour in 0-55 format.

      if ( hh === time_start && ( currTime.getMinutes() + 15 <= mm ) ) {
           let time = ("0" + hh ).slice(-2) + ':' + ("0" + mm).slice(-2);
           if ( keepTrails ) {
           		time = time + ap[Math.floor(hh/12)];
           }
           times.push( time );
      }

      if ( hh === time_start + 1 && mm === 0 && currTime.getMinutes() + 15 > 60 ) {
					 // the next hour from current hour. ignore if currTime > 60. then we miss the 00 from next hour.
      }
      else if ( hh > time_start) {
           let time = ("0" + hh ).slice(-2) + ':' + ("0" + mm).slice(-2);
           if ( keepTrails ) {
           		time = time + ap[Math.floor(hh/12)];
           }
           times.push( time );
      }
      tt = tt + x;
    }
    return times;
}


module.exports.timeIsAcceptable2 = ( startHour, endHour ) => {
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
