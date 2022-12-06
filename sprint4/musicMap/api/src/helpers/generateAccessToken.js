import jwt from 'jsonwebtoken';
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
export default function generateAccessToken(username, time) {
    // 30 minutes = 1800 seconds
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: time });
}
