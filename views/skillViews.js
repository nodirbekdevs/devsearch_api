const Skill = require('./../models/skillModel')

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({})
    if (!skills) return res.status(500).send({success: false})
    return res.status(200).send(skills)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)
    if (!skill) return res.status(500).send({success: false})
    return res.status(200).send(skill)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const makeSkill = async (req, res) => {
  const {name, description} = req.body
  try {
    const skill = new Skill({owner: req.user._id, name, description})
    if (!skill) return res.status(500).send({success: false})
    await skill.save()
    return res.status(200).send(skill)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const updateSkill = async (req, res) => {
  const {name, description} = req.body
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, {name, description}, {new: true})
    if (!skill) return res.status(500).send({success: false})
    return res.status(200).send(skill)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const deleteSkill = (req, res) => {
  Skill.findByIdAndDelete(req.params.id).then(skill => {
    if (skill) return res.status(201).send({success: true})
    else return res.status(500).send({success: false})
  }).catch(e => {return res.status(404).send({success: false, error: e})})
}

module.exports = {getSkills, getSkill, makeSkill, updateSkill, deleteSkill}
