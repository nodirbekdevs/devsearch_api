const router = require('express').Router()
const {getProjects, getProject, makeProject, updateProject, deleteProject} = require('./../views/projectViews')
const {auth, transfer} = require('./../middleware/permissions')

router.get('/', auth, getProjects)
router.get('/:id', auth, getProject)
router.post('/make', auth, transfer, makeProject)
router.put('/edit/:id', auth, transfer, updateProject)
router.delete('/delete/:id', auth, deleteProject)

module.exports = router;
