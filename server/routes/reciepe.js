const express = require('express');

//middlewares
const auth = require('../middlewares/auth');
const poll = require('../middlewares/poll');

//controllers 
const createNewRecipe = require('../controllers/recipes/createNewRecipe');
const getAllRecipes = require('../controllers/recipes/getAllRecipes');

//inits
const router = express.Router();

router.get('/api/reciepes', getAllRecipes);
router.post('/api/reciepes/create', [auth, poll], createNewRecipe);

module.exports = router;