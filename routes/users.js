const express = require('express');
const router = express.Router();

// Registers a user 
router.get('/register', (req, res, next) => {
    res.send("THERE IS A REGISTRATION GOING ON");
});

// Grabs data on the user, protected with token authentication 
router.get('/profile', (req, res, next) => {
    res.send("ACCESSING A USER ACCOUNT");
});
module.exports = router;