const Recipe = require('../../models/recipe');

const currentPoll = require('../services/currentPoll');

const getAllRecipes = async(req, res) => {

    const poll = await currentPoll(); //current active poll

    const recipes = await Recipe.find({ poo_id: poll.id });
    res.status(200).send(recipes);
}

module.exports = getAllRecipes;