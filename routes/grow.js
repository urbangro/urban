var express = require('express');
var router = express.Router();

/**
 * List suggested strain
 * Search strain
 * Show forum, searched strain first then by date
 * Ask in forum
 */

router.get('/search', function (req, res, next) {
    res.render('strain_search', { title: 'UrbanGro Info' });
});

router.post('/forum', function (req, res, next) {
});

router.post('/ask', function (req, res, next) {
});

router.post('/answer', function (req, res, next) {
});

router.post('/grow_assist', function (req, res, next) {
});

module.exports = router;
