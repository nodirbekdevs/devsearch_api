const {Schema, model} = require('mongoose')

const Review = model('Review', new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  project: {type: Schema.Types.ObjectId, ref: 'Project'},
  body: {type: String}, value: {type: String},
}, {timestamps: true}))

module.exports = Review
