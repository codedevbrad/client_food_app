// schema object
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema ({
  itemName:    { type: String , required: true } ,
  quantity:    { type: Number , required: true } ,
  menuSection: { type: String , required: true } ,
  price:       { type: String , required: true } ,
  menuItemId:  { type: String , required: true } ,
  inStock:     { type: String , required: true }
});

const OrderItemSchema = new mongoose.Schema ({
   customerName : { type: String  , required: true } ,
   location:      { type: String  , required: true } ,
   orderTime :    { type: Date    , required: true } ,
   pickupTime :   { type: Date    , required: true } ,
   food:  [ ItemSchema ]  ,
   deliveryNotes: { type: String  , required: true } ,
   totalCost:     { type: String  , required: true } ,
   isSuccess:     { type: Boolean , default: false }
});

module.exports = Orders = mongoose.model('incoming_orders', OrderItemSchema );
