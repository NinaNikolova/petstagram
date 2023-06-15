const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('', async(req, res) => {
    try {
         const photos = await photoManager.getAll()
    res.render('photos/catalog', photos)
    } catch (err) {
        res.render('photos/catalog', {error: getErrorMessage(err)})
    }
   
})
router.get('/create', (req, res) => {
    res.render('photos/create')
})
router.post('/create', async (req, res) => {
    const photoData = req.body;
    const owner = req.user._id;
    try {
        await photoManager.create({ ...photoData, owner });
        res.redirect('/photos')
    } catch (err) {
res.render('photos/create', {error: getErrorMessage(err)})
    }

})

module.exports = router;