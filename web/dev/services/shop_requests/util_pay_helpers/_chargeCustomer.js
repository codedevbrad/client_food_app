
const Menus  = require('../../admin_features/feature_models/order_menu');
const stripe = require('stripe') ( process.env.stripe_secretKey );

const findMenuQuery = async ( order , i  ) => {
    try {
        return await Menus.findOne( { _id : order[ i ].menuSection }  , { sectionItems : { $elemMatch : { _id : order[ i ].menuItemId } } } );

    } catch ( err ) {
        throw 'item from order is not a valid menu item';
    }
}

const itemsDoMatch = async( order ) => {

    return new Promise( async( resolve , reject ) => {
          var foundItems = [ ] ,
              item = { };
              for ( var i = 0; i < order.length; i++ ) {
                    console.log( 'each loop' , i );
                    item = { };
                    try { 
                        let query = await findMenuQuery(  order , i )
                                 .then( obj => {
                                       item.menuSection = obj._id;
                                       return obj.sectionItems[0];
                                 })
                                 .then( obj => {
                                      item.itemName = obj.product; item.menuItemId = obj._id; item.quantity = order[i].quantity;
                                      item.inStock  = obj.inStock; item.price = obj.price;
                                      foundItems.push( item );
                                 });
                    } catch ( err ) {
                         reject( err );
                    }
              }
              resolve( foundItems );
    });
}

const calculateCost = async( foundItems ) => {

    return new Promise( async( resolve , reject ) => {
          // all items are in stock.
          // make the order ( checking stock and calculating price )
          var totalCost = 0;

          for ( let i = 0; i < foundItems.length; i++ ) {
                 if ( !foundItems[i].inStock ) {
                      return reject('problem ordering. An item is out of stock');
                };
                totalCost = totalCost + ( parseFloat(foundItems[i].price ) * foundItems[ i ].quantity );
          }
          resolve( totalCost );
    });
}

const makePurchase  = async( totalCost ) => {
    return new Promise( async( resolve , reject ) => {
        const customer = await stripe.customers.retrieve( 'cus_GT5skX9yGdoH8K' );
        const charge   = await stripe.charges.create({ amount: totalCost , currency: 'gbp' , customer: customer.id } ,  ( err , charge ) => {
              if (err) { return reject('problem charging your account') };
              resolve( charge );
        });
    });
}



module.exports = { itemsDoMatch , calculateCost , makePurchase };

//
