const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Create the food schema 
const FoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    calories: {
        type: Number, 
        required: true
    }, 
    fat: {
        type: Number, 
        required: true
    },
    protein: {
        type: Number, 
        required: true 
    }, 
    carbs: {
        type: Number, 
        required: true
    }, 
    hash: {
        type: number,
        required: false
    }
});

// Export the food object 
const Food = module.exports = mongoose.model('Food', FoodSchema);

// Gets the food by name 
module.exports.getFoodByName = function(name, callback) {
    const query = {
        name: name
    };
    Food.findOne(query, callback);
}

// Adds a food item to the database 
module.exports.addFood = function(newFood, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newFood.calories, salt, (err, hash) => {
            if(err) {
                throw err;
            }
            newFood.hash = hash;
            newFood.save(callback);
        });
    });
}