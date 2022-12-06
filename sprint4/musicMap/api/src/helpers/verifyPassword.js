import bcrypt from 'bcrypt';

const verifyPassword = (plainPass, hashedPass) => {
    return new Promise(async (resolve, reject) => {
        await bcrypt.compare(plainPass, hashedPass, (err, isCorrect) => {
            if (err) { console.log('an error has occured'); return resolve([false, err]); }
            return resolve(isCorrect);
        });
    });
};

export default verifyPassword;
