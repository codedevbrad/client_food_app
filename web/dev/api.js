
// spa routes ( food admin ) ...
const express  = require('express');
const api      = express.Router();

// admin auth middleware
const AdminAuthController = require('./service_checks/authcheck' );
// admin user controller
const AdminUserController = require('./services/admin_user/staff_controller' );
// admin fetching order and tables.
const AdminController_inc = require('./services/admin_incoming/req_incoming_controller');
// admin feature controller
const AdminController_fts_menu = require('./services/admin_features/feature_menu_controller');
const AdminController_fts_cms  = require('./services/admin_features/feature_cms_controller');
// shopping requests controller
const ShopController = require('./services/shop_requests/req_shop_controller');

// shop request ( getting information from api )
api.get('/client/addresslookup' , ShopController.handleAddressLookup );
api.get('/client/ordertimes'    , ShopController.populateOrderTimes );
api.get('/client/getMenu'       , ShopController.getFoodforShop )

// shop request ( posting new table or order )
api.post('/client/bookTable'  , ShopController.handleReserveFromShop );
api.post('/client/order'      , ShopController.handleOrderFromShop )

// admin staff
api.post('/staff/login' , AdminUserController.user_Login  );
api.get('/staff/logout' , AdminUserController.user_Logout );
api.get('/staff/get'    , AdminAuthController.auth , AdminUserController.user_get );

// admin ( incoming view sidebar for orders, tables )
api.get('/incoming/orders'  , AdminController_inc.incomingOrders  );
api.get('/incoming/reserve' , AdminController_inc.incomingReserve );

// admin ( menu CRUD )
api.post('/order/menu/arrange' , AdminController_fts_menu.arrangeMenu );
api.route('/order/menu/')
    .get(  AdminController_fts_menu.menuGet )
    .post( AdminController_fts_menu.menuPost );

api.route('/order/menu/alter')
   .post(   AdminController_fts_menu.menuAlter_post )
   .delete( AdminController_fts_menu.menuAlter_delete );

api.route('/order/menu/item')
    .post(  AdminController_fts_menu.menuItem_post );

api.route('/order/menu/item/alter')
    .post(   AdminController_fts_menu.menuItem_alter )
    .delete( AdminController_fts_menu.menuItem_delete );

// admin details
api.route('/app/details')
   .get(  AdminController_fts_cms.appDetails_get )
   .post( AdminController_fts_cms.appDetails_post );

api.route('/app/details/edit')
    .post(   AdminController_fts_cms.appDetails_edit )
    .delete( AdminController_fts_cms.appDetails_delete );

// admin cms
api.route('/app/cms')
   .get(    AdminController_fts_cms.appCMS_get )
   .delete( AdminController_fts_cms.appCMS_delete );

// saves to cloudinary and creates a file.
api.post('/app/cms/file' , AdminController_fts_cms.app_cloudinary_file );

// saves to cloudinary and only returns obj. no save to db.
api.route('/app/file_upload')
    .post( AdminController_fts_cms.app_cloudinary_image );


module.exports = api;
