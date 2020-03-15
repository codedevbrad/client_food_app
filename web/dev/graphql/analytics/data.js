const mongoose = require('mongoose');

/*
  @ we want to know
     the analytics count of orders and tables in a month
     how many of each item was bought in a month ( its section name also )
     how well a section did in a month
     where the orders are populated in a map.
*/

const AnalyticMap = new mongoose.Schema ({
  locationString:     { type: String , reuired: true  } ,
  locationCoordinate: { type: String , required: true } ,
  order_date:         { type: Date   , required: true } ,
  order_query:        { type: String , required: true }
});

/*
@ all items that are bought
*/

const AnalyticMonthly = new mongoose.Schema ({
  analytics_month: { type: Date   , required: true } ,
  orders_amount:   { type: Number , default: 0 } ,
  tables_amount:   { type: Number , default: 0 }
});


const OrdersByMonth = new mongoose.Schema ({
  analytics_month: { type: Date , required: true } ,
  each_week: [
      new mongoose.Schema ({
        sectionnName:  { type: String } ,
        itemsBought:   { type: Number }
      })
  ]
});

const OrdersTopMonthly = new mongoose.Schema ({
  analytics_month: { type: Date , required: true } ,
  allItemsBought:  [
       new mongoose.Schema ({
        itemName:    { type: String } ,
        fromSection: { type: String } ,
        dateBought:  { type: Date , required: true  }
      })
  ] ,
});



//
