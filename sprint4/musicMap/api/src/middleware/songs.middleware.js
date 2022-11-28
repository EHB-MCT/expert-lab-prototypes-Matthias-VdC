export default function songsMiddleWare(req, res, next) {
    console.log('song middleWare working');
    next();
}
