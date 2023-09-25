const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    user_id: {
        type: String, //whose vote
        required: true
    },
    recipe_id: {
        type: String, //whose vote
        required: true
    },
    poo_id: {
        type: String, //Poll - to which this vote is attached to...
        required: true
    }
});

module.exports = mongoose.model('Vote', voteSchema);