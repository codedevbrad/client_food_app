const mongoose = require('mongoose');

// schema object
const Weekdays = new mongoose.Schema ({
  open: { type: Boolean , required: true } ,
  day:  { type: String  , required: true }
});

const AppSchema = new mongoose.Schema ({
  storeIsOpen:   { type: Boolean , required: true } ,
  openingTimes:  [ Weekdays ] , 
  email_auth:    { type: String  , required: true }
});

module.exports.cms = mongoose.model('app_storeLocks', CmsSchema );
