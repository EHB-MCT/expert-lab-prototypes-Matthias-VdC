import jwt from 'jsonwebtoken';

export default async function authenticateAccessToken(accessToken) {
    const authHeader = accessToken;
    const token = authHeader && authHeader.split(' ')[0];

    if (token == null) { return false; }

    await jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err, user);

        if (err) { return false; }


        return user;
    });
}
