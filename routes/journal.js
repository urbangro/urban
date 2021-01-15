var express = require('express');
var router = express.Router();

/**
 * View journal
 * Start a new journal
 * Edit journal of specific day, default today
 * Set 
 */

router.get('/journalList', function (req, res, next) {
    res.render('journallist', { title: 'My Info' });
});


router.post('/edit/:date', function (req, res, next) {
    
});

module.exports = router;
