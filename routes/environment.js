var express = require('express');
var router = express.Router();

/**
 * Add box button
 * Dashboard for box summary, collapsible to swicth box if more than one box
 * Turn on/off auto control
 * Set scheduled environment control
 * Update auto control params
 * 
 */

router.get('/', function (req, res, next) {
    res.render('dashboard', { title: 'Grow room environment' });
});

router.post('/update', function (req, res, next) {
    res.render('environmentUpdate', { title: 'My Info' });
});

module.exports = router;
