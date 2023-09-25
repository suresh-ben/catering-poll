const Recipe = require('../../models/recipe');

const currentPoll = require('../services/currentPoll');
const currentUser = require('../services/currentUser');

const createNewRecipe = async(req, res) => {

    const { name } = req.body; //recipe name

    const user = currentUser(req.cookies['jwt']);
    const poll = await currentPoll();

    const recipe = await Recipe.create({
        name: name,
        user_id: user.id,
        poo_id: poll.id
    });

    res.status(200).send(recipe);
}

module.exports = createNewRecipe;