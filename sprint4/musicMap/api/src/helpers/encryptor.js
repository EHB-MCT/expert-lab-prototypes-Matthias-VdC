import bcrypt from 'bcrypt';

const encryptor = (req, res, password) => {
    return new Promise(async (resolve, reject) => {
        await bcrypt.genSalt(10, async (err1, salt) => {
            if (err1) { res.send(err1); } else {
                await bcrypt.hash(req.body.password, salt, (err2, hash) => {
                    if (err2) { res.send(err2); } else {
                        console.log('encryptor', hash);
                        return resolve(hash);
                    }
                });
            }
        });
    });
};

export default encryptor;
