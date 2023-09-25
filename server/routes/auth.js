const express = require('express');

//middleware
const auth = require('../middlewares/auth');

//controllers   
const signUp = require('../controllers/auth/signUp');
const signIn = require('../controllers/auth/signIn');
const currentUser = require('../controllers/auth/currentUser');

//inits
const router = express.Router();

router.post('/api/users/signup', signUp);
router.post('/api/users/signin', signIn);
router.get('/api/users/current-user', auth, currentUser);

module.exports = router;