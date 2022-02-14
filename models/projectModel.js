const {Schema, model} = require('mongoose')
const Review = require('./reviewModel')

const project = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  description: {type: String},
  image: {type: String, default: ''},
  demoLink: {type: String},
  sourceLink: {type: String},
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  voteTotal: {type: Number, default: 0},
  voteRatio: {type: Number, default: 0}
}, {timestamps: true})

project.methods.reviewers = () => {
  const reviews = Review.find({project: this._id})
  return reviews
}

project.methods.getVoteCount = () => {
  const upVotes = Review.find({project: this._id, value: 'up'}).count
  const totalVotes = this.reviewers().count
  const ratio = (upVotes / totalVotes) * 100
  this.voteTotal = totalVotes
  this.voteRatio = ratio
}

const Project = model('Project', project)

module.exports = Project
