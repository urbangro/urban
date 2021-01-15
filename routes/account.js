var express = require('express');
var router = express.Router();

/**
 * User info: name, phone, DOB(age verification), gender, zip
 * Marketing email preferences
 */
router.get('/accountInfo', function (req, res, next) {
    res.render('info', { title: 'My Info' });
});

router.post('/accountUpdate', function (req, res, next) {
    res.render('accountUpdate', { title: 'My Info' });
});

module.exports = router;
