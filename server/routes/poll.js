const express = require('express');

//controllers   
const pollDetails = require('../controllers/poll/pollDetails');

//inits
const router = express.Router();
router.get('/api/poll', pollDetails);

module.exports = router;