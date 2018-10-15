const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const users = require('./routes/users');
const foods = require('./routes/foods');
const config = require('./config/database');

// connect to the database 
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to the following database: ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Error connecting with the database: ' + err);
});

// Enable api calls from different domains
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Allows for the parsing of data objects passed along routes
app.use(bodyParser.json());

// Describes where the root is
app.use(express.static(path.join(__dirname, 'public')));

// kicks off the server
app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});

// home page
app.get('/', (req, res) => {
    res.send("Invalid entry point here");
});

//////////////////////
/// SPECIAL ROUTES ///
//////////////////////
app.use('/users', users);
app.use('/foods', foods);