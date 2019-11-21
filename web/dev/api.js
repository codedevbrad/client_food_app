
const { profiles } = require('../config/profiles');
// spa routes ( food admin )
const bcrypt   = require('bcryptjs');
const express  = require('express');
const passport = require('passport');
const fs       = require('fs');
const api      = express.Router();

const pusher = require('../config/settings.js').pusher();
const stripe = require('stripe') ( process.env.stripe_secretKey );
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name:  process.env.cloud_name,
    api_key:     process.env.cloud_key ,
    api_secret:  process.env.cloud_secret
});

// models
const Staff    = require('./models/staff');
const Menus    = require('./models/order_menu');
const Detail   = require('./models/detail').infoDetails;
const Cms      = require('./models/detail').cms;

// incoming
const Incoming_Order = require('./models/incoming/order');
const Incoming_Table = require('./models/incoming/table');

// middleware
const AuthController = require('./middleware/authcheck' );
const UserController = require('./controllers/staff' );

// staff
api.post('/staff/login'  , UserController.user_Login  );
api.post('/staff/logout' , UserController.user_Logout );
api.get ('/staff/get'    , AuthController.auth , UserController.user_get );

function addZero(i) { if (i < 10) { i = "0" + i; } return i; }

function time( time ) {
  var d = time;
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  return h + ':' + m;
};

const genderIdentify = async( profileName ) => {
     return await fetch('https://api.genderize.io/?name='+ profileName.split(" ")[0])
          .then( res => res.json())
          .then( obj => {
               var options = profiles.filter( ( each ) => {
                   return each.gender.trim() == obj.gender.trim();
               });
               var chosen = options[ Math.floor(Math.random() * options.length )];
               return chosen.profile;
          })
          .catch( err => console.log( err));
 }

api.get('/customer/collect/get' , ( req , res , next ) => {
    var filter = req.query.filter;
    Incoming_Order
          .find()
          .sort( { [filter] : - 1 })
          .then(  array => {
              var currDate = new Date();
              var orders = array.filter( ( eachOrder ) => {
                  return eachOrder[ filter ].getDay() === currDate.getDay() &&
                         eachOrder[ filter ].getDate() === currDate.getDate();
              })
              .map( ( { _id , customerName , orderTime , pickupTime , deliveryNotes }) => {
                  return { customerName ,
                           _id  ,
                           orderTime  : time( orderTime  ) ,
                           pickupTime : time( pickupTime ) ,
                           deliveryNotes
                         }
              });
              res.status( 200 ).send( orders );
          })
          .catch( next );
});

api.post('/customer/collect' , async( req , res , next ) => {

    // date = 15:45 [ string ];
    const { customerName , deliveryNotes , date } = req.body;
    const order = [
      { quantity : 3 , menuSection : '5d8ded234aa5502eb8874a3c' , menuItemId : '5d8ded644aa5502eb8874a3f' } ,
      { quantity : 1 , menuSection : '5d8ded314aa5502eb8874a3d' , menuItemId : '5da33b8836c9be2a684b0154' } ,
      { quantity : 1 , menuSection : '5d8ded234aa5502eb8874a3c' , menuItemId : '5da303bbac830737f8fb7a1d' }
    ];

    var foundItems = [ ] ,
        item = { };
    for ( let i = 0; i < order.length; i++ ) {
        item = { };
        var query = await Menus.findOne( { _id : order[ i ].menuSection }  , { sectionItems : { $elemMatch : { _id : order[ i ].menuItemId } } } )
                 .then( obj => {
                       item.menuSection = obj._id;
                       return obj.sectionItems[0];
                 })
                 .then( obj => {
                      item.itemName = obj.product; item.menuItemId = obj._id; item.quantity = order[i].quantity;
                      item.inStock  = obj.inStock;item.price = obj.price;
                      foundItems.push( item );
                 })
                 .catch( next );
    }
    // res.status( 200 ).send( foundItems );
    // make the order ( checking stock and calculating price )
    var totalCost = 0 ,
       orderTime  = new Date();
       pickupTime = new Date();
       pickupTime.setHours(   date.substring( 0 , 2 ) );
       pickupTime.setMinutes( date.substring( 3 , 5 ) );

    for ( let i = 0; i < foundItems.length; i++ ) {
           if ( !foundItems[i].inStock ) { throw new Error('problem ordering. An item is out of stock')}
           totalCost = totalCost + ( parseFloat(foundItems[i].price ) * foundItems[ i ].quantity );
    }

    const newOrder = new Incoming_Order( { customerName , orderTime , pickupTime , food : foundItems , deliveryNotes ,
                                           totalCost , isSuccess : false
                                       } );
    var savedOrder = await newOrder.save()
        .then( orderObj => {
              return {
                  _id : orderObj._id , customerName : orderObj.customerName     ,
                  orderTime :  time( orderObj.orderTime  ) ,
                  pickupTime : time( orderObj.pickupTime ) , deliveryNotes : orderObj.deliveryNotes
              }
        })
        .catch( next );

    pusher.trigger('orders', 'new', { "msg": "new order" , "order": savedOrder });
    pusher.trigger('notification' , 'new' , { "msg": 'new order' });
    res.status( 200 ).send( savedOrder );

    // const body = { amount: 400 , currency: 'gbp', description: "Lauren B." , source: "fhtj655lwd", };
    //
    // stripe.charges.create( body , ( ( response ) => ( err , success ) => {
    //         if ( err ) { res.status(500).send({ error : err }); }
    //
    //         if ( success ) {
    //             req.status(200).send( { success : true });
    //         }
    // }) () );
});

api.route('/customer/reserve')
    .get( async ( req , res , next ) => {
        var filter = req.query.filter;
        Incoming_Table
              .find( )
              .sort( { [ filter ] : - 1 })
              .then( array => {
                var currDate = new Date();
                var tables = array.filter( ( eachTable ) => {
                    return eachTable.tableTime.getDay()  === currDate.getDay() &&
                           eachTable.tableTime.getDate() === currDate.getDate();
                }).map( ( { _id , bookedName , notes , tableNumber , tableTime }) => {
                    return { bookedName , _id  , notes , tableNumber , tableTime : time( tableTime )}
                });
                res.status( 200 ).send( tables );
              })
              .catch( next );
    })
    .post( async ( req , res , next ) => {
        // check reserve against available
        // reserve spot in database
        // send email confirming spot.
        const { bookedName , notes , tableNumber , tableTime } = req.body;
        var setTime = new Date();
            setTime.setHours(   tableTime.substring( 0 , 2 ) );
            setTime.setMinutes( tableTime.substring( 3 , 5 ) );

        const newReservation = new Incoming_Table( { bookedName , notes , tableNumber , tableTime : setTime } );
        var newTable = await newReservation.save()
            .then( booking => {
                var bookingNew = booking.toObject();
                    bookingNew.tableTime = time( booking.tableTime );
                return bookingNew;
            })
            .catch( next );

        // false pusher update.
        pusher.trigger('reservations', 'new', { "message": "new reservation" , "obj": newTable });
        pusher.trigger('notification' , 'new' , { "msg": 'new reservation' });
        res.status( 200 ).send( newTable );
    });

api.post('/order/menu/arrange' , async( req , res , next ) => {
    const menuPositions = req.body.menu;
          menuPositions.forEach( async ( each ) => {
              await Menus.findOneAndUpdate( { _id: each.sectionId } , { posIndex : each.posIndex } , { new : true })
                  .catch( next )
          });
          res.status( 200 ).send( 'success' );
});

api.route('/order/menu/')
    .get( ( req , res , next ) => {
          Menus.find()
               .sort({ posIndex: + 1 })
               .then( menus => res.status( 200 ).send( menus ))
               .catch( next );
    })
    .post( ( req , res , next ) => {
           const { section , posIndex } = req.body;
           console.log( posIndex );
           if ( section === undefined || posIndex === undefined ) { throw new Error('error with request') };

           // res.status(200).send('success');
           const newMenu = new Menus({
                 sectionName   : section ,
                 sectionItems  : [ ] ,
                 posIndex      : posIndex
           });
           newMenu.save( )
                  .then( menu => res.status( 200 ).send( menu ) )
                  .catch( next );
    });

api.route('/order/menu/alter')
   .post( ( req , res , next ) => {
        const id = req.query.id;
        const { value } = req.body;
        Menus.findOneAndUpdate( { _id : id }, { sectionName : value } , { new : true })
              .then(  menu => res.status( 200 ).send( menu ))
              .catch( next );
   })
   .delete( ( req , res , next ) => {
        const id = req.query.id;
        Menus.findOneAndRemove( { _id : id })
             .then(  menu => res.status( 200 ).send( menu ))
             .catch( next );
   });

api.route('/order/menu/item')
    .post( ( req , res , next ) => {
         const id = req.query.id;
         const { product , price , imgUrl } = req.body;
         const newItem = { product , price , inStock : true , menuShow : true , imgUrl };
         // add a new id value to the item for tracing...
         Menus.findOneAndUpdate( { _id : id } , { $push: { sectionItems : newItem } } , { new : true } )
              .then( menu => res.status( 200 ).send( newItem ))
              .catch( next );
    });

api.route('/order/menu/item/alter')
    .post( ( req , res , next ) => {

        const { sectionId , itemId } = req.query;
        const obj = { product , price , inStock , menuShow , imgUrl } = req.body;

        Menus.findOneAndUpdate( { "sectionItems._id" : itemId } , { "$set" : { "sectionItems.$" : obj }} , { new : true } )
              .then( array => res.status( 200 ).send( array ))
              .catch( next );
    })
    .delete( ( req , res , next ) => {

        const { sectionId , itemId } = req.query;
        Menus.findOneAndUpdate( { "sectionItems._id" : itemId } , { "$pull" : { sectionItems : { _id : itemId } }} , { new : true } )
              .then( array => res.status( 200 ).send( array ))
              .catch( next );
    });

api.route('/app/details')
   .get( ( req , res , next ) => {
       Detail.find( { type : req.query.type } )
             .then( detail => res.status( 200 ).send( detail ))
             .catch( next );
   })
   .post( ( req , res , next ) => {
       const { infoDetail , type , idType } = req.body;
       const newDetail = new Detail( { infoDetail , type , idType } );
       newDetail.save( )
                .then(  detail => res.status( 200 ).send( detail ) )
                .catch( next );
   });

api.route('/app/details/edit')
    .post( ( req , res , next ) => {
        Detail.findOneAndUpdate( { _id : req.query.id } , { infoDetail : req.body.string } , { new : true } )
             .then( detail => res.status( 200 ).send( detail ))
             .catch( next );
    })
    .delete( ( req , res , next ) => {
        const id = req.query.id;
        Detail.findOneAndRemove( { _id : id })
             .then(    id => res.status( 200 ).send( id ))
             .catch( next );
    });

api.route('/app/cms')
   .get( ( req , res , next ) => {
        // what to search and what filter to add.
        const { belongsTo } = req.query;
        Cms.find( { belongsTo } )
           .then( array => res.status(200).send(array ))
           .catch( next );
   })
   .delete( ( req , res , next ) => {
        const { id } = req.query;
        Cms.findOneAndRemove( { _id : id })
          .then( arr => res.status( 200 ).send( arr ))
          .catch( next );
   });

api.post('/app/cms/json' , ( req , res , next ) => {
      const { belongsTo } = req.query;
      const { content } = req.body;
      // infodetail = content
      // belongsTo  = about /
      // attachment = 'no needed value'.
});

api.post('/app/cms/file' , async ( req , res , next ) => {
       const { belongsTo } = req.query;
           // infodetail = description
           // belongsTo  = menu , photo
           // attachment = pdf or image string
       const values = Object.values( req.files ) ,
             upload = values.map( image => cloudinary.uploader.upload( image.path ));

      let uploadRes = await Promise.all( upload )
                                   .catch( next );
       const cmsObj = new Cms( { infoDetail : 'placehold_change' , belongsTo , attachment : uploadRes[0].url } );
             cmsObj.save()
                .then( fileObj => res.status( 200 ).send( fileObj ))
                .catch( next );
});

// saves to cloudinary and only returns obj. no save to db.
api.route('/app/file_upload')
    .post( ( req , res , next ) => {
        const { sectionId , itemId } = req.query;
        const values = Object.values( req.files );
        const upload = values.map( image => cloudinary.uploader.upload( image.path ));
        Promise.all( upload )
               .then( image => { res.status( 200 ).send( image[0].url )})
               .catch( next );
    });


module.exports = api;
