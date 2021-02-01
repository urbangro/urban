const dotenv = require('dotenv').config();

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const GoogleStratery = require('passport-google-oauth20').Strategy;
const FacebookStratery = require('passport-facebook').Strategy;


module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            (email, password, done) => {
                User.findOne({ email: email })
                    .then((user) => {
                        if (!user) {
                            return done(null, false, { message: 'Email already registered' });
                        }

                        bcrypt.compare(password, user.password,
                            (err, isMatch) => {
                                if (err) throw err;

                                if (!isMatch) {
                                    return done(null, false, { message: 'Password incorrect' });
                                } else {
                                    return done(null, user);
                                }
                            }
                        )
                    })
                    .catch((err) => { console.log(err); })
            }
        )
    );

    passport.use(
        new GoogleStratery(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    name: profile.displayName,
                }

                try {
                    let user = await User.findOne({ googleId: profile.id });

                    if (user) {
                        done(null, user);
                    } else {
                        user = await User.create(newUser);
                        done(null, user);
                    }

                } catch (err) {
                    console.error(err);
                }
            }
        )
    )

    passport.use(
        new FacebookStratery(
            {
                clientID: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                callbackURL: '/auth/facebook/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    facebookId: profile.id,
                    //name: profile.name,
                }

                try {
                    let user = await User.findOne({ facebookId: profile.id });

                    if (user) {
                        done(null, user);
                    } else {
                        user = await User.create(newUser);
                        done(null, user);
                    }

                } catch (err) {
                    console.error(err);
                }
            }
        )
    )

    passport.serializeUser(
        (user, done) => { done(null, user.id); }
    );

    passport.deserializeUser(
        (id, done) => {
            User.findById(id, (err, user) => { done(err, user); });
        }
    );

}