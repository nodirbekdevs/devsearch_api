const router = require('express').Router()
const {getSkills, getSkill, makeSkill, updateSkill, deleteSkill} = require('./../views/skillViews')
const {auth, isAdmin} = require('./../middleware/permissions')

router.get('/', [auth, isAdmin], getSkills)
router.get('/:id', [auth, isAdmin], getSkill)
router.post('/make', auth, makeSkill)
router.put('/:id', auth, updateSkill)
router.delete('/:id', auth, deleteSkill)

module.exports = router
