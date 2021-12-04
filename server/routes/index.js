const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const roles = require('../config/roles').roles;

/**
 * show dashboard page or login page depending on authentication
 */
router.get('/', (req, res) => {
    // if user is authenticated, go to home page, else login page
    if (!req.isAuthenticated()) {
        // TODO: replace the below statement with res.redirect('/login');
        res.render('pages/auth');
        res.end('Showing login page');
    } else {
        // TODO: replace below statements with res.redirect('/dashboard');
        const requestBody = JSON.stringify(req.body);
        res.end(`Showing the home page here. Request contains ${requestBody}`);
    }
});

/**
 * show the signup page
 */
router.get('/signup', (req, res) => {
    // TODO: replace below statements with res.render('signupView');
    const requestBody = JSON.stringify(req.body);
    res.end(`Showing the signup page here. Request contains ${requestBody}`);
});

/**
 * add the user to the db
 */
router.post('/signup', (req, res) => {
    // field level validations
    errors = [];
    const {firstName, lastName, email, password, passwordConfirm, role} = req.body;
    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
        errors.push({ msg: 'All fields are mandatory. Please enter the missing values'});
    }
    if (!validateEmail(email)) {
        errors.push({ msg: 'Email id is invalid. Please enter a correctly formatted email address' });
    }
    if (password !== passwordConfirm) {
        errors.push({ msg: 'Passwords do not match'});
    }
    if (password.length < 8) {
        errors.push({ msg: 'Passwords must be of at least 8 characters'});
    }

    if (errors.length > 0) {
        // TODO: replace below statements with res.redirect('/signup');
        res.send(`Could not signup due to errors. Errors are - ${JSON.stringify(errors)}`);
    } else {
        // there are no errors in initial validation 
        User.findOne({ email: email})
            .then(user => {
                // now we need to check if this user exists in db or not
                if (user) {
                    errors.push({ msg: 'User already exists in the system.'});
                    // TODO: replace the below statements with res.redirect('/signup');
                    res.end(`Couldn't signup. Errors - ${JSON.stringify(errors)}`);
                } else {
                    // user does not exist in the system
                    const newUser = new User({firstName, lastName, email, password});
                    if (role && role !== 'admin' && role in roles) {
                        newUser.role = role;
                    } else if (role === 'admin') {
                        res.end(`Cannot create another admin account.`);
                    }
                    // hash the password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                throw new Error(err);
                            }
                            newUser.password = hash;
                            console.log('Saving the user now');
                            newUser.save()
                                .then(user => {
                                    // TODO: replace the below statement with res.redirect('/login');
                                    res.end(`User with the following details has been registered - ${newUser.firstName} ${newUser.lastName} - ${newUser.email}`);
                                })
                                .catch(err => console.log(`Error - ${err}`));
                        })
                    })
                }
            }
        );
    }
});

/**
 * method to check if email is as per format
 * @param {String} email 
 * @returns boolean whether email is validated or not
 */
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * show the login page if user is not authenticated, else go to home page
 */
router.get('/login', (req, res) => {
    // TODO: if this user is already authenticated (check auth token), then redirect to home page
    if (req.isAuthenticated()) {
        // TODO: replace the below statement with res.redirect('/dashboard');
        res.end(`User is authenticated and home page is shown`);
    } else {
        // TODO: replace the below statement with res.render('loginView');
        res.end(`User is not authenticated and login page is shown`);
    }
});

/**
 * validate the user credentials against the details present in db
 */
router.post('/login', (req, res, next) => {
    const body = JSON.stringify(req.body);
    console.log(`Request body: ${body}`);
    const email = JSON.stringify(req.body.email);
    const password = JSON.stringify(req.body.password);
    console.log(`email: ${email} password: ${password}`);
    
    let errors = [];
    // validating the values
    if (!email) {
        errors.push({ msg: 'Please enter a valid email' });
    } 
    if (!password) {
        errors.push({ msg: 'Please enter a valid password' });
    }

    if (errors.length > 0) {
        // TODO: replace below statement with res.render('loginView');
        res.end(`Errors found - ${JSON.stringify(errors)}. Routing to login page again.`);
    } else {
        console.log('About to authenticate');
        passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: '/login'
        })(req, res, next);
    }
});

/**
 * Authenticate using google account
 */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

/**
 * Callback on which the authentication token will be returned
 */
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/dashboard');
    }
); 

/**
 * Authenticate using github account
 */
router.get('/auth/github', passport.authenticate('github'));

/**
 * Callback on which the authentication token will be returned
 */
router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }), 
    (req, res) => {
        // Successful authentication
        res.redirect('/dashboard');
    }
);

router.get('/dashboard', (req, res) => {
    res.send('<h1>Dashboard</h1>');
})

module.exports = router;