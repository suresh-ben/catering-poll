const express = require('express');

//middlewares
const auth = require('../middlewares/auth');
const poll = require('../middlewares/poll');

//controllers 
const canVote = require('../controllers/votes/canVote');
const makeVote = require('../controllers/votes/makeVote');

//inits
const router = express.Router();

router.get('/api/vote', [auth, poll], canVote); // returns wether the user can vote or not
router.post('/api/vote', [auth, poll], makeVote); //make a vote

module.exports = router;