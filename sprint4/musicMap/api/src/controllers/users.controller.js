import DATABASE from '../database.js';

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

    } catch (err) {

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
