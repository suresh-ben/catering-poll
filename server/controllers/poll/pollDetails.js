const Poll = require('../../models/poll');

const PollUnIdentifyError = require('../../middlewares/errors/poll-unidentified-error');

const pollDetails = async(req, res) => {

    const date = new Date();
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    const formattedDate = `${date.getUTCDate()} ${date.getUTCMonth()} ${date.getUTCFullYear()}`;

    //find poll
    const poll = await Poll.findOne({ date: formattedDate });
    if (!poll) throw new PollUnIdentifyError();

    res.status(200).send({
        id: poll._id,
        date: poll.date,
        expired: poll.expired
    });
}

module.exports = pollDetails;