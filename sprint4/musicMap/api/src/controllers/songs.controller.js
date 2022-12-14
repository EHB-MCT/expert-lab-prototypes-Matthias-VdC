import checkSongcollectionField from '../helpers/checkSongsField.js';

import DATABASE from '../database.js';
import authenticateAccessToken from '../helpers/authenticateAccessToken.js';

const SONGCOLLECTION = DATABASE.collection('songCollection');


/*
*   GET
*/
export const getAll = (req, res, next) => {
    try {
        console.log('getting all songs');
        let all = SONGCOLLECTION.find().toArray();
        res.send(all);
    }
    catch (err) {
        res.send(err);
    }
    next();
};


/*
*   POST
*/
export const createSong = (req, res, next) => {
    try {
        console.log('trying to save song');
        if (req.body) {
            // if (checkSongcollectionField(req.body)) {
            console.log(authenticateAccessToken(req.body.token));
            if (authenticateAccessToken(req.body.token)) {
                console.log(req.body);
                let finalBody = req.body;
                let dateNow = new Date();

                finalBody.date = dateNow;
                finalBody.dateOffset = dateNow.getTimezoneOffset();

                const result = SONGCOLLECTION.insertOne(finalBody);
                res.send(`Artist, song & location has been saved succesfully! ${result}`);
            }
        }
    }
    catch (err) {
        res.send(err);
    }
    next();
};
