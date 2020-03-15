

module.exports.timeIsAcceptable = ( startHour, endHour ) => {
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
