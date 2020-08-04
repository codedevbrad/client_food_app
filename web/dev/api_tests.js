
// spa routes ( food admin ) ...
const express  = require('express');
const api_test = express.Router();

const ShopController_Tests = require('./services/shop_requests/req_shop_tests');

api_test.get( '/shop/randomTimes'    , ShopController_Tests.testRandomTimes );
api_test.get( '/shop/availableTimes' , ShopController_Tests.testAvailableTime );

api_test.get(  '/shop/orderRequestFunc' , ShopController_Tests.getRandomFood_test );
api_test.post( '/shop/orderRequest'     , ShopController_Tests.populateFakeOrderRequest );

module.exports = api_test;
