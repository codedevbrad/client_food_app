const mongoose = require('mongoose');
// schema object
const StaffSchema = new mongoose.Schema ({
  username:  { type: String } ,
  password:  { type: String } ,
  email:     { type: String }
});


module.exports = Staff = mongoose.model('staff_admins', StaffSchema );
