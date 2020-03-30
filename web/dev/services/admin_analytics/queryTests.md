{
  OrdersFrom( format : "year" , year : 2020 ) {
    id
    orderTime
  }
}

{
  allOrders {
    id
    orderTime
    food {
      itemName
      quantity
      menuSection
      sectionWas
    }
  }
}

- tally amount of orders and tables in month
{
  	allOrders {
      id
    }
  	allTables {
      id
    }
}

- top 5 orders in month
{
  	allOrders {
       food {
        	menuItemId
          itemName
        	quantity
      }
    }
}

{
  	eachOrder( id: "5e6e545c178f4f3ff4a62b89" ) {
      	id , customerName , orderTime
    }
}

{
  allOrders {
    id
    customerName
    location
    orderTime
    pickupTime
    food {
  	    id
        itemName
        quantity
        menuSection
        price
        menuItemId
    }
    deliveryNotes
    totalCost
    isSuccess
  }
}
