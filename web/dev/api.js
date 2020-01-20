
const { profiles } = require('../config/profiles');
// spa routes ( food admin )
const axios    = require('axios');
const express  = require('express');
const mongoose = require('mongoose');
const api      = express.Router();
const config   = require('../config/settings.js');

const pusher = config.pusher() ,
      stripe = require('stripe') ( process.env.stripe_secretKey );

let cloudinary = require('cloudinary') ,
     cloudKeys = config.cloudinaryConfig();
    cloudinary.config( cloudKeys );

const { time , addZero } = require('./middleware/time');

// models
const Staff    = require('./models/staff');
const Menus    = require('./models/order_menu');
const Detail   = require('./models/detail').infoDetails;
const Cms      = require('./models/detail').cms;

// incoming models
const Incoming_Order = require('./models/incoming/order');
const Incoming_Table = require('./models/incoming/table');

// controllers
const AuthController  = require('./middleware/authcheck' );
const UserController  = require('./controllers/staff' );
const ShopController  = require('./controllers/shopIncoming');
const AdminController = require('./controllers/adminIncoming');

const Tests = require( './testSuite/routeTests');

api.route('/test')
   .get ( Tests.testSuite_get )
   .post( Tests.testSuite );

// staff
api.post('/staff/login'  , UserController.user_Login  );
api.get('/staff/logout' , UserController.user_Logout );
api.get ('/staff/get'    , AuthController.auth , UserController.user_get );

//shop
api.get('/client/addresslookup' , ( req , res , next ) => {
    let { address } = req.query;
    address = address.trim() || "";
    if ( address == 'undefined' || address == "" ) {
         return next('no value for address supplied');
    }
    const address_url = 'https://ws.postcoder.com/pcw/' + process.env.addressKey + '/address/uk/' + address;
    axios.get( address_url )
        .then(  obj => res.status( 200 ).send( obj.data ))
        .catch( next );
});

api.get('/client/ordertimes' , ShopController.populateOrderTimes );
api.route('/client/order' )
   .post( ShopController.handleOrderFromShop )
   .get(  ShopController.getFoodforShop );
api.post('/client/reserve'  , ShopController.handleReserveFromShop );

// admin ( incoming order , tables / setting and editing menu )
api.get('/incoming/orders'  , AdminController.incomingOrders  );
api.get('/incoming/reserve' , AdminController.incomingReserve );



api.post('/order/menu/arrange' , async( req , res , next ) => {
          const menuPositions = req.body.menu;
          for ( i = 0; i < menuPositions.length; i++ ) {
              let updateObj = await Menus.findOneAndUpdate( { _id: menuPositions[i].sectionId } , { posIndex : menuPositions[i].posIndex } , { new : true })
                      .catch( err => { return { code: 500 , msg: 'err, something went wrong'}});
              if ( updateObj.code == 500 ) {
                 return next( updateObj.msg )
              }
          };
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
                 sectionName: section , sectionItems: [ ] , posIndex: posIndex
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

// orders determine online status and days to order..

// details

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

// cms

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
