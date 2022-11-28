import checkSongcollectionField from '../helpers/checkSongsField.js';

import DATABASE from '../database.js';

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
        if (req.body) {
            if (checkSongcollectionField(req.body)) {
                console.log(req.body);
                let finalBody = req.body;
                let dateNow = new Date();

                finalBody.date = dateNow;
                finalBody.dateOffset = dateNow.getTimezoneOffset();

                const result = SONGCOLLECTION.insertOne(finalBody);
                res.send(`Artist, song & location has been saved succesfully! \n ${req.body.artist} - ${req.body.song}`);
            }
        }
    }
    catch (err) {
        res.send(err);
    }
    next();
};
