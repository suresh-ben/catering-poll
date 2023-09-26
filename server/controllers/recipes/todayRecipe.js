const Poll = require('../../models/poll');
const Recipe = require('../../models/recipe');
const PollUnIdentifyError = require('../../middlewares/errors/poll-unidentified-error');

const todayRecipe = async(req, res) => {

    const date = new Date();
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    const formattedDate = `${date.getUTCDate()} ${date.getUTCMonth()} ${date.getUTCFullYear()}`;

    const poll = await Poll.findOne({ date: formattedDate });
    if (!poll) PollUnIdentifyError();

    const recipes = await Recipe.find({ poo_id: poll._id })
        .sort({ votes: -1 })
        .limit(1);

    res.status(200).send(recipes);
}

module.exports = todayRecipe;