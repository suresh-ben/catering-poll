const Vote = require('../../models/vote');

const currentPoll = require('../services/currentPoll');
const currentUser = require('../services/currentUser');

const canVote = async(req, res) => {

    const user = currentUser(req.cookies['jwt']);
    const poll = await currentPoll();

    //find vote - if already done
    const existingVote = await Vote.findOne({ user_id: user.id, poo_id: poll.id });

    let canUserVote = true;
    if (existingVote) canUserVote = false;

    res.status(200).send({
        user_id: user.id,
        canVote: canUserVote
    });
}

module.exports = canVote;