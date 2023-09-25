const express = require('express');

const signUp = require('../controllers/auth/signUp');
const signIn = require('../controllers/auth/signIn');

//inits
const router = express.Router();

router.post('/api/users/signup', signUp);
router.post('/api/users/signin', signIn);

module.exports = router;