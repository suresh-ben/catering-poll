const express = require('express');

//controllers   
const makeComment = require('../controllers/comments/makeComment');

//inits
const router = express.Router();
router.post('/api/comment', makeComment);

module.exports = router;