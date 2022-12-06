import DATABASE from '../database.js';
import verifyModel from '../helpers/verifyModel.js';
import user from '../models/user.js';
import exists from '../helpers/exists.js';
import encryptor from '../helpers/encryptor.js';
import generateAccessToken from '../helpers/generateAccessToken.js';
import verifyPassword from '../helpers/verifyPassword.js';

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
        if (await verifyModel(req.body, user)) { return res.send({ error: "Model not correct, all required fields aren't present!", code: 400 }); }
        if (existing) { return res.send({ error: `${existing} already exists!`, code: 403 }); }

        const encryptedPassword = await encryptor(req, res, req.body.password);
        //combine objects https://stackoverflow.com/questions/9362716/how-to-duplicate-object-properties-in-another-object
        let userModel = Object.assign({ ...user }, req.body);
        userModel.password = encryptedPassword;

        await USERCOLLECTION.insertOne(userModel);
        res.send('User succesfully created!');
    } catch (err) {
        res.send(err);
    }
};

export const login = async (req, res) => {
    try {
        if (await verifyModel(req.body, { email: '', password: '', remember: '' })) { return res.send({ error: "Model not correct, all required fields aren't present!", code: 400 }); }
        const storedUser = await USERCOLLECTION.findOne({ email: req.body.email });
        console.log(await verifyPassword(req.body.password, storedUser.password));
        if (!await verifyPassword(req.body.password, storedUser.password)) { return res.send({ error: 'Password incorrect!', code: 403 }); }

        let token;
        if (req.body.remember) {
            console.log('remembering user login');
            token = generateAccessToken({ username: req.body.username }, '1y');
        }
        else {
            console.log('not remembering user login');
            token = generateAccessToken({ username: req.body.username }, '1d');
        }
        console.log('logging in');
        res.json({ token: token, email: req.body.email });

    } catch (err) {

    }
};
