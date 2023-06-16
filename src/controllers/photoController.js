const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    try {
        const photos = await photoManager.getAll().lean()
        res.render('photos', {photos})
    } catch (err) {
        res.render('photos', { error: getErrorMessage(err) })
    }

})
router.get('/create', (req, res) => {
    res.render('photos/create')
})
router.post('/create', async (req, res) => {
    const photoData = {
        ...req.body,
        owner: req.user._id
    }
    try {
        await photoManager.create(photoData);
        res.redirect('/photos')
    } catch (err) {
        res.render('photos/create', { error: getErrorMessage(err) })
    }

})
router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
  
    try {
        const photo = await photoManager.getOne(photoId).lean()
        // !!! Optional chaining (?.) becuse we may haven't user!!!
          const isOwner = req.user?._id==photo.owner._id;
        res.render('photos/details', {photo, isOwner})
    } catch (err) {
        res.render('photos/details', { error: getErrorMessage(err) })
    }

})

module.exports = router;