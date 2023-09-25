const mongoose = require('mongoose');

const Vote = require('../../models/vote');
const Recipe = require('../../models/recipe');

const currentPoll = require('../services/currentPoll');
const currentUser = require('../services/currentUser');

const UserAlreadyVoteError = require('../../middlewares/errors/user-already-vote-error');
const RecipeNotFound = require('../../middlewares/errors/recipe-not-found');

const makeVote = async(req, res) => {

    const user = currentUser(req.cookies['jwt']);
    const poll = await currentPoll();

    //find vote - if already done
    const existingVote = await Vote.findOne({ user_id: user.id, poo_id: poll.id });
    if (existingVote) throw new UserAlreadyVoteError();

    //check recipe
    const { recipe_id } = req.body;
    const recipe = await Recipe.findById(recipe_id);
    if (!recipe) throw new RecipeNotFound();

    const session = await mongoose.startSession();
    session.startTransaction();

    let vote;
    try {
        vote = await Vote.create({
            recipe_id: recipe_id,
            poo_id: poll.id,
            user_id: user.id
        });

        recipe.votes = recipe.votes + 1;
        await recipe.save();

        await session.commitTransaction();
    } catch {
        await session.abortTransaction();
    } finally {
        session.endSession();
    }

    res.status(200).send(vote);
}

module.exports = makeVote;