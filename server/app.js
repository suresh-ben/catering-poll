//package imports
const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error-handler');
require('express-async-errors');

//import routes
const auth = require('./routes/auth');
const poll = require('./routes/poll');
const recipe = require('./routes/reciepe');
const vote = require('./routes/vote');
const comment = require('./routes/comment');

//inits
const app = express();
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(json());
app.use(cookieParser({
    secure: true,
    httpOnly: true
}));

//routes
app.use(auth);
app.use(poll);
app.use(recipe);
app.use(vote);
app.use(comment);

app.use(errorHandler);

module.exports = app;