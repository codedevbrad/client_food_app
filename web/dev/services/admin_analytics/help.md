

incoming orders and incoming tables.

we make a request to update our map and analytics of all orders and tables.

- we make a request ( first scrub )
   - find all orders and tables between start of year to today - 1 day.
   - add all these data to yearlyAnalytics.

- if we make another request
   - incoming orders and tables will be reduced. we can test again.

- make sure that if no orders or tables before now to start of year, then return and dont update.

- we can do monthly analytics against analytics year and add the top 5 monthly by ids .


/*
  @ we want to know
     the analytics count of orders and tables in a month
     how many of each item was bought in a month ( its section name also )
     how well a section did in a month
     where the orders are populated in a map.

     we,
     query the incoming orders .
       - move all orders into a new analytics schema.
       - delete orders from incoming orders except today's orders.

             // tally amount of orders between start of month and now ..
             // return all food ids between 2 dates
               // tally the amount of duplicate food items
                  // get top 5
               // find all orders for week 1 , 2 , 3 and 4 and push them into their fields.
*/
