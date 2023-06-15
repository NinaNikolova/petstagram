// check if we have authenticated user or not -it work for all request, but not stops guests to use resources
const jwt = require('../lib/jwt');
const { SECRET, TOKEN_KEY } = require('../config/config')
// authentication middleware
exports.auth = async (req, res, next) => {
    const token = req.cookies[TOKEN_KEY];
    if (token) {
        try {
            // decodedToken is payload
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
            next()
        } catch (err) {
            res.clearCookie(TOKEN_KEY);
            res.redirect('/users/login')
        }
    } else {
        next()
    }
}
// authorization middleware
exports.isAuth = (req, res, next)=>{
    if(!req.user){
        res.redirect('/users/login')
    }
    next()
}