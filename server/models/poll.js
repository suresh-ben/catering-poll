const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    date: {
        type: String, //A date string
        required: true
    },
    expired: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Poll', pollSchema);