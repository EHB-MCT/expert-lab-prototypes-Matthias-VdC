import DATABASE from '../database.js';
import verifyModel from '../helpers/verifyModel.js';
import user from '../models/user.js';
import exists from '../helpers/exists.js';
import encryptor from '../helpers/encryptor.js';

const USERCOLLECTION = DATABASE.collection('userCollection');

/*
*   GET
*/
export const getAll = async (req, res) => {
    try {

        console.log('getting all users');
        let all = await USERCOLLECTION.find().toArray();
        res.send(all);
    } catch (err) {

    }
};

export const getSpecific = async (req, res) => {
    try {

        console.log('getting specific user');

    } catch (err) {

    }
};


/*
*   POST
*/
export const register = async (req, res) => {
    try {
        let existing = await exists(req.body, USERCOLLECTION, ['username', 'email']);
        if (await verifyModel(req.body, user)) { res.send("Model not correct, all required fields aren't present!"); return; }
        if (existing) { res.send(`${existing} already exists!`); return; }

        const encryptedPassword = await encryptor(req, res, req.body.password);
        //combine objects https://stackoverflow.com/questions/9362716/how-to-duplicate-object-properties-in-another-object
        let userModel = Object.assign({ ...user }, req.body);
        userModel.password = encryptedPassword;

        await USERCOLLECTION.insertOne(userModel);
        // console.log('user registered to db', registerUser);
        res.send('User succesfully created!');
    } catch (err) {
        res.send(err);
    }
};

export const login = async (req, res) => {
    try {

        console.log('logging in');

    } catch (err) {

    }
};
