const Poll = require('../models/poll');

const NoActivePollError = require('./errors/no-active-poll-error');

const auth = async(req, res, next) => {

    const date = new Date();
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    const formattedDate = `${date.getUTCDate()} ${date.getUTCMonth()} ${date.getUTCFullYear()}`;

    //find poll
    const poll = await Poll.findOne({ date: formattedDate });
    if (!poll || poll.expired) throw new NoActivePollError();

    next();
}

module.exports = auth;