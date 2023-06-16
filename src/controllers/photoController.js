const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelpers');
const {isAuth} = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    try {
        const photos = await photoManager.getAll().lean()
  
        res.render('photos', { photos })
    } catch (err) {
        res.render('photos', { error: getErrorMessage(err) })
    }

})
router.get('/create', isAuth, (req, res) => {
    res.render('photos/create')
})
router.post('/create', isAuth,  async (req, res) => {
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
        const photo = await photoManager.getOne(photoId).populate('comments.user').lean()
 
        // !!! Optional chaining (?.) becuse we may haven't user!!!
        const isOwner = req.user?._id == photo.owner._id;
        res.render('photos/details', { photo, isOwner })
        console.log(photo)
    } catch (err) {
        res.render('photos/details', { error: getErrorMessage(err) })
    }

})
router.get('/:photoId/delete', isAuth,  async (req, res) => {
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
router.get('/:photoId/edit',isAuth,  async (req, res) => {
    const photoId = req.params.photoId;
    let photo;

    try {
     photo = await photoManager.getOne(photoId).lean()
        res.render('photos/edit', { photo })
    
    } catch (err) {

    res.render(`photos/edit`, { photo, error: getErrorMessage(err) })
}

})
router.post('/:photoId/edit',isAuth,  async (req, res) => {
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
router.post('/:photoId/comments',isAuth,  async (req, res) => {
    const photoId = req.params.photoId;
    const {text }= req.body;
    const user = req.user._id;
    try {
        // !!! Optional chaining (?.) becuse we may haven't user!!!

            await photoManager.addComment(photoId, {user, text})

            res.redirect(`/photos/${photoId}/details`)
        

    } catch (err) {

        res.render(`photos/details`, { photo, error: 'Unable to edit photo' })
    }

})

module.exports = router;