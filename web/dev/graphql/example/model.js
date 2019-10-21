const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
// schema object
const StaffSchema = new Schema ({
  name:  { type: String } ,
  email: { type: String } ,
  age:   { type: Number }
});

module.exports = Item = mongoose.model('staff_teams', StaffSchema );
