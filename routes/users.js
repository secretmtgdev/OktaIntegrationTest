const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

// Grabs data on the user, protected with token authentication 
router.get('/profile', (req, res, next) => {
    res.send("ACCESSING A USER ACCOUNT");
});
module.exports = router;