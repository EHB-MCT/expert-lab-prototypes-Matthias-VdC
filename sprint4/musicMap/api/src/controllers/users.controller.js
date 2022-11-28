import DATABASE from '../database.js';
import bcrypt from 'bcrypt';
import exists from '../helpers/exists.js';
import verifyModel from '../helpers/verifyModel.js';
import user from '../models/user.js';

const USERCOLLECTION = DATABASE.collection('userCollection');

/*
*   GET
*/
export const getAll = async (req, res, next) => {
    try {

        console.log('getting all users');
        let all = USERCOLLECTION.find().toArray();
        res.send(all);
    } catch (err) {

    }
    next();
};

export const getSpecific = async (req, res, next) => {
    try {

        console.log('getting specific user');

    } catch (err) {

    }
    next();
};


/*
*   POST
*/
export const register = async (req, res, next) => {
    try {
        console.log('registering');
        if (!verifyModel(req.body, user)) { res.send('Model not correct'); return; }
        // if (exists(req.body, USERCOLLECTION)) { res.send('User already exists'); next(); }

        await bcrypt.genSalt(10, (err1, salt) => {
            if (err1) { res.send(err1); } else {
                bcrypt.hash(req.body.password, salt, function (err2, hash) {
                    console.log(hash);
                    if (err2) { res.send(err2); } else {
                        // Store hash in DB.
                        console.log('registering user to db');
                        return;
                    }
                });
            }
        });
    } catch (err) {
        res.send(err);
    }
    next();
};

export const login = async (req, res, next) => {
    try {

        console.log('logging in');

    } catch (err) {

    }
    next();
};
