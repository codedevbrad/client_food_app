
function returnDateChosen ( chosen , value ) {
      let dateValues = new buildDate();

      switch ( chosen ) {
        case 'day':
          return dateValues.dayDate();
          break;
        case 'month':
          return dateValues.dateBetweenMonth( value );
          break;
        case 'year':
          return dateValues.dateBetweenYear();
          break;
      }
}

function buildDate ( ) {

 			this.dateBetweenMonth = function (  monthChosen ) {
          var date = new Date();
          date.setMonth( monthChosen );
          var y = date.getFullYear(), m = date.getMonth();
          var firstDay = new Date(y, m, 1);
          var lastDay  = new Date(y, m + 1, 0);

         	return { start : firstDay, end : lastDay }
      }

 			this.dayDate = function() {
      		var dateTodayStart = new Date();
              dateTodayStart.setHours( 0 ); dateTodayStart.setMinutes( 0 );
              dateTodayStart.setSeconds( 0 );
           var dateTodayEnd  = new Date();
              dateTodayEnd.setHours( 23 ); dateTodayEnd.setMinutes( 59 );
              dateTodayEnd.setSeconds( 59 );
           return { start : dateTodayStart , end : dateTodayEnd }
      }

      this.dateBetweenYear = function () {
      		var startOfYear = new Date();
          startOfYear.setFullYear( startOfYear.getFullYear() ,  0 , 1 );
          startOfYear.setHours( 0 ); startOfYear.setMinutes( 0 );  startOfYear.setSeconds( 0 );

           var toNow = new Date();
           var month = toNow.getDate() - 1;

           var nowOfYear = new Date();
               nowOfYear.setDate( month ); nowOfYear.setHours( 23 ); nowOfYear.setMinutes( 59 );
               nowOfYear.setSeconds( 59 );

           return { start : startOfYear , end : nowOfYear }
      }
 }

 module.exports.returnDates = returnDateChosen;
