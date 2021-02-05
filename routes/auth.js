const express = require('express');
const passport = require('passport');
const router = express.Router();

// Auth with Google
// GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google auth callback
// GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/environment')
    }
);

// Auth with Facebook
// GET /auth/facebook
router.get('/facebook', passport.authenticate('facebook'/*, { scope: ['profile'] }*/));

// Facebook auth callback
// GET /auth/facebook/callback
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/environment')
    }
);

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;
