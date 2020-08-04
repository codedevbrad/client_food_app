
require('../util_misc_helpers/graphql_objs');

module.exports.tableType = new GraphQLObjectType ({
    name: 'tables' ,
    fields: () => ({
        id:           { type: GraphQLString  } ,
        bookedName:   { type: GraphQLString  } ,
        tableParty:   { type: GraphQLString  } ,
        tableTime:    { type: GraphQLString  } ,
        tableDate:    { type: GraphQLString  }
    })
});

const ItemType  = new GraphQLObjectType ({
    name: 'orderitem' ,
    fields: () => ({
      id:          { type: GraphQLString } ,
      itemName:    { type: GraphQLString } ,
      quantity:    { type: GraphQLInt    } ,
      menuSection: { type: GraphQLString } ,
      sectionWas:  { type: GraphQLString } ,
      price:       { type: GraphQLString } ,
      menuItemId:  { type: GraphQLString }
    })
});

module.exports.orderType = new GraphQLObjectType ({
    name: 'orders' ,
    fields: () => ({
        id:            { type: GraphQLString  } ,
        customerName : { type: GraphQLString  } ,
        customerEmail: { type: GraphQLString  } ,
        location:      { type: GraphQLString  } ,

        orderTime :    { type: GraphQLString  } ,
        pickupTime :   { type: GraphQLString  } ,
        food :         { type: new GraphQLList(ItemType) } ,

        totalCost:     { type: GraphQLString  } ,
        isSuccess:     { type: GraphQLBoolean }
    })
});
