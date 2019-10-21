const mongoose = require('mongoose');
// schema object
const InfoSchema = new mongoose.Schema ({
  infoDetail:  { type: String } ,
  type:        { type: String } ,
  idType:      { type: String }
});

module.exports.infoDetails = mongoose.model('app_details', InfoSchema );

// type   : contact , time
// idType : email , phone , opening

const CmsSchema = new mongoose.Schema ({
  infoDetail:  { type: String } ,
  type:        { type: String } ,
  idType:      { type: String }
});

module.exports.cms = mongoose.model('app_cms_edits', CmsSchema );
