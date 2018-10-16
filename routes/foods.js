const express = require('express');
const router = express.Router();
const Food = require('../models/food');


// Adds a food item to the database 
router.post('/register', (req, res, next) => {
    let newFood = new Food({
        name: req.body.name,
        calories: req.body.calories, 
        fat: req.body.fat, 
        protein: req.body.protein, 
        carbs: req.body.carbs, 
    });

    Food.addFood(newFood, (err, food) => {
        if(err) {
            res.json({
                success: false, 
                msg: "We could not add the food item to the database"
            });
        } else {
            res.json({
                success: true, 
                msg: "Successfully added the food item to the database"
            });
        }
    });
});

module.exports = router;