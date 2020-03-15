const mongoose = require('mongoose');

// schema object
const OrderMenuItemSchema = new mongoose.Schema ({
  product:  { type: String  , required: true } ,
  price:    { type: String  , required: true } ,
  inStock:  { type: Boolean , default: true  } ,
  menuShow: { type: Boolean , default: true  } ,
  imgUrl:   { type: String  , default: 'img' }
});

const OrderMenuSchema = new mongoose.Schema ({
    sectionName:   { type: String , required: true } ,
    sectionItems:  [ OrderMenuItemSchema ] ,
    posIndex:      { type: Number  }
});

module.exports = OrderMenus = mongoose.model('order_menus', OrderMenuSchema );
