const schedule = require('node-schedule');
const Poll = require('../models/poll');

const pollStartTime = 11; //11 am
const pollLifeTime = 5; //2 hrs

const schedulePolls = async() => {
    //Poll creation Time rule
    let pollCreationRule = new schedule.RecurrenceRule();
    pollCreationRule.tz = 'Asia/Kolkata';
    pollCreationRule.second = 0;
    pollCreationRule.minute = 0;
    pollCreationRule.hour = pollStartTime;

    //poll deactivate time rule
    let pollDeactiveRule = new schedule.RecurrenceRule();
    pollDeactiveRule.tz = 'Asia/Kolkata';
    pollDeactiveRule.second = 0;
    pollDeactiveRule.minute = 0;
    pollDeactiveRule.hour = pollStartTime + pollLifeTime;

    // schedule - cearate poll
    schedule.scheduleJob(pollCreationRule, async() => {

        const date = new Date();
        date.setHours(date.getHours() + 5);
        date.setMinutes(date.getMinutes() + 30);
        const formattedDate = `${date.getUTCDate()} ${date.getUTCMonth()} ${date.getUTCFullYear()}`;

        //create poll
        await Poll.create({
            date: formattedDate,
            expired: false
        });

        console.log(`Poll created at : ${formattedDate}`);
    });

    // schedule - deactivate poll
    schedule.scheduleJob(pollDeactiveRule, async() => {
        const date = new Date();
        date.setHours(date.getHours() + 5);
        date.setMinutes(date.getMinutes() + 30);
        const formattedDate = `${date.getUTCDate()} ${date.getUTCMonth()} ${date.getUTCFullYear()}`;

        //find poll
        const poll = await Poll.findOne({ date: formattedDate });
        if (!poll) return;
        poll.expired = true;
        await poll.save();

        console.log(`Poll deactivated at : ${formattedDate}`);
    });
}

module.exports = schedulePolls;