const mongoose = require('mongoose');

// type   : contact , time
// idType : email , phone , opening

const InfoSchema = new mongoose.Schema ({
  infoDetail:  { type: String } ,
  type:        { type: String } ,
  idType:      { type: String }
});

module.exports.infoDetails = mongoose.model('app_details', InfoSchema );

// infoDetail : description of the type or content string
// belongsTo  : menu , photos , about 
// attachment : pdf string or image string

// what section does it belong to...

const CmsSchema = new mongoose.Schema ({
  infoDetail:  { type: String , required: true } ,
  attachment:  { type: String , required: true } ,
  belongsTo:   { type: String , required: true }
});

module.exports.cms = mongoose.model('app_cms_contents', CmsSchema );
