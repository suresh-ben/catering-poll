//imports
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

//errors
const SetupError = require('./middlewares/errors/setup-error');
const DatabaseConnectionError = require('./middlewares/errors/database-connection-error');

const start = async() => {
    //check variables
    if (!process.env.APP_PORT) throw new SetupError("Unable to fetch PORT");
    if (!process.env.MONGO_URI) throw new SetupError("Unable to fetch MANO_URL");

    //setup mango
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connected to MongoDb');
    } catch (err) {
        console.log(err);
        throw new DatabaseConnectionError();
    }

    //start app
    app.listen(process.env.APP_PORT, () => {
        console.log(`server is listening at PORT: ${process.env.APP_PORT}`);
    });
}

start();