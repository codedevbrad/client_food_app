// schema object...
const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema ({
     bookedName:   { type: String   , required: true } ,
     tableParty:   { type: String   , required: true } ,
     tableTime:    { type: Date     , required: true } ,
     phoneConfirm: { type: Boolean  , default: false } ,
     tableDate:    { type: Date     , default: Date.now }
});

module.exports = mongoose.model('incoming_tables', ReservationSchema );
