const mongoose = require('mongoose');

// schema object
const Weekdays = new mongoose.Schema ({
  open: { type: Boolean , required: true } ,
  day:  {
      name: String ,
      openTime: String ,
      closeTime: String
   }
});

const ApiAccess = new mongoose.Schema ({
    name:        String ,
    isPublic:    Boolean ,
    link:        String  ,
    description: String
});

const AppSchema = new mongoose.Schema ({
  statusOverride: { type: Boolean , required: true } ,
  openingTimes:   [ Weekdays ] ,
  email_auth:     { type: String  , required: true } ,
  apisUsed:       [ ApiAccess ]
});

module.exports = mongoose.model('app_storedetails', AppSchema );
