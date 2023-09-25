const Poll = require('../../models/poll');

const PollUnIdentifyError = require('../../middlewares/errors/poll-unidentified-error');

const pollDetails = async(req, res) => {

    const date = new Date();
    date.setUTCHours(date.getUTCHours() + 5);
    date.setUTCMinutes(date.getUTCMinutes() + 30);
    const formattedDate = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;

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