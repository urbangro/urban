var express = require('express');
var router = express.Router();

/* GET home page. */
// If not logged in: show Login/Reg with email or OAuth2
// If logged in, redirect to dashboard/environment
router.get('/', function (req, res, next) {
    /**
     * boolean isLoggedIn
     * if !isLoggedIn
     *   render "login/reg"
     * else
     *   render dashboard
     * 
     * */

    if (req.isAuthenticated()) {
        res.redirect('environment');
    }

    res.render('index',
        {
            title: 'Register or Login using only email',
            app: 'UrbanGro',

        });
});

module.exports = router;
