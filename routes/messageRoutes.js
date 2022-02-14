const router = require('express').Router()
const {getMessages, getMessage, makeMessage, deleteMessage} = require('./../views/messageViews')
const {auth} = require('./../middleware/permissions')

router.post('/', auth, getMessages)
router.post('/:id', auth, getMessage)
router.post('/make', auth, makeMessage)
router.post('/delete/:id', auth, deleteMessage)

module.exports = router
