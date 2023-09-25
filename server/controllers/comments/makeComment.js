const mongoose = require('mongoose');
const Recipe = require('../../models/recipe');

const currentUser = require('../services/currentUser');
const currentPoll = require('../services/currentPoll');

const ChefOnlyError = require('../../middlewares/errors/chef-only-error');
const RecipeNotFound = require('../../middlewares/errors/recipe-not-found');

const makeComment = async(req, res) => {

    const { recipe_id, comment } = req.body;

    const user = currentUser(req.cookies['jwt']);
    const poll = await currentPoll();
    if (user.type !== 'chef') throw new ChefOnlyError();

    const recipe = await Recipe.findById(recipe_id);
    if (!recipe || recipe.poo_id !== poll.id.toString()) throw new RecipeNotFound();

    //add the comment
    recipe.comments.push(comment);
    await recipe.save();

    res.status(200).send(recipe);
}

module.exports = makeComment;