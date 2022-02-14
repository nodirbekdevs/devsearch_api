const Review = require('./../models/reviewModel')
const Project = require('./../models/projectModel')

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
    if (!reviews) return res.status(500).send({success: false})
    return res.status(201).send(reviews)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) return res.status(500).send({success: false})
    return res.status(201).send(review)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const makeReview = async (req, res) => {
  const {body, value} = req.body
  let values
  if (value && value === 'Up Vote') values = 'up'
  else if (value && value === 'Down Vote') values = 'down'
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(500).send({success: false})
    const review = await Review.create({owner: req.user._id, project, body, value: values})
    if (!review) return res.status(500).send({success: false})
    return res.status(201).send(review)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const deleteReview = (req, res) => {
  Review.findByIdAndDelete(req.params.id).then(review => {
    if (review) return res.status(201).send({success: true})
    else return res.status(500).send({success: false})
  }).catch(e => {return res.status(404).send({success: false, error: e})})
}

module.exports = {getReviews, getReview, makeReview, deleteReview}
