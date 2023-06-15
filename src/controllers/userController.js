const router = require('express').Router();
const userManager = require('../managers/userManager');
const { TOKEN_KEY } = require('../config/config');
const {getErrorMessage} = require('../utils/errorHelpers')

router.get('/login', (req, res) => {
    res.render('users/login')
})
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
try {
        const token = await userManager.login(username, password);
    res.cookie(TOKEN_KEY, token)
    res.redirect('/')
} catch (err) {
    res.render('users/login', {error: getErrorMessage(err)})
}



})
router.get('/register', (req, res) => {
    res.render('users/register')
})
router.post('/register', async (req, res) => {
    const { username, email, password, repass } = req.body;

    try {
          const token = await userManager.register({ username, email, password, repass });
          res.cookie(TOKEN_KEY, token)
    res.redirect('/')
    } catch (err) {
        res.render('users/register', {error: getErrorMessage(err)})
    }
  



})
router.get('/profile', (req, res) => {
    res.render('users/profile')
})
router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_KEY)
    res.redirect('/')
})
module.exports = router;