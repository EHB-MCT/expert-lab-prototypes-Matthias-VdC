export default function songsMiddleWare(req, res, next) {
    try {
        console.log('song middleWare working');
    } catch (err) {
        res.send(err);
    }
    next();
}
