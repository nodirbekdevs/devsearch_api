const User = require('./../models/userModel')
const Skills = require('./../models/skillModel')
const Project = require('./../models/projectModel')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    if (!users) return  res.status(500).send({success: false})
    return res.status(200).send(users)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(500).send({success: false})
    return res.status(200).send(user)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const getUserAndSkills = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const skills = await Skills.find({owner: user})
    if (!user && !skills) return res.status(500).send({success: false})
    const response = {'user': user, 'skills': skills}
    return res.status(200).send(response)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const getUserAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const skills = await Skills.find({owner: user})
    const projects = await Project.find({owner: user})
    if (!user && !skills && !projects) return res.status(500).send({success: false})
    const response = {'user': user, 'skills': skills, 'projects': projects}
    return res.status(200).send(response)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const editUserAccount = async (req, res) => {
  try {
    const {
      name, email, username, location, shortIntro, bio, profileImage, socialGithub, socialTwitter, socialLinkedLn, socialYoutube, socialWebsite
    } = req.body
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name, email, username, location, shortIntro, bio,
        profileImage, socialGithub, socialTwitter, socialLinkedLn, socialYoutube, socialWebsite
      },
      {new: true}
    )
    if (!user) return res.status(500).send({success: false})
    return res.status(200).send(user)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const editUser = async (req, res) => {
  try {
    const {
      name, email, username, location, shortIntro, bio, profileImage, socialGithub, socialTwitter, socialLinkedLn, socialYoutube, socialWebsite
    } = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name, email, username, location, shortIntro, bio,
        profileImage, socialGithub, socialTwitter, socialLinkedLn, socialYoutube, socialWebsite
      }, {new: true}
    )
    if (!user) return res.status(500).send({success: false})
    return res.status(200).send(user)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id).then(user => {
    if (user) return res.status(201).send({success: true})
    else return res.status(500).send({success: false})
  }).catch(e => {return res.status(404).send({success: false, error: e})})
}

module.exports = {getUsers, getUser,getUserAndSkills, getUserAccount, editUserAccount, editUser, deleteUser}
