const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Registers a user 
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name, 
        email: req.body.email, 
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({
                success: false, 
                msg: "Couldn't add the user to the database."
            });
        } else {
            res.json({
                success: true, 
                msg: "Successfully added the user to the database."
            })
        }
    });
});

// Authenticate the user 
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if(err) {
            throw err;
        }
        if(!user) {
            return res.json({
                success: false, 
                msg: "User was not found in the database."
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) {
                throw err;
            }

            if(isMatch) {
                // create token 
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600
                });

                return res.json({
                    success: true, 
                    token: "JWT " + token,
                    user: {
                        id: user._id, 
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({
                     success: false,
                     msg: "Incorrect password."
                 })
            }
        });
    });
});

// Grabs data on the user, protected with token authentication 
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({
        user: req.user
    });
});
module.exports = router;