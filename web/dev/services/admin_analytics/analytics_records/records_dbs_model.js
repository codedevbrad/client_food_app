const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema ({
  itemName:    { type: String , required: true } ,
  quantity:    { type: Number , required: true } ,
  menuSection: { type: String , required: true } ,
  sectionWas:  { type: String , required: true } ,
  price:       { type: String , required: true } ,
  menuItemId:  { type: String , required: true }
});

const OrderSchema = new mongoose.Schema ({
   customerName : { type: String  , required: true } ,
   customerEmail: { type: String  , required: true } ,
   location:      { type: String  , required: true } ,
   orderTime :    { type: Date    , required: true } ,
   pickupTime :   { type: Date    , required: true } ,
   food:  [ ItemSchema ]  ,
   totalCost:     { type: String  , required: true } ,
   isSuccess:     { type: Boolean , default: false }
});

const TableSchema = new mongoose.Schema ({
  bookedName:   { type: String   , required: true } ,
  tableParty:   { type: String   , required: true } ,
  tableTime:    { type: Date     , required: true } ,
  tableDate:    { type: Date     , default: Date.now }
});

const ItemPointer = new mongoose.Schema ({
  id_to_order: { type: String , required: true } ,
});

const DatePointer = new mongoose.Schema ({
    range_type:     { type: String , required: true } ,
    range_pointers: [ ItemPointer ],
});

const AnalyticsAll = new mongoose.Schema ({
  last_updated:  { type: Date   , default: Date.now } ,
  analytic_year: { type: String , required: true    } ,
  all_orders:   [ OrderSchema   ] ,
  all_tables:   [ TableSchema ] ,
  top5Year:     [ DatePointer ] ,
  top5Month:    [ DatePointer ] ,
  top5week:     [ DatePointer ]
});

module.exports.analytics_all_model_test = AnalyticsAll;
module.exports.analytics_all_model  = mongoose.model('analytics_allDatas', AnalyticsAll );
