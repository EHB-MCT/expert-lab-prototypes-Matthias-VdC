import express from 'express';
import errorHandler from 'errorhandler';
import songCollection from './routes/songs.routes.js';
import userCollection from './routes/users.routes.js';
const app = express();
const PORT = 3000;


app.use(errorHandler({ dumpExceptions: true, showStack: true }));
// .json() & .urlencoded() needed for post and put requests
app.use(express.json());

// extended: true uses the qs library to stringify url-encoded data into objects (needed with forms)
app.use(express.urlencoded({ extended: true }));

try {

    // ROUTES
    app.use('/songcollection', songCollection);
    app.use('/user', userCollection);

    app.on('unhandledRejection', (exception) => {
        console.log(exception);
    });

    app.on('uncaughtException', (exception) => {
        console.log(exception);
    });

    app.listen(PORT, () => {
        console.log(`App started on port ${PORT}`);
    });
} catch (err) {
    console.log(err);
}

