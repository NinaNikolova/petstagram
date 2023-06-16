const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    try {
        const photos = await photoManager.getAll().lean()
        console.log(photos)
        res.render('photos', { photos })
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
        const isOwner = req.user?._id == photo.owner._id;
        res.render('photos/details', { photo, isOwner })
    } catch (err) {
        res.render('photos/details', { error: getErrorMessage(err) })
    }

})
router.get('/:photoId/delete', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoManager.getOne(photoId).lean()
    try {
        // !!! Optional chaining (?.) becuse we may haven't user!!!
        const isOwner = req.user?._id == photo.owner?._id;
        if (isOwner) {
            await photoManager.deleteOne(photoId)

            res.redirect('/photos')
        }

    } catch (err) {

        res.render(`photos/details`, { photo, error: 'Unseccessful photo deletion' })
    }

})
router.get('/:photoId/edit', async (req, res) => {
    const photoId = req.params.photoId;
    let photo;

    try {
     photo = await photoManager.getOne(photoId).lean()
        res.render('photos/edit', { photo })
    
    } catch (err) {

    res.render(`photos/edit`, { photo, error: getErrorMessage(err) })
}

})
router.post('/:photoId/edit', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = req.body;
  
    try {
        // !!! Optional chaining (?.) becuse we may haven't user!!!

            await photoManager.updateOne(photoId, photo)

            res.redirect(`/photos/${photoId}/details`)
        

    } catch (err) {

        res.render(`photos/details`, { photo, error: 'Unable to edit photo' })
    }

})
router.post('/:photoId/comments', async (req, res) => {
    const photoId = req.params.photoId;
    const {text }= req.body;
    const userId = req.user._id;
    try {
        // !!! Optional chaining (?.) becuse we may haven't user!!!

            await photoManager.addComment(photoId, {userId, text})

            res.redirect(`/photos/${photoId}/details`)
        

    } catch (err) {

        res.render(`photos/details`, { photo, error: 'Unable to edit photo' })
    }

})

module.exports = router;