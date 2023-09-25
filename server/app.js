//package imports
const express = require('express');
const { json } = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error-handler');
require('express-async-errors');

//import routes
const auth = require('./routes/auth');

//inits
const app = express();
app.use(json());
app.use(cookieParser({
    secure: true,
    httpOnly: true
}));

//routes
app.get('/', (req, res) => {
    res.send("Hi mowa");
});
app.use(auth);

app.use(errorHandler);

module.exports = app;