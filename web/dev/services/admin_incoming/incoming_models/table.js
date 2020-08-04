// schema object...
const mongoose = require('mongoose');

const TablesSchema = new mongoose.Schema ({
     bookedName:   { type: String   , required: true } ,
     tableParty:   { type: String   , required: true } ,
     tableTime:    { type: Date     , required: true } ,
     phoneConfirm: { type: Boolean  , default: false } ,
     tableDate:    { type: Date     , default: Date.now }
});

module.exports.tables_test = TablesSchema;
module.exports.tables = mongoose.model('incoming_tables', TablesSchema );
