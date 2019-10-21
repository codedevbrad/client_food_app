// schema object...
const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema ({
     bookedName:  { type: String  , required: true } ,
     notes:       { type: String  , required: true } ,
     tableNumber: { type: Number  , required: true } ,
     tableTime:   { type: Date    , required: true }
});

module.exports = mongoose.model('incoming_tables', ReservationSchema );
