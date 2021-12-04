const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const bcrypt = require('bcryptjs');

// load user model
const User = require('../models/User');
const keys = require('../config/keys');
const GOOGLE_CLIENT_ID = keys.GoogleOAuthClientID;
const GOOGLE_CLIENT_SECRET = keys.GoogleOAuthClientSecret;
const GITHUB_CLIENT_ID = keys.GithubOAuthClientID;
const GITHUB_CLIENT_SECRET = keys.GithubOAuthClientSecret;

module.exports = function(passport) {
    // setting up the local strategy
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // match user
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
            callbackURL: 'http://localhost:5000/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
              });
        })
    );

    // setting up the github strategy
    passport.use(
        new GitHubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/github/callback'
        }, (accessToken, refreshToken, profile, done) => {
            User.findOrCreate({ githubId: profile.id}, function (err, user) {
                return done(err, user)
            });
        }
    ));
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        console.log(JSON.stringify(User));
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

}