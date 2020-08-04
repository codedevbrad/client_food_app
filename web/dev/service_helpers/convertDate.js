
const { time , addZero } = require('./time');


var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = [ "Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" ];

const toJSON = function( date ) {
    return {
      time :  timeNow( date ) ,
      date :  dateNow(date) ,
      month : returnMonth(date) ,
      day :   returnDay(date)
    }
}

const timeNow = function( date ) {
  var h = addZero( date.getHours());
  var m = addZero( date.getMinutes());
  var s = addZero( date.getSeconds());
  return h + ':' + m + ":" + s;
}

const dateNow = ( date ) => {
  return `${ addZero( date.getDate() )}/${ addZero( date.getMonth() + 1 ) }/${ date.getFullYear() }`;
}


const returnMonth = function( date) {
	let monthVal = date.getMonth();
  return months[ monthVal ];
}

// return week.
const returnDay = function( date ) {
	 let weekVal = date.getDay();
   return days[ weekVal ];
}

const daysInMonth = ( month , year ) => {
   return new Date(year, month, 0).getDate();
};

module.exports = {
  toJSON , daysInMonth
}
