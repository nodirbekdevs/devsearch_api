const router = require('express').Router()
const {getUsers, getUser, getUserAndSkills, getUserAccount, editUserAccount, editUser, deleteUser} = require('./../views/userViews')
const {auth, isAdmin} = require('./../middleware/permissions')

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/skills/:id', getUserAndSkills)
router.get('/account', auth, getUserAccount)
router.put('/edit', auth, editUserAccount)
router.put('/edit/:id', [auth, isAdmin], editUser)
router.delete('/delete/:id', [auth, isAdmin], deleteUser)

module.exports = router
