const Project = require('./../models/projectModel')
const Tag = require('./../models/tagModel')
const User = require('./../models/userModel')
const Review = require('./../models/reviewModel')

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
    if (!projects) return res.status(500).send({success: false})
    return res.status(200).send(projects)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(500).send({success: false, message: 'The project has not found'})
    return res.status(200).send(project)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const makeProject = async (req, res) => {
  const {title, description, demoLink, sourceLink, tags} = req.body;
  const owner = req.user._id
  const image = req.file ? req.file.path : ''
  let tag, t;
  tag = tags.replace(',', ' ').split()
  const tag1 = await tag.map(async name => await Tag.findOne({name: name}))
  if (tag1) t = tag
  if (!tag1) t = await Tag.create({name: tag})
  try {
    const project = await Project.create({
      owner, title, description, image, sourceLink, demoLink,
      voteTotal: this.getVoteCount().voteTotal, voteRatio: this.getVoteCount().voteRatio
    })
    if (!project) return res.status(500).send({success: false})
    return res.status(200).send(project)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const updateProject = async (req, res) => {
  const {title, description, demoLink, sourceLink, tags} = req.body;
  const image = req.file ? req.file.path : ''
  let tag, t;
  tag = tags.replace(',', ' ').split()
  const tag1 = await tag.map(async name => await Tag.findOne({name: name}))
  if (tag1) t = tag
  if (!tag1) t = await Tag.create({name: tag})
  try {
    const project = await Project.findOneAndUpdate(
      {_id: req.params.id, owner: req.user._id},
      {
        title, description, image, sourceLink, demoLink,
        voteTotal: this.getVoteCount().voteTotal, voteRatio: this.getVoteCount().voteRatio
      },
      {new: true}
    )
    if (!project) return res.status(500).send({success: false})
    return res.status(200).send(project)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const deleteProject = (req, res) => {
  Project.findByIdAndDelete(req.params.id).then(project => {
    if (project) return res.status(201).send({success: true})
    else return res.status(500).send({success: false})
  }).catch(e => {return res.status(404).send({success: false, error: e})})
}

module.exports = {getProjects, getProject, makeProject, updateProject, deleteProject}
