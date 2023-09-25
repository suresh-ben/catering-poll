const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String, //Id of the user created this reciepe
        required: true
    },
    poo_id: {
        type: String, //Poll - to which this recipe is attached to...
        required: true
    },
    votes: {
        type: Number, //Number of votes
        default: 0
    },
    comments: [{
        type: String
    }]
});

module.exports = mongoose.model('Recipe', recipeSchema);