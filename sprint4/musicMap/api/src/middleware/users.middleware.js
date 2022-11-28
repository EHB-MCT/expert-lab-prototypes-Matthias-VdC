export default function usersMiddleWare(req, res, next) {
    console.log('user middleWare working');
    next();
}
