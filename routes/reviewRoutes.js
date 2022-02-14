const router = require('express').Router()
const {getReviews, getReview, makeReview, deleteReview} = require('./../views/reviewViews')
const {auth, isAdmin} = require('./../middleware/permissions')

router.get('/', [auth, isAdmin], getReviews)
router.get('/:id', [auth, isAdmin], getReview)
router.post('/make', auth, makeReview)
router.delete('/delete/:id', [auth, isAdmin], deleteReview)

module.exports = router
