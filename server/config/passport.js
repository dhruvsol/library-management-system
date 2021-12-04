const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcryptjs');

// load user model
const User = require('../models/User');
const GOOGLE_CLIENT_ID = require('../config/keys').GoogleOAuthClientID;
const GOOGLE_CLIENT_SECRET = require('../config/keys').GoogleOAuthClientSecret;

module.exports = function(passport) {
    // setting up the local strategy
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // match user
            console.log('Inside passport strategy');
            User.findOne({email: email})
                .then(user => {
                    console.log(`User: ${JSON.stringify(user)}`);
                    if (!user) {
                        return done(null, false, {message: 'That email is not registered'});
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        console.log(`Result of comparison: ${JSON.stringify(isMatch)}`)
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user, null);
                        } else {
                            return done(null, false, {message: 'The password is invalid'});
                        }
                    })
                })
                .catch(err => console.log(err));
        })
    );
    
    // setting up the google oauth2 strategy
    
    passport.use(
        new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/google/callback',
            passReqToCallback:true
        }, (request, accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        })
    );
    
    // setting up the 
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

}