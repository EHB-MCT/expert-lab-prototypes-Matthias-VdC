export default function usersMiddleWare(req, res, next) {
    try {
        console.log('user middleWare working');
    } catch (err) {
        res.send(err);
    }
    next();
}
