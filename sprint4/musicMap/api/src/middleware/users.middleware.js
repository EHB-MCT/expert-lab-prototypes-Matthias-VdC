import authenticateToken from './authenticateToken.middleware.js';

export default function usersMiddleWare(req, res, next) {
    try {
        const nonSecurePaths = ['/register', '/login'];
        if (nonSecurePaths.includes(req.path)) { return next(); }
        authenticateToken(req, res, next);
        console.log('user middleWare working');
    } catch (err) {
        res.send(err);
    }
    next();
}
