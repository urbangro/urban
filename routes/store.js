var express = require('express');
var router = express.Router();

/**
 * List products, first UG products then other companies
 * Shopping cart, add payment/save payment, make purchase
 * Auto remind when box notify sensors down or nutes low
 */

router.get('/', function (req, res, next) {
    res.render('environmentDashboard', { title: 'Grow room environment' });
});

router.get('/payment', function (req, res, next) {
    res.render('payment', { title: 'Grow room environment' });
});


router.post('/update', function (req, res, next) {
    res.render('environmentUpdate', { title: 'My Info' });
});

module.exports = store;
var express = require('express');
var router = express.Router();

/**
 * 
 * Contact company for support
 */

router.get('/', function (req, res, next) {
    res.render('listUGInfo', { title: 'UrbanGro Info' });
});

router.post('/contact', function (req, res, next) {
    res.render('contact', { title: 'Grow room environment' });
});


module.exports = router;
