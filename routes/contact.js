var express = require('express');
var router = express.Router();

/**
 * List company contact information
 * Contact company for support
 * Find doctor nearby, need to verify age and zip
 */

router.get('/', function (req, res, next) {
    res.render('listUGInfo', { title: 'UrbanGro Info' });
});

router.post('/contact', function (req, res, next) {
    res.render('contact', { title: 'Grow room environment' });
});

router.get('/doctor', function (req, res, next) {
    res.render('find_doctor', { title: 'Grow room environment' });
});


module.exports = router;
